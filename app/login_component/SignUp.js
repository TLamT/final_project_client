"use client";

import { useState } from "react";

function SignUp({ setLogin }) {
  const [user, setUser] = useState(null);
  const [comment, setComment] = useState("");

  async function signUp() {
    const db = await fetch(`http://localhost:3001/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user?.username,
        email: user?.email,
        password: user?.password,
      }),
    });
    const data = await db.json();
    if (data.comment) setComment(data.comment);
    if (data.acknowledged) setLogin(true);
  }

  return (
    <div className="flex flex-col items-center m-5">
      <div className="text-3xl m-2">Register</div>
      <input
        className="border-2 border-black rounded-lg p-1 m-1"
        placeholder="please enter username"
        onChange={(ev) => {
          setUser({ ...user, username: ev.target.value });
        }}
      />
      <input
        className="border-2 border-black rounded-lg p-1 m-1"
        placeholder="please enter email"
        onChange={(ev) => {
          setUser({ ...user, email: ev.target.value });
        }}
      />
      <input
        className="border-2 border-black rounded-lg p-1 m-1"
        placeholder="please enter password"
        onChange={(ev) => {
          setUser({ ...user, password: ev.target.value });
        }}
      />
      <div className="flex flex-row m-3 items-center">
        <div
          className="border-2 cursor-pointer m-1 p-1 rounded-lg"
          onClick={signUp}
        >
          submit
        </div>
        <div
          className="border-2 cursor-pointer m-1 p-1 rounded-lg"
          onClick={() => {
            setLogin(true);
          }}
        >
          to login
        </div>
      </div>
      {comment}
    </div>
  );
}

export default SignUp;
