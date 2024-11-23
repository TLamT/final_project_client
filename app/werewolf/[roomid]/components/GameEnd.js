import characterData from "../data/character";
import Image from "next/image";
import { useStore } from "@/app/werewolf/store";
import Link from "next/link";
import { Globe2 } from "lucide-react";
import conspiratorWin from "@/public/winningBg/conspiratorWin.jpg";
import draw from "@/public/winningBg/draw.jpg";
import witchWin from "@/public/winningBg/witchWin.jpg";
import vampireWin from "@/public/winningBg/vampire.jpg";
import mcDonald from "@/public/gif/mcDonald.gif";
import townWin from "@/public/gif/winning.gif";

const GameEnd = ({ gameEndMessage, playersData }) => {
  const { language, changeLanguage } = useStore();

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
  gameEndMessage = [...new Set(gameEndMessage)];
  const gameFilterEndMessage = gameEndMessage.filter(
    (condition) =>
      condition === "town win" || condition === "witch win" || condition === "vampire win" || condition === "draw"
  );

  // 找出玩家既陣營同角色
  const townArr = [...Object.keys(characterData.town)];
  const witchArr = [...Object.keys(characterData.witch)];
  const currTown = playersData.filter((player) => townArr.includes(player.role) && player.alive === true);
  const currWitch = playersData.filter((player) => witchArr.includes(player.role) && player.alive === true);
  const currVampire = playersData.filter((player) => player.role === "vampire");
  const checkConspirator = playersData.find((player) => player.role === "conspirator");
  const checkJoker = playersData.find((player) => player.role === "joker");
  // 設定
  const isJokerWin = gameEndMessage.includes(`${checkJoker?.name} is joker! Joker Win`);
  const isConspiratorWin = gameEndMessage.includes(
    `${checkConspirator?.name} is conspirator. Conspirator has achieved their goal and wins!`
  );
  const check = () => {
    if (isJokerWin && isConspiratorWin) {
      playersData.map(player);
    }
  };

  const renderPlayerRole = (player) => (
    <div key={player.name} className="mt-1 flex justify-center">
      <span className="mr-2">
        <strong>{player.name}</strong>
      </span>
      :<span className="ml-2">{language ? player.role : roleNameTC(player.role)}</span>
    </div>
  );
  const renderLosers = (filterWinner) => playersData.filter(filterWinner).map(renderPlayerRole);

  const checkFaction = (faction) => {
    switch (faction) {
      case "town win":
        return (
          <div className="bg-white bg-opacity-70 w-full">
            <Image
              src={townWin.src}
              alt={"townWin"}
              className="absolute inset-0 object-cover w-full h-full z-[-1]"
              width={0}
              height={0}
              sizes="100vw"
            />
            <div>
              <div className="flex justify-center">
                {language
                  ? gameEndMessage.map((condition) => condition.toUpperCase())
                  : isJokerWin && isConspiratorWin
                  ? "蘑茹市民陣營,謀略家和小丑勝利。"
                  : isJokerWin
                  ? "蘑茹市民陣營和小丑勝利。"
                  : "蘑茹市民陣營勝利。"}
              </div>

              {currTown.map((player) => {
                return <div key={player.name}>{renderPlayerRole(player)}</div>;
              })}
            </div>

            <div>
              <div className="flex justify-center mt-5">{language ? "LOSER" : "輸家"}</div>

              {isJokerWin && isConspiratorWin
                ? renderLosers(
                    (player) =>
                      player.role !== "joker" &&
                      player.role !== "conspirator" &&
                      !currTown.map((role) => role.name).includes(player.name)
                  )
                : isJokerWin && !isConspiratorWin
                ? renderLosers(
                    (player) => player.role !== "joker" && !currTown.map((role) => role.name).includes(player.name)
                  )
                : !isJokerWin && !isConspiratorWin
                ? renderLosers((player) => !currTown.map((role) => role.name).includes(player.name))
                : renderLosers(
                    (player) =>
                      player.role !== "conspirator" && !currTown.map((role) => role.name).includes(player.name)
                  )}
            </div>
          </div>
        );
      case "witch win":
        return (
          <div className="bg-white bg-opacity-70 w-full">
            <Image
              src={witchWin}
              alt={"witchWin"}
              className="absolute inset-0 object-cover w-full h-full z-[-1] opacity-80"
            />
            <div>
              <div className="flex justify-center">
                {language
                  ? gameEndMessage.map((condition) => condition.toUpperCase())
                  : isJokerWin && isConspiratorWin
                  ? "古惑仔陣營,謀略家和小丑勝利。"
                  : isJokerWin
                  ? "古惑仔陣營和小丑勝利。"
                  : "古惑仔陣營勝利。"}
              </div>

              {currWitch.map((player) => {
                return <div key={player.name}>{renderPlayerRole(player)}</div>;
              })}
            </div>

            <div>
              <div className="flex justify-center mt-5">{language ? "LOSER" : "輸家"}</div>

              {isJokerWin && isConspiratorWin
                ? renderLosers(
                    (player) =>
                      player.role !== "joker" &&
                      player.role !== "conspirator" &&
                      !currWitch.map((role) => role.name).includes(player.name)
                  )
                : isJokerWin && !isConspiratorWin
                ? renderLosers(
                    (player) => player.role !== "joker" && !currWitch.map((role) => role.name).includes(player.name)
                  )
                : !isJokerWin && !isConspiratorWin
                ? renderLosers((player) => !currWitch.map((role) => role.name).includes(player.name))
                : renderLosers(
                    (player) =>
                      player.role !== "conspirator" && !currWitch.map((role) => role.name).includes(player.name)
                  )}
            </div>
          </div>
        );
      case "vampire win":
        return (
          <div className="bg-white bg-opacity-70 w-full">
            <Image
              src={vampireWin}
              alt={"vampireWin"}
              className="absolute inset-0 object-cover w-full h-full z-[-1] opacity-80"
            />

            <div>
              <div className="flex justify-center">
                {language
                  ? gameEndMessage.map((condition) => condition.toUpperCase())
                  : isJokerWin && isConspiratorWin
                  ? "彊屍陣營,謀略家和小丑勝利。"
                  : isJokerWin
                  ? "彊屍陣營和小丑勝利。"
                  : "彊屍陣營勝利。"}
              </div>

              {currVampire.map((player) => {
                return <div key={player.name}>{renderPlayerRole(player)}</div>;
              })}
            </div>

            <div>
              <div className="flex justify-center mt-5">{language ? "LOSER" : "輸家"}</div>

              {isJokerWin && isConspiratorWin
                ? renderLosers(
                    (player) =>
                      player.role !== "joker" &&
                      player.role !== "conspirator" &&
                      !currVampire.map((role) => role.name).includes(player.name)
                  )
                : isJokerWin && !isConspiratorWin
                ? renderLosers(
                    (player) => player.role !== "joker" && !currVampire.map((role) => role.name).includes(player.name)
                  )
                : !isJokerWin && !isConspiratorWin
                ? renderLosers((player) => !currVampire.map((role) => role.name).includes(player.name))
                : renderLosers(
                    (player) =>
                      player.role !== "conspirator" && !currVampire.map((role) => role.name).includes(player.name)
                  )}
            </div>
          </div>
        );
      case "draw":
        return (
          <div className="bg-white bg-opacity-70 w-full">
            {isJokerWin && !isConspiratorWin && (
              <div className="bg-white bg-opacity-70 w-full">
                <Image
                  src={mcDonald}
                  alt={"mcDonald"}
                  className="absolute inset-0 object-cover w-full h-full z-[-1] opacity-80"
                  width={0}
                  height={0}
                  sizes="100vw"
                />

                <div className="flex justify-center">{language ? "Joker Win" : "小丑勝利"}</div>

                <div>
                  {language ? `${checkJoker.name} is a Joker.` : `${checkJoker.name}係小丑`}
                  <br />
                  {language
                    ? `${checkJoker.name}: “Is that the best you can do? Losing suits you perfectly—like it was made just for you.” 😏`
                    : `${checkJoker.name}: 在座各位都係垃圾 😏`}
                </div>

                <div className="flex justify-center mt-5">{language ? "LOSER" : "輸家"}</div>

                {renderLosers((player) => player.role !== "joker")}
              </div>
            )}
            {!isJokerWin && isConspiratorWin && (
              <div className="bg-white bg-opacity-70 w-full">
                <Image
                  src={conspiratorWin}
                  alt={"conspiratorWin"}
                  className="absolute inset-0 object-cover w-full h-full z-[-1] opacity-80"
                />

                <div className="flex justify-center">{language ? "Conspirator Win" : "謀略家勝利"}</div>
                <div>
                  {language ? `${checkConspirator?.name} is a Conspirator.` : `${checkConspirator.name}係謀略家。`}
                  <br />
                  {language
                    ? `${checkConspirator.name}: “Pathetic. You’re all just pieces on my board, and I’ve already won before you even realized you were playing.” 😏`
                    : `${checkConspirator.name}: 「天幕就係我，我就係天幕」😏`}
                </div>
                <div className="flex justify-center mt-5">{language ? "LOSER" : "輸家"}</div>

                {renderLosers((player) => player.role !== "conspirator")}
              </div>
            )}
            {isJokerWin && isConspiratorWin && (
              <div className="bg-white bg-opacity-70 w-full">
                <Image
                  //123
                  src={conspiratorWin}
                  alt={"conspiratorWin"}
                  className="absolute inset-0 object-cover w-full h-full z-[-1] opacity-80"
                />

                <div className="flex justify-center">{language ? "Conspirator Win" : "謀略家勝利"}</div>
                <div>
                  {language ? `${checkConspirator?.name} is a Conspirator.` : `${checkConspirator.name}係謀略家。`}
                  <br />
                  {language ? `${checkJoker.name} is a Joker.` : `${checkJoker.name}係小丑`}
                </div>
                <div className="flex justify-center mt-5">{language ? "LOSER" : "輸家"}</div>

                {renderLosers((player) => player.role !== "conspirator" && player.role !== "joker")}
              </div>
            )}
            {!isJokerWin && !isConspiratorWin && (
              <div className="bg-white bg-opacity-70 w-full">
                <Image
                  src={draw}
                  alt={"draw"}
                  className="absolute inset-0 object-cover w-full h-full z-[-1] opacity-80"
                  width={0}
                  height={0}
                  sizes="100vw"
                />

                <div className="flex justify-center">{language ? "DRAW" : "打和"}</div>
                {renderLosers((player) => player.role)}
              </div>
            )}
          </div>
        );
    }
  };
  console.log(...gameEndMessage);
  console.log(gameFilterEndMessage);

  return (
    <div className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-lg z-150">
      <div key="key" className="flex justify-center items-center border-2 border-gray-800 w-[350px] z-50">
        {checkFaction(...gameFilterEndMessage)}
      </div>
      <Link
        href="../werewolf"
        className="block w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md text-center transition duration-300 ease-in-out transform hover:scale-105 z-50"
      >
        {language ? "Exit" : "回到大廳"}
      </Link>
      <div
        className="flex flex-row justify-center items-center cursor-pointer text-black bg-white bg-opacity-70 z-50 w-full"
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
