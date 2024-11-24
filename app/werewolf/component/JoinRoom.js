"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { LogIn } from "lucide-react";
import { useSocket } from "@/app/werewolf/useSocket";
import { useStore } from "@/app/werewolf/store";
import Link from "next/link";

export function JoinRoom() {
  const { socket, language } = useStore();
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  const [alert, setAlert] = useState("");

  // const handleJoinRoom = () => {
  //   if (roomId) {
  //     socket.emit("joinRoom", { roomId });
  //   }
  // };

  // useSocket(() => {
  //   socket.on("gameStarted", ({ gameJoin, roomId }) => {
  //     if (gameJoin) {
  //       router.push(`/werewolf/${roomId}`);
  //     }
  //     if (!gameJoin) {
  //       setAlert(language ? "game already started" : "遊戲已開始");
  //       setRoomId("");
  //       setTimeout(() => {
  //         setAlert("");
  //       }, 2000);
  //     }
  //   });
  // }, [socket]);

  return (
    <div className="flex gap-2">
      <input
        placeholder={alert ? alert : !language ? "請輸入房間號碼" : "Enter Code"}
        className="bg-transparent border-2 border-white/20 rounded-xl p-4"
        value={roomId}
        onChange={(ev) => setRoomId(ev.target.value)}
      />
      <div variant="outline" className="border-2 rounded-xl min-w-48">
        <Link
          // onClick={handleJoinRoom}
          className="text-white font-bold py-4 px-8 rounded hover:scale-110 transition duration-300 flex flex-row justify-center w-full"
          href={{ pathname: `/werewolf/${roomId}`, query: { roomId: roomId } }}
        >
          <LogIn className="mr-4 h-6 w-6 mt-[5px]" />
          {language ? "Join Room" : "加入房間"}
        </Link>
      </div>
    </div>
  );
}
