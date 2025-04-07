import { useState } from "react";
import { searchAccounts } from "../services/leagueApi";

export function useSearchPlayer() {
  const [searchedPlayers, setSearchedPlayers] = useState([]);

  function changeSearchText(newKey) {
    if (newKey == "") {
      setSearchedPlayers([]);
    }
    if (newKey != "") {
      search(newKey);
    }
  }

  async function search(key) {
    const searchedAccount = await searchAccounts(key);
    setSearchedPlayers(searchedAccount);
  }

  return {
    changeSearchText,
    searchedPlayers,
    setSearchedPlayers
  }
}
