// town:
// searcher: check good bad at night
// police: kill a person on night (if wrong lose ability, can shoot twice)
// protector: protect a person on night, attack people that try to kill him, but he can’t choose the same person per night
// medium: only talk with people that died at last day/night
// couple: choose a person at day and link their live(whether which group, together攬炒)
// lookout: check a person at night, all other person visited that person that night will be shown to him
// jailor: choose a person ,prevent that person ability used at night (that person can’t be kill)
// vampire hunter: choose a person at night, if (vampire) kill it, if get attack by a vampire kill the vampire instead, if no vampire exist become police
// witch:
// Reaper(開膛手): kill a person at night, if he die and no 藥劑師, and random with will become 開膛手
// 異端崇拜者(Cultist): 當被人查到時，會顯示為好人，但立場在狼人方
// Scammer(欺詐師): framer a person at night and that person will appear as a bad guy
// Potion master(藥劑師): can choose to use a revealing potion, a healing potion and a killing potion  (only avail at night 3 or 開膛手 die) (revealing exact role) (can’t use the same potion in the first 3 night)
// neutral:
// Conspirator(謀略家): make a selected player get voted out(諗辦法整死一條友) (good)
// Joker(小丑) 娛樂至死：你的存在是一個笑話　，用你最大的死亡來取悅眾人。commit suicide, try to get voted out (after got voted, he can kill a person that voted him) (good)
// Reminiscence(追憶者): only one time choose a died player and gain its role and faction and mission (good)
// (will be shown the identity in chat what he become) (an Reminiscence has become xxx)
// 吸血鬼(Vampire): 能夠轉化人變吸血鬼奴僕，if vampire choose中狼人，狼人go die  (bad)
// (Victory condition: only vampire groups alive需要只剩低吸血鬼一方)
// 吸血鬼奴僕不能轉化人，只能聽從Master的指示行事(can’t vote the master) (bad)

