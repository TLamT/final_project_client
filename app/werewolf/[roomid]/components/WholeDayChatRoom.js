"use client";

import { useEffect, useRef, useState } from "react";
import { useStore } from "@/app/werewolf/store";
import EmojiPicker from "emoji-picker-react";

function WholeDayChatRoom({
  message,
  setMessage,
  sentDeadMessage,
  role,
  deadChat,
  playersData,
  position,
}) {
  const scrollRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { language, changeLanguage } = useStore();

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

  const handleClickOutside = (event) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target)
    ) {
      setShowEmojiPicker(false); // Close the emoji picker
    }
  };

  useEffect(() => {
    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);
  const onEmojiClick = (emojiData) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji);
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
            <div
              key={index}
              className={`p-1 ${
                index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
              }`}
            >
              <span className="font-semibold text-blue-300">
                {language ? "Unknown" : "不記名玩家"}
              </span>
              <span className="text-gray-100">{allDeadMessage.message}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-400">
            {language ? "No messages yet." : "仲未有訊息"}
          </p>
        )}
      </div>

      {/* Input Field and Send Button Section */}
      <div className="h-1/5 flex items-center space-x-2">
        <button
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="px-4 py-2 rounded-lg font-semibold text-white bg-gray-700 hover:bg-gray-600 transition duration-150 ease-in-out"
        >
          😊
        </button>
        {showEmojiPicker && (
          <div
            ref={emojiPickerRef}
            className="absolute bottom-14 left-0 z-50 bg-white rounded-lg shadow-lg"
          >
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
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
          placeholder={language ? "Type your message..." : "輸入你的訊息"}
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
