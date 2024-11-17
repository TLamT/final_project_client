"use client";

import Cookies from "universal-cookie";
import { useState, useEffect } from "react";
import Shuffle from "./Shuffle";

const cookies = new Cookies();

export default function Page() {
  //   const [playerName, setPlayerName] = useState("");

  //   useEffect(() => {
  //     const name = cookies.get("userName");
  //     if (name) {
  //       setPlayerName(name);
  //     }
  //   }, []);

  return (
    // <div className="flex flex-col items-center m-6">
    //   <div>Current Name: {playerName}</div>
    //   <input
    //     value={playerName}
    //     onChange={(ev) => {
    //       setPlayerName(ev.target.value);
    //       cookies.set("userName", ev.target.value);
    //     }}
    //   ></input>
    //   <div className="decoration-neutral-900">
    //     <a href="./" className="">
    //       返回
    //     </a>
    //   </div>
    // </div>
    <Shuffle />
  );
}
