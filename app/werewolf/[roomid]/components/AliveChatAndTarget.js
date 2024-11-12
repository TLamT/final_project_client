import fungPlayerData from "../data/fungPlayerData";

const AliveChatAndTarget = ({
  playersData,
  position,
  setTarget,
  day,
  cupidAbilityUsed,
  days,
  handleVote,
}) => {
  let myPlayer = fungPlayerData.find(
    (player) => player.roleName === playersData[position].role
  );
  myPlayer = { ...myPlayer, ...playersData[position] };

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
    console.log(deadPlayer.map((player) => player.name));
    if (!day) {
      if (myPlayer.targetGroup === "all") {
        canTarget = player.role !== myPlayer.roleName;
      } else if (myPlayer.targetGroup === "nonWitch") {
        canTarget =
          fungPlayerData.find((role) => role.roleName === player.role)
            ?.faction !== "witch";
      } else if (myPlayer.role === "reminsence") {
        canTarget = deadPlayer;
      } else if (myPlayer.targetGroup === "nonWitch") {
        canTarget =
          fungPlayerData.find((role) => role.roleName === player.role)
            ?.faction !== "witch";
      }
      // else if (myPlayer.targetGroup === "dead") {
      //   canTarget = deadPlayer;
      // }
    } else if (day) {
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
    <div className="border-2 border-rose-600 h-full">
      <div className="font-bold">Alive</div>
      {targetPlayer.map(
        (player, index) =>
          player.alive && (
            <div key={index}>
              <div className="flex flex-row">
                <div className="mr-2">{`${index + 1} ${player.name} `}</div>
                {player.showRole && <span>{`[${player.role}]`}</span>}
                {player.canTarget &&
                  !playersData[position].jailed &&
                  playersData[position].alive &&
                  cupidAbilityUsed === false &&
                  playersData[position].role !== "reminsence" && (
                    <button onClick={() => setTarget(index)}>target</button>
                  )}
                {playersData[position].role === "joker" &&
                  playersData[position].votedOut === true && (
                    <button onClick={() => setTarget(index)}>target</button>
                  )}

                {playersData[position].role === "vampireHunter" &&
                  playersData[position].alive &&
                  !day && (
                    <button onClick={() => setTarget(index)}>target</button>
                  )}
                {days > 1 &&
                  day &&
                  player.alive === true &&
                  playersData[position].alive && (
                    <button onClick={() => handleVote(index)}>Vote</button>
                  )}

                {days > 1 && day && `${player.vote}`}
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default AliveChatAndTarget;
