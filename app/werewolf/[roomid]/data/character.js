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
      must: true,
      targetGroup: "all",
      ability: {},
      detected: "good",
      img: "./image/police.jpg",
    },
    detective: {
      must: true,
      targetGroup: "all",
      ability: {},
      detected: "good",
    },
    defender: {
      must: false,
      targetGroup: "all",
      ability: {},
      detected: "good",
    },
    medium: {
      must: false,
      targetGroup: null,
      ability: {},
      detected: "good",
    },
    cupid: {
      must: false,
      targetGroup: null,
      ability: {},
      detected: "good",
    },
    sentinel: {
      must: false,
      targetGroup: "all",
      ability: {},
      detected: "good",
    },
    jailor: {
      must: false,
      targetGroup: null,
      ability: {},
      detected: "good",
    },
    vampireHunter: {
      must: false,
      targetGroup: null,
      ability: {},
      detected: "good",
    },
  },
  witch: {
    reaper: {
      must: true,
      targetGroup: "nonWitch",
      ability: {},
      detected: "bad",
    },
    cultist: {
      must: false,
      targetGroup: null,
      ability: null,
      detected: "bad",
    },
    scammer: {
      must: false,
      targetGroup: "nonWitch",
      ability: {},
      detected: "bad",
    },
    potionMaster: {
      must: false,
      targetGroup: "nonWitch",
      ability: {},
      detected: "bad",
    },
  },
  neutral: {
    vampire: {
      must: false,
      targetGroup: "all",
      ability: {},
      detected: "bad",
    },
    conspirator: {
      must: false,
      targetGroup: null,
      ability: null,
      detected: "good",
    },
    joker: {
      must: false,
      targetGroup: "all",
      ability: {},
      detected: "good",
    },
    reminiscence: {
      must: false,
      targetGroup: null,
      ability: {},
      detected: "good",
    },
  },
};

export default characterData;
