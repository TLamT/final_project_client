import fungPlayerData from "../data/fungPlayerData";

const DeadPlayerList = ({ playersData, position }) => {
  //查找自身身份
  let myPlayer = fungPlayerData.find(
    (player) => player.roleName === playersData[position].role
  );
  myPlayer = { ...myPlayer, ...playersData[position] };
  // 追憶者能選的目標
  let targetPlayer = playersData.map((player) => {
    let canTarget = false;
    if (myPlayer.role === "reminiscence") {
      canTarget = playersData.filter((player) => !player.alive);
      return { canTarget, ...player };
    }
    return player;
  });

  return (
    <div>
      <div className="font-bold text-center">Dead</div>
      <div>
        {targetPlayer.map((player, index) => {
          return (
            !player.alive && (
              <div key={index} className="flex flex-row justify-center">
                <div className="mr-4">{`${index + 1} ${player.name} `}</div>
                <div>
                  {player.role === "reminiscence" && (
                    <button onClick={() => setTarget(index)}>target</button>
                  )}
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default DeadPlayerList;
