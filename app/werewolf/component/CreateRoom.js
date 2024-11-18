"use client";

import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { SocketConnection } from "../layout";
import { Plus } from "lucide-react";

// Create a Room function
export function CreateRoom({ changeLanguage }) {
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
    <Link
      onClick={handleCreateRoomSubmit}
      className="text-white font-bold py-4 px-5 rounded hover:scale-110 transition duration-300 flex flex-row justify-center w-full"
      href={{ pathname: `/werewolf/${roomId}` }}
    >
      <Plus className="mr-2 h-4 w-4 mt-2" />
      {changeLanguage ? "Create Room" : "創建房間"}
    </Link>
  );
}
