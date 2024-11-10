import characterData from "../data/character";

const AliveChatAndTargetFung = ({ playersData, position, setTarget }) => {
  const deadList = playersData.filter((player) => !player.alive);
  const allPlayersData = playersData.map((player) => {
    const characterInfo = allCharactersInfo.find(
      (char) => char.roleName === player.role
    );
    return {
      ...player,
      characterInfo,
    };
  });
  const currPlayer = allPlayersData[position];
  // 1  ,
  const targetList = allPlayersData.map((player) => {
    let canTarget = false;
    switch (currPlayer.characterInfo.targetGroup) {
      case "all": {
        canTarget = player.role !== currPlayer.role;
        break;
      }
      case "nonWitch": {
        canTarget = player.characterInfo.faction !== "witch";
        break;
      }
      case "dead": {
        canTarget = deadList.find((p) => p.alive === false);
        break;
      }
      // case null: {
      //     canTarget = false
      // }
    }
    return {
      ...player,
      showRole:
        currPlayer.characterInfo.faction === "witch" &&
        player.characterInfo.faction === "witch",
      canTarget,
    };
  });
  return (
    <ul>
      {targetList.map((player, index) => (
        <li key={index}>
          <span>{player.name}</span>
          {player.showRole && <span className="mr-4">[{player.role}]</span>}
          {player.canTarget && (
            <button className="ml-4" onClick={() => setTarget(index)}>
              Target
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

const formatCharacterData = (faction) => {
  return Object.keys(characterData[faction]).map((char) => ({
    roleName: char,
    faction,
    ...characterData[faction][char],
  }));
};

const allCharactersInfo = [
  ...formatCharacterData("town"),
  ...formatCharacterData("witch"),
  ...formatCharacterData("neutral"),
];

export default AliveChatAndTargetFung;
