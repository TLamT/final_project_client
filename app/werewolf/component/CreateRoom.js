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

  return (
    <>
      <Link
        className="text-white font-bold py-4 px-5 rounded hover:scale-110 transition duration-300 flex flex-row justify-center w-full"
        href={{ pathname: `/werewolf/${roomId}`, query: { roomId: roomId } }}
      >
        <Plus className="mr-3 h-6 w-6 mt-[5px]" />
        {language ? "Create Room" : "創建房間"}
      </Link>
    </>
  );
}
