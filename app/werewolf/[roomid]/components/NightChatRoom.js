function NightChatRoom({
  nightTimeChat,
  message,
  setMessage,
  handleMessageSent,
  role,
}) {
  return (
    <div>
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
      <div className="mt-4">
        {nightTimeChat.map((allNightMessage, index) => {
          return (
            <div key={index}>
              {allNightMessage.name}:{allNightMessage.message}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NightChatRoom;
