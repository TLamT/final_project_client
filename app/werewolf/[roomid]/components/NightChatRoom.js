function NightChatRoom({
  nightTimeChat,
  message,
  setMessage,
  handleMessageSent,
  role,
  playersData,
  position,
}) {
  const isAlive = playersData[position]?.alive;
  return (
    <>
      {isAlive ? (
        <div className="mt-4 border-2 border-blue-300 w-full h-3/4">
          {nightTimeChat.map((allNightMessage, index) => (
            <div key={index}>
              {allNightMessage.name}: {allNightMessage.message}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 text-red-500">
          You cannot access the witch chat as a dead player.
        </div>
      )}

      <input
        value={message}
        onChange={(ev) => setMessage(ev.target.value)}
        className="border-2 border-cyan-300"
        disabled={role === "medium"}
      />
      <div
        onClick={() => {
          if (role !== "medium") {
            handleMessageSent();
          }
        }}
        className={`cursor-pointer ${
          role === "medium" ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Send
      </div>
    </>
  );
}

export default NightChatRoom;
