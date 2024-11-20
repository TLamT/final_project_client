import localFont from "next/font/local";
import { K2D } from "next/font/google";
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${k2d.variable} antialiased`}>{children}</body>
    </html>
  );
}
