import fungPlayerData from "../data/fungPlayerData";
import clsx from "clsx";
import { useContext } from "react";
import { useStore } from "@/app/werewolf/store";
const DeadPlayerList = ({ playersData, position, day, setTarget, target }) => {
  const { language, changeLanguage } = useStore();
  //查找自身身份
  let myPlayer = fungPlayerData.find((player) => player.roleName === playersData[position].role);
  myPlayer = { ...myPlayer, ...playersData[position] };
  // 追憶者能選的目標
  let targetPlayer = playersData.map((player) => {
    let canTarget = false;

    if (myPlayer.role === "reminiscence") {
      canTarget = playersData.filter((player) => !player.alive);
      return { canTarget, ...player };
    }
    return player;
  });

  const handlePlayerClick = (index) => {
    if (target === index) {
      setTarget(null);
    } else {
      setTarget(index);
    }
  };
  return (
    <div className={clsx("rounded-lg p-2 w-full h-full overflow-y-scroll")}>
      <div className="font-bold text-2xl text-center mb-4">{language ? "🪦Dead🪦" : "🪦死亡名單🪦"}</div>
      <div>
        {targetPlayer.map((player, index) => {
          return (
            !player.alive && (
              <div
                key={index}
                className={clsx(
                  "flex flex-row items-center text-white px-4 py-2",
                  day && index % 2 === 1 ? "bg-black bg-opacity-30" : "bg-black bg-opacity-35"
                )}
              >
                <div className="mr-4 text-lg">
                  <span className="mr-4">{index + 1}</span>
                  <span>{player.name}</span>
                </div>
                <div>
                  {playersData[position].role === "reminiscence" && !day && playersData[position].alive && (
                    <button
                      onClick={() => handlePlayerClick(index)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded transition duration-150 ease-in-out"
                    >
                      {language ? "target" : "目標"}
                    </button>
                  )}
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default DeadPlayerList;
