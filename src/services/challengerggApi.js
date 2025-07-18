import axios from "axios";

const baseUrl = 'http://localhost:666';
//const baseUrl = 'https://challengergg-server.onrender.com';

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