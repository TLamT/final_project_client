"use client";

import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { ArrowLeft, User } from "lucide-react";

import { CreateRoom } from "./component/CreateRoom";
import { JoinRoom } from "./component/JoinRoom";
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
    <div className="flex flex-row w-screen h-screen">
      <div className="w-1/2 h-full flex">
        <Rule />
      </div>
      <div className="w-1/2 md:w-1/2 h-1/2 md:h-full flex items-center p-4 md:p-8">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md">
          <div className="p-6 w-full">
            <div className="space-y-6 w-full">
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-center mb-6 w-full space-y-4">Lobby</h2>
                <CreateRoom playerName={playerName} />
                <JoinRoom />
              </div>
              <div className="space-y-2">
                <label htmlFor="playerName" className="block text-sm font-medium text-gray-700">
                  Player Name
                </label>
                <div className="flex flex-row">
                  <User className="text-gray-400 mt-3 mr-2" />
                  <input
                    id="playerName"
                    value={playerName}
                    onChange={(ev) => {
                      setPlayerName(ev.target.value);
                      cookies.set("userName", ev.target.value);
                    }}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <a
                href="./"
                className="w-full text-center bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-300 transition duration-300 flex flex-row"
              >
                <ArrowLeft className="mr-2 h-4 w-4 mt-1" /> Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
