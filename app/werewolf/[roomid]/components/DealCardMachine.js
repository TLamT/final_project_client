import characterData from "../data/character";

// /*
//     step1: 幾多人? -> 邊個condition -> 3個陣營pool
//             pool邊啲角色可以抽
//     step2: 將所有must既角色先放入個player
//     step3: 再將所有!must既角色根據剩餘既位置重新抽取
//     step4: 特殊角色需要有特定條件才能抽取
//  */

// const condition = {
//   6: { town: 4, witch: 1, neutral: 1 },
//   7: { town: 4, witch: 2, neutral: 1 },
//   8: { town: 5, witch: 2, neutral: 1 },
//   9: { town: 5, witch: 2, neutral: 2 },
//   10: { town: 6, witch: 2, neutral: 2 },
//   11: { town: 6, witch: 3, neutral: 2 },
//   12: { town: 7, witch: 3, neutral: 2 },
// };

// const dealCard=(playerNumber)=>{
//     let townArr=[]
//     let witchArr=[]
//     let neutralArr=[]

//     const playerCount = condition[playerNumber]

//     const townCharacter = Object.keys(characterData.town)
//     const witchCharacter = Object.keys(characterData.witch)
//     const neutralCharacter = Object.keys(characterData.neutral)
//     const vampireAppear = 10
//    townArr =  townCharacter.filter((character)=>{
//          return characterData.town[character].must
//     })
//     while(townArr.length<playerCount.town){
//         let random = Math.floor(Math.random()*townCharacter.length)
//         if(playerNumber === 12){
//             if (!townArr.includes(townCharacter[random])) {
//                 townArr.push(townCharacter[random])
//                 if(townArr.includes("vampireHunter")){
//                 characterData.neutral.vampire.must=true}

//             }
//         }else{
//             if ( townCharacter[random]!=="vampireHunter"&& !townArr.includes(townCharacter[random])) {
//         townArr.push(townCharacter[random])
//             }
//         }
//     }

//    witchArr= witchCharacter.filter((character)=>{
//          return characterData.witch[character].must
// })
//     while(witchArr.length<playerCount.witch){
//         let random = Math.floor(Math.random()*witchCharacter.length)
//     if (!witchArr.includes(witchCharacter[random])) {
//         witchArr.push(witchCharacter[random])
//     }}

//    neutralArr= neutralCharacter.filter((character)=>{
//          return characterData.neutral[character].must
//     })

//     while(neutralArr.length<playerCount.neutral){
//         let random = Math.floor(Math.random()*neutralCharacter.length)
//     if (townArr.includes("vampireHunter")){
//         if (!neutralArr.includes(neutralCharacter[random])) {
//             neutralArr.push(neutralCharacter[random])
//     }}
//     else {
//          if ( neutralCharacter[random]!=="vampire"&& !neutralArr.includes(neutralCharacter[random])) {
//         neutralArr.push(neutralCharacter[random])
//     }
//     }
//     }

//     const finalPlayerList= [...townArr, ...witchArr , ...neutralArr]

//     const shuffle=(array)=>{
//         const shuffledArray = array.slice()
//          shuffledArray.forEach((_, i) => {
//     const j = Math.floor(Math.random() * (i + 1));

//     [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
// });

// return shuffledArray;
//     }
//     const shufflePlayer=shuffle(finalPlayerList)
//   console.log(shufflePlayer)

// }

const condition = {
  6: { town: 4, witch: 1, neutral: 1 },
  7: { town: 4, witch: 2, neutral: 1 },
  8: { town: 5, witch: 2, neutral: 1 },
  9: { town: 5, witch: 2, neutral: 2 },
  10: { town: 6, witch: 2, neutral: 2 },
  11: { town: 6, witch: 3, neutral: 2 },
  12: { town: 7, witch: 3, neutral: 2 },
};

export default function playerRoleList(playerCount) {
  return ["reaper", "police", "cultist", "cultist", "police", "joker"];
  // if (playerCount < 6) return "playerCount must be higher than six";
  if (playerCount < 6) playerCount = 6;

  const conditions = condition[playerCount];
  const excludeVampire = 10;

  let townSelected = [];
  let witchSelected = [];
  let neutralSelected = [];

  // group - town / witch / neutral
  // mustCount - the number of character that is must inside the group
  // groupSelected - the array holding the character inside the group
  const selection = (group, mustCount, groupSelected) => {
    let array = Object.entries(characterData[group]);

    for (let i = 0; i < mustCount; i++) {
      if (array[i][1].must) groupSelected.push(array[i][0]);
    }

    while (groupSelected.length < conditions[group]) {
      // create a random number which exclude the must index
      const randomIndex =
        Math.floor(Math.random() * (array.length - mustCount)) + mustCount;

      // no duplicate and not VampireHunter or Vampire
      if (
        !groupSelected.includes(array[randomIndex][0]) &&
        array[randomIndex][0] !== "vampireHunter" &&
        array[randomIndex][0] !== "vampire"
      ) {
        groupSelected.push(array[randomIndex][0]);
      }
      // check VampireHunter is pulled and push both VampireHunter and Vampire
      else if (
        !groupSelected.includes(array[randomIndex][0]) &&
        group === "town" &&
        excludeVampire <= playerCount &&
        array[randomIndex][0] === "vampireHunter"
      ) {
        groupSelected.push(array[randomIndex][0]);
        neutralSelected.push("vampire");
      }
    }
  };

  selection("town", 2, townSelected);
  selection("witch", 1, witchSelected);
  selection("neutral", 0, neutralSelected);

  const allRole = [...townSelected, ...witchSelected, ...neutralSelected];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  return shuffleArray(allRole);
  // town: townSelected,
  // witch: witchSelected,
  // neutral: neutralSelected,
}
