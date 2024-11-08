import fungPlayerData from "../data/fungPlayerData";
const DeadPlayerList = ({ playersData, position }) => {
  let myPlayer = fungPlayerData.find(
    (player) => player.roleName === playersData[position].role
  );
  myPlayer = { ...myPlayer, ...playersData[position] };
  const deadPlayer = playersData.filter((player) => !player.alive);
  let targetPlayer = playersData.map((player) => {
    if (myPlayer.role === "reminiscence") {
      let canTarget = deadPlayer;
      return { canTarget, ...player };
    }
  });

  return (
    <div className="w-200px h-200px border-2 border-rose-600">
      <div>Dead</div>
      <ul>
        {deadPlayer.map((player, index) => (
          <li key={index}>{`Player: ${player.name} ${
            player.canTarget && (
              <button onClick={() => setTarget(index)}>target</button>
            )
          }`}</li>
        ))}
      </ul>
    </div>
  );
};

export default DeadPlayerList;
