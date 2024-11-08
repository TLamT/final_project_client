"use client";

import { useEffect, useState, useRef } from "react";
import characterData from "../data/character";
import NightChatRoom from "./NightChatRoom";
import AliveChatAndTarget from "./AliveChatAndTarget";
import AliveChatAndTargetFung from "./AliveChatAndTargetFung";
import fungPlayerData from "../data/fungPlayerData";
import AlivePlayerList from "./AlivePlayList";
import DeadPlayerList from "./DeadPlayerList";
export default function Night({
  socket,
  day,
  setDay,
  roomLeader,
  name,
  roomId,
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
}) {
  const [timer, setTimer] = useState(10);
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState(null);
  const [currAction, setCurrAction] = useState(null);

  const targetRef = useRef(target);
  const actionRef = useRef(currAction);

  useEffect(() => {
    targetRef.current = target;
    actionRef.current = currAction; // Update ref whenever state changes
  }, [target, currAction]);

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
  };

  const randomInterval = 9600 + Math.floor(Math.random() * 300);

  useEffect(() => {
    setCurrAction(actions[role]);

    const action = setInterval(() => {
      socket.emit("nightAction", {
        nights,
        position,
        roomId,
        target: targetRef.current,
        action: actionRef.current,
      });
    }, randomInterval);

    const nightTime = setInterval(() => {
      setNights((prev) => prev + 1);
      socket.emit("sendSetDay", { roomId, dayTime: true });
    }, 10000);

    const timer = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    handleMessageSent();

    return () => {
      clearInterval(action);
      clearInterval(nightTime);
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    socket.on("allNightChat", (data) => {
      setNightTimeChat(data);
    });
    socket.on("sendAllSetDay", ({ dayTime }) => {
      setDay(dayTime);
    });
    socket.on("allVampireNightChat", (data) => {
      setVampireNightTimeChat(data);
    });
    socket.on("allDeadPlayerChat", ({ data }) => {
      setDeadPlayerChat(data);
    });
    socket.on("allNightAction", (nightTimeAction) => {
      nightTimeAction.forEach((actions) => {
        handleNightAction(actions, nightTimeAction);
      });
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
  function handleDeadPlayerMessageSent() {
    socket.emit("deadPlayerChat", { name, roomId, message });
    setMessage("");
  }

  function handleNightAction(actions, nightTimeAction) {
    if (actions.action === "kill") {
      setPlayersData((prev) =>
        prev.map((player, index) =>
          index === actions.target ? { ...player, alive: false } : player
        )
      );
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
        alert("you successfully protected someone");
      }
      setPlayersData((prev) =>
        prev.map((player, index) =>
          index === actions.target ? { ...player, alive: true } : player
        )
      );
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
        prev.map((player, index) =>
          index === actions.owner ? { ...player, role: targetRole } : player
        )
      );
    }
    if (actions.action === "convert") {
      const targetRole = playersData[actions.target].role;
      if (targetRole !== "vampireHunter") {
        setPlayersData((prev) =>
          prev.map((player, index) =>
            index === actions.target ? { ...player, role: "vampire" } : player
          )
        );
      }
      if (targetRole === "vampireHunter") {
        setPlayersData((prev) =>
          prev.map((player, index) =>
            index === actions.owner ? { ...player, alive: false } : player
          )
        );
      }
    }
    if (actions.action === "vampireKill") {
      const targetRole = playersData[actions.target].role;
      if (targetRole === "vampire") {
        setPlayersData((prev) =>
          prev.map((player, index) =>
            index === actions.target ? { ...player, alive: false } : player
          )
        );
      }
    }
  }

  return (
    <div className="text-center mt-4 h-full">
      <div>{timer}</div>
      <div>Night {`${nights}`}</div>
      <div className="bg-gray-600 text-lg mt-4 mb-4">{role}</div>
      {targetRef && currAction && (
        <div>{`you decide to ${actionRef.current} ${target}`}</div>
      )}
      <div>---</div>
      <br />
      {Object.keys(characterData.neutral)[0] === role && (
        <NightChatRoom
          nightTimeChat={vampireNightTimeChat}
          message={message}
          setMessage={setMessage}
          handleMessageSent={handleVampireMessageSent}
        />
      )}
      {Object.keys(characterData.witch).includes(role) && (
        <NightChatRoom
          nightTimeChat={nightTimeChat}
          message={message}
          setMessage={setMessage}
          handleMessageSent={handleMessageSent}
        />
      )}
      {playersData[position].alive === false ||
        (playersData[position].role === "medium" && (
          <NightChatRoom
            deadPlayerChat={deadPlayerChat}
            message={message}
            setMessage={setMessage}
            handleMessageSent={handleDeadPlayerMessageSent}
            role={role}
          />
        ))}
      {/* <AliveChatAndTarget
        playersData={playersData}
        position={position}
        setTarget={setTarget}
      /> */}
      <AlivePlayerList
        playersData={playersData}
        position={position}
        setTarget={setTarget}
        day={day}
      />
      <DeadPlayerList playersData={playersData} position={position} />
      {/* <AliveChatAndTargetFung
        playersData={playersData}
        position={position}
        setTarget={setTarget}
      /> */}
    </div>
  );
}
