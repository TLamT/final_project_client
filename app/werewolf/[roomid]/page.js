"use client";

import { useParams, useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import { useState, useEffect, useContext } from "react";
import { SocketConnection } from "../layout";
import Day from "./components/Day";
import Night from "./components/Night";
import playerRoleList from "./components/DealCardMachine";
import fungPlayerData from "./data/fungPlayerData";

const isSSR = typeof window === "undefined";

export default function () {
  // default
  const socket = useContext(SocketConnection);
  const cookies = new Cookies();
  const router = useRouter();
  const { roomid } = useParams();
  const email = isSSR ? "no-email" : cookies.get("email");
  // check player exist and current name
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([]);
  const [playersData, setPlayersData] = useState([]);
  const roomLeader = players[0]?.id === email;
  // day and night data
  const [gameStart, setGameStart] = useState(false);
  const [day, setDay] = useState(true);
  const [role, setRole] = useState("");
  const [deadPlayerChat, setDeadPlayerChat] = useState([]);
  const [detectiveAbilityInfo, setDetectiveAbilityInfo] = useState([]);
  const [sentinelAbilityInfo, setSentinelAbilityInfo] = useState([]);
  const [cupidAbilityUsed, setCupidAbilityUsed] = useState(false);
  // day data
  const [days, setDays] = useState(1);
  const [dayTimeChat, setDayTimeChat] = useState([]);
  // night data
  const [nights, setNights] = useState(1);
  const [nightTimeChat, setNightTimeChat] = useState([]);
  const [vampireNightTimeChat, setVampireNightTimeChat] = useState([]);
  const [reaperExist, setReaperExist] = useState(true);
  const position = players.findIndex((x) => x.id === email);

  console.log(gameStart);
  console.log(playersData);
  console.log(fungPlayerData);
  const assignNewReaper = () => {
    if (gameStart) {
      const witchCharacter = fungPlayerData.filter(
        (player) => player.faction === "witch"
      );
      // playerData.map((e)=>e.r)
      console.log(witchCharacter);
      const originReaper = playersData.find(
        (player) => player.role === "reaper"
      );
      const witchRoleWithoutOriginReaper = playersData.filter(
        (player) => player.role === "reaper"
      );
      console.log(witchRoleWithoutOriginReaper);
      if (!originReaper.alive) {
      }
      console.log(originReaper);
    }
  };
  assignNewReaper();

  useEffect(() => {
    const cookieName = cookies.get("userName");
    if (cookieName) {
      setName(cookieName);
      socket.emit("getPlayer", {
        roomId: roomid,
        playerName: cookieName,
        email: email,
      });
    }
  }, []);

  useEffect(() => {
    socket.on("playerList", (list) => {
      setPlayers(list);
    });
    socket.on("returnGameStart", (data) => {
      setGameStart(data);
    });
    socket.on("roleAssign", (roleData) => {
      setPlayersData(roleData);
      setRole(
        roleData.filter((idRole) => {
          return idRole.id === email;
        })[0].role
      );
    });
  }, [socket]);

  useEffect(() => {
    let roles = playerRoleList(players.length);

    const goodBad = roles.map((role) => {
      return fungPlayerData.find((char) => char.roleName === role).detected;
    });

    roles = players.map((playerData, index) => {
      return {
        ...playerData,
        role: roles[index],
        detected: goodBad[index],
        linked: false,
        jailed: false,
      };
    });

    setPlayersData(roles);
  }, [players]);

  function handleGameStart() {
    socket.emit("allRoleAssign", { roomId: roomid, data: playersData });
    socket.emit("gameStart", { roomId: roomid, start: true });
  }

  function handleLogout() {
    socket.emit("logOut", { roomId: roomid, email: email });
    router.push(`/werewolf`);
  }

  return !gameStart ? (
    <div className="flex flex-col justify-center items-center">
      <div>
        <div className="border-solid border-2 border-indigo-600">
          {`房間ID: ${roomid}`}
        </div>
      </div>
      <div>Current name: {name}</div>

      <div>
        Player:
        {players.map((info) => {
          return (
            <div className="ml-2" key={info.id}>
              {info.name}
            </div>
          );
        })}
      </div>

      {roomLeader && (
        <div onClick={() => handleGameStart()} className="cursor-pointer">
          Start Game
        </div>
      )}

      {typeof playersData === "string" && <div>{playersData}</div>}

      <div onClick={handleLogout} className="cursor-pointer">
        Leave Room
      </div>
    </div>
  ) : day ? (
    <Day
      socket={socket}
      roomId={roomid}
      roomLeader={roomLeader}
      setDay={setDay}
      name={name}
      dayTimeChat={dayTimeChat}
      setDayTimeChat={setDayTimeChat}
      deadPlayerChat={deadPlayerChat}
      setDeadPlayerChat={setDeadPlayerChat}
      role={role}
      setRole={setRole}
      players={players}
      playersData={playersData}
      setPlayersData={setPlayersData}
      setPlayers={setPlayers}
      days={days}
      setDays={setDays}
      detectiveAbilityInfo={detectiveAbilityInfo}
      position={position}
      sentinelAbilityInfo={sentinelAbilityInfo}
      day={day}
      cupidAbilityUsed={cupidAbilityUsed}
      setCupidAbilityUsed={setCupidAbilityUsed}
    />
  ) : (
    <Night
      socket={socket}
      roomId={roomid}
      roomLeader={roomLeader}
      days={days}
      setDay={setDay}
      name={name}
      nightTimeChat={nightTimeChat}
      setNightTimeChat={setNightTimeChat}
      vampireNightTimeChat={vampireNightTimeChat}
      setVampireNightTimeChat={setVampireNightTimeChat}
      deadPlayerChat={deadPlayerChat}
      setDeadPlayerChat={setDeadPlayerChat}
      role={role}
      players={players}
      position={position}
      playersData={playersData}
      setPlayersData={setPlayersData}
      nights={nights}
      setNights={setNights}
      setDetectiveAbilityInfo={setDetectiveAbilityInfo}
      setSentinelAbilityInfo={setSentinelAbilityInfo}
      day={day}
      cupidAbilityUsed={cupidAbilityUsed}
    />
  );
}

// const [abc, dispatch] = useReducer(abcReducer, { a: 1, b: 2, c: 3 });

// function abcReducer(abc, action) {
//   switch (action.type) {
//     case "addA":
//       return { ...abc, a: a++ };
//     case "addB":
//       return { ...abc, b: b++ };
//     default:
//       return abc;
//   }
// }
