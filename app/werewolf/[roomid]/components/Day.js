"use client";

import { useEffect, useState, useRef } from "react";
import AliveChatAndTarget from "./AliveChatAndTarget";
import DeadPlayerList from "./DeadPlayerList";
import WholeDayChatRoom from "./WholeDayChatRoom";

export default function Day({
  socket,
  roomId,
  roomLeader,
  setDay,
  name,
  dayTimeChat,
  setDayTimeChat,
  deadPlayerChat,
  setDeadPlayerChat,
  role,
  setRole,
  players,
  playersData,
  setPlayersData,
  setPlayers,
  days,
  setDays,
  detectiveAbilityInfo,
  position,
  sentinelAbilityInfo,
  day,
  cupidAbilityUsed,
  setCupidAbilityUsed,
  deadPlayerMessageSent,
  chooseSomeone,
  playerDiedLastNight,
}) {
  const [timer, setTimer] = useState(30);
  const [target, setTarget] = useState(null);
  const [currAction, setCurrAction] = useState(null);
  const [message, setMessage] = useState("");
  const [showWhichChat, setShowWhichChat] = useState(true);
  const [personal, setPersonal] = useState(null);
  const [highestVotePlayers, setHighestVotePlayer] = useState(null);
  const [fade, setFade] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // console.log("personal:", personal);
  // console.log("playersData", playersData);

  const targetRef = useRef(target);
  const actionRef = useRef(currAction);
  const playerDataRef = useRef(playersData);

  console.log(playersData);

  useEffect(() => {
    setTimer(10);
    setFade(true);

    setPlayersData((prev) =>
      prev.map((player) => ({ ...player, jailed: false }))
    );

    setCurrAction(actions[role]);
    if (role === "reminiscence" && role !== playersData[position].role) {
      socket.emit("dayChat", {
        roomId,
        message: `an reminiscence have remember that he is ${playersData[position].role}`,
        name: "server",
      });
    }
    setRole(playersData[position].role);

    const action = setInterval(() => {
      socket.emit("dayAction", {
        days,
        position,
        roomId,
        target: targetRef.current,
        action: actionRef.current,
      });
      setFadeOut(true);
    }, 10000);

    const dayTime = setInterval(() => {
      console.log(playerDiedLastNight);
      //(same votes:no one die)
      // find who have the most vote
      if (days > 1) {
        calculateHighestVoted();
      }

      // Trigger fade-out effect before ending the day

      setDays((prev) => prev + 1);
      if (roomLeader) socket.emit("sendSetDay", { roomId, dayTime: false });
    }, 11000);

    const clockTimer = setInterval(() => {
      setTimer((prev) => {
        if (prev < 1) {
          return;
        }
        return prev - 1;
      });
    }, 1000);

    socket.emit("resetNightAction", { roomId });

    handleMessageSent();

    return () => {
      clearInterval(action);
      clearInterval(dayTime);
      clearInterval(clockTimer);
    };
  }, []);

  const alivePlayerId = playersData
    .filter((player) => player.alive)
    .map((player) => player.id);

  useEffect(() => {
    targetRef.current = target;
    actionRef.current = currAction; // Update ref whenever state changes
    playerDataRef.current = playersData;
  }, [target, currAction, playersData]);

  const actions = {
    cupid: "link with",
    jailor: "jail",
  };

  const calculateHighestVoted = () => {
    const playersVote = playerDataRef.current.map((player) => player.vote);
    const maxVotes = Math.max(...playersVote);
    // console.log("maxVotes", maxVotes);
    const highestVotePlayers = playerDataRef.current.filter(
      (player) => player.vote === maxVotes
    );
    if (highestVotePlayers.length === 1) {
      const votedOutPlayer = highestVotePlayers[0];
      console.log("votedOutPlayer1", votedOutPlayer);
      setHighestVotePlayer(votedOutPlayer);

      //emit vote out message to system chat
      if (roomLeader) {
        socket.emit("dayChat", {
          name: "server",
          message: `${votedOutPlayer.name} has been voted out.`,
          roomId: roomId,
          repeat: "no",
        });
      }
      setPlayersData((preData) =>
        preData.map((player) =>
          player.id === votedOutPlayer.id
            ? { ...player, alive: false, vote: 0, votedOut: true }
            : { ...player, vote: 0 }
        )
      );
      // console.log("preData", preData);
    } else {
      setHighestVotePlayer("It's a tie! No one is eliminated.");
      //emit tie message to system chat
      if (roomLeader) {
        socket.emit("dayChat", {
          name: "server",
          message: `It's a tie! No one is eliminated.`,
          roomId: roomId,
          repeat: "no",
        });
      }
      setPlayersData((preData) =>
        preData.map((player) => ({ ...player, vote: 0 }))
      );
    }
  };

  useEffect(() => {
    socket.on("allDayChat", (data) => {
      setDayTimeChat(data);
    });
    socket.on("sendAllSetDay", ({ dayTime }) => {
      setDay(dayTime);
    });
    socket.on("allDeadPlayerChat", (data) => {
      setDeadPlayerChat(data);
    });
    socket.on("updateVotes", (voteData) => {
      // firstly reset all player vote to 0
      setPlayersData((prev) => prev.map((player) => ({ ...player, vote: 0 })));
      // secondly base on how many vote, make that player vote
      Object.values(voteData).forEach((playerIndex) => {
        setPlayersData((prev) =>
          prev.map((player, index) =>
            index === +playerIndex
              ? { ...player, vote: player.vote + 1 }
              : { ...player, vote: player.vote }
          )
        );
      });
    });
    socket.on("allDayAction", (dayTimeAction) => {
      dayTimeAction.forEach((actions) => {
        if (actions.action === "link with") {
          setPlayersData((prev) =>
            prev.map((player, index) =>
              index === actions.target ? { ...player, linked: true } : player
            )
          );
          setPlayersData((prev) =>
            prev.map((player, index) =>
              index === actions.owner ? { ...player, linked: true } : player
            )
          );
          if (playersData[position].role === "cupid") {
            setCupidAbilityUsed(true);
          }
        }
        if (actions.action === "jail") {
          setPlayersData((prev) =>
            prev.map((player, index) =>
              index === actions.target ? { ...player, jailed: true } : player
            )
          );
        }
      });
    });
  }, [socket]);

  function handleMessageSent() {
    socket.emit("dayChat", {
      name: name,
      message: message,
      roomId: roomId,
    });
    setMessage("");
  }

  function handleDeadPlayerMessageSent() {
    socket.emit("deadPlayerChat", { name, roomId, message });
    setMessage("");
  }
  function handleVote(targetIndex) {
    setPersonal(targetIndex);
    if (days <= 1) {
      alert("You can't voting on the first day!");
      return;
    }
    if (targetIndex !== null) {
      socket.emit("submitVote", {
        allPlayerId: alivePlayerId,
        id: playersData[position].id,
        target: targetIndex,
        roomId,
      });
    }
  }

  const CircleWithItems = ({ items, radius }) => {
    const centerX = 300; // X coordinate of the circle center
    const centerY = 300; // Y coordinate of the circle center

    return (
      <svg width="600" height="600">
        <circle cx={centerX} cy={centerY} r={radius} fill="lightblue" />
        {items.map((item, index) => {
          const angle = (index / items.length) * 2 * Math.PI; // angle in radians
          const x = centerX + radius * Math.cos(angle); // X position
          const y = centerY + radius * Math.sin(angle); // Y position

          return (
            <g key={index} transform={`translate(${x}, ${y})`}>
              <text x="0" y="60" textAnchor="middle" dominantBaseline="middle">
                {item}
              </text>
              <image
                href="https://static.tvtropes.org/pmwiki/pub/images/plaguebearer.png"
                width="100"
                height="100"
                x="-50" // Center the image
                y="-50" // Center the image
              />
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div
      className={`flex flex-col w-screen h-screen transition-all duration-1000 ease-in	
         ${fadeOut ? "bg-gray-700" : fade ? "bg-white" : "bg-gray-700"}`}
    >
      <div>{timer}</div>
      <div>DAY {`${days}`}</div>
      <div
        className={`mainContainer flex flex-row justify-between 
          transition-opacity duration-1000 ${fade ? "opacity-100" : "opacity-0"}
        `}
      >
        {/* left component */}
        <div className="border-2 border-red-300 w-1/4">
          <div className="h-1/2">
            <DeadPlayerList
              playersData={playersData}
              position={position}
              day={day}
              setTarget={setTarget}
            />
          </div>
          <div className="h-1/2 border-2 border-red-300">
            {!playersData[position].alive && (
              <div className="dead-chat-change">
                <button onClick={() => setShowWhichChat(true)}>Day Chat</button>
                <button onClick={() => setShowWhichChat(false)}>
                  Graveyard Chat
                </button>
              </div>
            )}
            <div className="flex flex-col justify-between items-center h-full">
              <div className="mt-4 border-2 border-blue-300 w-full h-3/4 overflow-y-scroll">
                {dayTimeChat.map((allDayMessage, index) => (
                  <div key={index}>
                    {allDayMessage.name}: {allDayMessage.message}
                  </div>
                ))}
              </div>
              {showWhichChat && playersData[position].alive ? (
                <div className="mt-10">
                  <input
                    value={message}
                    onChange={(ev) => setMessage(ev.target.value)}
                    className="border-2 border-cyan-300"
                  />
                  <div onClick={handleMessageSent} className="cursor-pointer">
                    Send
                  </div>
                </div>
              ) : (
                <div className="mt-10">
                  Day Chat: You cannot send messages in here.
                </div>
              )}
            </div>
            {!playersData[position].alive && !showWhichChat && (
              <WholeDayChatRoom
                deadChat={deadPlayerChat}
                message={message}
                setMessage={setMessage}
                handleMessageSent={handleDeadPlayerMessageSent}
                role={role}
              />
            )}
          </div>
        </div>
        {/* middle component*/}
        <div className="border-2 border-red-300 w-1/2 flex flex-col justify-center items-center">
          <div>
            {targetRef && currAction && (
              <div>{`you decide to ${currAction} ${
                target === null ? "no one" : playersData[target].name
              }`}</div>
            )}
          </div>
          <div>
            {!!detectiveAbilityInfo.name && role === "detective" && (
              <div>{`${detectiveAbilityInfo.name} is ${detectiveAbilityInfo.detected}`}</div>
            )}
          </div>
          <div>
            {role === "sentinel" &&
              sentinelAbilityInfo.map((players) => {
                const owner = playersData[players.owner].name;
                const visited = playersData[players.target].name;
                return <div>{`${owner} visited ${visited}`}</div>;
              })}
          </div>
          <div>
            {role === "conspirator" && (
              <div>{`you target is ${playersData[chooseSomeone]?.name}`}</div>
            )}
          </div>
          <div>
            {days > 1 &&
              `You have voted ${
                personal !== null ? playersData[personal].name : "no one"
              }`}
          </div>
          <div>
            <CircleWithItems
              items={playersData.map((x) => x.name)}
              radius={240}
            />
          </div>
        </div>
        {/* right component */}
        <div className="border-2 border-red-300 w-1/4 flex flex-col justify-between">
          <div className="bg-gray-600 text-lg mt-4 mb-4 text-center">
            {role}
          </div>
          <div className="h-1/2">
            <AliveChatAndTarget
              playersData={playerDataRef.current}
              position={position}
              setTarget={setTarget}
              day={day}
              cupidAbilityUsed={cupidAbilityUsed}
              days={days}
              handleVote={handleVote}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
