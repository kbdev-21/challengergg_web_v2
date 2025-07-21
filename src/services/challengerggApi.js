import axios from "axios";

const baseUrl = 'http://localhost:666';
//const baseUrl = 'https://challengergg-server.onrender.com';

export async function fetchAllChampionStats() {
    const url = `${baseUrl}/api/v1/analytics/champstats`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (e) {
        console.error("Error fetching data:", e);
        throw new Error("Failed to fetch data");
    }
}

export async function fetchPlayerByRiotId(name, tag) {
    const url = `${baseUrl}/api/v1/players/by-riotid/${name}/${tag}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (e) {
        console.error("Error fetching data:", e);
        throw new Error("Failed to fetch data");
    }
}

export async function fetchMatchesByPuuid(puuid, start, count) {
    const url = `${baseUrl}/api/v1/matches/by-puuid/${puuid}?start=${start}&count=${count}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (e) {
        console.error("Error fetching data:", e);
        throw new Error("Failed to fetch data");
    }
}

export async function searchAll(searchKey) {
    const url = `${baseUrl}/api/v1/search?key=${searchKey}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (e) {
        console.error("Error fetching data:", e);
        throw new Error("Failed to fetch data");
    }
}