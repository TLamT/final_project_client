import fungPlayerData from "../data/fungPlayerData";
import { useState } from "react";
const AliveChatAndTarget = ({
  playersData,
  position,
  setTarget,
  day,
  cupidAbilityUsed,
  days,
  handleVote,
  canShoot,
  initialVampire,
  target,
}) => {
  const handlePlayerClick = (index) => {
    if (target === index) {
      setTarget(null);
    } else {
      setTarget(index);
    }
  };

  let myPlayer = fungPlayerData.find(
    (player) => player.roleName === playersData[position].role
  );
  myPlayer = { ...myPlayer, ...playersData[position] };
  // find vampire leader
  let vampireLeader = false;
  if (!day) {
    const firstVampire = playersData.find(
      (player) => player.id === initialVampire?.id
    );
    if (
      !!firstVampire?.alive &&
      playersData[position].id === firstVampire?.id
    ) {
      vampireLeader = true;
    } else if (
      playersData.find((player) => player.role === "vampire" && !!player.alive)
        ?.id === playersData[position].id
    ) {
      vampireLeader = true;
    }
  }

  // JSX
  // x && y => if x work then run y => if
  // x || y => if x not work run y => else
  // condition ? x(true) : y(false)
  // not ok => dont use if else

  //查找所有已死既玩家
  const deadPlayer = playersData.filter((player) => player.alive);
  //設定可睇到target既玩家
  const targetPlayer = playersData.map((player) => {
    let canTarget = false;
    if (!day) {
      if (myPlayer.targetGroup === "all") {
        canTarget = player.role !== myPlayer.roleName;
      }
      if (myPlayer.targetGroup === "nonWitch") {
        canTarget =
          fungPlayerData.find((role) => role.roleName === player.role)
            ?.faction !== "witch";
      }
      if (myPlayer.role === "reminsence") {
        canTarget = deadPlayer;
      }
      if (myPlayer.targetGroup === "nonWitch") {
        canTarget =
          fungPlayerData.find((role) => role.roleName === player.role)
            ?.faction !== "witch";
      }
      // if (myPlayer.role === "vampireHunter") {
      //   canTarget = playersData.filter(
      //     (player) => player.role !== myPlayer.role
      //   );
      // }
      // if (myPlayer.targetGroup === "dead") {
      //   canTarget = deadPlayer;
      // }
    }
    if (day) {
      if (myPlayer.role === "jailor" || myPlayer.role === "cupid") {
        canTarget = player.role !== myPlayer.roleName;
      }
    }
    return {
      ...player,
      canTarget,
      showRole:
        myPlayer.faction === "witch" &&
        fungPlayerData.find((e) => e.roleName === player.role)?.faction ===
          "witch",
    };
  });

  // retern 番 player既資料同埋canTarget, 再加上係壞人就會show番佢地既角色

  return (
    <div className="border-2 border-rose-600 h-full p-4 overflow-y-scroll">
      <div className="font-bold text-lg mb-2">Alive</div>
      <div className="flex flex-col">
        {targetPlayer.map(
          (player, index) =>
            player.alive && (
              <div key={index} className="flex flex-row items-center mb-2">
                <div className="mr-2">{`${index + 1} ${player.name} `}</div>
                {player.showRole && (
                  <span className="text-sm italic mr-2">{`[${player.role}]`}</span>
                )}
                {player.canTarget &&
                  !playersData[position].jailed &&
                  playersData[position].alive &&
                  playersData[position].role !== "reminsence" &&
                  playersData[position].role !== "vampire" &&
                  playersData[position].role !== "joker" &&
                  !!canShoot &&
                  !day &&
                  !cupidAbilityUsed && (
                    <button
                      onClick={() => handlePlayerClick(index)}
                      className="bg-blue-500 text-white font-bold py-1 px-2 rounded transition-transform transform hover:scale-105 active:scale-95"
                    >
                      target
                    </button>
                  )}
                {player.canTarget &&
                  playersData[position].role === "jailor" &&
                  playersData[position].alive &&
                  day && (
                    <button
                      onClick={() => handlePlayerClick(index)}
                      className="bg-blue-500 text-white font-bold py-1 px-2 rounded transition-transform transform hover:scale-105 active:scale-95"
                    >
                      target
                    </button>
                  )}

                {playersData[position].role === "joker" &&
                  !playersData[position].alive &&
                  !!playersData[position].votedOut &&
                  !day && (
                    <button
                      onClick={() => handlePlayerClick(index)}
                      className="bg-blue-500 text-white font-bold py-1 px-2 rounded transition-transform transform hover:scale-105 active:scale-95"
                    >
                      target
                    </button>
                  )}

                {player.canTarget &&
                  !day &&
                  !!vampireLeader &&
                  !playersData[position].jailed && (
                    <button
                      onClick={() => handlePlayerClick(index)}
                      className="bg-blue-500 text-white font-bold py-1 px-2 rounded transition-transform transform hover:scale-105 active:scale-95"
                    >
                      target
                    </button>
                  )}

                {days > 1 &&
                  day &&
                  !!player.alive &&
                  !!playersData[position].alive && (
                    <button
                      onClick={() => handleVote(index)}
                      className="btn btn-sm btn-accent btn-outline"
                    >
                      Vote
                    </button>
                  )}

                {days > 1 && day && <span className="ml-2">{player.vote}</span>}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default AliveChatAndTarget;
