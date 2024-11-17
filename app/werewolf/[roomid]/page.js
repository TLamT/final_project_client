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
import CharacterSkill from "../component/CharacterSkill";

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
  const [playerDiedLastNight, setPlayerDiedLastNight] = useState([]);
  const [initialVampire, setInitialVampire] = useState(null);
  // day data
  const [days, setDays] = useState(1);
  const [dayTimeChat, setDayTimeChat] = useState([]);
  // night data
  const [nights, setNights] = useState(1);
  const [nightTimeChat, setNightTimeChat] = useState([]);
  const [vampireNightTimeChat, setVampireNightTimeChat] = useState([]);
  const position = players.findIndex((x) => x.id === email);
  //Conspirator Skill
  const [chooseSomeone, setChooseSomeone] = useState(null);
  const [changeLanguage, setChangeLanguage] = useState(true);
  // police skill
  const [canShoot, setCanShoot] = useState(true);

  const handleOnChange = () => {
    setChangeLanguage((prevState) => !prevState);
  };

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
    if (gameStart) {
      assignNewReaper();
      // checkWon();
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

    if (
      currWitch.length === 0 &&
      currVampire.length === 0 &&
      currTown.length > 0
    ) {
      setGameEndMessage((prev) => [...prev, "town win"]);
      setGameEnd(true);
    }

    if (
      currTown.length === 0 &&
      currVampire.length === 0 &&
      currWitch.length > 0
    ) {
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
      return fungPlayerData.find((char) => char.roleName === role)?.detected;
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

    const randomIndex = Math.floor(Math.random() * indexArr.length);

    setChooseSomeone(indexArr[randomIndex]);

    setPlayersData(roles);

    setInitialVampire(roles.find((player) => player.role === "vampire"));
  }, [players]);

  function handleGameStart() {
    socket.emit("allRoleAssign", { roomId: roomid, data: playersData });
    socket.emit("gameStart", { roomId: roomid, start: true });
  }

  function handleLogout() {
    socket.emit("logOut", { roomId: roomid, email: email });
    router.push(`/werewolf`);
  }

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      {!gameEnd ? (
        !gameStart ? (
          <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6 text-lg">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">
                {changeLanguage ? "Game Lobby" : "遊戲大廳"}
              </h1>
              <button
                onClick={handleOnChange}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                {changeLanguage ? "中文" : "English"}
              </button>
            </div>
            <div className="mb-4">
              <span className="font-semibold">
                {changeLanguage ? "Room ID: " : "房間號碼: "}
              </span>{" "}
              {roomid}
            </div>
            <div className="mb-4">
              <span className="font-semibold">
                {changeLanguage ? "Name:" : "名稱:"}:
              </span>{" "}
              {name}
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">
                {changeLanguage ? "Player: " : "玩家: "}
              </h2>
              <div className="max-h-40 overflow-y-auto border rounded-md p-2">
                {players.map((info) => (
                  <div key={info.id} className="py-1">
                    {info.name}
                  </div>
                ))}
              </div>
            </div>
            {roomLeader && (
              <button
                onClick={handleGameStart}
                className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors mb-4"
              >
                {changeLanguage ? "Start Game" : "開始遊戲"}
              </button>
            )}
            {typeof playersData === "string" && (
              <div className="text-red-500 mb-4">{playersData}</div>
            )}
            <button
              onClick={handleLogout}
              className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors mb-6"
            >
              {changeLanguage ? "Leave Room" : "離開房間"}
            </button>
            <div>
              <h2 className="text-xl font-bold mb-2">
                {changeLanguage
                  ? "Role introduction & Victory Condition"
                  : "角色資料&勝利條件"}
              </h2>
              <CharacterSkill changeLanguage={changeLanguage} />
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
            playerDiedLastNight={playerDiedLastNight}
          />
        ) : (
          <Night
            socket={socket}
            roomId={roomid}
            roomLeader={roomLeader}
            days={days}
            setDay={setDay}
            name={name}
            dayTimeChat={dayTimeChat}
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
            setPlayerDiedLastNight={setPlayerDiedLastNight}
            canShoot={canShoot}
            setCanShoot={setCanShoot}
            initialVampire={initialVampire}
          />
        )
      ) : (
        <div className="flex flex-col justify-center items-center">
          {gameEndMessage.map((message, index) => {
            return <div key={index}>{message}</div>;
          })}
        </div>
      )}
    </div>
  );
}
