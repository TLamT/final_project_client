"use client";

import { io } from "socket.io-client";
import { createContext } from "react";

export const SocketConnection = createContext();

export default function RootLayout({ children }) {
  const socket = io.connect(process.env.NEXT_PUBLIC_BACKEND_URL);

  return (
    <SocketConnection.Provider value={socket}>
      {children}
    </SocketConnection.Provider>
  );
}
