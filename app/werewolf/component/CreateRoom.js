"use client";

import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { SocketConnection } from "../layout";

// Create a Room function
export function CreateRoom() {
  const socket = useContext(SocketConnection);
  const [playerCount, setPlayerCount] = useState(6);
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    const roomId = String(require("crypto").randomBytes(4).toString("hex"));
    setRoomId(roomId);
  }, []);

  // Set a limit of player
  // const handlePlayerCountChange = (event) => {
  //   setPlayerCount(parseInt(event.target.value));
  // };

  const handleCreateRoomSubmit = () => {
    socket.emit("joinRoom", { roomId });
  };

  return (
    <p className="flex">
      {/* <select
        className="w-48 shadow-lg flex-2"
        id="playerCount"
        value={playerCount}
        onChange={handlePlayerCountChange} // Fixed syntax here
      >
        {[...Array(7).keys()].map((i) => (
          <option key={i + 6} value={i + 6}>
            {i + 6} Players
          </option>
        ))}
      </select> */}

      {/* <a href={`/werewolf/${createRoom}`} onClick={handleCreateRoomSubmit}>
        創建房間
      </a> */}
      <Link
        onClick={handleCreateRoomSubmit}
        className="flex-1 hover:bg-sky-700"
        href={{ pathname: `/werewolf/${roomId}`, query: { c: playerCount } }}
      >
        創建房間
      </Link>
    </p>
  );
}
