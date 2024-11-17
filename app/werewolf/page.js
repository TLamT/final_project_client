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
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [changeLanguage, setChangeLanguage] = useState(true);

  const handleOnChange = () => {
    setChangeLanguage((prevState) => !prevState);
  };

  useEffect(() => {
    const name = cookies.get("userName");
    if (name) {
      setPlayerName(name);
    }
  }, []);

  const handleInputChange = (ev) => {
    const value = ev.target.value.trimStart(); // Prevent leading spaces dynamically
    const regex = /^[\u4E00-\u9FFF\w\s]+$/; // Matches Chinese, letters, numbers, and spaces

    // Clear any error messages if the input is cleared
    if (value === "") {
      setPlayerName("");
      setErrorMessage("");
      return;
    }

    if (value.length > 12) {
      // Check for length exceeding 12
      setErrorMessage("Player name cannot exceed 12 characters.");
      return;
    }

    if (!regex.test(value)) {
      // Check for invalid characters
      setErrorMessage(
        "Player name can only contain letters, numbers, spaces, and Chinese characters."
      );
      return;
    }

    if (value[0] === " ") {
      // Ensure the first character is not a space
      setErrorMessage("Player name cannot start with a space.");
      return;
    }

    // All validations passed
    setPlayerName(value);
    cookies.set("userName", value);
    setErrorMessage(""); // Clear any previous error
  };

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
                <h2 className="text-2xl font-bold text-center mb-6 w-full space-y-4">
                  Lobby
                </h2>
                <CreateRoom playerName={playerName} />
                <JoinRoom />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="playerName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Player Name
                </label>
                <div className="flex flex-row">
                  <User className="text-gray-400 mt-3 mr-2" />
                  <input
                    id="playerName"
                    value={playerName}
                    onChange={handleInputChange}
                    placeholder="Enter your name (max 12 characters)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {errorMessage && (
                  <div className="mt-2 text-sm text-red-500">
                    {errorMessage}
                  </div>
                )}
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
