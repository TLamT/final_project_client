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
  setPlayerDiedLastNight,
}) {
  const [timer, setTimer] = useState(30);
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState(null);
  const [currAction, setCurrAction] = useState(null);
  const [twistedFateTarget, setTwistedFateTarget] = useState(null);
  const [twistedFateFail, setTwistedFateFail] = useState(false);
  const [fade, setFade] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const targetRef = useRef(target);
  const actionRef = useRef(currAction);
  const twistedFateTargetRef = useRef(twistedFateTarget);
  const twistedFateDropDownList = fungPlayerData.filter(
    (role) => role.faction !== "witch" && role.roleName !== "detective"
  );

  useEffect(() => {
    setTimer(10);
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
    }, 10000);

    const nightTime = setInterval(() => {
      setFadeOut(true);
      setNights((prev) => prev + 1);
      socket.emit("sendSetDay", { roomId, dayTime: true });
    }, 11000);

    const clockTimer = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

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
          prev.map((player) =>
            player.linked === true ? { ...player, alive: false } : player
          )
        );
        setPlayersData((prev) =>
          prev.map((player, index) =>
            index === actions.owner ? { ...player, votedOut: false } : player
          )
        );
        setPlayerDiedLastNight((prev) => [...prev, actions.target]);
      }
      if (playersData[actions.target].linked === false) {
        setPlayersData((prev) =>
          prev.map((player, index) =>
            index === actions.target ? { ...player, alive: false } : player
          )
        );
        setPlayersData((prev) =>
          prev.map((player, index) =>
            index === actions.owner ? { ...player, votedOut: false } : player
          )
        );
        setPlayerDiedLastNight((prev) => [...prev, actions.target]);
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
      const witch = Object.keys(characterData.witch);
      const targetRole = playersData[actions.target].role;
      if (targetRole !== "vampireHunter") {
        if (witch.includes(targetRole)) {
          setPlayersData((prev) =>
            prev.map((player, index) =>
              index === actions.target ? { ...player, alive: false } : player
            )
          );
        }
        if (!witch.includes(targetRole)) {
          setPlayersData((prev) =>
            prev.map((player, index) =>
              index === actions.target ? { ...player, role: "vampire" } : player
            )
          );
        }
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
      } else {
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
    <div
      className={`flex flex-col w-screen h-screen text-white transition-all duration-300 ease-out ${
        fadeOut ? "bg-white" : fade ? "bg-gray-700" : "bg-white"
      }`}
    >
      <div>{timer}</div>
      <div>Night {`${nights}`}</div>
      <div
        className={`mainContainer flex flex-row justify-between transition-opacity duration-300 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="border-2 border-red-300 w-1/4">
          <div className="h-1/2">
            <DeadPlayerList
              setTarget={setTarget}
              playersData={playersData}
              position={position}
              day={day}
            />
          </div>
          <div className="h-1/2 border-2 border-red-300">
            <div className="flex flex-col justify-between items-center h-full w-full">
              {Object.keys(characterData.neutral)[0] === role && (
                <NightChatRoom
                  nightTimeChat={vampireNightTimeChat}
                  message={message}
                  setMessage={setMessage}
                  handleMessageSent={handleVampireMessageSent}
                  playersData={playersData}
                  position={position}
                  role={role}
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
                  role={role}
                />
              )}
              {!playersData[position].alive && (
                <WholeDayChatRoom
                  deadChat={deadPlayerChat}
                  message={message}
                  setMessage={setMessage}
                  handleMessageSent={handleDeadPlayerMessageSent}
                  role={role}
                  playersData={playersData}
                  position={position}
                />
              )}
              {role === "medium" && playersData[position].alive && (
                <WholeDayChatRoom
                  deadChat={deadPlayerChat}
                  message={message}
                  setMessage={setMessage}
                  handleMessageSent={handleDeadPlayerMessageSent}
                  role={role}
                  playersData={playersData}
                  position={position}
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
                className="bg-gray-700"
              >
                <option className="bg-gray-700">Select a Role</option>
                {twistedFateDropDownList.map((role) => (
                  <option
                    value={role.roleName}
                    key={role.roleName}
                    className="bg-gray-700"
                  >
                    {role.roleName}
                  </option>
                ))}
              </select>
            </div>
          )}
          {targetRef &&
            currAction &&
            !playersData[position].jailed &&
            playersData[position].role !== "joker" && (
              <div>{`you decide to ${actionRef.current} ${
                target === null ? "no one" : playersData[target].name
              }`}</div>
            )}
          {playersData[position].role === "joker" &&
            playersData[position].votedOut === true && (
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
