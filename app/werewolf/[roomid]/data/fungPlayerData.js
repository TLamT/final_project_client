import characterData from "./character";

const formatCharacterData = (faction) => {
  return Object.keys(characterData[faction]).map((char) => ({
    roleName: char,
    faction,
    ...characterData[faction][char],
  }));
};

export default [
  ...formatCharacterData("town"),
  ...formatCharacterData("witch"),
  ...formatCharacterData("neutral"),
];
