"use client";
import GameEnd from "./components/GameEnd";
import { useParams, useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import { useState, useEffect, useRef } from "react";
import Day from "./components/Day";
import Night from "./components/Night";
import playerRoleList from "./components/DealCardMachine";
import fungPlayerData from "./data/fungPlayerData";
import characterData from "./data/character";
import LobbyScreen from "./components/LobbyScreen";
import { Globe2, HelpCircle } from "lucide-react";
import Popup from "../component/Popup";
import { useStore } from "@/app/werewolf/store";
import { useSocket } from "@/app/werewolf/useSocket";

const isSSR = typeof window === "undefined";

export default function () {
  const { socket, language, changeLanguage } = useStore();
  const cookies = new Cookies();
  const router = useRouter();
  const { roomId } = useParams();
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
  const [position, setPosition] = useState(-1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // const position = players.findIndex((x) => x.id === email);

  // day data
  const [days, setDays] = useState(1);
  const [dayTimeChat, setDayTimeChat] = useState([]);
  // night data
  const [nights, setNights] = useState(1);
  const [nightTimeChat, setNightTimeChat] = useState([]);
  const [vampireNightTimeChat, setVampireNightTimeChat] = useState([]);
  //Conspirator Skill
  const [chooseSomeone, setChooseSomeone] = useState(null);
  // police skill
  const [canShoot, setCanShoot] = useState(true);

  const positionRef = useRef(position);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  useSocket(() => {
    return () => {
      socket.emit("killThePlayer", {
        roomId: roomId,
        position: positionRef.current,
      });
    };
  }, []);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const assignNewReaper = () => {
    // 當遊戲開始後才進行
    if (gameStart) {
      const originReaper = playersData.find((player) => player.role === "reaper");
      const existingReaper = playersData.find((player) => player.role === "reaper");

      // 設定當reaper死後才進行

      if (!originReaper?.alive) {
        // 係現有既玩家篩選反派出來
        const witchCharacterWithoutReaper = playersData.filter(
          (player) => player.role === "cultist" || player.role === "scammer" || player.role === "twistedFate"
        );
        // 當剩下的反派角色數>1 時才進行(不包括reaper)
        if (witchCharacterWithoutReaper.length > 0) {
          const randomIndex = Math.floor(Math.random() * witchCharacterWithoutReaper.length);
          //隨機抽取一個現有反派成為reaper
          const newReaper = witchCharacterWithoutReaper[randomIndex];

          const newReaperIndex = playersData.findIndex((player) => player.role === newReaper.role);

          playersData[newReaperIndex].role = "reaper";
        }
      }
    }
  };

  useEffect(() => {
    if (gameStart) {
      assignNewReaper();
      checkWon();
    }
  }, [playersData]);

  const checkWon = () => {
    const townArr = [...Object.keys(characterData.town)];
    const witchArr = [...Object.keys(characterData.witch)];
    const currTown = playersData.filter((player) => townArr.includes(player.role) && player.alive === true);
    const currWitch = playersData.filter((player) => witchArr.includes(player.role) && player.alive === true);
    const currVampire = playersData.filter((player) => player.role === "vampire");
    if (currWitch.length === 0 && currVampire.length === 0 && currTown.length > 0) {
      setGameEndMessage((prev) => [...prev, "town win"]);
      setGameEnd(true);
    }

    if (currTown.length === 0 && currVampire.length === 0 && currWitch.length > 0) {
      setGameEndMessage((prev) => [...prev, "witch win"]);
      setGameEnd(true);
    }

    if (currVampire.length > 0 && currWitch.length === 0 && currTown.length === 0) {
      setGameEndMessage((prev) => [...prev, "vampire win"]);
      setGameEnd(true);
    }

    if (currTown.length === 0 && currWitch.length === 0 && currVampire.length === 0) {
      setGameEndMessage((prev) => [...prev, "draw"]);
      setGameEnd(true);
    }

    playersData.map((player) => {
      if (player.role === "joker" && player.votedOut === true) {
        setGameEndMessage((prev) => [...prev, `${player.name} has won as joker`]);
      }
      if (player.role === "conspirator" && playersData[chooseSomeone]?.votedOut === true) {
        setGameEndMessage((prev) => [...prev, `${player.name} has achieved their goal and wins!`]);
      }
    });
  };

  console.log(roomId);

  useSocket(() => {
    console.log(roomId);

    socket.emit("joinRoom", { roomId: roomId });

    const cookieName = cookies.get("userName");
    if (cookieName) {
      setName(cookieName);
      socket.emit("getPlayer", {
        roomId: roomId,
        playerName: cookieName,
        email: email,
      });
    }
  }, []);

  useSocket(() => {
    socket.on("gameStarted", ({ gameJoin, roomId }) => {
      if (gameJoin) {
        console.log(roomId);
      }
      if (!gameJoin) {
        router.push(`/werewolf`);
      }
    });
    socket.on("playerList", (list) => {
      console.log(list);
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
    socket.on("quitWhenGameStart", (data) => {
      setPlayersData((prev) => prev.map((player, index) => (index === data ? { ...player, alive: false } : player)));
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

    setPosition(players.findIndex((x) => x.id === email));
  }, [players]);

  return (
    <div>
      {/* when the game not start */}
      {!gameEnd && !gameStart && (
        <>
          <LobbyScreen roomId={roomId} playersData={playersData} position={position} socket={socket} />
          <div className="fixed bottom-6 right-6 flex gap-4">
            {/* language */}
            <div className="flex flex-row justify-center items-center cursor-pointer" onClick={changeLanguage}>
              {language ? "中文" : "English"}
              <div variant="outline" className="rounded-full w-12 h-12 p-0 ml-2 flex items-center">
                <Globe2 className="w-6 h-6" />
              </div>
            </div>
            {/* character info */}
            <div
              className="flex flex-row justify-center items-center cursor-pointer"
              onClick={() => setIsPopupOpen(!isPopupOpen)}
            >
              {language ? "Character Info" : "角色說明"}
              <div variant="outline" className="rounded-full w-12 h-12 p-0 ml-2 flex items-center">
                <HelpCircle className="w-6 h-6" />
              </div>
              <Popup isOpen={isPopupOpen} onClose={togglePopup} language={language} />
            </div>
          </div>
        </>
      )}

      {/* when the game started and daytime */}

      {!gameEnd && gameStart && day && (
        <Day
          socket={socket}
          roomId={roomId}
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
          initialVampire={initialVampire}
        />
      )}
      {/* when the game started and nighttime */}
      {!gameEnd && gameStart && !day && (
        <Night
          socket={socket}
          roomId={roomId}
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
      )}
      {/* when the game end */}
      {gameEnd && (
        <div className="flex h-screen justify-center items-center bg-gray-100">
          <GameEnd gameEndMessage={gameEndMessage} playersData={playersData} />
        </div>
      )}
    </div>
  );
}
