import AliveChatAndTarget from "./AliveChatAndTarget";
const AlivePlayerList = ({ playersData, position, setTarget, day }) => {
  const alivePlayer = playersData.filter((player) => player.alive);

  return (
    <div className="w-200px h-200px border-2 border-rose-600">
      <div>Alive</div>
      {alivePlayer && (
        <AliveChatAndTarget
          playersData={playersData}
          position={position}
          setTarget={setTarget}
          day={day}
        />
      )}
    </div>
  );
};

export default AlivePlayerList;
