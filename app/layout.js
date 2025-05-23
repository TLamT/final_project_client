"use client";

import localFont from "next/font/local";
import { useEffect } from "react";
import { K2D } from "next/font/google";
import { Edu_AU_VIC_WA_NT_Hand } from "next/font/google";
import { Cinzel } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import { io } from "socket.io-client";
import { useStore } from "./werewolf/store";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const k2d = K2D({
  subsets: ["latin"],
  weight: "300",
  variable: "--font-k2d",
});
const eduFont = Edu_AU_VIC_WA_NT_Hand({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-eduFont",
});
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-cinzel",
});
const cormorant_Garamond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-cormorant_Garamond",
});

export default function RootLayout({ children }) {
  const { socket, setSocket } = useStore();

  useEffect(() => {
    const socketNow = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      path: "/ws/",
      transports: ["websocket"],
    });
    setSocket(socketNow);
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${k2d.variable} ${eduFont.variable} ${cinzel.variable} ${cormorant_Garamond.variable}antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
