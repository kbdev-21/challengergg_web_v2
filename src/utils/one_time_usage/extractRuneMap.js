import axios from "axios";

const url = `https://ddragon.leagueoflegends.com/cdn/14.4.1/data/en_US/runesReforged.json`;
const res = await axios.get(url);
const runes = res.data;

const runeIdMap = {};
runes.forEach((tree) => {
  tree.slots.forEach((slot) => {
    slot.runes.forEach((rune) => {
      runeIdMap[rune.id] = `https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`; // Remove spaces and colons
    });
  });
});

console.log(runeIdMap);

const url2 = `https://ddragon.leagueoflegends.com/cdn/14.4.1/data/en_US/runesReforged.json`;
const res2 = await axios.get(url2);
const runeStyles = res2.data;

const runeStyleMap = {};

runeStyles.forEach((style) => {
  runeStyleMap[style.id] = {
    name: style.name,
    icon: `https://ddragon.leagueoflegends.com/cdn/img/${style.icon}`, // Full URL for image
  };
});

console.log(runeStyleMap);
