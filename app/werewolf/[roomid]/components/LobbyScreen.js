import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "universal-cookie";
import lobbyBG from "@/public/image/lobbyBG.png";

const isSSR = typeof window === "undefined";

const LobbyScreen = ({ roomId, playersData, position, socket }) => {
  const router = useRouter();
  const cookies = new Cookies();

  const email = isSSR ? "no-email" : cookies.get("email");

  function handleGameStart() {
    socket.emit("allRoleAssign", { roomId: roomId, data: playersData });
    socket.emit("gameStart", { roomId: roomId, start: true });
  }

  function handleLogout() {
    socket.emit("logOut", { roomId: roomId, email: email });
    router.push(`/werewolf`);
  }

  return (
    // Game Content
    <div className="flex-1 p-4 h-screen w-screen">
      {/* Forest Background */}
      <div className="absolute inset-0 overflow-hidden">
        <Image src={lobbyBG} width={0} height={0} sizes="100vw" className="opacity-30" alt="kowloon" />
      </div>

      <div className="flex flex-col h-full relative z-0">
        {/* Room Title */}
        <h1 className="text-xl text-gray-800 mb-4">目前房間:{roomId}</h1>

        {/* Player Panel */}
        <div className="w-64 bg-white/30 backdrop-blur-sm rounded-lg overflow-hidden">
          Your name:{playersData[position]?.name}
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              目前玩家:
              {playersData.map((info) => (
                <div key={info.id} className="py-1">
                  {info.name}
                </div>
              ))}
            </h2>
          </div>
          <div className="p-4">{/* Player list would go here */}</div>
        </div>

        {/* Spacer to push buttons to bottom */}
        <div className="flex-grow" />

        {/* Game Controls */}
        <div className="flex justify-end gap-2">
          {playersData[position]?.id === playersData[0]?.id && (
            <button
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded"
              onClick={handleGameStart}
            >
              StartGame
            </button>
          )}
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded"
            onClick={handleLogout}
          >
            LeaveRoom
          </button>
        </div>
      </div>
    </div>
  );
};

// <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6 text-lg">
//   <div className="flex justify-between items-center mb-6">
//     <h1 className="text-2xl font-bold">{changeLanguage ? "Game Lobby" : "遊戲大廳"}</h1>
//     <button
//       onClick={handleOnChange}
//       className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//     >
//       {changeLanguage ? "中文" : "English"}
//     </button>
//   </div>
//   <div className="mb-4">
//     <span className="font-semibold">{changeLanguage ? "Room ID: " : "房間號碼: "}</span> {roomid}
//   </div>
//   <div className="mb-4">
//     <span className="font-semibold">{changeLanguage ? "Name:" : "名稱:"}:</span> {name}
//   </div>
//   <div className="mb-6">
//     <h2 className="text-lg font-semibold mb-2">{changeLanguage ? "Player: " : "玩家: "}</h2>
//     <div className="max-h-40 overflow-y-auto border rounded-md p-2">
//       {players.map((info) => (
//         <div key={info.id} className="py-1">
//           {info.name}
//         </div>
//       ))}
//     </div>
//   </div>
//   {roomLeader && (
//     <button
//       onClick={handleGameStart}
//       className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors mb-4"
//     >
//       {changeLanguage ? "Start Game" : "開始遊戲"}
//     </button>
//   )}
//   {typeof playersData === "string" && <div className="text-red-500 mb-4">{playersData}</div>}
//   <button
//     onClick={handleLogout}
//     className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors mb-6"
//   >
//     {changeLanguage ? "Leave Room" : "離開房間"}
//   </button>
//   <div>
//     <h2 className="text-xl font-bold mb-2">
//       {changeLanguage ? "Role introduction & Victory Condition" : "角色資料&勝利條件"}
//     </h2>
//     <CharacterSkill changeLanguage={changeLanguage} />
//   </div>
// </div>

export default LobbyScreen;
