"use client";

import { useEffect, useState } from "react";
import { CreateRoom } from "./component/CreateRoom";
import { JoinRoom } from "./component/JoinRoom";
import Cookies from "universal-cookie";
import Rule from "./component/Rule";
const cookies = new Cookies();

export default function Page() {
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    const name = cookies.get("userName");
    if (name) {
      setPlayerName(name);
    }
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center m-6 border border-black">
        <CreateRoom playerName={playerName} />
        <JoinRoom />
        <div className="hover:bg-blue-500 opacity-80">
          Current Name: <span className="">{playerName}</span>
        </div>
        <input
          className="border border-black"
          value={playerName}
          onChange={(ev) => {
            setPlayerName(ev.target.value);
            cookies.set("userName", ev.target.value);
          }}
        ></input>
        <div className="decoration-neutral-900">
          <a href="./" className="hover:bg-red-400">
            返回
          </a>
        </div>
      </div>
      <Rule />
    </div>
  );
}
