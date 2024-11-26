import characterData from "../data/character";

const condition = {
  6: { town: 4, witch: 1, neutral: 1 },
  7: { town: 4, witch: 2, neutral: 1 },
  8: { town: 5, witch: 2, neutral: 1 },
  9: { town: 5, witch: 2, neutral: 2 },
  10: { town: 6, witch: 2, neutral: 2 },
  11: { town: 6, witch: 3, neutral: 2 },
  12: { town: 7, witch: 3, neutral: 2 },
};
export default function playerRoleList(playerCount, roomId) {
  if (roomId === "123" || roomId === "1234") {
    return ["reaper", "detective", "scammer", "defender", "sentinel", "medium"];
  }
  // if (playerCount < 6) return "playerCount must be higher than six";
  if (playerCount < 6) playerCount = 6;

  const conditions = condition[playerCount];
  const excludeVampire = 2;

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
      const randomIndex = Math.floor(Math.random() * (array.length - mustCount)) + mustCount;

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
