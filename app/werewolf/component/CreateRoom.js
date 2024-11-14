"use client";

import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { SocketConnection } from "../layout";
import { Plus } from "lucide-react";

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
    <div className="flex justify-center">
      <Link
        onClick={handleCreateRoomSubmit}
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300 text-center mb-3 flex flex-row justify-center"
        href={{ pathname: `/werewolf/${roomId}` }}
      >
        <Plus className="mr-2 h-4 w-4 mt-1" /> Create Room
      </Link>
    </div>
  );
}
