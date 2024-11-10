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
}) {
  const [timer, setTimer] = useState(10);
  const [target, setTarget] = useState(null);
  const [currAction, setCurrAction] = useState(null);
  const [message, setMessage] = useState("");
  const [showWhichChat, setShowWhichChat] = useState(true);
  const [personal, setPersonal] = useState(null);

  const targetRef = useRef(target);
  const actionRef = useRef(currAction);

  const alivePlayerId = playersData
    .filter((player) => player.alive)
    .map((player) => player.id);

  useEffect(() => {
    targetRef.current = target;
    actionRef.current = currAction; // Update ref whenever state changes
  }, [target, currAction]);

  const actions = {
    cupid: "link with",
    jailor: "jail",
  };

  const randomInterval = timer * 1000 + Math.floor(Math.random() * 300);

  useEffect(() => {
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
    }, randomInterval);

    const dayTime = setInterval(() => {
      //(same votes:no one die)
      // find who have the most vote
      // const highestVotes = Math.max(...);

      setDays((prev) => prev + 1);
      if (roomLeader) socket.emit("sendSetDay", { roomId, dayTime: false });
    }, 10000);

    const timer = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    socket.emit("resetNightAction", { roomId });

    handleMessageSent();

    return () => {
      clearInterval(action);
      clearInterval(dayTime);
      clearInterval(timer);
    };
  }, []);

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

      // players.forEach((playerIndex) => {
      //   setPlayersData((prev) =>
      //     prev.map((player, index) =>
      //       index === +playerIndex
      //         ? { ...player, vote: voteCounts[playerIndex] }
      //         : { ...player, vote: 0 }
      //     )
      //   );
      // });
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

  return (
    <div className="flex flex-col w-full h-screen	">
      <div>{timer}</div>
      <div>DAY {`${days}`}</div>{" "}
      <div className="mainContainer flex flex-row justify-between">
        {/* left component */}
        <div className="border-2 border-red-300 w-1/4">
          <div className="h-1/2">
            <DeadPlayerList playersData={playersData} position={position} />
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
              <div className="mt-4 border-2 border-blue-300 w-full h-3/4">
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
        <div className="border-2 border-red-300 w-1/2">
          <div>
            {targetRef && currAction && (
              <div>{`you decide to ${currAction} ${
                target === null ? "no one" : playersData[target].name
              }`}</div>
            )}
          </div>
          <div>
            {!!detectiveAbilityInfo && role === "detective" && (
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
            {days > 1 &&
              `You have voted ${
                personal !== null ? playersData[personal].name : "no one"
              }`}
          </div>
        </div>
        {/* right component */}
        <div className="border-2 border-red-300 w-1/4 flex flex-col justify-between">
          <div className="bg-gray-600 text-lg mt-4 mb-4 text-center">
            {role}
          </div>
          <div className="h-1/2">
            <AliveChatAndTarget
              playersData={playersData}
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
