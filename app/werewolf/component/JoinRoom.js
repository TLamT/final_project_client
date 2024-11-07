"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { SocketConnection } from "../layout";

export function JoinRoom() {
  const socket = useContext(SocketConnection);
  const router = useRouter();
  const [roomId, setRoomId] = useState("");

  const handleJoinRoom = () => {
    let room = prompt("輸入房間ID");
    setRoomId(room);
  };

  useEffect(() => {
    if (roomId) {
      socket.emit("joinRoom", { roomId });
      router.push(`/werewolf/${roomId}`);
    }
  }, [roomId]);

  return (
    <>
      <button onClick={handleJoinRoom}>加入房間</button>
    </>
  );
}
