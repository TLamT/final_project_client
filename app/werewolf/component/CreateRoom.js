"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useStore } from "@/app/werewolf/store";
import { useSocket } from "../useSocket";

// Create a Room function
export function CreateRoom({ language }) {
  const { socket } = useStore();
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
    console.log(socket);
    socket.emit("joinRoom", { roomId });
  };

  return (
    <Link
      onClick={handleCreateRoomSubmit}
      className="text-white font-bold py-4 px-5 rounded hover:scale-110 transition duration-300 flex flex-row justify-center w-full"
      href={{ pathname: `/werewolf/${roomId}` }}
    >
      <Plus className="mr-2 h-4 w-4 mt-2" />
      {language ? "Create Room" : "創建房間"}
    </Link>
  );
}
