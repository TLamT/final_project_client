import fungPlayerData from "../data/fungPlayerData";
import characterData from "../data/character";
//{name:x , showtarget:true}
const AliveChatAndTarget = ({ playersData, position, setTarget }) => {
  // 查找所有角色
  let myPlayer = fungPlayerData.find(
    (player) => player.roleName === playersData[position].role
  );
  myPlayer = { ...myPlayer, ...playersData[position] };
  console.log("myplayer: ", myPlayer);

  console.log(playersData);
  console.log(fungPlayerData);

  //查找所有已死既玩家
  const deadPlayer = playersData.filter((player) => !player.alive);
  //設定可睇到target既玩家
  const targetPlayer = playersData.map((player) => {
    console.log(player);
    let canTarget = false;
    if (myPlayer.targetGroup === "all") {
      canTarget = player.role !== myPlayer.roleName;
    } else if (myPlayer.targetGroup === "nonWitch") {
      canTarget =
        fungPlayerData.find((role) => role.roleName === player.role).faction !==
        "witch";
      console.log(canTarget);
    } else if (myPlayer.targetGroup === "dead") {
      canTarget = deadPlayer.find((role) => !role.alive);
    }
    return {
      ...player,
      canTarget,
      showRole:
        myPlayer.faction === "witch" &&
        fungPlayerData.filter((e) => e.faction === "witch"),
    };
  });
  console.log(targetPlayer);
  // retern 番 player既資料同埋canTarget, 再加上係壞人就會show番佢地既角色

  return (
    <>
      {targetPlayer.map((player, index) => (
        <li key={index}>
          {player.name}
          {player.showRole && <span>{`[${player.role}]`}</span>}
          {player.canTarget && (
            <button onClick={() => setTarget(index)}>target</button>
          )}
        </li>
      ))}
    </>
  );
};
export default AliveChatAndTarget;
