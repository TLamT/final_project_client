"use client";

import { useEffect, useState, useRef, useContext } from "react";
import characterData from "../data/character";
import AliveChatAndTarget from "./AliveChatAndTarget";
import fungPlayerData from "../data/fungPlayerData";
import DeadPlayerList from "./DeadPlayerList";
import AllChatRoom from "./AllChatRooms";
import Image from "next/image";
import nightBg from "@/public/image/nightBg.jpg";
import { useStore } from "@/app/werewolf/store";
// import WholeDayChatRoom from "./WholeDayChatRoom";
// import DayChatRoom from "./DayChatRoom";
// import NightChatRoom from "./NightChatRoom";
import RoleCard from "./RoleCard";
import Popup from "../../component/Popup";
import { Globe2, HelpCircle } from "lucide-react";

export default function Night({
  socket,
  day,
  setDay,
  name,
  roomId,
  dayTimeChat,
  setShowWhichChat,
  showWhichChat,
  nightTimeChat,
  setNightTimeChat,
  setVampireNightTimeChat,
  vampireNightTimeChat,
  deadPlayerChat,
  setDeadPlayerChat,
  role,
  players,
  position,
  playersData,
  setPlayersData,
  nights,
  setNights,
  setDetectiveAbilityInfo,
  setSentinelAbilityInfo,
  cupidAbilityUsed,
  deadPlayerMessageSent,
  setDayTimeChat,
  setPlayerDiedLastNight,
  canShoot,
  setCanShoot,
  initialVampire,
  roomLeader,
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [timer, setTimer] = useState(30);
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState(null);
  const [currAction, setCurrAction] = useState(null);
  const [twistedFateTarget, setTwistedFateTarget] = useState(null);
  const [fade, setFade] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const { language, changeLanguage } = useStore();
  const targetRef = useRef(target);
  const actionRef = useRef(currAction);
  const twistedFateTargetRef = useRef(twistedFateTarget);
  const twistedFateDropDownList = fungPlayerData.filter(
    (role) => role.faction !== "witch" && role.roleName !== "detective"
  );

  useEffect(() => {
    setTimer(30);
    setFade(true);
    setCurrAction(actions[role]);

    socket.emit("resetDayAction", { roomId });

    const action = setInterval(() => {
      socket.emit("nightAction", {
        nights,
        position,
        roomId,
        target: targetRef.current,
        action: actionRef.current,
        twistedTarget: twistedFateTargetRef.current,
      });
      setNights((prev) => prev + 1);
    }, timer * 1000);

    const nightTime = setInterval(() => {
      setFadeOut(true);
      socket.emit("sendSetDay", { roomId, dayTime: true });
    }, timer * 1000 + 1000);

    const clockTimer = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    setPlayerDiedLastNight([]);
    handleMessageSent();

    socket.emit("clearVotes", roomId);
    setPlayersData((prev) => prev.map((player) => ({ ...player, vote: 0 })));

    return () => {
      clearInterval(action);
      clearInterval(nightTime);
      clearInterval(clockTimer);
    };
  }, []);

  useEffect(() => {
    targetRef.current = target;
    actionRef.current = currAction; // Update ref whenever state changes
    twistedFateTargetRef.current = twistedFateTarget;
  }, [target, currAction, twistedFateTarget]);

  const actionsTC = (action) => {
    switch (action) {
      case "kill":
        return "殺死";
      case "detect":
        return "查探";
      case "protect":
        return "保護";
      case "lookOut":
        return "竀探";
      case "scam":
        return "陷害";
      case "remember":
        return "繼承";
      case "convert":
        return "轉化";
      case "vampireKill":
        return "懷疑殭屍係";
      case "destiny":
        return "賭";
    }
  };

  const actions = {
    reaper: "kill",
    police: "kill",
    detective: "detect",
    defender: "protect",
    sentinel: "lookOut",
    scammer: "scam",
    reminiscence: "remember",
    vampire: "convert",
    vampireHunter: "vampireKill",
    twistedFate: "destiny",
    joker: "kill",
  };

  useEffect(() => {
    "";
    socket.on("allNightChat", (data) => {
      setNightTimeChat(data);
    });
    socket.on("sendAllSetDay", ({ dayTime }) => {
      setDay(dayTime);
    });
    socket.on("allVampireNightChat", (data) => {
      setVampireNightTimeChat(data);
    });
    socket.on("allDeadPlayerChat", (data) => {
      setDeadPlayerChat(data);
    });
    socket.on("allNightAction", (nightTimeAction) => {
      nightTimeAction.forEach((actions) => {
        handleNightAction(actions, nightTimeAction);
      });
    });
    socket.on("allDayChat", (data) => {
      setDayTimeChat(data);
    });
  }, [socket]);

  function handleMessageSent() {
    socket.emit("nightChat", { name, roomId, message });
    setMessage("");
  }

  function handleVampireMessageSent() {
    socket.emit("vampireNightChat", { name, roomId, message });
    setMessage("");
  }

  function handleNightAction(actions, nightTimeAction) {
    if (actions.action === "kill") {
      const townFaction = Object.keys(characterData.town);
      if (playersData[actions.target]?.linked === true && !playersData[actions.target].jailed) {
        const linkedArr = [];
        playersData.forEach((player, index) => {
          if (player.linked === true) {
            linkedArr.push(index);
          }
        });
        setPlayerDiedLastNight((prev) => [...prev, ...linkedArr]);
        setPlayersData((prev) => prev.map((player) => (player.linked === true ? { ...player, alive: false } : player)));
        setPlayersData((prev) =>
          prev.map((player, index) => (index === actions.owner ? { ...player, votedOut: false } : player))
        );
        if (playersData[actions.owner].role === "police" && townFaction.includes(playersData[actions.target].role)) {
          setCanShoot(false);
        }
      }
      if (playersData[actions.target].linked === false && !playersData[actions.target].jailed) {
        setPlayersData((prev) =>
          prev.map((player, index) => (index === actions.target ? { ...player, alive: false } : player))
        );
        setPlayersData((prev) =>
          prev.map((player, index) => (index === actions.owner ? { ...player, votedOut: false } : player))
        );
        setPlayerDiedLastNight((prev) => [...prev, actions.target]);
        if (playersData[position].role === "police" && townFaction.includes(playersData[actions.target].role)) {
          setCanShoot(false);
        }
      }
    }

    if (actions.action === "detect") {
      // get the detected player name
      const detectedName = playersData[actions.target].name;
      // get the role good or bad
      const detectedRole = playersData[actions.target].detected;
      setDetectiveAbilityInfo({ name: detectedName, detected: detectedRole });
    }

    if (actions.action === "protect") {
      if (playersData[actions.target].alive === false) {
        console.log("you successfully protected someone");
      }
      setPlayersData((prev) =>
        prev.map((player, index) => (index === actions.target ? { ...player, alive: true } : player))
      );
      setPlayerDiedLastNight((prev) => prev.filter((player) => player !== actions.target));
    }

    if (actions.action === "lookOut") {
      const playerVisit = nightTimeAction.filter((player) => {
        return player.target === actions.target;
      });
      setSentinelAbilityInfo(playerVisit);
    }

    if (actions.action === "scam") {
      setDetectiveAbilityInfo((prev) => ({ ...prev, detected: "bad" }));
    }

    if (actions.action === "remember") {
      const targetRole = playersData[actions.target].role;
      setPlayersData((prev) =>
        prev.map((player, index) => (index === actions.owner ? { ...player, role: targetRole } : player))
      );
    }

    if (actions.action === "convert") {
      const witch = Object.keys(characterData.witch);
      const targetRole = playersData[actions.target].role;
      if (targetRole !== "vampireHunter") {
        if (witch.includes(targetRole)) {
          setPlayersData((prev) =>
            prev.map((player, index) => (index === actions.target ? { ...player, alive: false } : player))
          );
          setPlayerDiedLastNight((prev) => [...prev, actions.target]);
        }
        if (!witch.includes(targetRole)) {
          setPlayersData((prev) =>
            prev.map((player, index) => (index === actions.target ? { ...player, role: "vampire" } : player))
          );
        }
      }
      if (targetRole === "vampireHunter") {
        setPlayersData((prev) =>
          prev.map((player, index) => (index === actions.owner ? { ...player, alive: false } : player))
        );
        setPlayerDiedLastNight((prev) => [...prev, actions.owner]);
      }
    }

    if (actions.action === "vampireKill") {
      const targetRole = playersData[actions.target].role;

      if (targetRole === "vampire") {
        setPlayersData((prev) =>
          prev.map((player, index) => (index === actions.target ? { ...player, alive: false } : player))
        );
        setPlayerDiedLastNight((prev) => [...prev, actions.target]);
      }
    }

    if (actions.action === "destiny") {
      if (actions.twistedTarget === playersData[actions.target].role) {
        setPlayersData((prev) =>
          prev.map((player, index) => (index === actions.target ? { ...player, alive: false } : player))
        );
        setPlayerDiedLastNight((prev) => [...prev, actions.target]);
      } else if (roomLeader) {
        socket.emit("dayChat", {
          name: "server",
          message: `${playersData[actions.owner].name} 
          ${language ? "is twistedFate and is trying to kill" : "係賭徒，佢想賭你身份並殺死你"}
          
          ${playersData[actions.target].name}`,
          roomId: roomId,
          repeat: "no",
        });
      }
    }
  }
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  function handleDeadPlayerMessageSent() {
    socket.emit("deadPlayerChat", { name, roomId, message });
    setMessage("");
  }

  return (
    <div
      className={`mainContainer flex flex-col w-screen h-screen text-white transition-all duration-300 ease-out ${
        fadeOut ? "bg-white" : fade ? "bg-gray-700" : "bg-white"
      }`}
    >
      <div className="absolute inset-0 z-0">
        <Image src={nightBg} alt="kowloon" className="w-full h-full object-cover opacity-30" />
      </div>
      <div
        className={`w-screen h-screen flex flex-row justify-between transition-opacity duration-300 z-10 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-1/4 border-r-2 border-gray-300">
          <div className="h-1/2 w-full bg-black bg-opacity-30 p-2">
            <RoleCard playersData={playersData} position={position} />
          </div>
          <audio src="/music/night.mp3" autoPlay loop></audio>

          <div className="h-1/2 bg-black bg-opacity-30">
            <AllChatRoom
              show={{
                day: true,
                dead: !playersData[position].alive,
                witch: Object.keys(characterData.witch).includes(role),
                vampire: Object.keys(characterData.neutral)[0] === role,
                medium: role === "medium" && playersData[position].alive,
              }}
              playersData={playersData}
              position={position}
              role={role}
              setMessage={setMessage}
              message={message}
              day={day}
              // sentDayMessage={handleMessageSent}
              sentDeadMessage={handleDeadPlayerMessageSent}
              sentWitchMessage={handleMessageSent}
              sentVampireMessage={handleVampireMessageSent}
              dayChat={dayTimeChat}
              witchChat={nightTimeChat}
              deadChat={deadPlayerChat}
              vampireChat={vampireNightTimeChat}
            />
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center relative p-5">
          <div className="flex flex-col h-full w-full">
            <div className="h-[5%]">
              <div className="text-3xl font-semibold text-center">{timer}</div>
              <div className="text-xl font-bold text-center">{language ? `Night: ${nights} ` : `第${nights}晚 `}</div>
            </div>

            <div className="flex flex-col items-center justify-center h-[95%] pb-[64px]">
              {playersData[position].role === "twistedFate" && playersData[position].alive && (
                <div>
                  <select
                    value={twistedFateTarget}
                    onChange={(ev) => setTwistedFateTarget(ev.target.value)}
                    className="bg-gray-700"
                  >
                    <option className="bg-gray-700">{language ? "Select a Role" : "選擇一名角色"}</option>
                    {twistedFateDropDownList.map((role) => (
                      <option value={role.roleName} key={role.roleName} className="bg-gray-700">
                        {role.roleName}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {targetRef &&
                currAction &&
                !playersData[position].jailed &&
                playersData[position].role !== "joker" &&
                !!canShoot &&
                playersData[position].alive && (
                  <div className="text-2xl mt-4 transition-all duration-500 ease-in-out fade-in" key={target}>
                    <span>
                      {language ? (
                        <>{`You decide to ${actionRef.current}`}</>
                      ) : (
                        <>{`你選擇 ${actionsTC(actionRef.current)}`}</>
                      )}
                      <span className="font-semibold text-rose-600 ml-2">
                        {target === null ? (language ? "no one" : "______") : playersData[target].name}
                      </span>
                    </span>
                  </div>
                )}

              {playersData[position].role === "joker" &&
                playersData[position].votedOut === true &&
                !playersData[position].alive && (
                  <div className="text-2xl mt-4 transition-all duration-500 ease-in-out fade-in" key={target}>
                    {language
                      ? `You decide to ${actionRef.current} ${target === null ? "no one" : playersData[target].name}`
                      : `你選擇${actionsTC(actionRef.current)} ${
                          target === null ? "______" : playersData[target].name
                        }`}
                  </div>
                )}

              {playersData[position].jailed && playersData[position].alive && (
                <div className="text-2xl mt-4 transition-all duration-500 ease-in-out fade-in" key="jailed">
                  {language ? "You have been jailed" : "你今晚已被人囚禁"}
                </div>
              )}

              {!canShoot && playersData[position].role === "police" && playersData[position].alive && (
                <div className="text-2xl mt-4 transition-all duration-500 ease-in-out fade-in">
                  {language
                    ? " You shot an innocent person thus lost the ability to shoot"
                    : "你因對市民開槍，所以你被沒收了槍"}
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
        <div className="w-1/4 h-full flex flex-col justify-between relative border-l-2 border-gray-400">
          <div className="h-1/2 p-5 bg-black bg-opacity-30 test after:bg-white">
            <DeadPlayerList
              setTarget={setTarget}
              playersData={playersData}
              position={position}
              day={day}
              target={target}
            />
          </div>
          <div className="h-1/2 bg-black bg-opacity-30">
            <AliveChatAndTarget
              playersData={playersData}
              position={position}
              setTarget={setTarget}
              day={day}
              cupidAbilityUsed={cupidAbilityUsed}
              canShoot={canShoot}
              initialVampire={initialVampire}
              target={target}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
