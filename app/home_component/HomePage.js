import Link from "next/link";
import Cookies from "universal-cookie";
import homePageBg from "@/public/image/homePageBg.jpg";
import Image from "next/image";
import { useSocket } from "../werewolf/useSocket";
import { useStore } from "@/app/werewolf/store";

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
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <Image src={homePageBg} width={0} height={0} sizes="100vw" className="opacity-40" alt="kowloon" />
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="space-y-4">
          <Link
            href="../werewolf"
            className="block w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md text-center transition duration-300 ease-in-out transform hover:scale-105"
          >
            國際大刀會 (香港版狼人殺)
          </Link>
          {/* <Link
            href="../battle21"
            className="block w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md text-center transition duration-300 ease-in-out transform hover:scale-105"
          >
            BlackJack
          </Link> */}
          <button
            onClick={handleLogOut}
            className="w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
