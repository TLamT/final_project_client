"use client";

import { useEffect, useRef } from "react";

function WholeDayChatRoom({ message, setMessage, sentDeadMessage, role, deadChat, playersData, position }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [deadChat]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents a new line from being added in the input
      sentDeadMessage();
    }
  };

  // Check if the role is "medium" and if the player is alive
  const isMedium = role === "medium";

  return (
    <div className="flex flex-col justify-between h-full">
      {/* Scrollable Chat Messages Section */}
      <div
        className="border-2 border-blue-300 w-full h-4/5 overflow-y-scroll bg-gray-900 rounded-lg shadow-inner custom-scrollbar"
        ref={scrollRef}
      >
        {deadChat.length > 0 ? (
          deadChat.map((allDeadMessage, index) => (
            <div key={index} className={`p-1 ${index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}`}>
              <span className="font-semibold text-blue-300">Unknown: </span>
              <span className="text-gray-100">{allDeadMessage.message}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No messages yet.</p>
        )}
      </div>

      {/* Input Field and Send Button Section */}
      <div className="h-1/5 flex items-center space-x-2">
        <input
          value={message}
          onChange={(ev) => setMessage(ev.target.value)}
          onKeyDown={handleKeyDown}
          className={`w-full px-3 py-2 border border-cyan-300 rounded-lg 
            ${
              isMedium && playersData[position]?.alive
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-gray-700 text-white"
            } 
            placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
          placeholder="Type your message..."
          disabled={isMedium && playersData[position]?.alive} // Disable input if medium role is alive
        />
        <button
          onClick={sentDeadMessage}
          className={`px-4 py-2 rounded-lg font-semibold text-white transition duration-150 ease-in-out 
            ${
              isMedium && playersData[position]?.alive
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          disabled={isMedium && playersData[position]?.alive}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default WholeDayChatRoom;
