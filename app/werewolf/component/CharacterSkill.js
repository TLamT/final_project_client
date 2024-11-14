"use-client";
import { useState, useEffect } from "react";

const CharacterSkill = ({ changeLanguage }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [displayContent, setDisplayContent] = useState(null);
  const [displayRoleSkill, setDisplayRoleSkill] = useState(null);
  const handleOnChange = () => {
    setChangeLanguage((prevState) => !prevState);
    console.log(!changeLanguage);
  };
  const chooseFaction = (event) => {
    const value = event?.target.value;
    setSelectedOption(value);
    updateContent(value);
  };
  const chooseRole = (event) => {
    const value = event?.target.value;
    setSelectedRole(value);
    updateSkill(value);
  };
  const updateContent = (value) => {
    changeLanguage ? perfromAction(value) : perfromActionTC(value);
  };
  const updateSkill = (value) => {
    changeLanguage ? roleSkill(value) : roleSkillTC(value);
  };
  //選擇陣營
  const perfromAction = (value) => {
    switch (value) {
      case "option1":
        setDisplayContent(
          <div className="border-2 border-sky-500 ">
            <div className="text-center mt-4">Town Faction:</div>
            <div>
              <span className="font-bold text-lg">Objective:</span> Eliminate all Vampires and Witches to restore peace
              in the town.
            </div>
            <div>
              <span className="font-bold text-lg">Victory Condition: </span> The game is won when no Vampires, Witches,
              or other harmful roles remain in the game.
            </div>
          </div>
        );
        break;
      case "option2":
        setDisplayContent(
          <div className="border-2 border-rose-500">
            <div className="text-center mt-4">Witch Faction:</div>
            <div>
              <span className="font-bold text-lg">Objective: </span> Gain control of the town by eliminating Town
              members and all other opposing factions.
            </div>
            <div>
              <span className="font-bold text-lg">Victory Condition: </span>The game is won if only the Witch faction
              remains, or they have achieved town dominance through their influence.
            </div>
          </div>
        );
        break;
      case "option3":
        setDisplayContent(
          <div className="border-2 border-grey-500">
            <div className="text-center">Neutral Faction </div>
            <div className="mt-4">Vampire:</div>
            <div>
              <span className="font-bold text-lg">Objective: </span> Convert all surviving players into Vampire Thralls
              or eliminate all non-Vampire players.
            </div>
            <div>
              <span className="font-bold text-lg">Victory Condition: </span>The game is won if only Vampires and their
              Thralls remain in the game.
            </div>
            <div className="mt-4">Joker:</div>
            <div>
              <span className="font-bold text-lg">Objective: </span> Get voted out by the players to “entertain” the
              town.
            </div>
            <div>
              <span className="font-bold text-lg">Victory Condition: </span>The Joker wins if they are voted out by the
              players. Upon winning, the Joker may kill one player who voted against them.
            </div>
            <div className="mt-4">Reminiscence (The Inheritor):</div>
            <div>
              <span className="font-bold text-lg">Objective: </span> Adapts to the victory condition of the faction they
              inherit after taking on a deceased player’s role.
            </div>
            <div>
              <span className="font-bold text-lg">Victory Condition: </span>
              Aligned with the new faction’s victory condition once the role is inherited.
            </div>
            <div className="mt-4">Conspirator:</div>
            <div>
              <span className="font-bold text-lg">Objective: </span> Manipulate the voting process to have a specific
              target player voted out.
            </div>
            <div>
              <span className="font-bold text-lg">Victory Condition: </span>
              The Conspirator wins if they successfully orchestrate the voting to get their chosen player eliminated. If
              they achieve this, they win regardless of which faction ultimately wins the game.
            </div>
          </div>
        );
        break;
    }
  };
  const perfromActionTC = (value) => {
    switch (value) {
      case "option1":
        setDisplayContent(
          <div className="border-2 border-sky-500">
            <div className="text-center mt-4">城鎮陣營:</div>
            <div>
              <span className="font-bold text-lg">目標:</span> 消滅所有吸血鬼和邪惡陣營，恢復小鎮的和平。
            </div>
            <div>
              <span className="font-bold text-lg">勝利條件: </span>{" "}
              當遊戲中不再有吸血鬼、女巫或其他有害角色時，遊戲獲勝。
            </div>
          </div>
        );
        break;
      case "option2":
        setDisplayContent(
          <div className="border-2 border-rose-500 ">
            <div className="text-center mt-4">邪惡陣營</div>
            <div>
              <span className="font-bold text-lg">目標: </span> 通過消滅城鎮成員和所有其他對立陣營來獲得對小鎮的控制。
            </div>
            <div>
              <span className="font-bold text-lg">勝利條件: </span>
              當遊戲中僅剩下女巫陣營，或她們通過影響力達到城鎮主導地位時，遊戲獲勝。
            </div>
          </div>
        );
        break;
      case "option3":
        setDisplayContent(
          <div className="border-2 border-grey-500">
            <div className="text-center mt-4">中立陣營</div>
            <div className="mt-4">吸血鬼:</div>
            <div>
              <span className="font-bold text-lg">目標: </span>{" "}
              將所有存活的玩家轉化為吸血鬼隨從，或消滅所有非吸血鬼玩家。
            </div>
            <div>
              <span className="font-bold text-lg">勝利條件: </span> 當遊戲中僅剩下吸血鬼及其隨從時，遊戲獲勝。
            </div>
            <div className="mt-4">小丑:</div>
            <div>
              <span className="font-bold text-lg">目標: </span> 被玩家投票淘汰以“娛樂”小鎮。
            </div>
            <div>
              <span className="font-bold text-lg">勝利條件: </span>
              小丑如果被玩家投票淘汰則獲勝。獲勝後，小丑可以殺死一名投票反對他們的玩家。
            </div>
            <div className="mt-4">追憶者 (繼承者):</div>
            <div>
              <span className="font-bold text-lg">目標: </span> 在繼承已故玩家的角色後，適應他們所繼承陣營的勝利條件。
            </div>
            <div>
              <span className="font-bold text-lg">勝利條件: </span>
              一旦繼承角色，與新陣營的勝利條件保持一致。
            </div>
            <div className="mt-4">謀略者:</div>
            <div>
              <span className="font-bold text-lg">目標: </span> 操縱投票過程，讓特定目標玩家被投票淘汰。
            </div>
            <div>
              <span className="font-bold text-lg">勝利條件: </span>
              如果共謀者成功操縱投票，使其選定的玩家被淘汰，則獲勝。若達成此目標，無論最終哪個陣營贏得遊戲，他都將獲勝。
            </div>
          </div>
        );
        break;
    }
  };
  useEffect(() => {
    updateContent(selectedOption);
  }, [selectedOption, changeLanguage]);
  useEffect(() => {
    updateSkill(selectedRole);
  }, [selectedRole, changeLanguage]);
  // 角色技能
  const roleSkill = (value) => {
    switch (value) {
      case "optionA": // Police
        setDisplayRoleSkill(
          <div className="p-4 border rounded-lg bg-blue-100 text-blue-800">
            <strong>Police:</strong> Can kill a player at night. If the target is innocent, the Police loses their
            ability to kill further. Can shoot twice in total.
          </div>
        );
        break;
      case "optionB": // Detective
        setDisplayRoleSkill(
          <div className="p-4 border rounded-lg bg-green-100 text-green-800">
            <strong>Detective:</strong> Can check the alignment (good or bad) of a player each night.
          </div>
        );
        break;
      case "optionC": // Defender
        setDisplayRoleSkill(
          <div className="p-4 border rounded-lg bg-yellow-100 text-yellow-800">
            <strong>Defender:</strong> Protects a player at night.
          </div>
        );
        break;
      case "optionD": // Medium
        setDisplayRoleSkill(
          <div className="p-4 border rounded-lg bg-purple-100 text-purple-800">
            <strong>Medium:</strong> Can check dead player chat room at night.
          </div>
        );
        break;
      case "optionE": // Cupid
        setDisplayRoleSkill(
          <div className="p-4 border rounded-lg bg-pink-100 text-pink-800">
            <strong>Cupid:</strong> During the game start, Cupid can link the lives of two players. If one dies, the
            other dies too, regardless of faction.
          </div>
        );
        break;
      case "optionF": // Sentinel
        setDisplayRoleSkill(
          <div className="p-4 border rounded-lg bg-indigo-100 text-indigo-800">
            <strong>Sentinel:</strong> Can check on a player each night. If any players visited the target that night,
            their names will be revealed to the Sentinel.
          </div>
        );
        break;
      case "optionG": // Jailor
        setDisplayRoleSkill(
          <div className="p-4 border rounded-lg bg-gray-100 text-gray-800">
            <strong>Jailor:</strong> Selects a player to imprison, preventing them from using their ability that night.
            The jailed player cannot be killed while in jail.
          </div>
        );
        break;
      case "optionH": // VampireHunter
        setDisplayRoleSkill(
          <div className="p-4 border rounded-lg bg-red-100 text-red-800">
            <strong>Vampire Hunter:</strong> Can target a player at night. If they target a Vampire, they kill them. If
            attacked by a Vampire, the Vampire dies instead. If no Vampires exist, they become a Police instead.
          </div>
        );
        break;
      case "optionI": // Reaper
        setDisplayRoleSkill(
          <div className="p-4 border rounded-lg bg-orange-100 text-orange-800">
            <strong>Reaper:</strong> Can kill a player each night. If the Reaper dies and there is no Potion Master, a
            random Witch player will inherit the Reaper role.
          </div>
        );
        break;
      case "optionJ": // Cultist
        setDisplayRoleSkill(
          <div className="p-4 border rounded-lg bg-teal-100 text-teal-800">
            <strong>Cultist:</strong> Appears as “good” if checked by a Detector, but their true alignment is with the
            Witch faction.
          </div>
        );
        break;
      case "optionK": // Scammer
        setDisplayRoleSkill(
          <div className="p-4 border rounded-lg bg-blueGray-100 text-blueGray-800">
            <strong>Scammer:</strong> Can choose a player each night to “frame.” This targeted player will appear as
            “bad” if checked by a Detector.
          </div>
        );
        break;
      case "optionL": // TwistedFate
        setDisplayRoleSkill(
          <div className="p-4 border rounded-lg bg-rose-100 text-rose-800">
            <strong>Twisted Fate:</strong> All or Nothing.
          </div>
        );
        break;
      case "optionM": // Vampire
        setDisplayRoleSkill(
          <div className="p-4 border rounded-lg bg-purple-100 text-purple-800">
            <strong>Vampire:</strong> Can convert other players into Vampire Thralls. If a Vampire targets a Werewolf,
            the Werewolf dies.
          </div>
        );
        break;
      case "optionN": // Conspirator
        setDisplayRoleSkill(
          <div className="p-4 border rounded-lg bg-orange-100 text-orange-800">
            <strong>Conspirator:</strong> Can manipulate events to get a selected player voted out.
          </div>
        );
        break;
      case "optionO": // Joker
        setDisplayRoleSkill(
          <div className="p-4 border rounded-lg bg-red-100 text-red-800">
            <strong>Joker:</strong> Tries to get voted out to “entertain” the others. When voted out, can kill one
            player who voted for them.
          </div>
        );
        break;
      case "optionP": // Reminiscence
        setDisplayRoleSkill(
          <div className="p-4 border rounded-lg bg-blue-100 text-blue-800">
            <strong>Reminiscence:</strong> Can select a dead player once per game to inherit their role, faction, and
            mission. Their new identity will be revealed in chat.
          </div>
        );
        break;
    }
  };
  // 角色技能中文版
  const roleSkillTC = (value) => {
    switch (value) {
      case "optionA": // Police
        setDisplayRoleSkill(
          <div className="p-4 mb-4 border rounded-lg bg-blue-100 text-blue-800 shadow">
            <strong>警察技能（剷除異己）</strong>: “一槍不夠就兩槍啦？
            在夜晚殺一個人，若殺的角色為無辜者，將失去手槍，則變為沒有任何能力的市民。”
          </div>
        );
        break;
      case "optionB": // Detective
        setDisplayRoleSkill(
          <div className="p-4 mb-4 border rounded-lg bg-green-100 text-green-800 shadow">
            <strong>偵探技能（明察秋毫）</strong>: “偵探用放大鏡，解鎖每晚的‘八卦新聞’！哪邊好哪邊壞，等我一查便知！”
            每晚可以查看一名玩家的陣營（好人或壞人）。
          </div>
        );
        break;
      case "optionC": // Defender
        setDisplayRoleSkill(
          <div className="p-4 mb-4 border rounded-lg bg-yellow-100 text-yellow-800 shadow">
            <strong>守衛者技能（堅如磐石）</strong>:
            “守護者守護！今晚幫你擋子彈，聽晚我換個人罩，畢竟這個城鎮不缺麻煩。” 每晚保護一名玩家。
          </div>
        );
        break;
      case "optionD": // Medium
        setDisplayRoleSkill(
          <div className="p-4 mb-4 border rounded-lg bg-purple-100 text-purple-800 shadow">
            <strong>靈媒技能（通靈）</strong>: “靈媒的口號：‘死者之言，聲聲入耳。這是來自陰間的最新報告！’”
            每晚都能夠查看已死玩家之間的對話。
          </div>
        );
        break;
      case "optionE": // Cupid
        setDisplayRoleSkill(
          <div className="p-4 mb-4 border rounded-lg bg-pink-100 text-pink-800 shadow">
            <strong>丘比特技能（愛神祝福）</strong>: “愛神的箭矢一出，天雷勾地火。無論愛情還是毀滅，皆在箭矢之下！”
            能夠將一人與其連結。如果其中一人死亡，另一人也會隨之殉情，無論陣營。
          </div>
        );
        break;
      case "optionF": // Sentinel
        setDisplayRoleSkill(
          <div className="p-4 mb-4 border rounded-lg bg-indigo-100 text-indigo-800 shadow">
            <strong>哨兵技能（窺間伺隙）</strong>: “哨兵：‘誰來了？都在我眼皮底下，做賊心虛的，全都一清二楚！’”
            每晚可以查看一名玩家。如果有其他人當晚拜訪了該玩家，他們的名字將會顯示給哨兵。
          </div>
        );
        break;
      case "optionG": // Jailor
        setDisplayRoleSkill(
          <div className="p-4 mb-4 border rounded-lg bg-gray-100 text-gray-800 shadow">
            <strong>獄卒技能（畫地為牢）</strong>: “你敢來搞事？獄卒大手一揮，關小黑屋，讓你冷靜冷靜！”
            選擇一名玩家將其關押，阻止該玩家當晚使用技能。被囚禁的玩家在監禁期間無法被殺死。
          </div>
        );
        break;
      case "optionH": // VampireHunter
        setDisplayRoleSkill(
          <div className="p-4 mb-4 border rounded-lg bg-red-100 text-red-800 shadow">
            <strong>吸血鬼獵人技能（百步穿楊）</strong>: “獵人專業剋星，讓我一劍封喉！吸血鬼見我都繞著走。”
            可以在晚上選擇一名玩家。如果目標是吸血鬼，則將其殺死。如果被吸血鬼攻擊，吸血鬼會反被殺死。如果場上無吸血鬼，獵人將成為治安官。
          </div>
        );
        break;
      case "optionI": // Reaper
        setDisplayRoleSkill(
          <div className="p-4 mb-4 border rounded-lg bg-orange-100 text-orange-800 shadow">
            <strong>殺手技能（開膛破肚）</strong>: “開膛手的信條：‘刀在手，天下我有！下個夜晚，誰是倒霉蛋？’”
            每晚可以殺死一名玩家。如果開膛手死亡且場上無藥劑師，則隨機選擇一名巫師成為開膛手。
          </div>
        );
        break;
      case "optionJ": // Cultist
        setDisplayRoleSkill(
          <div className="p-4 mb-4 border rounded-lg bg-teal-100 text-teal-800 shadow">
            <strong>黑幫二五仔技能（狂熱教徒）</strong>:
            “我是‘好人’，但是默默支持黑手黨？低調行事才是異端教的最高信仰！”
            當被偵探查看時，會顯示為好人，但實際立場隸屬於巫師陣營。
          </div>
        );
        break;
      case "optionK": // Scammer
        setDisplayRoleSkill(
          <div className="p-4 mb-4 border rounded-lg bg-blueGray-100 text-blueGray-800 shadow">
            <strong>欺詐師技能（完美偽裝）</strong>: “偽裝成好人？小菜一碟！我可是全鎮最會演戲的騙子！”
            每晚可以選擇一名玩家“陷害”其目標。當偵探查看該玩家時，將顯示為“壞人”。
          </div>
        );
        break;
      case "optionL": // TwistedFate
        setDisplayRoleSkill(
          <div className="p-4 mb-4 border rounded-lg bg-rose-100 text-rose-800 shadow">
            <strong>賭徒技能（逆命）</strong>: “一賭成名” 夜間可以賭一個人的具體身份，賭中對方出局；賭不中自己出局。
          </div>
        );
        break;
      case "optionM": // Vampire
        setDisplayRoleSkill(
          <div className="p-4 mb-4 border rounded-lg bg-purple-100 text-purple-800 shadow">
            <strong>吸血鬼技能（嗜血成性）</strong>: “吸血鬼夜半出沒，吸血轉化，成為我忠誠的僕人！”
            可以將其他玩家轉化為吸血鬼奴僕。如果吸血鬼攻擊狼人，狼人會死亡。
          </div>
        );
        break;
      case "optionN": // Conspirator
        setDisplayRoleSkill(
          <div className="p-4 mb-4 border rounded-lg bg-orange-100 text-orange-800 shadow">
            <strong>謀略家技能（爾虞我詐）</strong>: “陰謀算計？謀略家可不是等閒之輩，誰該走，我說了算！”
            想辦法操縱局勢，讓某位玩家被投票出局。
          </div>
        );
        break;
      case "optionO": // Joker
        setDisplayRoleSkill(
          <div className="p-4 mb-4 border rounded-lg bg-red-100 text-red-800 shadow">
            <strong>小丑技能（娛樂至死）</strong>:
            “我的存在就是一個笑話，票我出局，我帶走一人，用我最大的死亡來取悅眾人！”
            試圖被投票出局來“取悅”眾人。被投票出局後，可以選擇殺死一位投票給他的人。
          </div>
        );
        break;
      case "optionP": // Reminiscence
        setDisplayRoleSkill(
          <div className="p-4 mb-4 border rounded-lg bg-blue-100 text-blue-800 shadow">
            <strong>追憶者技能（追憶）</strong>: “追憶者喚醒亡靈，不僅繼承其能力，還讓你們重新認識真正的我！”
            在遊戲中僅能選擇一名已故玩家，繼承其角色、陣營和任務。新的身份將在聊天中公開。
          </div>
        );
        break;
    }
  };

  return (
    <>
      <div className=" mt-4 flex flex-row items-center">
        <div className="flex">
          <select onChange={chooseFaction} className="text-center border-2 border-rose-500">
            {changeLanguage ? (
              <>
                <option value="" defaultValue>
                  Please choose a Faction!
                </option>
                <option value="option1">Town</option>
                <option value="option2">Witch</option>
                <option value="option3">Neutral</option>
              </>
            ) : (
              <>
                <option value="" defaultValue>
                  請選擇查看陣營!!!
                </option>
                <option value="option1">城鎮陣營</option>
                <option value="option2">邪惡陣營</option>
                <option value="option3">中立陣營</option>
              </>
            )}
          </select>
        </div>
      </div>

      <div>
        <select onChange={chooseRole} className="text-center border-2 border-black">
          {changeLanguage ? (
            <>
              {selectedOption === "option1" && (
                <>
                  <option className="text-sky-500" value="optionA">
                    Police
                  </option>
                  <option className="text-sky-500" value="optionB">
                    Detective
                  </option>
                  <option className="text-sky-500" value="optionC">
                    Defender
                  </option>
                  <option className="text-sky-500" value="optionD">
                    Medium
                  </option>
                  <option className="text-sky-500" value="optionE">
                    Cupid
                  </option>
                  <option className="text-sky-500" value="optionF">
                    Sentinel
                  </option>
                  <option className="text-sky-500" value="optionG">
                    Jailor
                  </option>
                  <option className="text-sky-500" value="optionH">
                    VampireHunter
                  </option>
                </>
              )}
              {selectedOption === "option2" && (
                <>
                  <option className="text-rose-500" value="optionI">
                    Reaper
                  </option>
                  <option className="text-rose-500" value="optionJ">
                    Cultist
                  </option>
                  <option className="text-rose-500" value="optionK">
                    Scammer
                  </option>
                  <option className="text-rose-500" value="optionL">
                    TwistedFate
                  </option>
                </>
              )}
              {selectedOption === "option3" && (
                <>
                  <option className="text-neutral-500" value="optionM">
                    Vampire
                  </option>
                  <option className="text-neutral-500" value="optionN">
                    Conspirator
                  </option>
                  <option className="text-neutral-500" value="optionO">
                    Joker
                  </option>
                  <option className="text-neutral-500" value="optionP">
                    Reminiscence
                  </option>
                </>
              )}
            </>
          ) : (
            <>
              {selectedOption === "option1" && (
                <>
                  <option className="text-sky-500" value="optionA">
                    警察
                  </option>
                  <option className="text-sky-500" value="optionB">
                    偵察
                  </option>
                  <option className="text-sky-500" value="optionC">
                    守衛者
                  </option>
                  <option className="text-sky-500" value="optionD">
                    靈媒
                  </option>
                  <option className="text-sky-500" value="optionE">
                    丘比特
                  </option>
                  <option className="text-sky-500" value="optionF">
                    哨兵
                  </option>
                  <option className="text-sky-500" value="optionG">
                    獄卒
                  </option>
                  <option className="text-sky-500" value="optionH">
                    吸血鬼獵人
                  </option>
                </>
              )}
              {selectedOption === "option2" && (
                <>
                  <option className="text-rose-500" value="optionI">
                    殺手
                  </option>
                  <option className="text-rose-500" value="optionJ">
                    黑幫二五仔
                  </option>
                  <option className="text-rose-500" value="optionK">
                    欺詐師
                  </option>
                  <option className="text-rose-500" value="optionL">
                    賭徒
                  </option>
                </>
              )}
              {selectedOption === "option3" && (
                <>
                  <option className="text-neutral-500" value="optionM">
                    吸血鬼
                  </option>
                  <option className="text-neutral-500" value="optionN">
                    謀略家
                  </option>
                  <option className="text-neutral-500" value="optionO">
                    小丑
                  </option>
                  <option className="text-neutral-500" value="optionP">
                    追憶者
                  </option>
                </>
              )}
            </>
          )}
        </select>
      </div>
      <div className="w-[800px] mt-4">{displayContent}</div>
      <div className="w-[800px] mt-4 border-2 border-rose-500">{displayRoleSkill}</div>
    </>
  );
};

export default CharacterSkill;
