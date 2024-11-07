import Link from "next/link";
import Cookies from "universal-cookie";

export default function HomePage({ setAuth }) {
  const cookies = new Cookies();

  function handleLogOut() {
    cookies.remove("token");
    setAuth(false);
  }

  return (
    <>
      <div className="flex flex-col items-center p-4 border-t border-gray-200">
        <Link href="../werewolf" className="">
          狼人殺
        </Link>
        <button onClick={handleLogOut}>LogOut</button>
      </div>
    </>
  );
}
