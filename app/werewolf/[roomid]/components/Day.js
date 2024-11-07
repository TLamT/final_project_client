"use client";

import { useEffect, useState } from "react";

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
  players,
  playersData,
  setPlayers,
  days,
  setDays,
  detectiveAbilityInfo,
}) {
  const [timer, setTimer] = useState(5);
  const [message, setMessage] = useState("");
  const [isMediumViewingDayChat, setIsMediumViewingDayChat] = useState(true);

  useEffect(() => {
    const dayTime = setInterval(() => {
      setDays((prev) => prev + 1);
      if (roomLeader) socket.emit("sendSetDay", { roomId, dayTime: false });
    }, 5000);

    const timer = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    socket.emit("resetNightAction", { roomId });

    handleMessageSent();
    handleDeadPlayerSent();

    return () => {
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
    socket.on("allDeadPlayerChat", ({ data }) => {
      setDeadPlayerChat(data);
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
  function handleDeadPlayerSent() {
    if (role !== "medium") {
      socket.emit("deadPlayerChat", {
        name: name,
        message: message,
        roomId: roomId,
      });
      setMessage;
    }
  }
  const uniquedetectiveAbilityInfo = detectiveAbilityInfo.reduce(
    (acc, current) => {
      const x = acc.find((item) => item.id === current.id);
      if (!x) {
        acc.push(current);
      }
      return acc;
    },
    []
  );

  console.log(uniquedetectiveAbilityInfo);
  const isAlive = playersData.find((player) => player.name === name)?.alive;
  return (
    <div className="text-center mt-4">
      <div>{timer}</div>
      <div>DAY {`${days}`}</div>
      <div className="bg-gray-600 text-lg mt-4 mb-4">{role}</div>
      {role === "medium" && (
        <button
          onClick={() => setIsMediumViewingDayChat(!isMediumViewingDayChat)}
          className="toggle-chat-btn"
        >
          SWITCH {isMediumViewingDayChat ? "Dead Player Chat" : "Day Chat"}
        </button>
      )}
      {isAlive || (role === "medium" && isMediumViewingDayChat) ? (
        <div className="mt-10">
          <input
            value={message}
            onChange={(ev) => setMessage(ev.target.value)}
            className="border-2 border-cyan-300"
          />
          <div
            onClick={() => {
              isMediumViewingDayChat
                ? handleMessageSent()
                : handleDeadPlayerSent();
            }}
            className="cursor-pointer"
          >
            Send
          </div>
        </div>
      ) : (
        <div className="mt-10">You cannot send messages here.</div>
      )}
      {(playersData.find((player) => player.name === name && !player.alive) ||
        role === "medium") && (
        <div className="dead-player-chat">
          <h3>Dead Player Chat</h3>
          <div>
            {deadPlayerChat.map((msg, index) => (
              <div key={index}>Anonymous: {msg.message}</div>
            ))}
          </div>
        </div>
      )}

      {/* <div className="mt-10">
        <input
          value={message}
          onChange={(ev) => {
            setMessage(ev.target.value);
          }}
          className="border-2 border-cyan-300"
        ></input>
        <div
          onClick={() => {
            handleMessageSent();
            handleDeadPlayerSent();
          }}
          className="cursor-pointer"
        >
          Send
        </div>
      </div>
      <div className="mt-4">
        {dayTimeChat.map((allDayMessage, index) => {
          return (
            <div key={index}>
              {allDayMessage.name}:{allDayMessage.message}
            </div>
          );
        })}
      </div> */}

      <div>
        {role === "detective" &&
          uniquedetectiveAbilityInfo.map((players) => {
            return <div>{`${players.name} is ${players.role}`}</div>;
          })}
      </div>
    </div>
  );
}