const characterData = {
  town: {
    police: {
      nameTC: "警察",
      must: true,
      targetGroup: "all",
      ability: "Shoot a player at night,if the targeted player is innocent,you will lost the ability to shoot.",
      abilityTC:
        '技能（膊頭有花）: "對唔住，我係差人。" 可以每晚選擇射殺一個人，如果錯殺無菇市民，就會失去手槍，變成冇任何能力既廢柴。',
      detected: "good",
      img: "/client/app/werewolf/[roomid]/data/image/police.jpg",
      actionOrder: 2,
    },
    detective: {
      nameTC: "偵探",
      must: true,
      targetGroup: "all",
      ability: "Check the alignment (good or bad) of a player each night.",
      abilityTC:
        "“技能（花生專家）: 等我八卦完再update你，頭號花生友一定係我～ 每晚可以八卦一名玩家既陣營係好人定係衰人。",
      detected: "good",
      img: "/client/app/werewolf/[roomid]/data/image/detective.jpg",
      actionOrder: 4,
    },
    defender: {
      nameTC: "金槍人",
      must: false,
      targetGroup: "all",
      ability: "Protects a player at night.",
      abilityTC: `技能（鐵布衫）: “就憑你果招垃圾技就想殺我想保護既人？”
                每晚可以保護一名玩家唔會比古惑仔坑害，但無辦法擋住唔係人（彊屍）既攻擊。`,
      detected: "good",
      img: "/client/app/werewolf/[roomid]/data/image/defender.jpg",
      actionOrder: 1,
    },
    medium: {
      nameTC: "龍婆",
      must: false,
      targetGroup: null,
      ability: "You can see the deadplayer chatroom at night,but you cannot talk to deadplayer.",
      abilityTC: "技能（通靈）: “龍婆既口號：‘死者之言，聲聲入耳。' 每晚都可以查看已歸西既玩家之間既對話。",
      detected: "good",
      img: "/client/app/werewolf/[roomid]/data/image/medium.jpg",
      actionOrder: null,
    },
    cupid: {
      nameTC: "如花",
      must: false,
      targetGroup: null,
      ability:
        "During daytime,you can link yourself with a player and when one linked player died,the other will also died.",
      abilityTC:
        "技能（如花似玉）: “我係黃花閨女黎嫁嘛，唔好曬時間，快啲黎啦！” 能夠將一人與其連結。如果其中一個人死左，另一人都會跟住攬炒，唔理係邊個陣營。",
      detected: "good",
      img: "/client/app/werewolf/[roomid]/data/image/cupid.jpg",
      actionOrder: 1,
    },
    sentinel: {
      nameTC: "哨兵",
      must: false,
      targetGroup: "all",
      ability: "You can choose a player at night and see which player visited them.",
      abilityTC: "技能（放大鏡）: 每晚可以查看一名玩家。如果有其他人當晚拜訪了該玩家，他們的名字將會顯示給哨兵。",
      detected: "good",
      img: "",
      actionOrder: 5,
    },
    jailor: {
      nameTC: "獄卒",
      must: false,
      targetGroup: null,
      ability: "You can jail a player at day and the player cannot use their night ability.",
      abilityTC:
        "技能（畫地為牢）: “想搞搞震？畫個圈圈詛咒你，拖你入黑房面壁思過！”  選擇一名玩家將其關入黑房，阻止果個玩家當晚使用技能。被人困住既玩家係黑房面壁思過期間唔會被殺。",
      detected: "good",
      img: "/client/app/werewolf/[roomid]/data/image/jailor.jpg",
      actionOrder: 1,
    },
    vampireHunter: {
      nameTC: "茅山道士",
      must: false,
      targetGroup: "all",
      ability:
        "You can check a player at night,if the targeted player is vampire,kill the targeted player.If the vampire try to convert you at night,also kill them.",
      abilityTC:
        "技能（掌心雷法）:  “但凡係遺禍人間，塗毒生靈既妖孽，都由我黎解決”  每晚選擇一名玩家。如果目標係彊屍，可以將佢殺死。如果被彊屍攻擊，會反殺番吸血鬼。假如場上無囇彊屍，道士會轉職做警察。",
      detected: "good",
      img: "/client/app/werewolf/[roomid]/data/image/vampireHunter.jpg",
      actionOrder: 2,
    },
  },
  witch: {
    reaper: {
      nameTC: "金牌打手",
      must: true,
      targetGroup: "nonWitch",
      ability: "Can kill a player each night.",
      abilityTC:
        "“技能（收保護費）: ”12點之後，呢到我話事”  每晚可以殺死一名玩家。如果金牌打手死亡，將會隨機選擇一名古惑仔升級做金牌打手。",
      detected: "bad",
      img: "../data/image/reaper.jpg",
      actionOrder: 2,
    },
    cultist: {
      nameTC: "二五仔",
      must: false,
      targetGroup: null,
      ability: "Appears as “good” when checked by a Detector.",
      abilityTC: "技能（專業卧底）: 當比偵探查看身分果陣，會顯示為好人，但係實際立場係屬於古惑仔陣營。",
      detected: "good",
      img: "",
      actionOrder: null,
    },
    scammer: {
      nameTC: "欺詐師",
      must: false,
      targetGroup: "nonWitch",
      ability: "You can target a player at night,and the targeted player will appear as “bad” to the detector.",
      abilityTC:
        "技能（完美偽裝）: “唔好意思，不過我係特登既” 每晚可以選擇“陷害”一位玩家。當偵探查看果個玩家果陣，會顯示做“衰人”。 ",
      detected: "bad",
      img: "/client/app/werewolf/[roomid]/data/image/scammer.jpg",
      actionOrder: 3,
    },
    twistedFate: {
      nameTC: "賭徒",
      must: false,
      targetGroup: "nonWitch",
      ability:
        "You can guess the role of a player at night,if correct: kill the targeted player,if wrong: your identity will be reveal to all player",
      abilityTC:
        "技能（賭命）: “唔係你死就係我死” 每晚可以賭一個人既真實身份，賭中對方死亡；賭唔中就會自爆身份比所有人知。 ",
      detected: "bad",
      img: "/client/app/werewolf/[roomid]/data/image/twistedFate.jpg",
      actionOrder: 2,
    },
  },
  neutral: {
    vampire: {
      nameTC: "彊屍",
      must: false,
      targetGroup: "all",
      ability:
        "You can target a player at night,if the targeted player faction is town,convert them into vampire,otherwise kill them.",
      abilityTC:
        "技能（Q親你對唔住）:  “CHU！我咁可愛你地唔係想殺左我下話？” 可以將其他玩家轉化為彊屍。如果彊屍攻擊古惑仔，古惑仔會死亡。 ",
      detected: "bad",
      img: "./image/vampire.jpg",
      actionOrder: 2,
    },
    conspirator: {
      nameTC: "謀略家",
      must: false,
      targetGroup: null,
      ability: "You have no ability,but your goal is to make the targeted player get voted out.",
      abilityTC: "技能（金手指）: “呢個世界就係比有權力既人話事架啦” 諗盡計仔將某個特定目標比人票死。",
      detected: "good",
      img: "./image/conspirator.jpg",
      actionOrder: null,
    },
    joker: {
      nameTC: "小丑",
      must: false,
      targetGroup: "all",
      ability: "Try to get voted out,if succeeded you can choose a player to kill in the following night.",
      abilityTC:
        "技能（娛樂至死）: “我既存在本身就係一個笑話，票死我，我就帶一個人同我攬炒，咁中意食花生呀拿！” 試圖叫人票死自己黎“取悅”大眾花生友。被人票殺之後，可以選擇殺死一個投票比佢既人。 ",
      detected: "good",
      img: "./image/joker.jpg",
      actionOrder: 2,
    },
    reminiscence: {
      nameTC: "白痴",
      must: false,
      targetGroup: null,
      ability: "You can select a dead player and gain their ability,role,and target.",
      abilityTC:
        "技能（回憶）:  “我個頭好痛呀，我個頭好痛呀，我個頭好痛呀.....”  係遊戲入面只可以選擇一名已歸西既玩家，繼承佢既角色、陣營同任務。取代左既新身份將會聊天室到公開。 ",
      detected: "good",
      img: "",
      actionOrder: 3,
    },
  },
};

export default characterData;
