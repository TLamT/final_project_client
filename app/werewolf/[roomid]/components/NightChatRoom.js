"use client";

import { useEffect, useRef, useState } from "react";
import { useStore } from "@/app/werewolf/store";

import EmojiPicker from "emoji-picker-react";

function NightChatRoom({ nightTimeChat, message, setMessage, sentNightMessage, playersData, position }) {
  const scrollRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { language, changeLanguage } = useStore();

  const onEmojiClick = (emojiData) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji);
  };

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

  const handleClickOutside = (event) => {
    if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
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
            <span className="font-semibold text-blue-300">{allNightMessage.name}:</span>
            {allNightMessage.message}
          </div>
        ))}
      </div>

      {/* Input and Send Button Section */}
      {isPlayerAlive ? (
        <div className="h-1/5 flex items-center space-x-2">
          <button
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out"
          >
            😊
          </button>
          {showEmojiPicker && (
            <div ref={emojiPickerRef} className="absolute bottom-14 left-0 z-50 bg-white rounded-lg shadow-lg">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
          <input
            type="text"
            value={message}
            onChange={(ev) => setMessage(ev.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-3 py-2 border border-cyan-300 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder={language ? "Type your message..." : "輸入你的訊息"}
          />

          <button
            onClick={sentNightMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out"
          >
            {language ? "send" : "送出"}
          </button>
        </div>
      ) : (
        <div className="h-1/5 mt-2 text-center text-gray-500">
          {language ? "Night Chat: You cannot send messages here." : "你已被禁止輸入任何對話"}
        </div>
      )}
    </div>
  );
}

export default NightChatRoom;
