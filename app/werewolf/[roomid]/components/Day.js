"use client";

import { useEffect, useState, useRef, useContext } from "react";
import Image from "next/image";
import clsx from "clsx";
import AliveChatAndTarget from "./AliveChatAndTarget";
import DeadPlayerList from "./DeadPlayerList";
import AllChatRoom from "./AllChatRooms";
import WholeDayChatRoom from "./WholeDayChatRoom";
import DayChatRoom from "./DayChatRoom";
import dayBg from "@/public/image/dayBg.jpg";
import RoleCard from "./RoleCard";
import StartRoleAnimation from "./StartRoleAnimation";
import { Globe2, HelpCircle } from "lucide-react";
import Popup from "../../component/Popup";
import { useStore } from "@/app/werewolf/store";

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
  initialVampire,
}) {
  const { language, changeLanguage } = useStore();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [timer, setTimer] = useState(10);
  const [target, setTarget] = useState(null);
  const [currAction, setCurrAction] = useState(null);
  const [message, setMessage] = useState("");
  const [personal, setPersonal] = useState(null);
  const [highestVotePlayers, setHighestVotePlayer] = useState(null);
  const [fade, setFade] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [currentDeadIndex, setCurrentDeadIndex] = useState(0);
  const [deadMessage, setDeadMessage] = useState("");
  const [startRoleVisible, setStartRoleVisible] = useState(false);
  const [startAnimationRendered, setStartAnimationRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showRoles, setShowRoles] = useState(false);

  const targetRef = useRef(target);
  const actionRef = useRef(currAction);
  const playerDataRef = useRef(playersData);

  const playerDied = [...new Set(playerDiedLastNight)];
  const [radiusX, setRadiusX] = useState(300); // Default radiusX
  const [radiusY, setRadiusY] = useState(150); // Default radiusY

  // Update radii based on screen size
  useEffect(() => {
    const updateRadius = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      setRadiusX(screenWidth * 0.3); // 30% of screen width
      setRadiusY(screenHeight * 0.2); // 20% of screen height
    };

    // Initial calculation
    updateRadius();

    // Recalculate on window resize
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  useEffect(() => {
    setFade(true);
    if (days === 1 && !startAnimationRendered) {
      setStartRoleVisible(true);

      const startAnimationTimeout = setTimeout(() => {
        setStartAnimationRendered(true);
        setStartRoleVisible(false);
      }, 4000);

      return () => {
        clearTimeout(startAnimationTimeout);
      };
    } else if (playerDied.length && currentDeadIndex < playerDied.length) {
      if (roomLeader) {
        socket.emit("dayChat", {
          roomId,
          message: `${playersData[playerDied[currentDeadIndex]].name} has died last night!`,
          name: "server",
        });
      }
      const animation = setTimeout(() => {
        setTimeout(() => {
          setCurrentDeadIndex(currentDeadIndex + 1);
          setDeadMessage("");
        }, 1000); // Wait for fade-out to complete
      }, 3000);

      const animationTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 2000);

      setDeadMessage(`${playersData[playerDied[currentDeadIndex]].name} has died last night!`);
      setIsVisible(true);

      return () => {
        clearTimeout(animation);
        clearTimeout(animationTimeout);
      };
    } else {
      setTimer(10);

      setPlayersData((prev) => prev.map((player) => ({ ...player, jailed: false })));

      if (roomLeader && days > 1 && playerDiedLastNight.length === 0) {
        socket.emit("dayChat", {
          roomId,
          message: language ? `Last night was a safe night.` : "琴晚係一個和平既夜晚",
          name: "server",
        });
      }
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
        //(same votes:no one die)
        // find who have the most vote
        if (days > 1) {
          calculateHighestVoted();
        }
        socket.emit("dayAction", {
          days,
          position,
          roomId,
          target: targetRef.current,
          action: actionRef.current,
        });
        setFadeOut(true);
        setDays((prev) => prev + 1);
      }, timer * 1000);

      const dayTime = setInterval(() => {
        socket.emit("sendSetDay", { roomId, dayTime: false });
      }, timer * 1000 + 1000);

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
    }
  }, [currentDeadIndex, startAnimationRendered]);

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
    const highestVotePlayers = playerDataRef.current.filter((player) => player.vote === maxVotes);
    if (highestVotePlayers.length === 1) {
      const votedOutPlayer = highestVotePlayers[0];
      // console.log("votedOutPlayer1", votedOutPlayer);
      setHighestVotePlayer(votedOutPlayer);

      //emit vote out message to system chat
      if (roomLeader) {
        socket.emit("dayChat", {
          name: "server",
          message: `${votedOutPlayer.name}  ${language ? "has been voted out." : "已比人票死咗"}`,
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
          message: language ? `It's a tie! No one is eliminated.` : `打個和super，無人死。`,
          roomId: roomId,
          repeat: "no",
        });
      }
      setPlayersData((preData) => preData.map((player) => ({ ...player, vote: 0 })));
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
        if (playerIndex !== null) {
          setPlayersData((prev) =>
            prev.map((player, index) =>
              index === +playerIndex ? { ...player, vote: player.vote + 1 } : { ...player, vote: player.vote }
            )
          );
        }
      });
    });
    socket.on("allDayAction", (dayTimeAction) => {
      dayTimeAction.forEach((actions) => {
        if (actions.action === "link with") {
          setPlayersData((prev) =>
            prev.map((player, index) => (index === actions.target ? { ...player, linked: true } : player))
          );
          setPlayersData((prev) =>
            prev.map((player, index) => (index === actions.owner ? { ...player, linked: true } : player))
          );
          if (playersData[position].role === "cupid") {
            setCupidAbilityUsed(true);
          }
        }
        if (actions.action === "jail") {
          setPlayersData((prev) =>
            prev.map((player, index) => (index === actions.target ? { ...player, jailed: true } : player))
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
    // if (days <= 1) {
    //   alert("You can't voting on the first day!");
    //   return;
    // }
    if (targetIndex !== null && targetIndex !== personal) {
      setPersonal(targetIndex);
      socket.emit("submitVote", {
        id: playersData[position].id,
        target: targetIndex,
        roomId,
      });
    } else {
      setPersonal(null);
      socket.emit("submitVote", {
        id: playersData[position].id,
        target: null,
        roomId,
      });
    }
  }

  const handleImage = () => {
    setShowRoles(!showRoles);
  };

  const CircleWithItems = ({ items, radius }) => {
    const centerX = radiusX * 0.6; // X coordinate of the circle center
    const centerY = radiusY * 1.7; // Y coordinate of the circle center

    return (
      <svg width="600" height="600" className="absolute">
        <circle cx={centerX} cy={centerY} r={radius} opacity="0" fill="red" />
        {items.map((item, index) => {
          const angle = (index / items.length) * 2 * Math.PI; // angle in radians
          const x = centerX + radius * Math.cos(angle); // X position
          const y = centerY + radius * Math.sin(angle); // Y position

          return (
            <g key={item.id} transform={`translate(${x}, ${y})`} className="relative">
              <text x="0" y="60" textAnchor="middle" dominantBaseline="middle">
                {item.name}
              </text>
              <image
                href={`${
                  item.alive
                    ? "https://static.tvtropes.org/pmwiki/pub/images/plaguebearer.png"
                    : "https://m.media-amazon.com/images/I/71l8hjKIRZL._AC_SL1500_.jpg"
                }`}
                width="100"
                height="100"
                x="-50" // Center the image
                y="-50" // Center the image
                className="hover:scale-105 transition duration-150 ease-in-out cursor-pointer"
                onClick={handleImage}
              />
              {showRoles && (
                <text className="mt-4 bg-gray-200 p-4 rounded shadow-md absolute">
                  <ul className="list-disc list-inside">
                    <li>Role 1</li>
                    <li>Role 2</li>
                  </ul>
                </text>
              )}
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div
      className={`mainContainer flex flex-col h-screen w-screen transition-all duration-1000 ease-in 
         ${fadeOut ? "bg-gray-700" : fade ? "bg-white" : "bg-gray-700"}`}
    >
      {/* background image */}
      <div className="absolute inset-0 z-0">
        <Image src={dayBg} alt="kowloon" className="w-full h-full object-cover opacity-30" />
      </div>

      {/* open animation */}
      <div className={clsx("absolute inset-0 flex justify-center items-center", startRoleVisible ? "z-50" : "z-0")}>
        {startRoleVisible && <StartRoleAnimation playersData={playersData} position={position} />}
      </div>

      {/* main component */}
      <div
        className={`flex flex-row justify-between h-screen
          transition-opacity duration-1000 relative ${fade ? "opacity-100" : "opacity-0"}
        `}
      >
        {/* left component */}
        <div className="w-1/4 h-full">
          <div className="h-1/2 w-full">
            <RoleCard playersData={playersData} position={position} />
          </div>
          <div className="h-1/2 border-2">
            {/*day chat room in here*/}
            <AllChatRoom
              show={{
                day: true,
                dead: !playersData[position].alive,
              }}
              playersData={playersData}
              position={position}
              role={role}
              day={day}
              setMessage={setMessage}
              message={message}
              sentDayMessage={handleMessageSent}
              sentDeadMessage={handleDeadPlayerMessageSent}
              // sentWitchMessage={handleMessageSent}
              // sentVampireMessage={handleVampireMessageSent}
              dayChat={dayTimeChat}
              // witchChat={nightTimeChat}
              deadChat={deadPlayerChat}
              // vampireChat={vampireNightTimeChat}
            />

            {/* <DayChatRoom
              playersData={playersData}
              position={position}
              dayTimeChat={dayTimeChat}
              // setShowWhichChat={setShowWhichChat}
              // showWhichChat={showWhichChat}
              setMessage={setMessage}
              message={message}
              sentDayMessage={handleMessageSent}
            /> */}

            {/* {!playersData[position].alive && !showWhichChat && (
              <WholeDayChatRoom
                deadChat={deadPlayerChat}
                message={message}
                setMessage={setMessage}
                handleMessageSent={handleDeadPlayerMessageSent}
                role={role}
              />
            )} */}
          </div>
        </div>
        {/* middle component*/}
        <div className="w-1/2 flex flex-col items-center justify-center relative">
          <div className="flex flex-col h-full w-full">
            <div className="h-[5%]">
              <div className="text-3xl font-semibold text-center">{timer}</div>
              <div className="text-xl font-bold text-center">{language ? `Day${days}` : `第${days}日`}</div>
            </div>

            <div className="h-[95%] flex flex-col items-center justify-center pb-[80px]">
              <CircleWithItems items={playersData} radius={240} />

              <div className="text-2xl text-gray-800 mt-4 transition-all duration-500 ease-in-out fade-in">
                {targetRef &&
                  currAction &&
                  !cupidAbilityUsed &&
                  (language ? (
                    <div>{`you decide to ${currAction} ${target === null ? "no one" : playersData[target].name}`}</div>
                  ) : (
                    <div>{`你選擇了 ${currAction} ${target === null ? " " : playersData[target].name}`}</div>
                  ))}
              </div>

              <div className="transition-all duration-500 ease-in-out fade-in text-xl">
                {!!detectiveAbilityInfo.name && role === "detective" && (
                  <span>
                    {language ? (
                      <span>{`${detectiveAbilityInfo.name} is `}</span>
                    ) : (
                      <span>{`${detectiveAbilityInfo.name} 係 `}</span>
                    )}
                    <span className={clsx(detectiveAbilityInfo.detected === "good" ? "text-blue-600" : "text-red-600")}>
                      {detectiveAbilityInfo.detected}
                    </span>
                    {/* <span className="font-semibold text-rose-600 ml-2">{detectiveAbilityInfo.detected}</span> */}
                  </span>
                )}
              </div>

              <div>
                {role === "sentinel" &&
                  sentinelAbilityInfo.map((players) => {
                    const owner = playersData[players.owner].name;
                    const visited = playersData[players.target].name;
                    return (
                      <div className="text-2xl text-gray-800 mt-4 transition-all duration-500 ease-in-out fade-in">{`${owner} visited ${visited}`}</div>
                    );
                  })}
              </div>

              <div>{role === "conspirator" && <div>{`you target is ${playersData[chooseSomeone]?.name}`}</div>}</div>

              <div
                className="text-2xl text-gray-800 mt-4 transition-all duration-500 ease-in-out fade-in"
                key={personal}
              >
                {days > 1 && (
                  <span>
                    {language ? "You have voted" : "你投票了"}
                    <span className="font-semibold text-rose-600 ml-2">
                      {personal !== null ? playersData[personal]?.name : language ? "no one" : "______"}
                    </span>
                  </span>
                )}
              </div>

              {deadMessage && (
                <div
                  className={`absolute border-2 rounded p-4 fade-message text-5xl bg-white gameBorder ${
                    isVisible ? "show" : ""
                  }`}
                >
                  {deadMessage}
                </div>
              )}

              <div className="absolute bottom-6 right-6 flex gap-4 z-20">
                {/* language */}
                <div className="flex flex-row justify-center items-center cursor-pointer" onClick={changeLanguage}>
                  {language ? "中文" : "English"}
                  <div variant="outline" className="rounded-full w-12 h-12 p-0 ml-2 flex items-center">
                    <Globe2 className="w-6 h-6" />
                  </div>
                </div>
                {/* character info */}
                <div
                  className="flex flex-row justify-center items-center cursor-pointer"
                  onClick={() => setIsPopupOpen(!isPopupOpen)}
                >
                  {language ? "Character Info" : "角色說明"}
                  <div variant="outline" className="rounded-full w-12 h-12 p-0 ml-2 flex items-center">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <Popup isOpen={isPopupOpen} onClose={togglePopup} language={language} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* right component */}
        <div className="w-1/4 flex flex-col justify-between rounded-lg shadow-md relative">
          <div className="h-1/2 gameBorder">
            <DeadPlayerList
              playersData={playersData}
              position={position}
              day={day}
              setTarget={setTarget}
              target={target}
            />
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
              target={target}
              initialVampire={initialVampire}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
