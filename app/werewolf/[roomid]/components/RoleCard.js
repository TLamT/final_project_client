import { useState, useContext } from "react";
import { useStore } from "@/app/werewolf/store";

import characterData from "../data/character";
import fungPlayerData from "../data/fungPlayerData";
import Image from "next/image";
import reaper from "@/public/image/reaper.jpg";
import conspirator from "@/public/image/conspirator.jpg";
import cupid from "@/public/image/cupid.jpg";
import defender from "@/public/image/defender.jpg";
import detective from "@/public/image/detective.jpg";
import jailor from "@/public/image/jailor.jpg";
import joker from "@/public/image/joker.jpg";
import medium from "@/public/image/medium.jpg";
import police from "@/public/image/police.jpg";
import scammer from "@/public/image/scammer.jpg";
import twistedFate from "@/public/image/twistedFate.jpg";
import vampire from "@/public/image/vampire.jpg";
import vampireHunter from "@/public/image/vampireHunter.jpg";
import reminiscence from "@/public/image/reminiscence.jpg";
import sentinel from "@/public/image/sentinel.jpg";
import cultist from "@/public/image/cultist.jpg";

const RoleCard = ({ playersData, position }) => {
  const myPlayer = fungPlayerData.find((player) => player.roleName === playersData[position].role);
  const { language, changeLanguage } = useStore();

  const imageRole = (role) => {
    switch (role) {
      case "reaper":
        return reaper;
      case "conspirator":
        return conspirator;
      case "cupid":
        return cupid;
      case "defender":
        return defender;
      case "jailor":
        return jailor;
      case "joker":
        return joker;
      case "medium":
        return medium;
      case "police":
        return police;
      case "scammer":
        return scammer;
      case "twistedFate":
        return twistedFate;
      case "vampire":
        return vampire;
      case "vampireHunter":
        return vampireHunter;
      case "detective":
        return detective;
      case "sentinel":
        return sentinel;
      case "cultist":
        return cultist;
      case "reminiscence":
        return reminiscence;
      case "default":
        return;
    }
  };

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
  const factionRoleTC = (role) => {
    switch (role) {
      case "witch":
        return "邪惡";
      case "town":
        return "蘑菇居民";
      case "neutral":
        return "中立";
    }
  };
  const [showCard, setShowCard] = useState(true);
  return (
    <>
      <div className="flex flex-col justify-center items-center text-center overflow-y-scroll h-full w-full p-5">
        <div className="bg-gray-600 text-lg mt-1 mb-4 text-center text-white font-bold py-2 rounded-md relative h-[12%]">
          {language ? (
            <>
              Role : {myPlayer.roleName}, Faction : {myPlayer.faction.toUpperCase()}
            </>
          ) : (
            <>
              角色 : {roleNameTC(myPlayer.roleName)}, 陣營 : {factionRoleTC(myPlayer.faction)}
            </>
          )}
        </div>
        <div className="flex h-[60%]">
          <Image src={imageRole(myPlayer.roleName)} alt={`${myPlayer.roleName}`} className="object-contain" />
        </div>
        <ul className="flex flex-col items-center justify-center mt-4 h-[12%]">
          {language ? (
            <li className="text-xl">Ability : {`${myPlayer.ability}`}</li>
          ) : (
            <li className="text-xl"> {`${myPlayer.abilityTC}`}</li>
          )}
        </ul>
      </div>
    </>
  );
};

export default RoleCard;
