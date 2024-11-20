import fungPlayerData from "../data/fungPlayerData";
import clsx from "clsx";
import { useContext } from "react";
import { LanguageContext } from "../../layout";

const DeadPlayerList = ({ playersData, position, day, setTarget, target }) => {
  const { changeLanguage, handleOnLanguageChange } = useContext(LanguageContext);
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
    <div className={clsx("rounded-lg p-2 shadow-lg w-full h-full overflow-y-scroll", !day && "bg-gray-800 text-white")}>
      <div className="font-bold text-2xl text-center mb-4">{changeLanguage ? "Dead" : "死亡名單"}</div>
      <div>
        {targetPlayer.map((player, index) => {
          return (
            !player.alive && (
              <div
                key={index}
                className={clsx("flex flex-row items-center p-1 rounded border-2", !day && "border-gray-700")}
              >
                <div className="mr-4 text-lg">{`${index + 1} ${player.name} `}</div>
                <div>
                  {playersData[position].role === "reminiscence" && !day && playersData[position].alive && (
                    <button
                      onClick={() => handlePlayerClick(index)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded transition duration-150 ease-in-out"
                    >
                      {changeLanguage ? "target" : "目標"}
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
