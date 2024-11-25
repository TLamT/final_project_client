"use-client";
import { useState, useEffect } from "react";

const CharacterSkill = ({ language }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [displayContent, setDisplayContent] = useState(null);
  const [displayRoleSkill, setDisplayRoleSkill] = useState(null);
  const handleOnChange = () => {
    setlanguag((prevState) => !prevState);
    // console.log(!language);
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
    language ? perfromAction(value) : perfromActionTC(value);
  };
  const updateSkill = (value) => {
    language ? roleSkill(value) : roleSkillTC(value);
  };
  //選擇陣營
  const perfromAction = (value) => {
    switch (value) {
      case "option1":
        setDisplayContent(
          <div className="border-2 border-sky-500 ">
            <div className="text-center mt-4">Town Faction:</div>
            <div>
              <span className="font-bold text-lg">Objective:</span> Eliminate
              all Vampires and Witches to restore peace in the town.
            </div>
            <div>
              <span className="font-bold text-lg">Victory Condition: </span> The
              game is won when no Vampires, Witches, or other harmful roles
              remain in the game.
            </div>
          </div>
        );
        break;
      case "option2":
        setDisplayContent(
          <div className="border-2 border-rose-500">
            <div className="text-center mt-4">Witch Faction:</div>
            <div>
              <span className="font-bold text-lg">Objective: </span> Gain
              control of the town by eliminating Town members and all other
              opposing factions.
            </div>
            <div>
              <span className="font-bold text-lg">Victory Condition: </span>The
              game is won if only the Witch faction remains, or they have
              achieved town dominance through their influence.
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
              <span className="font-bold text-lg">Objective: </span> Convert all
              surviving players into Vampire Thralls or eliminate all
              non-Vampire players.
            </div>
            <div>
              <span className="font-bold text-lg">Victory Condition: </span>The
              game is won if only Vampires and their Thralls remain in the game.
            </div>
            <div className="mt-4">Joker:</div>
            <div>
              <span className="font-bold text-lg">Objective: </span> Get voted
              out by the players to “entertain” the town.
            </div>
            <div>
              <span className="font-bold text-lg">Victory Condition: </span>The
              Joker wins if they are voted out by the players. Upon winning, the
              Joker may kill one player who voted against them.
            </div>
            <div className="mt-4">Reminiscence (The Inheritor):</div>
            <div>
              <span className="font-bold text-lg">Objective: </span> Adapts to
              the victory condition of the faction they inherit after taking on
              a deceased player’s role.
            </div>
            <div>
              <span className="font-bold text-lg">Victory Condition: </span>
              Aligned with the new faction’s victory condition once the role is
              inherited.
            </div>
            <div className="mt-4">Conspirator:</div>
            <div>
              <span className="font-bold text-lg">Objective: </span> Manipulate
              the voting process to have a specific target player voted out.
            </div>
            <div>
              <span className="font-bold text-lg">Victory Condition: </span>
              The Conspirator wins if they successfully orchestrate the voting
              to get their chosen player eliminated. If they achieve this, they
              win regardless of which faction ultimately wins the game.
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
            <div className="text-center mt-4">無菇市民陣營:</div>
            <div>
              <span className="font-bold text-lg">目標:</span>{" "}
              KO囇所有彊屍和古惑仔陣營，恢復香港和平。
            </div>
            <div>
              <span className="font-bold text-lg">勝利條件: </span>{" "}
              當遊戲入面冇囇班彊屍、古惑仔或其他衰人角色，遊戲獲勝。
            </div>
          </div>
        );
        break;
      case "option2":
        setDisplayContent(
          <div className="border-2 border-rose-500 ">
            <div className="text-center mt-4">古惑仔陣營</div>
            <div>
              <span className="font-bold text-lg">目標: </span>{" "}
              透過隊冧班香港無菇市民或者其他敵對陣營黎掌控香港。
            </div>
            <div>
              <span className="font-bold text-lg">勝利條件: </span>
              當遊戲入面得番班古惑仔陣營既人，遊戲獲勝。
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
              將所有存活既玩家轉化做彊屍，或者隊冧囇所有唔係彊屍既玩家。
            </div>
            <div>
              <span className="font-bold text-lg">勝利條件: </span>{" "}
              當遊戲入面得番彊屍同佢班𡃁果陣，遊戲獲勝。
            </div>
            <div className="mt-4">小丑:</div>
            <div>
              <span className="font-bold text-lg">目標: </span>{" "}
              比玩家投票處刑以“娛樂”香港市民。
            </div>
            <div>
              <span className="font-bold text-lg">勝利條件: </span>
              如果小丑比玩家投票淘汰就會獲勝。獲勝之後，小丑可以殺死一名票死佢既玩家。
            </div>
            <div className="mt-4">追憶者 (繼承者):</div>
            <div>
              <span className="font-bold text-lg">目標: </span>{" "}
              繼承已歸西玩家既角色身分之後，適應所繼承既陣營獲勝條件。
            </div>
            <div>
              <span className="font-bold text-lg">勝利條件: </span>
              一旦繼承角色，就會與果個陣營既勝利條件一致。
            </div>
            <div className="mt-4">謀略家:</div>
            <div>
              <span className="font-bold text-lg">目標: </span>{" "}
              諗盡辦法操縱投票過程，令到果個特定既目標玩家比人票死。
            </div>
            <div>
              <span className="font-bold text-lg">勝利條件: </span>
              如果謀略家成功令到果個特定既目標玩家比人票死，就會獲勝。無論最終邊個陣營贏左，都會當佢贏。
            </div>
          </div>
        );
        break;
    }
  };
  useEffect(() => {
    updateContent(selectedOption);
  }, [selectedOption, language]);
  useEffect(() => {
    updateSkill(selectedRole);
  }, [selectedRole, language]);
  // 角色技能
  const roleSkill = (value) => {
    switch (value) {
      case "optionA": // Police
        setDisplayRoleSkill(
          <div className="p-4 border rounded-lg bg-blue-100 text-blue-800">
            <strong>Police:</strong> Can kill a player at night. If the target
            is innocent, the Police loses their ability to kill further. Can
            shoot twice in total.
          </div>
        );
        break;
      case "optionB": // Detective
        setDisplayRoleSkill(
          <div className="p-4 border rounded-lg bg-green-100 text-green-800">
            <strong>Detective:</strong> Can check the alignment (good or bad) of
            a player each night.
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
            <strong>Cupid:</strong> During the game start, Cupid can link the
            lives of two players. If one dies, the other dies too, regardless of
            faction.
          </div>
        );
        break;
      case "optionF": // Sentinel
        setDisplayRoleSkill(
          <div className="p-4 border rounded-lg bg-indigo-100 text-indigo-800">
            <strong>Sentinel:</strong> Can check on a player each night. If any
            players visited the target that night, their names will be revealed
            to the Sentinel.
          </div>
        );
        break;
      case "optionG": // Jailor
        setDisplayRoleSkill(
          <div className="p-4 border rounded-lg bg-gray-100 text-gray-800">
            <strong>Jailor:</strong> Selects a player to imprison, preventing
            them from using their ability that night. The jailed player cannot
            be killed while in jail.
          </div>
        );
        break;
      case "optionH": // VampireHunter
        setDisplayRoleSkill(
          <div className="p-4 border rounded-lg bg-red-100 text-red-800">
            <strong>Vampire Hunter:</strong> Can target a player at night. If
            they target a Vampire, they kill them. If attacked by a Vampire, the
            Vampire dies instead. If no Vampires exist, they become a Police
            instead.
          </div>
        );
        break;
      case "optionI": // Reaper
        setDisplayRoleSkill(
          <div className="p-4 border rounded-lg bg-orange-100 text-orange-800">
            <strong>Reaper:</strong> Can kill a player each night. If the Reaper
            dies and there is no Potion Master, a random Witch player will
            inherit the Reaper role.
          </div>
        );
        break;
      case "optionJ": // Cultist
        setDisplayRoleSkill(
          <div className="p-4 border rounded-lg bg-teal-100 text-teal-800">
            <strong>Cultist:</strong> Appears as “good” if checked by a
            Detector, but their true alignment is with the Witch faction.
          </div>
        );
        break;
      case "optionK": // Scammer
        setDisplayRoleSkill(
          <div className="p-4 border rounded-lg bg-blueGray-100 text-blueGray-800">
            <strong>Scammer:</strong> Can choose a player each night to “frame.”
            This targeted player will appear as “bad” if checked by a Detector.
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
            <strong>Vampire:</strong> Can convert other players into Vampire
            Thralls. If a Vampire targets a Werewolf, the Werewolf dies.
          </div>
        );
        break;
      case "optionN": // Conspirator
        setDisplayRoleSkill(
          <div className="p-4 border rounded-lg bg-orange-100 text-orange-800">
            <strong>Conspirator:</strong> Can manipulate events to get a
            selected player voted out.
          </div>
        );
        break;
      case "optionO": // Joker
        setDisplayRoleSkill(
          <div className="p-4 border rounded-lg bg-red-100 text-red-800">
            <strong>Joker:</strong> Tries to get voted out to “entertain” the
            others. When voted out, can kill one player who voted for them.
          </div>
        );
        break;
      case "optionP": // Reminiscence
        setDisplayRoleSkill(
          <div className="p-4 border rounded-lg bg-blue-100 text-blue-800">
            <strong>Reminiscence:</strong> Can select a dead player once per
            game to inherit their role, faction, and mission. Their new identity
            will be revealed in chat.
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
            <strong>警察技能（膊頭有花）</strong>: "對唔住，我係差人。"
            可以每晚選擇射殺一個人，如果錯殺無菇市民，就會失去手槍，變成冇任何能力既廢柴。
          </div>
        );
        break;
      case "optionB": // Detective
        setDisplayRoleSkill(
          <div className="p-4 mb-4 border rounded-lg bg-green-100 text-green-800 shadow">
            <strong>偵探技能（食花生專家）</strong>:
            “等我八卦完再update你，頭號花生友一定係我～
            每晚可以八卦一名玩家既陣營係好人定係衰人。
          </div>
        );
        break;
      case "optionC": // Defender
        setDisplayRoleSkill(
          <div className="p-4 mb-4 border rounded-lg bg-yellow-100 text-yellow-800 shadow">
            <strong>金槍人技能（鐵布衫）</strong>:
            “就憑你果招垃圾技就想殺我想保護既人？”
            每晚可以保護一名玩家唔會比古惑仔坑害，但無辦法擋住唔係人（吸血鬼）既攻擊。
          </div>
        );
        break;
      case "optionD": // Medium
        setDisplayRoleSkill(
          <div className="p-4 mb-4 border rounded-lg bg-purple-100 text-purple-800 shadow">
            <strong>龍婆技能（通靈）</strong>:
            “龍婆既口號：‘死者之言，聲聲入耳。'
            每晚都可以查看已歸西既玩家之間既對話。
          </div>
        );
        break;
      case "optionE": // Cupid
        setDisplayRoleSkill(
          <div className="p-4 mb-4 border rounded-lg bg-pink-100 text-pink-800 shadow">
            <strong>如花技能（如花似玉）</strong>:
            “我係黃花閨女黎嫁嘛，唔好曬時間，快啲黎啦！”
            能夠將一人與其連結。如果其中一個人死左，另一人都會跟住攬炒，唔理係邊個陣營。
          </div>
        );
        break;
      case "optionF": // Sentinel
        setDisplayRoleSkill(
          <div className="p-4 mb-4 border rounded-lg bg-indigo-100 text-indigo-800 shadow">
            <strong>哨兵技能（放大鏡）</strong>: “哇!好骨緻喎!!!’”
            每晚可以查看一名玩家。如果有其他人當晚拜訪了該玩家，他們的名字將會顯示給哨兵。
          </div>
        );
        break;
      case "optionG": // Jailor
        setDisplayRoleSkill(
          <div className="p-4 mb-4 border rounded-lg bg-gray-100 text-gray-800 shadow">
            <strong>獄卒技能（畫地為牢）</strong>:
            “想搞搞震？畫個圈圈詛咒你，拖你入黑房面壁思過！”
            選擇一名玩家將其關入黑房，阻止果個玩家當晚使用技能。被人困住既玩家係黑房面壁思過期間唔會被殺。
          </div>
        );
        break;
      case "optionH": // VampireHunter
        setDisplayRoleSkill(
          <div className="p-4 mb-4 border rounded-lg bg-red-100 text-red-800 shadow">
            <strong>茅山道士技能（掌心雷法）</strong>:
            “但凡係遺禍人間，塗毒生靈既妖孽，都由我黎解決!”
            每晚選擇一名玩家。如果目標係彊屍，可以將佢殺死。如果被彊屍攻擊，會反殺番吸血鬼。假如場上無囇彊屍，道士會轉職做警察。
          </div>
        );
        break;
      case "optionI": // Reaper
        setDisplayRoleSkill(
          <div className="p-4 mb-4 border rounded-lg bg-orange-100 text-orange-800 shadow">
            <strong>金牌打手技能（收保護費）</strong>: “金牌打手：‘12點之後
            ’，呢到我話事!”
            每晚可以殺死一名玩家。如果金牌打手死亡，將會隨機選擇一名古惑仔升級做金牌打手。
          </div>
        );
        break;
      case "optionJ": // Cultist
        setDisplayRoleSkill(
          <div className="p-4 mb-4 border rounded-lg bg-teal-100 text-teal-800 shadow">
            <strong>二五仔技能（卧底）</strong>: “我係‘好人’，邊個知呀?”
            當被偵探查看時，會顯示為好人，但實際立場隸屬於巫師陣營。
          </div>
        );
        break;
      case "optionK": // Scammer
        setDisplayRoleSkill(
          <div className="p-4 mb-4 border rounded-lg bg-blueGray-100 text-blueGray-800 shadow">
            <strong>欺詐師技能（完美偽裝）</strong>: “唔好意思，不過我係特登既!”
            每晚可以選擇“陷害”一位玩家。當偵探查看果個玩家果陣，會顯示做“衰人”。
          </div>
        );
        break;
      case "optionL": // TwistedFate
        setDisplayRoleSkill(
          <div className="p-4 mb-4 border rounded-lg bg-rose-100 text-rose-800 shadow">
            <strong>賭徒技能（賭命）</strong>: “唔係你死就係我死!”
            每晚可以賭一個人既真實身份，賭中對方出局；賭唔中就會自爆身份比所有人知。
          </div>
        );
        break;
      case "optionM": // Vampire
        setDisplayRoleSkill(
          <div className="p-4 mb-4 border rounded-lg bg-purple-100 text-purple-800 shadow">
            <strong>彊屍技能（Q親你對唔住）</strong>:
            “CHU！我咁可愛你地唔係想殺左我下話？”
            可以將其他玩家轉化為彊屍。如果彊屍攻擊古惑仔，古惑仔會死亡。
          </div>
        );
        break;
      case "optionN": // Conspirator
        setDisplayRoleSkill(
          <div className="p-4 mb-4 border rounded-lg bg-orange-100 text-orange-800 shadow">
            <strong>謀略家技能（金手指）</strong>:
            “呢個世界就係比有權力既人話事架啦” 諗盡計仔將某個特定目標比人票死。
          </div>
        );
        break;
      case "optionO": // Joker
        setDisplayRoleSkill(
          <div className="p-4 mb-4 border rounded-lg bg-red-100 text-red-800 shadow">
            <strong>小丑技能（娛樂至死）</strong>:
            “我既存在本身就係一個笑話，票死我，我就帶一個人同我攬炒，用我最大既死亡來取悅你班花生友！”
            試圖叫人票死自己黎“取悅”大眾花生友。被人票殺之後，可以選擇殺死一個投票比佢既花生友。
          </div>
        );
        break;
      case "optionP": // Reminiscence
        setDisplayRoleSkill(
          <div className="p-4 mb-4 border rounded-lg bg-blue-100 text-blue-800 shadow">
            <strong>白痴技能（回憶）</strong>:
            “我個頭好痛呀，我個頭好痛呀，我個頭好痛呀.....”
            係遊戲入面只可以選擇一名已歸西既玩家，繼承佢既角色、陣營同任務。取代左既新身份將會聊天室到公開。
          </div>
        );
        break;
    }
  };

  return (
    <>
      <div className=" mt-4 flex flex-row items-center">
        <div className="flex">
          <select
            onChange={chooseFaction}
            className="text-center border-2 border-rose-500"
          >
            {language ? (
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
        <select
          onChange={chooseRole}
          className="text-center border-2 border-black"
        >
          {language ? (
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
      <div className="w-[800px] mt-4 border-2 border-rose-500">
        {displayRoleSkill}
      </div>
    </>
  );
};

export default CharacterSkill;
