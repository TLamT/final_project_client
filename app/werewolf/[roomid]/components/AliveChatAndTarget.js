import fungPlayerData from "../data/fungPlayerData";
const AliveChatAndTarget = ({ playersData, position, setTarget }) => {
  // 查找所有角色
  let myPlayer = fungPlayerData.find(
    (player) => player.roleName === playersData[position].role
  );
  myPlayer = { ...myPlayer, ...playersData[position] };

  // console.log("f", fungPlayerData);
  //查找所有已死既玩家
  const deadPlayer = playersData.filter((player) => !player.alive);
  // console.log("a", deadPlayer);
  //設定可睇到target既玩家
  const targetPlayer = playersData.map((player) => {
    let canTarget = false;
    if (myPlayer.targetGroup === "all") {
      canTarget = player.role !== myPlayer.roleName;
    } else if (myPlayer.targetGroup === "nonWitch") {
      canTarget =
        fungPlayerData.find((role) => role.roleName === player.role).faction !==
        "witch";
    } else if (myPlayer.targetGroup === "dead") {
      canTarget = deadPlayer;
    }
    // console.log(fungPlayerData.find((e) => e.roleName === player.role));
    return {
      ...player,
      canTarget,
      showRole:
        myPlayer.faction === "witch" &&
        fungPlayerData.find((e) => e.roleName === player.role).faction ===
          "witch",
    };
  });

  // retern 番 player既資料同埋canTarget, 再加上係壞人就會show番佢地既角色

  return (
    <ul>
      {targetPlayer.map((player, index) => (
        <li key={index}>
          {player.name}

          {player.showRole && <span>{`[${player.role}]`}</span>}
          {player.canTarget && (
            <button onClick={() => setTarget(index)}>target</button>
          )}
        </li>
      ))}
    </ul>
  );
};
export default AliveChatAndTarget;
