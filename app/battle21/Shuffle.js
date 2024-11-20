// const suits = ["♦", "♣", "♥", "♠"];
// const ranks = [
//   "2",
//   "3",
//   "4",
//   "5",
//   "6",
//   "7",
//   "8",
//   "9",
//   "10",
//   "J",
//   "Q",
//   "K",
//   "A",
// ];

// const Shuffle = () => {
//   const deck = suits.flatMap((suit) =>
//     ranks.map((rank) => ({
//       suit: suit,
//       rank: rank,
//       card: `${rank} of ${suit}`,
//     }))
//   );

//   function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]]; // Swap elements
//     }
//     return array;
//   }
//   console.log(shuffleArray(deck));
//   return shuffleArray(deck);
// };

// export default Shuffle;
