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

  const targetRef = useRef(target);
  const actionRef = useRef(currAction);

  useEffect(() => {
    targetRef.current = target;
    actionRef.current = currAction; // Update ref whenever state changes
  }, [target, currAction]);

  const actions = {
    cupid: "link with",
    jailor: "jail",
  };

  const randomInterval = 9600 + Math.floor(Math.random() * 300);

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

  return (
    <div className="text-center mt-4">
      <div>{timer}</div>
      <div>DAY {`${days}`}</div>
      <div className="bg-gray-600 text-lg mt-4 mb-4">{role}</div>
      {(targetRef && currAction && (
        <div>{`you decide to ${currAction} ${
          target === null ? "no one" : playersData[target].name
        }`}</div>
      )) || <div>---------</div>}
      {!playersData[position].alive && (
        <button
          onClick={() => setShowWhichChat((prev) => !prev)}
          className="toggle-chat-btn"
        >
          SWITCH {!showWhichChat ? "Dead Player Chat" : "Day Chat"}
        </button>
      )}
      {showWhichChat && (
        <>
          {playersData[position].alive ? (
            <div className="mt-10">
              <input
                value={message}
                onChange={(ev) => setMessage(ev.target.value)}
                className="border-2 border-cyan-300"
              />
              <div
                onClick={() => {
                  handleMessageSent();
                }}
                className="cursor-pointer"
              >
                Send
              </div>
            </div>
          ) : (
            <div className="mt-10">Day-Chat You cannot send messages here.</div>
          )}
          <div className="mt-4">
            {dayTimeChat.map((allDayMessage, index) => {
              return (
                <div key={index}>
                  {allDayMessage.name}:{allDayMessage.message}
                </div>
              );
            })}
          </div>
        </>
      )}
      {!playersData[position].alive && !showWhichChat && (
        <WholeDayChatRoom
          deadChat={deadPlayerChat}
          message={message}
          setMessage={setMessage}
          handleMessageSent={handleDeadPlayerMessageSent}
          role={role}
        />
      )}
      <AliveChatAndTarget
        playersData={playersData}
        position={position}
        setTarget={setTarget}
        day={day}
        cupidAbilityUsed={cupidAbilityUsed}
        days={days}
      />
      <DeadPlayerList playersData={playersData} position={position} />

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
    </div>
  );
}
