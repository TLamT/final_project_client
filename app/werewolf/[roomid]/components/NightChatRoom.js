"use client";

import { useEffect, useRef } from "react";

function NightChatRoom({ nightTimeChat, message, setMessage, sentNightMessage, playersData, position }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [nightTimeChat]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents a newline from being added in the input
      sentNightMessage();
    }
  };

  const isPlayerAlive = playersData[position]?.alive;

  return (
    <div className="flex flex-col justify-between h-full">
      {/* Chat Messages Section */}
      <div
        className="border-2 border-blue-300 w-full h-4/5 overflow-y-scroll bg-gray-900 rounded-lg shadow-inner"
        ref={scrollRef}
      >
        {nightTimeChat.map((allNightMessage, index) => (
          <div key={index} className={`p-1 ${index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"} text-white`}>
            <span className="font-semibold text-blue-300">{allNightMessage.name}:</span> {allNightMessage.message}
          </div>
        ))}
      </div>

      {/* Input and Send Button Section */}
      {isPlayerAlive ? (
        <div className="h-1/5 flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(ev) => setMessage(ev.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-3 py-2 border border-cyan-300 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="Type your message..."
          />
          <button
            onClick={sentNightMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out"
          >
            Send
          </button>
        </div>
      ) : (
        <div className="h-1/5 mt-2 text-center text-gray-500">Night Chat: You cannot send messages here.</div>
      )}
    </div>
  );
}

export default NightChatRoom;
