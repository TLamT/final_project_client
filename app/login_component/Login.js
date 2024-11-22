"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import SignUp from "./SignUp";
import Cookies from "universal-cookie";
// import hongKongView from "@/public/image/hongKongView.mp4";

function Login({ setAuth }) {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [currPassword, setCurrPassword] = useState("");
  const [comment, setComment] = useState("");

  const cookies = new Cookies();
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6; // Adjust this value to set the speed (e.g., 0.5 is half speed)
    }
  }, []);

  async function signin() {
    const db = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: currPassword,
      }),
    });
    const data = await db.json();
    cookies.set("token", data.assessToken, { expires: "" });
    cookies.set("userName", data.username);
    cookies.set("id", data);
    cookies.set("email", data.email);
    if (data.comment) {
      return setComment(data.comment);
    } else {
      setComment("");
      setAuth(true);
    }
  }

  return login ? (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      {/* video */}
      <video
        className="absolute inset-0 object-cover w-full h-full z-[-1] opacity-80"
        ref={videoRef}
        autoPlay
        muted
        loop
      >
        <source src="/video/login.mp4" type="video/mp4" />
      </video>

      <div className="shadow-lg rounded-lg p-6 max-w-full z-50 border-2 borderTest h-auto w-1/4">
        <div className="text-2xl font-bold text-center mb-6">Login</div>
        <input
          className="w-full px-3 py-2 border border-white/20 rounded-md shadow-md focus:ring-2 bg-transparent transition duration-300"
          type="text"
          value={email}
          placeholder="Enter your email"
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          className="w-full px-3 py-2 border border-white/20 rounded-md shadow-md focus:ring-2 bg-transparent transition duration-300 mt-4"
          type="password"
          value={currPassword}
          placeholder="Enter your password"
          onChange={(ev) => setCurrPassword(ev.target.value)}
        />
        <div className="flex justify-between gap-4 mt-8">
          <button
            className="flex-1 border-2 py-2 rounded-lg font-semibold hover:bg-gray-200 transition duration-200"
            onClick={signin}
          >
            Login
          </button>
          <button
            className="flex-1 border-2 py-2 rounded-lg font-semibold hover:bg-gray-200 transition duration-200"
            onClick={() => {
              setLogin(false);
              setComment("");
            }}
          >
            Register
          </button>
        </div>
        {comment && <div className="mt-4 text-red-500 text-sm text-center">{comment}</div>}
      </div>
    </div>
  ) : (
    <SignUp setLogin={setLogin} />
  );
}

export default Login;
