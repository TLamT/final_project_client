"use client";

import { io } from "socket.io-client";
import { useEffect } from "react";
import { useStore } from "@/app/werewolf/store";

export default function RootLayout({ children }) {
  const { socket, setSocket } = useStore();

  useEffect(() => {
    const socketNow = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      path: "/ws/",
      transports: ["websocket"],
    });
    setSocket(socketNow);
  }, []);

  console.log(socket);

  return children;
}
