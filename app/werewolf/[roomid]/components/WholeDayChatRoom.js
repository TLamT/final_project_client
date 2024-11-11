function WholeDayChatRoom({
  message,
  setMessage,
  handleMessageSent,
  role,
  deadChat,
}) {
  return (
    <div className="mt-4">
      <input
        value={message}
        onChange={(ev) => setMessage(ev.target.value)}
        className="border-2 border-cyan-300 bg-gray-700"
        disabled={role === "medium"} // Disable input for medium role
      />
      <button
        onClick={handleMessageSent}
        className={`cursor-pointer ${
          role === "medium" ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={role === "medium"}
      >
        Send
      </button>
      <div className="mt-4 overflow-y-scroll">
        {deadChat.map((allDeadMessage, index) => (
          <div key={index}>Unknown: {allDeadMessage.message}</div>
        ))}
      </div>
    </div>
  );
}

export default WholeDayChatRoom;
