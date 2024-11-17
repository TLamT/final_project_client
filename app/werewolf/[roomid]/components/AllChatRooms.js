"use client";

import { useState } from "react";
import DayChatRoom from "./DayChatRoom";
import NightChatRoom from "./NightChatRoom";
import WholeDayChatRoom from "./WholeDayChatRoom";

const AllChatRoom = ({
  playersData,
  position,
  role,
  day,
  message,
  setMessage,
  sentDayMessage,
  sentDeadMessage,
  sentWitchMessage,
  sentVampireMessage,
  dayChat,
  witchChat,
  deadChat,
  vampireChat,
  // options
  show = {},
  dayReadOnly = false,
}) => {
  const chatController = {
    day: false,
    witch: false,
    vampire: false,
    medium: false,
    dead: false,
    ...show,
  };
  const tabs = Object.entries(chatController).reduce(
    (result, [type, isShow]) => {
      if (isShow) {
        result.push(type[0].toUpperCase() + type.slice(1));
      }
      return result;
    },
    []
  );
  const [tab, setTab] = useState(tabs?.[0]);

  const renderDayChat = () => (
    <DayChatRoom
      playersData={playersData}
      position={position}
      dayTimeChat={dayChat}
      setMessage={setMessage}
      message={message}
      sentDayMessage={sentDayMessage}
      readOnly={dayReadOnly}
      day={day}
    />
  );

  const renderDeadChat = () => (
    <WholeDayChatRoom
      deadChat={deadChat}
      message={message}
      setMessage={setMessage}
      sentDeadMessage={sentDeadMessage}
      role={role}
      playersData={playersData}
      position={position}
    />
  );

  const renderMediumChat = () => (
    <WholeDayChatRoom
      deadChat={deadChat}
      message={message}
      setMessage={setMessage}
      sentDeadMessage={sentDeadMessage}
      role={role}
      playersData={playersData}
      position={position}
    />
  );

  const renderWitchChat = () => (
    <NightChatRoom
      nightTimeChat={witchChat}
      message={message}
      setMessage={setMessage}
      sentNightMessage={sentWitchMessage}
      playersData={playersData}
      position={position}
      role={role}
    />
  );

  const renderVampireChat = () => (
    <NightChatRoom
      nightTimeChat={vampireChat}
      message={message}
      setMessage={setMessage}
      sentNightMessage={sentVampireMessage}
      playersData={playersData}
      position={position}
      role={role}
    />
  );

  return (
    <div className="h-full flex flex-col">
      <ul className="flex gap-1 h-8">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className="px-2 py-1 bg-sky-400 text-white cursor-pointer"
            onClick={() => setTab(tab)}
          >
            {tab}
          </li>
        ))}
      </ul>
      <div className="flex-1 overflow-auto h-full">
        {tab === "Day" && renderDayChat()}
        {tab === "Witch" && renderWitchChat()}
        {tab === "Vampire" && renderVampireChat()}
        {tab === "Dead" && renderDeadChat()}
        {tab === "Medium" && renderMediumChat()}
      </div>
    </div>
  );
};

export default AllChatRoom;
