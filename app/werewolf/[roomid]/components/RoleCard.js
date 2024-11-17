import { useState } from "react";
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

const RoleCard = ({ playersData, position }) => {
  const myPlayer = fungPlayerData.find(
    (player) => player.roleName === playersData[position].role
  );
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
      case "default":
        return;
    }
  };
  const factionRoleTC = (role) => {
    switch (role) {
      case "witch":
        return "邪惡";
      case "town":
        return "城鎮居民";
      case "neutral":
        return "中立";
    }
  };
  const [showCard, setShowCard] = useState(true);
  return (
    // <>
    //   <div
    //     className="border-2 border-green-500 w-[300px] h-[300px] relative overflow-hidden"
    //     onMouseEnter={() => setShowCard(true)} //
    //     onMouseLeave={() => setShowCard(false)}
    //   >
    //     {showCard ? (
    //       <ul className="flex flex-col items-center justify-center  h-full">
    //         <li>Faction : {`${myPlayer.faction.toUpperCase()}`}</li>
    //         <li>陣營: {factionRoleTC(myPlayer.faction)}</li>
    //         <li>Abilty : {`${myPlayer.ability}`}</li>
    //         <li>技能 :</li>
    //       </ul>
    //     ) : (
    //       <Image
    //         src={imageRole(myPlayer.roleName)}
    //         alt={`${myPlayer.roleName}`}
    //         layout="intrinsic"
    //         className="object-cover  "
    //         quality={100}
    //       />
    //     )}
    //   </div>
    // </>

    <>
      {/* <div className="overflow-hidden w-full top-5">
        <Image
          className="absolute h-1/2 w-full object-cover opacity-50 rounded-lg top-20 -translate-y-20"
          src={imageRole(myPlayer.roleName)}
          alt={`${myPlayer.roleName}`}
        />
      </div> */}
      {/* <div className="bg-gray-600 text-lg mt-1 mb-4 text-center text-white font-bold py-2 rounded-md relative">
        {myPlayer.roleName}
      </div> */}
      {/* <ul className="flex flex-col items-center justify-center  h-full">
        <li>Role : {`${myPlayer.roleName}`}</li>
        <li>Factiom : {`${myPlayer.faction.toUpperCase()}`}</li>
        <li>陣營: {factionRoleTC(myPlayer.faction)}</li>
        <li>Abilty : {`${myPlayer.ability}`}</li>
        <li>技能 :</li>
      </ul> */}
      <div className="flex flex-col justify-center items-center text-center">
        <div className="bg-gray-600 text-lg mt-1 mb-4 text-center text-white font-bold py-2 rounded-md relative h-1/6">
          Role : {myPlayer.roleName}, Faction : {myPlayer.faction.toUpperCase()}
        </div>
        <div className="flex h-4/6 w-1/3">
          <Image
            src={imageRole(myPlayer.roleName)}
            alt={`${myPlayer.roleName}`}
            className="object-contain"
          />
        </div>
        <ul className="flex flex-col items-center justify-center mt-4 h-1/6">
          <li className="border-2 border-yellow-500">
            Ability : {`${myPlayer.ability}`}
          </li>
        </ul>
      </div>
    </>
  );
};

export default RoleCard;
