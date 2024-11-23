import characterData from "../data/character";
import { useStore } from "@/app/werewolf/store";
import Link from "next/link";
import { Globe2 } from "lucide-react";

const GameEnd = ({ gameEndMessage, playersData }) => {
  const { language, changeLanguage } = useStore();
  // 找出玩家既陣營同角色
  const townArr = [...Object.keys(characterData.town)];
  const witchArr = [...Object.keys(characterData.witch)];
  const currTown = playersData.filter((player) => townArr.includes(player.role) && player.alive === true);
  const currWitch = playersData.filter((player) => witchArr.includes(player.role) && player.alive === true);
  const currVampire = playersData.filter((player) => player.role === "vampire");
  const checkConspirator = playersData.find((player) => player.role === "conspirator");
  const checkJoker = playersData.find((player) => player.role === "joker");
  const roleNameTC = (role) => {
    switch (role) {
      case "reaper":
        return "金牌打手";
      case "conspirator":
        return "謀略家";
      case "cupid":
        return "如花";
      case "defender":
        return "金槍人";
      case "jailor":
        return "獄卒";
      case "joker":
        return "小丑";
      case "medium":
        return "龍婆";
      case "police":
        return "警察";
      case "scammer":
        return "欺詐師";
      case "vampireHunter":
        return "茅山道士";
      case "detective":
        return "偵探";
      case "cultist":
        return "二五仔";
      case "sentinel":
        return "哨兵";
      case "twistedFate":
        return "賭徒";
      case "vampire":
        return "彊屍";
      case "reminiscence":
        return "白痴";
      case "default":
        return;
    }
  };
  const checkFaction = (faction) => {
    switch (faction) {
      case "town win":
        return (
          <div>
            <div>
              <div className="flex justify-center">
                {language ? gameEndMessage[0].toUpperCase() : "蘑茹市民陣營勝利"}
              </div>
              {currTown.map((player, index) => {
                return (
                  <div key={index} className="mt-1">
                    <span className="mr-2 mt-4">
                      <strong>{player.name}</strong>
                    </span>
                    : <span className="ml-2"> {language ? player.role : roleNameTC(player.role)}</span>
                  </div>
                );
              })}
            </div>
            <div>
              <div className="flex justify-center mt-5">{language ? "LOSER" : "輸家"}</div>
              {playersData
                .filter((player) => !currTown.map((role) => role.name).includes(player.name))
                .map((player, index) => (
                  <div key={index} className="mt-1">
                    <span>{player.name}</span>:<span>{language ? player.role : roleNameTC(player.role)}</span>
                  </div>
                ))}
            </div>
          </div>
        );
      case "witch win":
        return (
          <div>
            <div>
              <div className="flex justify-center">{language ? gameEndMessage[0].toUpperCase() : "古惑仔陣營勝利"}</div>
              {currWitch.map((player, index) => {
                return (
                  <div key={index} className="mt-1">
                    <span className="mr-2">
                      <strong>{player.name}</strong>
                    </span>
                    : <span className="ml-2"> {language ? player.role : roleNameTC(player.role)}</span>
                  </div>
                );
              })}
            </div>
            <div>
              <div className="flex justify-center mt-5">{language ? "LOSER" : "輸家"}</div>
              {playersData
                .filter((player) => !currWitch.map((role) => role.name).includes(player.name))
                .map((player, index) => (
                  <div key={index} className="mt-1">
                    <span className="mr-2">{player.name}</span>:
                    <span className="ml-2">{language ? player.role : roleNameTC(player.role)}</span>
                  </div>
                ))}
            </div>
          </div>
        );
      case "vampire win":
        return (
          <div>
            <div>
              <div className="flex justify-center">{language ? gameEndMessage[0].toUpperCase() : "彊屍陣營勝利"}</div>
              <div className="mt-1">
                {currVampire.map((player, index) => {
                  return (
                    <div key={index}>
                      <span className="mr-2">
                        <strong>{player.name}</strong>
                      </span>
                      : <span className="ml-2"> {language ? player.role : roleNameTC(player.role)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <div>
                <div className="flex justify-center mt-5">{language ? "LOSER" : "輸家"}</div>
                {playersData
                  .filter((player) => !currVampire.map((role) => role.name).includes(player.name))
                  .map((player, index) => (
                    <div key={index}>
                      <span className="mr-2">{player.name}</span>:
                      <span className="ml-2">{language ? player.role : roleNameTC(player.role)}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        );
      case "draw":
        return (
          <div>
            <div>{language ? gameEndMessage[0].toUpperCase() : "平手"}</div>
            {playersData.map((player, index) => {
              return (
                <div key={index} className="flex mt-1">
                  <span className="mr-2">{player.name}</span>:
                  <span className="ml-2">{language ? player.role : roleNameTC(player.role)}</span>
                </div>
              );
            })}
          </div>
        );
      case `${checkJoker.name} has won as joker`:
        return (
          <div>
            <div className="flex justify-center">{language ? "Joker Win" : "小丑勝利"}</div>
            <div>
              {language ? `${checkJoker.name} is a Joker.` : `${checkJoker.name}係小丑`}
              <br />
              {language
                ? `${checkJoker.name}: “Is that the best you can do? Losing suits you perfectly—like it was made just for you.” 😏`
                : `${checkJoker.name}: 在座各位都係垃圾 😏`}
            </div>
            <div className="mt-4">{language ? "LOSER" : "輸家"}</div>
            {playersData
              .filter((player) => player.role !== "joker")
              .map((player, index) => {
                return (
                  <div key={index} className="mt-1">
                    <span className="mr-2">{player.name}</span>:
                    <span className="ml-2">{language ? player.role : roleNameTC(player.role)}</span>
                  </div>
                );
              })}
          </div>
        );
      case `${checkConspirator.name} has achieved their goal and wins!`:
        return (
          <div>
            <div className="flex justify-center">{language ? "Conspirator Win" : "謀略家勝利"}</div>
            <div>
              {language ? `${checkConspirator.name} is a Conspirator.` : `${checkConspirator.name}係謀略家。`}
              <br />
              {language
                ? `${checkConspirator.name}: “Pathetic. You’re all just pieces on my board, and I’ve already won before you even realized you were playing.” 😏`
                : `${checkConspirator.name}: 「天幕就係我，我就係天幕」😏`}
            </div>
            <div className="mt-4">{language ? "LOSER" : "輸家"}</div>
            {playersData
              .filter((player) => player.role !== "conspirator")
              .map((player, index) => {
                return (
                  <div key={index} className="mt-1">
                    <span className="mr-2">{player.name}</span>:
                    <span className="ml-2">{language ? player.role : roleNameTC(player.role)}</span>
                  </div>
                );
              })}
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-center items-center border-2 border-gray-800 w-[350px] z-50">
        {checkFaction(...gameEndMessage)}
      </div>
      <Link
        href="../werewolf"
        className="block w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md text-center transition duration-300 ease-in-out transform hover:scale-105"
      >
        {language ? "Exit" : "回到大廳"}
      </Link>
      <div
        className="flex flex-row justify-center items-center cursor-pointer text-black z-50"
        onClick={changeLanguage}
      >
        {language ? "中文" : "English"}
        <div variant="outline" className="rounded-full w-12 h-12 p-0 ml-2 flex items-center">
          <Globe2 className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
export default GameEnd;
