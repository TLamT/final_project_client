"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { SocketConnection } from "../layout";
import { LogIn } from "lucide-react";

export function JoinRoom({ changeLanguage }) {
  const socket = useContext(SocketConnection);
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  const [alert, setAlert] = useState("");

  const handleJoinRoom = () => {
    if (roomId) {
      socket.emit("joinRoom", { roomId });
    }
  };

  useEffect(() => {
    socket.on("gameStarted", ({ gameJoin, roomId }) => {
      if (gameJoin) {
        router.push(`/werewolf/${roomId}`);
      }
      if (!gameJoin) {
        setAlert("game already started");
        setRoomId("");
        setTimeout(() => {
          setAlert("");
        }, 2000);
      }
    });
  }, [socket]);

  return (
    <div className="flex gap-2">
      <input
        placeholder={alert ? alert : "Enter Code"}
        className="bg-transparent border-2 border-white/20 rounded-xl p-4"
        value={roomId}
        onChange={(ev) => setRoomId(ev.target.value)}
      />
      <div variant="outline" className="border-2 rounded-xl min-w-48">
        <button
          onClick={handleJoinRoom}
          className="text-white font-bold py-4 px-8 rounded hover:scale-110 transition duration-300 flex flex-row justify-center w-full"
        >
          <LogIn className="mr-2 h-4 w-4 mt-2" />
          {changeLanguage ? "Join Room" : "加入房間"}
        </button>
      </div>
    </div>
  );
}
