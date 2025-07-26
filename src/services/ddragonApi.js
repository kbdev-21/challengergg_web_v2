import axios from "axios";
import { runeIdMap, runeStyleIdMap, spellIdMap } from "../utils/constants.js";

export function getProfileIconUrl(profileIconId, currentPatch) {
  return `https://ddragon.leagueoflegends.com/cdn/${currentPatch}/img/profileicon/${profileIconId}.png`;
}

export function getChampionAvatarUrl(champName, currentPatch) {
  if(champName === 'FiddleSticks') champName = 'Fiddlesticks';
  return `https://ddragon.leagueoflegends.com/cdn/${currentPatch}/img/champion/${champName}.png`;
}

export function getItemImageUrl(itemId, currentPatch) {
  return `https://ddragon.leagueoflegends.com/cdn/${currentPatch}/img/item/${itemId}.png`;
}

export function getSpellImageUrl(spellId, currentPatch) {
  return `https://ddragon.leagueoflegends.com/cdn/${currentPatch}/img/spell/${spellIdMap[spellId]}.png`;
}

export function getRuneImageUrl(runeId) {
  if (runeId in runeIdMap) {
    const url = runeIdMap[runeId];
    return url;
  } else return "empty";
}

export function getRuneStyleImageUrl(styleId) {
  if (styleId in runeStyleIdMap) {
    const url = runeStyleIdMap[styleId].icon;
    return url;
  } else return "empty";
}

export async function fetchRuneReforged() {
  const newestPatch = await fetchCurrentLeaguePatch();
  const url = `https://ddragon.leagueoflegends.com/cdn/${newestPatch}/data/en_US/runesReforged.json`;
  const res = await axios.get(url);
  return res.data;
}

export async function fetchCurrentLeaguePatch() {
  try {
    const apiUrl = "https://ddragon.leagueoflegends.com/api/versions.json";
    const response = await axios.get(apiUrl);
    const currentPatch = response.data[0];
    return currentPatch;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
}
