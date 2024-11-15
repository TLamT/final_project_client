"use client";

import { useState } from "react";
import SignUp from "./SignUp";
import Cookies from "universal-cookie";

function Login({ setAuth }) {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [currPassword, setCurrPassword] = useState("");
  const [comment, setComment] = useState("");

  const cookies = new Cookies();

  async function signin() {
    const db = await fetch(process.env.BACKEND_URL, {
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
    <div className="flex flex-col items-center m-5">
      <div className="text-3xl m-2">Login</div>
      <input
        className="border-2 border-black rounded-lg p-1 m-1"
        type="text"
        value={email}
        placeholder="please enter your email"
        onChange={(ev) => {
          setEmail(ev.target.value);
        }}
      />
      <input
        className="border-2 border-black rounded-lg	p-1 m-1"
        type="password"
        value={currPassword}
        placeholder="please enter password"
        onChange={(ev) => {
          setCurrPassword(ev.target.value);
        }}
      />
      <div className="flex flex-row m-3 items-center">
        <div
          className="border-2 cursor-pointer m-1 p-1 rounded-lg"
          onClick={signin}
        >
          login
        </div>
        <div
          className="border-2 cursor-pointer m-1 p-1 rounded-lg"
          onClick={() => {
            setLogin(false);
            setComment("");
          }}
        >
          to register
        </div>
      </div>
      {comment}
    </div>
  ) : (
    <SignUp setLogin={setLogin} />
  );
}

export default Login;
