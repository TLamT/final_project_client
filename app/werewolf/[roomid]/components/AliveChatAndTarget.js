import fungPlayerData from "../data/fungPlayerData";
import { useContext } from "react";
import { useStore } from "@/app/werewolf/store";
import { Crosshair, Vote } from "lucide-react";

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
  let myPlayer = fungPlayerData.find((player) => player.roleName === playersData[position].role);
  myPlayer = { ...myPlayer, ...playersData[position] };
  // find vampire leader

  const firstVampire = playersData.find((player) => player.id === initialVampire?.id);

  const otherAliveVampire = playersData.filter(
    (player) => player.id !== firstVampire?.id && player.role === "vampire" && player.alive
  );

  const vampireLeader = firstVampire?.alive ? firstVampire : otherAliveVampire[0];
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
        canTarget = fungPlayerData.find((role) => role.roleName === player.role)?.faction !== "witch";
      }
      if (myPlayer.role === "reminsence") {
        canTarget = deadPlayer;
      }
      if (myPlayer.targetGroup === "nonWitch") {
        canTarget = fungPlayerData.find((role) => role.roleName === player.role)?.faction !== "witch";
      }
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
        myPlayer.faction === "witch" && fungPlayerData.find((e) => e.roleName === player.role)?.faction === "witch",
    };
  });

  const TargetButton = ({ index }) => {
    return (
      <button
        onClick={() => handlePlayerClick(index)}
        className="flex flex-row text-white border font-bold py-[2px] px-[4px] rounded transition-transform transform hover:scale-110 active:scale-95"
      >
        <Crosshair className="mr-2 size-5 mt-[2px]" />
        {language ? "target" : "目標"}
      </button>
    );
  };

  // retern 番 player既資料同埋canTarget, 再加上係壞人就會show番佢地既角色

  return (
    <div className="h-full p-4 overflow-y-scroll ">
      <div className="font-bold text-2xl text-center mb-4">{language ? "💖Alive Player💖" : "💖生存玩家💖"}</div>
      <div className="flex flex-col">
        {targetPlayer.map(
          (player, index) =>
            player.alive && (
              <div key={index} className="flex flex-row items-center justify-between mb-2">
                <div className="flex flex-row">
                  <div className="mr-2">{`${index + 1} ${player.name} `}</div>
                  {player.showRole && (
                    <span className="text-sm italic mr-2">
                      {language ? `[${player.role}]` : `[${roleNameTC(player.role)}]`}
                    </span>
                  )}
                  {days > 1 && day && <span className="ml-2">{`${language ? "Vote" : "票數"}: ${player.vote}`}</span>}
                </div>
                <div className="flex flex-row">
                  {player.canTarget &&
                    !playersData[position].jailed &&
                    playersData[position].alive &&
                    playersData[position].role !== "reminsence" &&
                    playersData[position].role !== "vampire" &&
                    playersData[position].role !== "joker" &&
                    !!canShoot &&
                    !day &&
                    !cupidAbilityUsed && <TargetButton index={index} />}
                  {player.canTarget &&
                    playersData[position].role === "jailor" &&
                    playersData[position].alive &&
                    day && <TargetButton index={index} />}
                  {player.canTarget &&
                    days < 2 &&
                    playersData[position].role === "cupid" &&
                    playersData[position].alive &&
                    day && <TargetButton index={index} />}

                  {playersData[position].role === "joker" &&
                    !playersData[position].alive &&
                    !!playersData[position].votedOut &&
                    !day && <TargetButton index={index} />}

                  {player.canTarget &&
                    !day &&
                    !playersData[position].jailed &&
                    playersData[position].role === "vampire" &&
                    vampireLeader?.id === playersData[position].id &&
                    playersData[position].alive && <TargetButton index={index} />}

                  {days > 1 && day && !!player.alive && !!playersData[position].alive && (
                    <button
                      onClick={() => handleVote(index)}
                      className="flex flex-row text-black border-slate-300 font-bold py-[2px] px-[4px] rounded transition-transform transform hover:scale-110 active:scale-95"
                    >
                      <Vote className="mr-2 size-5 mt-[2px]" />
                      {language ? "Vote" : "投票"}
                    </button>
                  )}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default AliveChatAndTarget;
