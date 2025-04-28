import axios from "axios";

//const baseUrl = 'http://localhost:666';
const baseUrl = 'https://challengergg-server.onrender.com';

export async function fetchPlayerByRiotId(name, tag) {
  try {
    const url = `${baseUrl}/api/accounts/by-riotid/`;
    const response = await axios.get(`${url}${name}/${tag}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.log("error");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error); // Log or transform error
    throw new Error("Failed to fetch data");
  }
}

export async function fetchMatchHistoryByPuuid(puuid, queueFilter) {
  const url = `${baseUrl}/api/matches/by-puuid/`;
  const response = await axios.get(`${url}${puuid}?queueFilter=${queueFilter}&count=20`);
  if (response.status === 200) {
    return response.data.matches;
  } else {
    console.log("error");
    return null;
  }
  
}

export async function searchAccounts(searchKey) {
  const url = `${baseUrl}/api/accounts/search?query=${searchKey}`;
  const response = await axios.get(url);
  if (response.status === 200) {
    return response.data;
  } else {
    console.log("error");
    return null;
  }
}

export async function getAllChampions() {
  const url = `${baseUrl}/api/champions`;
  const response = await axios.get(url);
  if (response.status === 200) {
    return response.data.champions;
  } else {
    console.log("error");
    return null;
  }
}

export async function getChampionsByName(name) {
  const url = `${baseUrl}/api/champions/by-name/${name}`;
  const response = await axios.get(url);
  if (response.status === 200) {
    return response.data.champions;
  } else {
    console.log("error");
    return null;
  }
}

export async function fetchAccountStatsByPuuid(puuid) {
  const url = `${baseUrl}/api/accounts/stats/by-puuid/${puuid}`;
  const response = await axios.get(url);
  if (response.status === 200) {
    return response.data.stats;
  } else {
    console.log("error");
    return null;
  }
}