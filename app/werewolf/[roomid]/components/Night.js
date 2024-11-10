"use client";

import { useEffect, useState, useRef } from "react";
import characterData from "../data/character";
import NightChatRoom from "./NightChatRoom";
import AliveChatAndTarget from "./AliveChatAndTarget";
import AliveChatAndTargetFung from "./AliveChatAndTargetFung";
import fungPlayerData from "../data/fungPlayerData";
import DeadPlayerList from "./DeadPlayerList";
import WholeDayChatRoom from "./WholeDayChatRoom";

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
  cupidAbilityUsed,
  deadPlayerMessageSent,
  setDayTimeChat,
}) {
  const [timer, setTimer] = useState(1);
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState(null);
  const [currAction, setCurrAction] = useState(null);
  const [twistedFateTarget, setTwistedFateTarget] = useState(null);
  const [twistedFateFail, setTwistedFateFail] = useState(false);

  const targetRef = useRef(target);
  const actionRef = useRef(currAction);
  const twistedFateTargetRef = useRef(twistedFateTarget);
  const twistedFateDropDownList = fungPlayerData.filter(
    (role) => role.faction !== "witch" && role.roleName !== "detective"
  );

  useEffect(() => {
    targetRef.current = target;
    actionRef.current = currAction; // Update ref whenever state changes
    twistedFateTargetRef.current = twistedFateTarget;
  }, [target, currAction, twistedFateTarget]);

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
  };

  const randomInterval = 600 + Math.floor(Math.random() * 300);

  useEffect(() => {
    setCurrAction(actions[role]);

    const action = setInterval(() => {
      socket.emit("nightAction", {
        nights,
        position,
        roomId,
        target: targetRef.current,
        action: actionRef.current,
        twistedTarget: twistedFateTargetRef.current,
      });
    }, randomInterval);

    const nightTime = setInterval(() => {
      setNights((prev) => prev + 1);
      socket.emit("sendSetDay", { roomId, dayTime: true });
    }, 1000);

    const timer = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    handleMessageSent();

    socket.emit("clearVotes", roomId);
    setPlayersData((prev) => prev.map((player) => ({ ...player, vote: 0 })));

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
      if (playersData[actions.target].linked === true) {
        setPlayersData((prev) =>
          prev.map((player, index) =>
            player.linked === true ? { ...player, alive: false } : player
          )
        );
      }
      if (playersData[actions.target].linked === false) {
        setPlayersData((prev) =>
          prev.map((player, index) =>
            index === actions.target ? { ...player, alive: false } : player
          )
        );
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
    if (actions.action === "destiny") {
      if (actions.twistedTarget === playersData[actions.target].role) {
        setPlayersData((prev) =>
          prev.map((player, index) =>
            index === actions.target ? { ...player, alive: false } : player
          )
        );
      }
      if (roomLeader && !twistedFateFail) {
        setTwistedFateFail(true);
        socket.emit("dayChat", {
          name: "server",
          message: `${
            playersData[actions.owner].name
          } is twistedFate and is trying to kill ${
            playersData[actions.target].name
          }`,
          roomId: roomId,
          repeat: "no",
        });
      }
    }
  }

  function handleDeadPlayerMessageSent() {
    socket.emit("deadPlayerChat", { name, roomId, message });
    setMessage("");
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <div>{timer}</div>
      <div>Night {`${nights}`}</div>
      <div className="mainContainer flex flex-row justify-between">
        <div className="border-2 border-red-300 w-1/4">
          <div className="h-1/2">
            <DeadPlayerList playersData={playersData} position={position} />
          </div>
          <div className="h-1/2 border-2 border-red-300">
            <div className="flex flex-col justify-between items-center h-full w-full">
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
                  playersData={playersData}
                  position={position}
                />
              )}
              {!playersData[position].alive && (
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
        </div>
        <div className="border-2 border-red-300 w-1/2">
          {playersData[position].role === "twistedFate" && (
            <div>
              <select
                value={twistedFateTarget}
                onChange={(ev) => setTwistedFateTarget(ev.target.value)}
              >
                {twistedFateDropDownList.map((role) => (
                  <option value={role.roleName}>{role.roleName}</option>
                ))}
              </select>
            </div>
          )}
          {targetRef && currAction && !playersData[position].jailed && (
            <div>{`you decide to ${actionRef.current} ${
              target === null ? "no one" : playersData[target].name
            }`}</div>
          )}
          {playersData[position].jailed && <div>you have been jailed</div>}
        </div>
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}
