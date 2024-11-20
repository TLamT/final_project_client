import { useState, useContext } from "react";
import { LanguageContext } from "../layout";
const Popup = ({ isOpen, onClose }) => {
  const [selectedGroup, setSelectedGroup] = useState("Town");
  const { changeLanguage, handleOnLanguageChange } =
    useContext(LanguageContext);
  const factionArr = ["Town", "Witch", "Neutral"];

  const factionObj = {
    Town: "蘑菇市民",
    Witch: "古惑仔",
    Neutral: "中立陣營",
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20"
      onClick={onClose} // Close when clicking on the background
    >
      <div
        className="bg-white p-4 rounded shadow-lg w-full max-w-3xl h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
      >
        <div className="text-3xl text-black">
          {!changeLanguage ? "角色技能" : "Character Skills"}
        </div>

        {/* Buttons for group selection */}
        <div className="flex justify-center space-x-4">
          {!changeLanguage
            ? factionArr.map((group) => (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`py-2 px-4 rounded-lg font-semibold transition duration-200 ${
                    selectedGroup === group
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                >
                  {factionObj[group]}
                </button>
              ))
            : factionArr.map((group) => (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`py-2 px-4 rounded-lg font-semibold transition duration-200 ${
                    selectedGroup === group
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                >
                  {group}
                </button>
              ))}
        </div>

        {/* Character list based on selected group */}
        <ul className="space-y-6 text-left text-gray-700 leading-6 mt-6">
          {changeLanguage
            ? characterData[selectedGroup].map((character, index) => (
                <li key={index} className="mt-4 ">
                  <strong className="font-semibold text-gray-900">
                    {character.name}
                  </strong>
                  : {character.description}
                </li>
              ))
            : characterDataEng[selectedGroup].map((character, index) => (
                <li key={index} className="mt-4">
                  <strong className="font-semibold text-gray-900">
                    {character.name}
                  </strong>
                  : {character.description}
                </li>
              ))}
        </ul>

        {/* Close button */}
        <button
          onClick={onClose}
          className="mt-6 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition duration-200"
        >
          {!changeLanguage ? "關閉" : "Close"}
        </button>
      </div>
    </div>
  );
};

// Character data grouped by categories
const characterData = {
  Town: [
    {
      name: "Police Skill (Badge of Authority)",
      description:
        "“Sorry, I’m a cop.” Every night, the player can choose to shoot someone.If they mistakenly kill an innocent citizen, they lose their gun and become powerless.",
    },
    {
      name: "Detective Skill (Peanut Expert)",
      description:
        "“Let me investigate and update you. No.1 gossip king is definitely me!” Every night, the player can investigate the alignment of another player to determine if they are good or evil.",
    },
    {
      name: "Bodyguard Skill (Ironman)",
      description:
        "“You think your trash moves can harm the people I’m protecting?” Every night, the player can protect someone from being harmed by gangsters.However, they cannot block attacks from supernatural beings (like vampires).",
    },
    {
      name: "Medium Skill (Spirit Whisperer)",
      description:
        "“The motto of the Medium: ‘The words of the dead echo clearly.’” The player can view the conversations of dead players every night.",
    },
    {
      name: "Lover Skill (Bound by Love)",
      description:
        "“I’m still a pure maiden, don’t waste time, come on quickly!” The player can link themselves to another player.If one dies, the other will also die, regardless of their alignment.",
    },
    {
      name: "Sentinel Skill (Magnifying Glass)",
      description:
        "“Wow, this is super detailed!” Every night, the player can watch over another player.If anyone visits the chosen player that night, their names will be revealed to the Sentinel.",
    },
    {
      name: "Jailer Skill (Locked Up)",
      description:
        "“Trying to stir up trouble? I’ll curse you and lock you in a room to reflect on your actions!” The player can choose to lock a player in a “black room,” preventing them from using their ability that night.While locked up, the player cannot be killed.",
    },
    {
      name: "Taoist Priest Skill (Thunder Palm)",
      description:
        "“Any evil that harms the world will be dealt with by me.” Every night, the player can target someone.If the target is a zombie, they will be killed. If attacked by a zombie, the priest will counterattack and kill the vampire. If there are no zombies left in the game, the Taoist Priest becomes a Police Officer.",
    },
  ],
  Witch: [
    {
      name: "Mafia Enforcer Skill (Collector)",
      description:
        "“After midnight, I make the rules.” The player can kill one person each night. If the Enforcer dies, another gangster is randomly chosen to take their place.",
    },
    {
      name: "Undercover Skill (Double Agent)",
      description:
        "“I’m a ‘good guy,’ but who knows the truth?” When investigated by a Detective, they will appear as a good person, but their true alignment belongs to the gangster team.",
    },
    {
      name: "Fraudster Skill (Master of Deception)",
      description:
        "“Sorry, but I did it on purpose.” The player can “frame” another player every night. When investigated by a Detective, the framed player will appear as “evil.”",
    },
    {
      name: "Gambler Skill (High Stakes)",
      description:
        "“All or Nothing.” Every night, the player can guess another player’s true identity. If correct, the target is eliminated. If wrong, the Gambler’s identity is revealed to everyone.",
    },
  ],
  Neutral: [
    {
      name: "Zombie Skill (Infectious Bite)",
      description:
        "“CHU! I’m so cute, you wouldn’t want to kill me, right?” The player can infect other players and turn them into zombies. If a zombie attacks a gangster, the gangster dies.",
    },
    {
      name: "Strategist Skill (Mastermind)",
      description:
        "“This world is ruled by those with power.” The player can manipulate the votes to ensure a specific target is eliminated.",
    },
    {
      name: "Joker Skill (Entertainment to Death)",
      description:
        "“My existence is a joke. Vote me out and I’ll take someone with me!” The player aims to get others to vote them out for the entertainment of the group. After being voted out, they can choose to kill one of the players who voted for them.",
    },
    {
      name: "Idiot Skill (Recollection)",
      description:
        "“My head hurts, my head hurts, my head hurts…” The player can choose to inherit the role, alignment, and mission of a deceased player. The inherited new identity will be publicly revealed in the chatroom.",
    },
  ],
};

// Character data grouped by categories
const characterDataEng = {
  Town: [
    {
      name: "警察技能（膊頭有花）",
      description:
        "對唔住，我係差人。可以每晚選擇射殺一個人，如果錯殺無菇市民，就會失去手槍，變成冇任何能力既廢柴。",
    },
    {
      name: "偵探技能（花生專家）",
      description:
        "等我八卦完再update你，頭號花生友一定係我～每晚可以八卦一名玩家既陣營係好人定係衰人。",
    },
    {
      name: "金槍人技能（鐵布衫）",
      description:
        "就憑你果招垃圾技就想殺我想保護既人？每晚可以保護一名玩家唔會比古惑仔坑害，但無辦法擋住唔係人（彊屍）既攻擊。",
    },
    {
      name: "龍婆技能（通靈）",
      description:
        "龍婆既口號：‘死者之言，聲聲入耳。每晚都可以查看已歸西既玩家之間既對話",
    },
    {
      name: "如花技能（如花似玉）",
      description:
        "我係黃花閨女黎嫁嘛，唔好曬時間，快啲黎啦。能夠將一人與其連結。如果其中一個人死左，另一人都會跟住攬炒，唔理係邊個陣營。",
    },
    {
      name: "哨兵技能（放大鏡）",
      description:
        "哇!好骨緻喎!!!每晚可以查看一名玩家。如果有其他人當晚拜訪了該玩家，他們的名字將會顯示給哨兵。",
    },
    {
      name: "獄卒技能（畫地為牢）",
      description:
        "想搞搞震？畫個圈圈詛咒你，拖你入黑房面壁思過！選擇一名玩家將其關入黑房，阻止果個玩家當晚使用技能。被人困住既玩家係黑房面壁思過期間唔會被殺。",
    },
    {
      name: "茅山道士技能（掌心雷法）",
      description:
        "但凡係遺禍人間，塗毒生靈既妖孽，都由我黎解決。每晚選擇一名玩家。如果目標係彊屍，可以將佢殺死。",
    },
  ],
  Witch: [
    {
      name: "金牌打手技能（收保護費)",
      description:
        "金牌打手：‘12點之後，呢到我話事!每晚可以殺死一名玩家。如果金牌打手死亡，將會隨機選擇一名古惑仔升級做金牌打手。",
    },
    {
      name: "二五仔技能（專業卧底)",
      description:
        "我係‘好人’，邊個知呀?當比偵探查看身分果陣，會顯示為好人，但係實際立場係屬於古惑仔陣營。",
    },
    {
      name: "欺詐師技能（完美偽裝）",
      description:
        "唔好意思，不過我係特登既。每晚可以選擇“陷害”一位玩家。當偵探查看果個玩家果陣，會顯示做“衰人”。",
    },
    {
      name: "賭徒技能（賭命）",
      description:
        "唔係你死就係我死!!!每晚可以賭一個人既真實身份，賭中對方出局；賭唔中就會自爆身份比所有人知。",
    },
  ],
  Neutral: [
    {
      name: "彊屍技能（Q親你對唔住）",
      description:
        "呢個世界就係比有權力既人話事架啦。諗盡計仔將某個特定目標比人票死。",
    },
    {
      name: "謀略家技能（金手指）",
      description:
        "CHU！我咁可愛你地唔係想殺左我下話？可以將其他玩家轉化為彊屍。如果彊屍攻擊古惑仔，古惑仔會死亡。",
    },
    {
      name: "小丑技能（娛樂至死）",
      description:
        "我既存在本身就係一個笑話，票死我，我就帶一個人同我攬炒，咁中意食花生呀拿！",
    },
    {
      name: "白痴技能（回憶）",
      description:
        "我個頭好痛呀，我個頭好痛呀，我個頭好痛呀.....繼承佢既角色、陣營同任務。",
    },
  ],
};

export default Popup;
