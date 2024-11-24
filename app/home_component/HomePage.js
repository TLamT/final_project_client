import Link from "next/link";
import Cookies from "universal-cookie";
import homePageBg from "@/public/image/homePageBg.jpg";
import Image from "next/image";
import { useSocket } from "../werewolf/useSocket";
import { useStore } from "@/app/werewolf/store";
import { LogOutIcon } from "lucide-react";

export default function HomePage({ setAuth }) {
  const { socket } = useStore();

  const cookies = new Cookies();

  function handleLogOut() {
    cookies.remove("token");
    setAuth(false);
  }

  useSocket(() => {
    socket.emit("testDeploy", "why not work");
  }, []);

  useSocket(() => {
    socket.on("testBack", (data) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <div className="h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <Image src={homePageBg} width={0} height={0} sizes="100vw" className="opacity-40" alt="kowloon" />
      </div>
      <div className="flex flex-col borderTest bg-opacity-70 w-1/4 bg-slate-200 shadow-lg rounded-3xl h-1/3 justify-evenly p-4 mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold font-style: italic text-gray-800 text-center relative" id="title">
          Welcome
        </h1>
        <div className="space-y-4 flex flex-col justify-center items-center">
          <Link
            href="../werewolf"
            // className="block w-full py-3 px-4 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-md text-center transition duration-300 ease-in-out transform hover:scale-105"
            className="flex-1 border-2 py-2 rounded-lg border-gray-700 font-semibold text-black hover:bg-blue-500 transition ease-in-out transform hover:scale-105 duration-200 relative px-4"
          >
            🔪國際大刀會 (香港版狼人殺)🔪
          </Link>
          {/* <Link
            href="../battle21"
            className="block w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md text-center transition duration-300 ease-in-out transform hover:scale-105"
          >
            BlackJack
          </Link> */}
          <button
            onClick={handleLogOut}
            className="flex flex-row border-2 py-2 rounded-lg border-gray-700 font-semibold text-black hover:bg-red-500 transition ease-in-out transform hover:scale-105 duration-200 relative px-4"
          >
            <LogOutIcon className="mr-2 size-5 mt-[2px]" />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
