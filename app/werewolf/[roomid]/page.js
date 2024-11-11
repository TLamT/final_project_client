"use client";

import { useParams, useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import { useState, useEffect, useContext } from "react";
import { SocketConnection } from "../layout";
import Day from "./components/Day";
import Night from "./components/Night";
import playerRoleList from "./components/DealCardMachine";
import fungPlayerData from "./data/fungPlayerData";
import characterData from "./data/character";
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
  const [gameEnd, setGameEnd] = useState(false);
  const [gameEndMessage, setGameEndMessage] = useState([]);
  // day data
  const [days, setDays] = useState(1);
  const [dayTimeChat, setDayTimeChat] = useState([]);
  // night data
  const [nights, setNights] = useState(1);
  const [nightTimeChat, setNightTimeChat] = useState([]);
  const [vampireNightTimeChat, setVampireNightTimeChat] = useState([]);
  const position = players.findIndex((x) => x.id === email);
  //Conspirator Skill
  const [chooseSomeone, setChooseSomeone] = useState("");

  const assignNewReaper = () => {
    // 當遊戲開始後才進行
    if (gameStart) {
      const originReaper = playersData.find(
        (player) => player.role === "reaper"
      );
      // 設定當reaper死後才進行
      if (!originReaper?.alive) {
        // 係現有既玩家篩選反派出來
        const witchCharacterWithoutReaper = playersData.filter(
          (player) =>
            player.role === "cultist" ||
            player.role === "scammer" ||
            player.role === "twistedFate"
        );
        // 當剩下的反派角色數>1 時才進行(不包括reaper)
        if (witchCharacterWithoutReaper.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * witchCharacterWithoutReaper.length
          );
          //隨機抽取一個現有反派成為reaper
          const newReaper = witchCharacterWithoutReaper[randomIndex];

          const newReaperIndex = playersData.findIndex(
            (player) => player.role === newReaper.role
          );

          playersData[newReaperIndex].role = "reaper";
        }
      }
    }
  };

  useEffect(() => {
    assignNewReaper();
    if (gameStart) {
      checkWon();
    }
  }, [playersData]);

  const checkWon = () => {
    const townArr = [...Object.keys(characterData.town)];
    const witchArr = [...Object.keys(characterData.witch)];
    const currTown = playersData.filter(
      (player) => townArr.includes(player.role) && player.alive === true
    );
    const currWitch = playersData.filter(
      (player) => witchArr.includes(player.role) && player.alive === true
    );
    const currVampire = playersData.filter(
      (player) => player.role === "vampire"
    );

    if (currWitch.length === 0 && currVampire.length === 0) {
      setGameEndMessage((prev) => [...prev, "town win"]);
      setGameEnd(true);
    }

    if (currTown.length === 0 && currVampire.length === 0) {
      setGameEndMessage((prev) => [...prev, "witch win"]);
      setGameEnd(true);
    }

    if (
      currVampire.length > 0 &&
      currWitch.length === 0 &&
      currTown.length === 0
    ) {
      setGameEndMessage((prev) => [...prev, "vampire win"]);
      setGameEnd(true);
    }

    if (
      currTown.length === 0 &&
      currWitch.length === 0 &&
      currVampire.length === 0
    ) {
      setGameEndMessage((prev) => [...prev, "draw"]);
      setGameEnd(true);
    }

    playersData.map((player) => {
      if (player.role === "joker" && player.votedOut === true) {
        setGameEndMessage((prev) => [
          ...prev,
          `${player.name} has won as joker`,
        ]);
      }
      if (
        player.role === "conspirator" &&
        playersData[chooseSomeone]?.votedOut === true
      ) {
        setGameEndMessage((prev) => [
          ...prev,
          `${player.name} has achieved their goal and wins!`,
        ]);
      }
    });

    // console.log(currWitch);
    // if (currWitch === 0) {
    //   return alert("Town has been Win!!!");
    // } else if (currWitch > currTown) {
    //   return alert("Witch has been Win!!!");
    // } else if ((currTown === 0) & (currWitch === 0)) {
    //   return alert("Vampire has been Win!!!");
    // } else if (
    //   playersData.find((player) => player.role === "joker")?.alive === false
    // ) {
    //   return alert("joker:I am the bigger Winner, Loser... HaHaHa");
    // }
    // const conspirator = playersData.find(
    //   (player) => player.role === "Conspirator" && player.alive
    // );
    // const currAliveTown = currTown.filter((player) => player.alive);

    // if (conspirator && currAliveTown.length === 0 && currWitch.length > 0) {
    //   alert("Conspirator has achieved their goal and wins!");
    // }
    //
  };
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
        vote: 0,
        votedOut: false,
      };
    });

    let indexArr = [];
    playersData.forEach((player, index) => {
      player.role === "conspirator" ? null : indexArr.push(index);
    });
    if (indexArr > 0) {
      const randomIndex = Math.floor(Math.random() * indexArr.length);
      setChooseSomeone(indexArr[randomIndex]);
    }

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

  return !gameEnd ? (
    !gameStart ? (
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
        chooseSomeone={chooseSomeone}
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
        setDayTimeChat={setDayTimeChat}
      />
    )
  ) : (
    <div className="flex flex-col justify-center items-center">
      {gameEndMessage.map((message, index) => {
        return <div key={index}>{message}</div>;
      })}
    </div>
  );
}
