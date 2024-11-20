"use client";

import { io } from "socket.io-client";
import { createContext, useState } from "react";

export const SocketConnection = createContext();
export const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [changeLanguage, setChangeLanguage] = useState(true);

  const handleOnLanguageChange = () => {
    setChangeLanguage((prevState) => !prevState);
  };
  return (
    <LanguageContext.Provider
      value={{ changeLanguage, handleOnLanguageChange }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
export default function RootLayout({ children }) {
  const socket = io.connect(process.env.NEXT_PUBLIC_SOCKET_URL, {
    path: "/ws/",
    transports: ["websocket"],
  });

  return (
    <SocketConnection.Provider value={socket}>
      <LanguageProvider>
        <html lang="en">
          <body>{children}</body>
        </html>
      </LanguageProvider>
    </SocketConnection.Provider>
  );
}
