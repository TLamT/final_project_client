import characterData from "../data/character";
import Image from "next/image";
import { useState } from "react";
import { useStore } from "@/app/werewolf/store";
import Link from "next/link";
import { Globe2, DoorOpen } from "lucide-react";
import conspiratorWin from "@/public/winningBg/conspiratorWin.jpg";
import draw from "@/public/winningBg/draw.jpg";
import witchWin from "@/public/winningBg/witchWin.jpg";
import vampireWin from "@/public/winningBg/vampire.jpg";
import mcDonald from "@/public/gif/mcDonald.gif";
import townWin from "@/public/gif/winning.gif";
import drawJokerAndConspirator from "@/public/winningBg/drawJokerAndConspirator.png";

const GameEnd = ({ gameEndMessage, playersData }) => {
  const { language, changeLanguage } = useStore();
  const [winningFaction, setWinningFaction] = useState();

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
      default:
        return;
    }
  };

  // Filter unique game end messages
  gameEndMessage = [...new Set(gameEndMessage)];
  const gameFilterEndMessage = gameEndMessage.filter(
    (condition) =>
      condition === "town win" || condition === "witch win" || condition === "vampire win" || condition === "draw"
  );
  console.log(gameEndMessage);
  console.log(gameFilterEndMessage);

  // Player grouping
  const townArr = [...Object.keys(characterData.town)];
  const witchArr = [...Object.keys(characterData.witch)];
  const currTown = playersData.filter((player) => townArr.includes(player.role) && player.alive === true);
  const currWitch = playersData.filter((player) => witchArr.includes(player.role) && player.alive === true);
  const currVampire = playersData.filter((player) => player.role === "vampire");
  const checkConspirator = playersData.find((player) => player.role === "conspirator");
  const checkJoker = playersData.find((player) => player.role === "joker");

  // Win conditions
  const isJokerWin = gameEndMessage.includes(`${checkJoker?.name} joker has been voted! Joker Win`);
  const isConspiratorWin = gameEndMessage.includes(
    `${checkConspirator?.name} is conspirator. Conspirator has achieved their goal and wins!`
  );

  const renderPlayerRole = (player) => (
    <div key={player.name} className="mt-1 flex justify-center">
      <span className="mr-2">
        <strong>{player.name}</strong>
      </span>
      :<span className="ml-2">{language ? player.role : roleNameTC(player.role)}</span>
    </div>
  );

  const renderPlayer = (filterWinner) => playersData.filter(filterWinner).map(renderPlayerRole);

  const checkWinner = (faction) => {
    const filterCondition = (player) => {
      const isFactionPlayer = faction.map((role) => role.name).includes(player.name);
      if (isJokerWin && isConspiratorWin) {
        return player.role === "joker" || player.role === "conspirator" || isFactionPlayer;
      }
      if (isJokerWin) return player.role === "joker" || isFactionPlayer;
      if (isConspiratorWin) return player.role === "conspirator" || isFactionPlayer;
      return isFactionPlayer;
    };
    return renderPlayer(filterCondition);
  };

  const checkLoser = (faction) => {
    const filterCondition = (player) => {
      const isFactionPlayer = faction.map((role) => role.name).includes(player.name);
      if (isJokerWin && isConspiratorWin) {
        return player.role !== "joker" && player.role !== "conspirator" && !isFactionPlayer;
      }
      if (isJokerWin) return player.role !== "joker" && !isFactionPlayer;
      if (isConspiratorWin) return player.role !== "conspirator" && !isFactionPlayer;
      return !isFactionPlayer;
    };
    return renderPlayer(filterCondition);
  };

  const checkFaction = (faction) => {
    switch (faction) {
      case "town win":
        return renderFactionWin(
          townWin,
          "/music/TownWin.mp3",
          language
            ? gameEndMessage.map((condition, index) => <div key={index}>{condition.toUpperCase()}</div>)
            : isJokerWin && isConspiratorWin
            ? "蘑茹市民陣營🍄、謀略家🎭和小丑🤡勝利"
            : isJokerWin
            ? "蘑茹市民陣營🍄和小丑🤡勝利"
            : "蘑茹市民陣營🍄勝利",
          checkWinner(currTown),
          checkLoser(currTown)
        );
      case "witch win":
        return renderFactionWin(
          witchWin,
          "/music/25sonWin.mp3",
          language
            ? gameEndMessage.map((condition, index) => <div key={index}>{condition.toUpperCase()}</div>)
            : isJokerWin && isConspiratorWin
            ? "古惑仔陣營🪓、謀略家🎭和小丑🤡勝利"
            : isJokerWin
            ? "古惑仔陣營🪓和小丑🤡勝利"
            : "🪓古惑仔陣營勝利🔪",
          checkWinner(currWitch),
          checkLoser(currWitch)
        );
      case "vampire win":
        return renderFactionWin(
          vampireWin,
          "/music/VampireWin.mp3",
          language
            ? gameEndMessage.map((condition, index) => <div key={index}>{condition.toUpperCase()}</div>)
            : isJokerWin && isConspiratorWin
            ? "彊屍陣營🧟‍♂️、謀略家🎭和小丑🤡勝利"
            : isJokerWin
            ? "彊屍陣營🧟‍♂️和小丑🤡勝利"
            : "彊屍陣營🧟‍♂️勝利",
          checkWinner(currVampire),
          checkLoser(currVampire)
        );
      case "draw":
        return renderDrawCondition();
    }
  };

  const renderFactionWin = (bgImage, audioSrc, message, winner, loser) => (
    <div>
      <audio src={audioSrc} autoPlay loop></audio>
      <Image
        src={bgImage}
        alt="winning background"
        className="absolute inset-0 object-cover w-full h-full z-[-1] opacity-80"
      />
      <div className="flex flex-col text-center text-2xl font-semibold justify-center mb-5">{message}</div>
      <div className="flex justify-center mt-5 text-2xl font-semibold mb-2">
        {language ? "🏆Winner🏆" : "🏆勝利者🏆"}
      </div>
      {winner}
      <div className="flex justify-center mt-5 text-2xl font-semibold mb-2">
        {language ? "🧎🏻LOSER🧎🏻" : "🧎🏻失敗者🧎🏻"}
      </div>
      {loser}
    </div>
  );

  const renderDrawCondition = () => {
    // Handle draw logic (kept same as original structure)
    if (isJokerWin && !isConspiratorWin) {
      return (
        <div>
          <audio src="/music/JokerWin.mp3" autoPlay loop></audio>
          <Image
            src={mcDonald}
            alt={"mcDonald"}
            className="absolute inset-0 object-cover w-full h-full z-[-1] opacity-80"
            width={0}
            height={0}
            sizes="100vw"
          />

          <div className="flex justify-center">{language ? "🤡Joker Win🤡" : "🤡小丑勝利🤡"}</div>

          <div>
            {language ? `${checkJoker.name} is a Joker.` : `${checkJoker.name}係小丑🤡`}
            <br />
            {language
              ? `${checkJoker.name}: “Is that the best you can do? Losing suits you perfectly—like it was made just for you.” 😏`
              : `${checkJoker.name}: 在座各位都係垃圾😏`}
          </div>

          <div className="flex justify-center mt-5">{language ? "🧎🏻LOSER🧎🏻" : "🧎🏻失敗者🧎🏻"}</div>

          {renderPlayer((player) => player.role !== "joker")}
        </div>
      );
    } else if (!isJokerWin && isConspiratorWin) {
      return (
        <div>
          <audio src="/music/ConspiratorWin.mp3" autoPlay loop></audio>
          <Image
            src={conspiratorWin}
            alt={"conspiratorWin"}
            className="absolute inset-0 object-cover w-full h-full z-[-1] opacity-80"
          />

          <div className="flex justify-center">{language ? "🎭Conspirator Win🎭" : "🎭謀略家勝利🎭"}</div>
          <div>
            {language ? `${checkConspirator?.name} is a Conspirator.` : `${checkConspirator.name}係謀略家🎭`}
            <br />
            {language
              ? `${checkConspirator.name}: “Pathetic. You’re all just pieces on my board, and I’ve already won before you even realized you were playing.” 😏`
              : `${checkConspirator.name}: 「天幕就係我，我就係天幕」😏`}
          </div>
          <div className="flex justify-center mt-5">{language ? "🧎🏻LOSER🧎🏻" : "🧎🏻失敗者🧎🏻"}</div>

          {renderPlayer((player) => player.role !== "conspirator")}
        </div>
      );
    } else if (isJokerWin && isConspiratorWin) {
      return (
        <div>
          <audio src="/music/draw.mp3" autoPlay loop></audio>
          <Image
            src={drawJokerAndConspirator}
            alt={"drawJokerAndConspirator"}
            className="absolute inset-0 object-cover w-full h-full z-[-1] opacity-80"
          />
          <div className="flex justify-center">{language ? "🎭Conspirator Win🎭" : "🎭謀略家勝利🎭"}</div>
          <div>
            {language ? `${checkConspirator?.name} is a Conspirator.` : `${checkConspirator.name}係謀略家🎭`}
            <br />
            {language ? `${checkJoker.name} is a Joker.` : `${checkJoker.name}係小丑🤡`}
          </div>
          <div className="flex justify-center mt-5">{language ? "🧎🏻LOSER🧎🏻" : "🧎🏻失敗者🧎🏻"}</div>

          {renderPlayer((player) => player.role !== "conspirator" && player.role !== "joker")}
        </div>
      );
    } else if (!isJokerWin && !isConspiratorWin) {
      return (
        <div className="">
          <Image
            src={draw}
            alt={"draw"}
            className="absolute inset-0 object-cover w-full h-full z-[-1] opacity-80"
            width={0}
            height={0}
            sizes="100vw"
          />
          <div className="flex justify-center">{language ? "🐧DRAW🐧" : "🐧打和🐧"}</div>
          {renderPlayer((player) => player.role)}
        </div>
      );
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col borderTest bg-opacity-70 w-1/2 bg-slate-200 shadow-lg rounded-3xl justify-center items-center p-4">
        <div className="flex justify-center items-center text-black">{checkFaction(...gameFilterEndMessage)}</div>
        <Link
          href="../werewolf"
          // className="block w-full py-3 px-4 mt-6 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-md text-center transition duration-300 ease-in-out transform hover:scale-105 z-50"
          className="flex w-1/3 justify-center items-center border-2 py-2 rounded-lg border-gray-700 font-semibold text-black text-center transition ease-in-out transform hover:scale-110 duration-200 relative px-4 mt-2"
        >
          <DoorOpen className="mr-2" />
          {language ? "Back to lobby" : "回到大廳"}
        </Link>
        <div
          className="flex flex-row justify-center items-center cursor-pointer text-black z-50 w-full my-2 ml-6"
          onClick={changeLanguage}
        >
          {language ? "中文" : "English"}
          <div variant="outline" className="rounded-full w-12 h-12 p-0 ml-2 flex items-center">
            <Globe2 className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameEnd;
