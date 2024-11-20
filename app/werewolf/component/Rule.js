import { useState, useContext } from "react";
import { LanguageContext } from "../layout";
const Rule = () => {
  const { changeLanguage, handleOnLanguageChange } =
    useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState({
    objective: false,
    rules: false,
    round: false,
    voting: false,
    background: false,
    victory: false,
    features: false,
  });

  const openDescription = (section) => {
    setIsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  const TC = () => {
    return (
      <>
        <div className="max-w-2xl mx-auto p-6 bg-white-opacity-50 rounded-lg shadow-lg text-white z-10">
          <h1 className="text-center text-2xl font-bold  mb-4">
            遊戲簡介：國際大刀會
          </h1>
          <ul className="list-disc list-inside">
            <li className="mt-2">
              遊戲類型：{" "}
              <span className="font-semibold text-3xl">推理與角色扮演遊戲</span>
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
                  蘑菇市民：保衛香港的安全與和平，唔比班古惑仔搞事。
                </li>
                <li className="mt-1">
                  古惑仔：靜雞雞攞蘑菇市民黎開刀，企圖掌控香港。
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
                  每位玩家隨機獲得一個角色，角色分別有蘑菇市民和古惑仔同埋中立人物，每個角色抽取保證絕不重複。
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
                    <div className="mt-1 text-center text-2xl">
                      遊戲分為日頭和夜晚兩個階段
                    </div>
                    <li className="mt-2">
                      <span className="font-semibold">夜晚:</span>
                      月黑風高殺人夜，班古惑仔會出黎搞搞震，每晚可以㨂一位蘑菇市民黎「消滅」。一啲特殊角色（例如守衛）可以執行各自的能力（如保護一名蘑菇市民）。
                    </li>
                    <li className="mt-1">
                      <span className="font-semibold">日頭:</span>
                      天光啦夠鐘起身準時番工番學，會揭示沉晚被殺害既玩家。玩家需要討論並投票選出一名疑似古惑仔的玩家公開處刑。
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
                      日頭階段允許玩家自由討論，分析和推理其他玩家的身份。投票環節，玩家可以選擇公開處刑一個懷疑係古惑仔的玩家。
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
                  在香港繁華既街道上，古惑仔勢力借啲二咁擴張自己勢力，蘑菇市民面對呢個危機，決定團結起身，保護自己既家園，搵出隱藏喺身邊既古惑仔。每當夜幕低垂，危險就悄悄逼近，唔知邊個仲可以信任。呢場貓捉老鼠既遊戲，究竟係無菇市民成功守護和平，定係古惑仔成功統治成個香港？天光同夜晚之間，一步錯步步錯，每一步都係生死抉擇！
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
                  蘑菇市民勝利：成功KO囇所有古惑仔，恢復香港的和平。
                </li>
                <li className="mt-1">
                  古惑仔勝利：成功隊冧囇所有蘑菇市民，掌控香港。
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
            <div className="mt-4 font-bold text-white">
              快啲嚟參加《國際大刀會》啦！
              齊齊感受緊張刺激嘅推理對抗，仲可以玩到好似置身香港街頭咁，親身經歷風雲變幻嘅大刀會鬥爭！等緊你一齊加入呢場智力同膽識嘅終極考驗！
            </div>
          </ul>
        </div>
      </>
    );
  };
  const EN = () => {
    return (
      <>
        <div className="max-w-3xl mx-auto p-6 bg-white-opacity rounded-lg shadow-lg text-white z-10">
          <h1 className="text-center text-2xl font-bold text-white mb-4">
            Game Introduction: Hong Kong Gangsters vs. Citizens Werewolf
          </h1>
          <ul className="list-disc list-inside">
            <li className="mt-2">
              Game Type:{" "}
              <span className="font-semibold text-3xl">
                Social Deduction Game
              </span>
            </li>
            <li className="mt-2">
              Number of Players:{" "}
              <span className="font-semibold text-3xl">6-12 players</span>
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
                <div className="mt-1 text-center text-2xl">
                  The game consists of two phases: day and night.
                </div>
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
            <div className="mt-4 font-bold text-white">
              Join the game of Hong Kong Gangsters vs. Citizens Werewolf and
              experience the thrilling tension of deduction and competition, all
              set against the vibrant backdrop of Hong Kong’s streets!
            </div>
          </ul>
        </div>
      </>
    );
  };
  return <div className="relative">{!changeLanguage ? TC() : EN()}</div>;
};

export default Rule;
