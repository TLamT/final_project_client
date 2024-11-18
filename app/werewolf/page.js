"use client";
import Popup from "./[roomId]/components/Popup";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import lobbyBG from "@/public/image/lobbyBG.png";
import Image from "next/image";
import { Globe2, Users, Lock, ArrowLeft, HelpCircle, User, Info } from "lucide-react";
import { CreateRoom } from "./component/CreateRoom";
import { JoinRoom } from "./component/JoinRoom";
import Rule from "./component/Rule";
const cookies = new Cookies();

export default function Page() {
  const [playerName, setPlayerName] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [changeLanguage, setChangeLanguage] = useState(true);
  const [displayLobby, setDisplayLobby] = useState(true);
  const handleOnChange = () => {
    setDisplayLobby((prevState) => !prevState);
  };
  const handleOnLanguageChange = () => {
    setChangeLanguage((prevState) => !prevState);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
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
      setErrorMessage("Player name can only contain letters, numbers, spaces, and Chinese characters.");
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
    // <div className="flex flex-col w-screen h-screen justify-center items-center">
    //   {!displayLobby ? (
    //     <button onClick={handleOnChange}>{changeLanguage ? "遊戲大廳" : "Lobby"}</button>
    //   ) : (
    //     <button onClick={handleOnChange}>{changeLanguage ? "遊戲簡介" : "Game Introduction"}</button>
    //   )}

    //   {!displayLobby ? (
    //     <div className="w-1/2 h-1/2">
    //       <Rule changeLanguage={changeLanguage} handleOnLanguageChange={handleOnLanguageChange} />
    //     </div>
    //   ) : (
    //     <div className="w-1/3 h-1/2 p-10 bg-white rounded-lg shadow-lg">
    //       <div className="space-y-6 w-full">
    //         <div className="flex flex-col">
    //           <h2 className="text-2xl font-bold text-center mb-6 w-full space-y-4">
    //             {changeLanguage ? "Lobby" : "遊戲大廳"}
    //           </h2>
    //           <CreateRoom playerName={playerName} changeLanguage={changeLanguage} />
    //           <JoinRoom changeLanguage={changeLanguage} />
    //         </div>
    //         <div className="space-y-2">
    //           <label htmlFor="playerName" className="block text-sm font-medium text-gray-700">
    //             {changeLanguage ? "Player Name" : "玩家名字"}
    //           </label>
    //           <div className="flex flex-row">
    //             <User className="text-gray-400 mt-3 mr-2" />
    //             <input
    //               id="playerName"
    //               value={playerName}
    //               onChange={handleInputChange}
    //               placeholder="Enter your name (max 12 characters)"
    //               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    //             />
    //           </div>
    //           {errorMessage && <div className="mt-2 text-sm text-red-500">{errorMessage}</div>}
    //         </div>
    //         <a
    //           href="./"
    //           className="w-full text-center bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-300 transition duration-300 flex flex-row"
    //         >
    //           <ArrowLeft className="mr-2 h-4 w-4 mt-1" />
    //           {changeLanguage ? "Back to home" : "回到選擇遊戲頁面"}
    //         </a>

    //         <button onClick={() => setIsPopupOpen(!isPopupOpen)} className="px-4 py-2 bg-green-500 text-white rounded">
    //           {isPopupOpen ? "關閉彈出窗口" : "打開彈出窗口"}
    //         </button>
    //         <Popup isOpen={isPopupOpen} onClose={togglePopup} changeLanguage={changeLanguage} />
    //       </div>
    //     </div>
    //   )}
    // </div>
    // new component
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center">
      {/* background */}
      <div className="absolute inset-0 z-0">
        <Image src={lobbyBG} width={0} height={0} sizes="100vw" className="opacity-30" alt="kowloon" />
      </div>

      {/* Main content */}
      {displayLobby && (
        <div className="relative mx-auto mb-4 border-2 p-10 rounded-lg text-2xl">
          {/* Player name input */}
          {changeLanguage ? "Player Name:" : "你的名字:"}
          <div className="flex flex-row mb-8 mt-4">
            <User className="text-gray-400 mt-4 mr-2" />
            <input
              id="playerName"
              value={playerName}
              onChange={handleInputChange}
              placeholder="Enter your name (max 12 characters)"
              className="w-full px-3 py-2 border border-white/20 rounded-md shadow-sm focus:ring-2 bg-transparent transition duration-300"
            />
          </div>
          {/* Game modes */}
          <div className="space-y-6">
            {/* Host */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
                <Users className="w-8 h-8" />
              </div>
              <span className="text-2xl flex-grow">{changeLanguage ? "Host" : "主持人:"}</span>
              <div variant="outline" className="border-2 rounded-xl border-gray-300 min-w-48">
                <CreateRoom playerName={playerName} changeLanguage={changeLanguage} />
              </div>
            </div>

            {/* Private */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
                <Lock className="w-8 h-8" />
              </div>
              <span className="text-2xl flex-grow">{changeLanguage ? "PRIVATE" : "私人房間:"}</span>
              <div className="flex gap-2">
                <JoinRoom changeLanguage={changeLanguage} />
              </div>
            </div>
          </div>
        </div>
      )}
      {!displayLobby && (
        <div className="z-10 mx-auto mb-4 p-10 rounded-lg">
          <Rule changeLanguage={changeLanguage} handleOnLanguageChange={handleOnLanguageChange} />
        </div>
      )}
      {/* Bottom buttons */}
      <div className="fixed bottom-6 left-6">
        <a variant="ghost" className="text-white flex flex-row" href="./">
          <ArrowLeft className="w-6 h-6" />
          <span className="ml-2">{changeLanguage ? "Back to home" : "回到選擇遊戲頁面"}</span>
        </a>
      </div>
      <div className="fixed bottom-6 right-6 flex gap-4">
        {/* language */}
        <div
          className="flex flex-row justify-center items-center cursor-pointer"
          onClick={() => setChangeLanguage((prev) => !prev)}
        >
          {changeLanguage ? "中文" : "English"}
          <div variant="outline" className="rounded-full w-12 h-12 p-0 ml-2 flex items-center">
            <Globe2 className="w-6 h-6" />
          </div>
        </div>
        {/* game intro */}
        <div
          className="flex flex-row justify-center items-center cursor-pointer"
          onClick={() => handleOnChange((prev) => !prev)}
        >
          {displayLobby ? (changeLanguage ? "Game Introduction" : "遊戲簡介") : changeLanguage ? "Lobby" : "遊戲大廳"}
          <div variant="outline" className="rounded-full w-12 h-12 p-0 ml-2 flex items-center">
            <Info className="w-6 h-6" />
          </div>
        </div>
        {/* character info */}
        <div
          className="flex flex-row justify-center items-center cursor-pointer"
          onClick={() => setIsPopupOpen(!isPopupOpen)}
        >
          {changeLanguage ? "Character Info" : "角色說明"}
          <div variant="outline" className="rounded-full w-12 h-12 p-0 ml-2 flex items-center">
            <HelpCircle className="w-6 h-6" />
          </div>
          <Popup isOpen={isPopupOpen} onClose={togglePopup} changeLanguage={changeLanguage} />
        </div>
      </div>
    </div>
  );
}
