"use client";

import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useStore } from "@/app/werewolf/store";
function DayChatRoom({ dayTimeChat, message, setMessage, sentDayMessage, playersData, position, day }) {
  const scrollRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const { language, changeLanguage } = useStore();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const onEmojiClick = (emojiData) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji);
  };
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [dayTimeChat]);

  useEffect(() => {
    // console.log("Daytime status:", day); // Check if day is true or false
  }, [day]);
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && day) {
      event.preventDefault(); // Prevents a new line from being added in the input
      sentDayMessage();
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

  return (
    <div className="flex flex-col justify-between h-full">
      <div
        className="border-2 border-gray-500 w-full h-4/5 overflow-y-scroll bg-gray-900 rounded-lg shadow-inner"
        ref={scrollRef}
      >
        {dayTimeChat.map((allDayMessage, index) => (
          <div key={index} className={`p-1 ${index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"} text-white`}>
            <span className="font-semibold text-indigo-300">{allDayMessage.name}:</span> {allDayMessage.message}
          </div>
        ))}
      </div>
      {playersData[position].alive ? (
        <div className="h-1/5 flex items-center space-x-2">
          <button
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="font-semibold py-2 px-4 rounded-lg shadow-md bg-gray-700 text-white"
          >
            😘
          </button>
          {showEmojiPicker && (
            <div ref={emojiPickerRef} className="absolute bottom-14 left-0 z-50 bg-gray-400 rounded-lg shadow-lg">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
          <input
            value={message}
            onChange={(ev) => setMessage(ev.target.value)}
            onKeyDown={handleKeyDown}
            className={`w-full px-3 py-2 border border-cyan-300 rounded-lg 
      ${day ? "bg-gray-700 text-white" : "bg-gray-600 text-gray-400 cursor-not-allowed"}
      placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white`}
            placeholder={language ? "Type your message..." : "請輸入訊息..."}
            disabled={!day} // Disable input if it's night
          />

          <button
            onClick={sentDayMessage}
            className={`font-semibold py-2 px-3 rounded-lg shadow-md transition duration-150 ease-in-out
      ${day ? "bg-gray-700 hover:bg-gray-500 text-white" : "bg-gray-500 text-gray-300 cursor-not-allowed"}`}
            disabled={!day} // Disable send button if it's night
          >
            Send
          </button>
        </div>
      ) : (
        <div className="h-1/5 flex items-center justify-center text-gray-600">
          {language ? (
            <>{day ? "You cannot send messages here." : "Day Chat is read-only at night."}</>
          ) : (
            <>{day ? "你已被禁止輸入任何對話" : "夜晚時段只供瀏覽日頭聯天室內容"}</>
          )}
        </div>
      )}
    </div>
  );
}

export default DayChatRoom;
