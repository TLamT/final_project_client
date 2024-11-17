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
      ability: "Can kill a player at night. ",
      abilityTC:
        "“一槍不夠就兩槍？治安官有話要說：‘這裡只有槍法，沒有商量！’ : 晚上可以殺死一名玩家。如果目標是無辜者，治安官將失去殺戮能力。總共可以開槍兩次。",
      detected: "good",
      img: "/client/app/werewolf/[roomid]/data/image/police.jpg",
      actionOrder: 2,
    },
    detective: {
      nameTC: "偵探",
      must: true,
      targetGroup: "all",
      ability: "Can check the alignment (good or bad) of a player each night.",
      detected: "good",
      img: "/client/app/werewolf/[roomid]/data/image/detective.jpg",
      actionOrder: 4,
    },
    defender: {
      nameTC: "守衛者",
      must: false,
      targetGroup: "all",
      ability: "Protects a player at night.",
      detected: "good",
      img: "/client/app/werewolf/[roomid]/data/image/defender.jpg",
      actionOrder: 1,
    },
    medium: {
      nameTC: "靈媒",
      must: false,
      targetGroup: null,
      ability: "Can watch the deadplayer chatroom",
      detected: "good",
      img: "/client/app/werewolf/[roomid]/data/image/medium.jpg",
      actionOrder: null,
    },
    cupid: {
      nameTC: "丘比特",
      must: false,
      targetGroup: null,
      ability:
        " During the game start, Cupid can link the lives of two players. If one dies, the other dies too, regardless of faction.",
      detected: "good",
      img: "/client/app/werewolf/[roomid]/data/image/cupid.jpg",
      actionOrder: 1,
    },
    sentinel: {
      nameTC: "哨兵",
      must: false,
      targetGroup: "all",
      ability:
        "Can check on a player each night. If any players visited the target that night, their names will be revealed to the Sentinel.",
      detected: "good",
      img: "",
      actionOrder: 5,
    },
    jailor: {
      nameTC: "獄卒",
      must: false,
      targetGroup: null,
      ability:
        "Selects a player to imprison, preventing them from using their ability that night. The jailed player cannot be killed while in jail.",
      detected: "good",
      img: "/client/app/werewolf/[roomid]/data/image/jailor.jpg",
      actionOrder: 1,
    },
    vampireHunter: {
      nameTC: "吸血鬼獵人",
      must: false,
      targetGroup: "all",
      ability:
        "Can target a player at night. If they target a Vampire, they kill them. If attacked by a Vampire, the Vampire dies instead. If no Vampires exist, they become a Police instead.",
      detected: "good",
      img: "/client/app/werewolf/[roomid]/data/image/vampireHunter.jpg",
      actionOrder: 2,
    },
  },
  witch: {
    reaper: {
      nameTC: "殺手",
      must: true,
      targetGroup: "nonWitch",
      ability:
        "Can kill a player each night. If the Reaper dies and there is no Potion Master, a random Witch player will inherit the Reaper role.",
      abilityTC:
        "“開膛手的信條：‘刀在手，天下我有！下個夜晚，誰是倒霉蛋？’ : 每晚可以殺死一名玩家。如果開膛手死亡且場上無藥劑師，則隨機選擇一名巫師成為開膛手。",
      detected: "bad",
      img: "../data/image/reaper.jpg",
      actionOrder: 2,
    },
    cultist: {
      nameTC: "邪教教徒",
      must: false,
      targetGroup: null,
      ability:
        "Appears as “good” if checked by a Detector, but their true alignment is with the Witch faction.",
      detected: "good",
      img: "",
      actionOrder: null,
    },
    scammer: {
      nameTC: "欺詐師",
      must: false,
      targetGroup: "nonWitch",
      ability:
        "Can choose a player each night to “frame.” This targeted player will appear as “bad” if checked by a Detector.",
      detected: "bad",
      img: "/client/app/werewolf/[roomid]/data/image/scammer.jpg",
      actionOrder: 3,
    },
    twistedFate: {
      nameTC: "賭徒",
      must: false,
      targetGroup: "nonWitch",
      ability: "All or nothing",
      detected: "bad",
      img: "/client/app/werewolf/[roomid]/data/image/twistedFate.jpg",
      actionOrder: 2,
    },
  },
  neutral: {
    vampire: {
      nameTC: "吸血鬼",
      must: false,
      targetGroup: "all",
      ability:
        "Can convert other players into Vampire Thralls. If a Vampire targets a Werewolf, the Werewolf dies.",
      detected: "bad",
      img: "./image/vampire.jpg",
      actionOrder: 2,
    },
    conspirator: {
      nameTC: "謀略家",
      must: false,
      targetGroup: null,
      ability: "Can manipulate events to get a selected player voted out.",
      detected: "good",
      img: "./image/conspirator.jpg",
      actionOrder: null,
    },
    joker: {
      nameTC: "小丑",
      must: false,
      targetGroup: "all",
      ability:
        "Tries to get voted out to “entertain” the others. When voted out, can kill one player who voted for them.",
      detected: "good",
      img: "./image/joker.jpg",
      actionOrder: 2,
    },
    reminiscence: {
      nameTC: "追憶者",
      must: false,
      targetGroup: null,
      ability:
        "Can select a dead player once per game to inherit their role, faction, and mission. Their new identity will be revealed in chat.",
      detected: "good",
      img: "",
      actionOrder: 3,
    },
  },
};

export default characterData;
