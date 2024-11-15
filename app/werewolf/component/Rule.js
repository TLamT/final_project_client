import { useState } from "react";

const Rule = () => {
  const [changeLanguage, setChangeLanguage] = useState(true);
  const [isOpen, setIsOpen] = useState({
    objective: false,
    rules: false,
    round: false,
    voting: false,
    background: false,
    victory: false,
    features: false,
  });
  const handleOnChange = () => {
    setChangeLanguage((prevState) => !prevState);
    console.log(!changeLanguage);
  };
  const openDescription = (section) => {
    setIsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  const TC = () => {
    return (
      <>
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-center text-2xl font-bold text-sky-500 mb-4">
            遊戲簡介：香港風雲
          </h1>
          <ul className="list-disc list-inside">
            <li className="mt-2">
              遊戲類型：{" "}
              <span className="font-semibold text-3xl">推理遊戲</span>
            </li>
            <li className="mt-2">
              參與人數： <span className="font-semibold text-3xl">6-12人</span>
            </li>
            <hr className="my-4" />
            <div className="mt-4 font-semibold flex justify-between items-center">
              目標：
              <button
                onClick={() => openDescription("objective")}
                className=" text-2xl"
              >
                {isOpen.objective ? "△" : "▽"}
              </button>
            </div>
            {isOpen.objective && (
              <>
                <li className="mt-1">
                  市民：找出並消滅所有黑幫成員，保衛香港的安全與和平。
                </li>
                <li className="mt-1">
                  黑幫：隱密地消滅市民，直到黑幫人數超過市民，掌控香港。
                </li>
              </>
            )}

            <div className="mt-2 font-semibold flex justify-between items-center">
              遊戲規則
              <button
                onClick={() => openDescription("rules")}
                className=" text-2xl"
              >
                {isOpen.rules ? "△" : "▽"}
              </button>
            </div>
            {isOpen.rules && (
              <>
                <li className="mt-2 ml-4 font-semibold flex justify-between items-center">
                  角色分配
                </li>
                <li className="mt-1">
                  每位玩家隨機獲得一個角色，角色分為市民和黑幫。市民包括一般市民、警察、醫生等特殊角色，黑幫成員則有更強的隱密能力。
                </li>

                <div className="mt-2 ml-4 font-semibold flex justify-between items-center">
                  遊戲輪次
                  <button
                    onClick={() => openDescription("round")}
                    className=" text-2xl"
                  >
                    {isOpen.round ? "△" : "▽"}
                  </button>
                </div>
                {isOpen.round && (
                  <>
                    <div className="mt-1 text-center">
                      遊戲分為白天和夜晚兩個階段
                    </div>
                    <li className="mt-2">
                      <span className="font-semibold">夜晚:</span>{" "}
                      所有玩家閉上眼睛，黑幫成員悄悄選擇一名市民進行「消滅」。特殊角色（如醫生）可以執行各自的能力（如保護一名玩家）。
                    </li>
                    <li className="mt-1">
                      <span className="font-semibold">白天:</span>{" "}
                      所有玩家睜開眼睛，揭示被消滅的玩家。玩家討論並投票選出一名疑似黑幫的玩家進行「處決」。
                    </li>
                  </>
                )}

                <div className="mt-2 ml-4 font-semibold flex justify-between items-center">
                  討論與投票
                  <button
                    onClick={() => openDescription("voting")}
                    className=" text-2xl"
                  >
                    {isOpen.voting ? "△" : "▽"}
                  </button>
                </div>
                {isOpen.voting && (
                  <>
                    <li className="mt-1">
                      白天階段允許玩家自由討論，分析和推理其他玩家的身份。投票環節，玩家可以選擇處決一個懷疑是黑幫的玩家。
                    </li>
                  </>
                )}
              </>
            )}
            <div className="mt-2 font-semibold flex justify-between items-center">
              背景設定
              <button
                onClick={() => openDescription("background")}
                className=" text-2xl"
              >
                {isOpen.background ? "△" : "▽"}
              </button>
            </div>
            {isOpen.background && (
              <>
                <li className="mt-1">
                  在香港的繁華街道上，黑幫的勢力悄悄擴張，市民為了保護自己的家園，必須團結起來，揭露隱藏在身邊的黑幫成員。夜晚的降臨意味著危險的來臨，誰能在這隻貓捉老鼠的遊戲中勝出？
                </li>
              </>
            )}

            <div className="mt-2 font-semibold flex justify-between items-center">
              勝利條件
              <button
                onClick={() => openDescription("victory")}
                className=" text-2xl"
              >
                {isOpen.victory ? "△" : "▽"}
              </button>
            </div>
            {isOpen.victory && (
              <>
                <li className="mt-1">
                  市民勝利：成功處決所有黑幫成員，恢復香港的和平。
                </li>
                <li className="mt-1">
                  黑幫勝利：黑幫人數超過市民，或成功消滅所有市民，掌控香港。
                </li>
              </>
            )}

            <div className="mt-2 font-semibold flex justify-between items-center">
              遊戲特點
              <button
                onClick={() => openDescription("features")}
                className=" text-2xl"
              >
                {isOpen.features ? "△" : "▽"}
              </button>
            </div>
            {isOpen.features && (
              <>
                <li className="mt-1">
                  推理與策略：玩家需要透過言語和行為判斷他人的身份，制定策略。
                </li>
                <li className="mt-1">
                  社交互動：鼓勵玩家之間的交流與合作，增加遊戲的趣味性。
                </li>
                <li className="mt-1">
                  多元角色：不同角色的能力使得每局遊戲都有新的變化和挑戰。
                </li>
              </>
            )}
            <div className="mt-4 font-bold text-sky-600">
              快來加入《香港風雲》的遊戲吧，體驗緊張刺激的推理對抗，感受香港街頭的風雲變幻！
            </div>
          </ul>
        </div>
      </>
    );
  };
  const EN = () => {
    return (
      <>
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-center text-2xl font-bold text-sky-500 mb-4">
            Game Introduction: Hong Kong Gangsters vs. Citizens Werewolf
          </h1>
          <ul className="list-disc list-inside">
            <li className="mt-2">
              Game Type:{" "}
              <span className="font-semibold">Social Deduction Game</span>
            </li>
            <li className="mt-2">
              Number of Players:{" "}
              <span className="font-semibold">6-12 players</span>
            </li>
            <hr className="my-4" />
            <div className="mt-4 font-semibold flex justify-between items-center">
              Objective
              <button
                onClick={() => openDescription("objective")}
                className=" text-2xl"
              >
                {isOpen.objective ? "△" : "▽"}
              </button>
            </div>
            {isOpen.objective && (
              <>
                <li className="mt-1">
                  Citizens: Identify and eliminate all gang members to protect
                  the safety and peace of Hong Kong.
                </li>
                <li className="mt-1">
                  Gangsters: Secretly eliminate citizens until the number of
                  gang members exceeds that of the citizens, taking control of
                  Hong Kong.
                </li>
              </>
            )}

            <div className="mt-2 font-semibold flex justify-between items-center">
              Game Rules
              <button
                onClick={() => openDescription("rules")}
                className=" text-2xl"
              >
                {isOpen.rules ? "△" : "▽"}
              </button>
            </div>
            {isOpen.rules && (
              <>
                <li className="mt-2 font-semibold flex justify-between items-center">
                  Role Assignment:
                </li>
                <li className="mt-1">
                  Each player is randomly assigned a role, divided into citizens
                  and gangsters. Citizens include regular citizens and special
                  roles (such as the police and doctor), while gangsters have
                  stronger hidden abilities.
                </li>
              </>
            )}

            <div className="mt-2 font-semibold flex justify-between items-center">
              Game Rounds
              <button
                onClick={() => openDescription("round")}
                className=" text-2xl"
              >
                {isOpen.round ? "△" : "▽"}
              </button>
            </div>
            {isOpen.round && (
              <>
                <li className="mt-1">
                  The game consists of two phases: day and night.
                </li>
                <li className="mt-1">
                  <span className="font-semibold">Night:</span> All players
                  close their eyes. Gangsters secretly choose one citizen to
                  "eliminate." Special roles (like the doctor) can use their
                  abilities to protect a player.
                </li>
                <li className="mt-1">
                  <span className="font-semibold">Day:</span> All players open
                  their eyes, revealing the eliminated player. Players discuss
                  and vote to select a suspected gangster for "execution."
                </li>
              </>
            )}

            <div className="mt-2 font-semibold flex justify-between items-center">
              Discussion and Voting
              <button
                onClick={() => openDescription("voting")}
                className=" text-2xl"
              >
                {isOpen.voting ? "△" : "▽"}
              </button>
            </div>
            {isOpen.voting && (
              <>
                <li className="mt-1">
                  During the day phase, players can freely discuss and analyze
                  the identities of others. In the voting phase, players can
                  choose to execute a player they suspect to be a gangster.
                </li>
              </>
            )}

            <div className="mt-2 font-semibold flex justify-between items-center">
              Background Setting
              <button
                onClick={() => openDescription("background")}
                className=" text-2xl"
              >
                {isOpen.background ? "△" : "▽"}
              </button>
            </div>
            {isOpen.background && (
              <>
                <li className="mt-1">
                  In the bustling streets of Hong Kong, the influence of
                  gangsters is quietly expanding. Citizens must unite to protect
                  their homes and expose the gang members hiding among them. As
                  night falls, danger looms—who will emerge victorious in this
                  cat-and-mouse game?
                </li>
              </>
            )}

            <div className="mt-2 font-semibold flex justify-between items-center">
              Victory Conditions
              <button
                onClick={() => openDescription("victory")}
                className=" text-2xl"
              >
                {isOpen.victory ? "△" : "▽"}
              </button>
            </div>
            {isOpen.victory && (
              <>
                <li className="mt-1">
                  Citizens Win: Successfully execute all gang members and
                  restore peace to Hong Kong.
                </li>
                <li className="mt-1">
                  Gangsters Win: The number of gangsters exceeds that of the
                  citizens or successfully eliminate all citizens, taking
                  control of Hong Kong.
                </li>
              </>
            )}

            <div className="mt-2 font-semibold flex justify-between items-center">
              Game Features
              <button
                onClick={() => openDescription("features")}
                className=" text-2xl"
              >
                {isOpen.features ? "△" : "▽"}
              </button>
            </div>
            {isOpen.features && (
              <>
                <li className="mt-1">
                  Deduction and Strategy: Players must use dialogue and behavior
                  to discern others' identities and devise strategies.
                </li>
                <li className="mt-1">
                  Social Interaction: Encourages communication and cooperation
                  among players, enhancing the fun of the game.
                </li>
                <li className="mt-1">
                  Diverse Roles: Different abilities of roles ensure that every
                  game session offers new challenges and dynamics.
                </li>
              </>
            )}
            <div className="mt-4 font-bold text-sky-600">
              Join the game of Hong Kong Gangsters vs. Citizens Werewolf and
              experience the thrilling tension of deduction and competition, all
              set against the vibrant backdrop of Hong Kong’s streets!
            </div>
          </ul>
        </div>
      </>
    );
  };
  return (
    <div className="flex flex-col h-full w-full">
      <div className="mt-4 ml-4">
        <button
          onClick={handleOnChange}
          className="border-2 border-black py-3 px-10 rounded-xl transition-all"
        >
          {changeLanguage ? "English" : "中文"}
        </button>
      </div>
      <div className="mt-20 h-4/6">{changeLanguage ? TC() : EN()}</div>
    </div>
  );
};

export default Rule;
