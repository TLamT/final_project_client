import Link from "next/link";
import Cookies from "universal-cookie";

export default function HomePage({ setAuth }) {
  const cookies = new Cookies();

  function handleLogOut() {
    cookies.remove("token");
    setAuth(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          HomePage
        </h1>
        <div className="space-y-4">
          <Link
            href="../werewolf"
            className="block w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md text-center transition duration-300 ease-in-out transform hover:scale-105"
          >
            香港風雲 (港版狼人殺)
          </Link>
          <Link
            href="../battle21"
            className="block w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md text-center transition duration-300 ease-in-out transform hover:scale-105"
          >
            BlackJack
          </Link>
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
