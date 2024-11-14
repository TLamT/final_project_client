"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { SocketConnection } from "../layout";
import { LogIn } from "lucide-react";

export function JoinRoom() {
  const socket = useContext(SocketConnection);
  const router = useRouter();
  const [roomId, setRoomId] = useState("");

  const handleJoinRoom = () => {
    let room = prompt("Please Enter the Room ID!");
    setRoomId(room);
  };

  useEffect(() => {
    if (roomId) {
      socket.emit("joinRoom", { roomId });
      router.push(`/werewolf/${roomId}`);
    }
  }, [roomId]);

  return (
    <div className="flex justify-center">
      <button
        onClick={handleJoinRoom}
        className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-300 flex flex-row justify-center"
      >
        <LogIn className="mr-2 h-4 w-4 mt-1" />
        Join Room
      </button>
    </div>
  );
}
