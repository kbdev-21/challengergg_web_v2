import { createContext, useContext, useEffect, useState } from "react";
import { fetchCurrentLeaguePatch } from "../services/ddragonApi";
import { useQuery } from "@tanstack/react-query";

// Create the Global Context
const GlobalContext = createContext();

// Provider Component
export function GlobalProvider({ children }) {
  const storedIsDarkMode = localStorage.getItem('isDarkMode') ?? 'true';
  const storedFollowingAccounts = JSON.parse(localStorage.getItem('followingAccounts') || '[]'); 

  const [isDarkMode, setIsDarkMode] = useState(storedIsDarkMode);
  const [followingAccounts, setFollowingAccounts] = useState(storedFollowingAccounts);

  const {data: currentPatch} = useQuery({
    queryKey: ['currentPatch'],
    queryFn: () => fetchCurrentLeaguePatch()
  });

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("followingAccounts", JSON.stringify(followingAccounts));
  }, [followingAccounts]);

  function toggleFollow(puuid) {
    setFollowingAccounts((prev) => prev.includes(puuid) ? prev.filter(id => id != puuid) : [...prev, puuid]);
  }

  function checkFollow(puuid) {
    return followingAccounts.includes(puuid);
  }

  return (
    <GlobalContext.Provider value={{ currentPatch, isDarkMode, setIsDarkMode, checkFollow, toggleFollow }}>
      {children}
    </GlobalContext.Provider>
  );
}

// Custom Hook to use Global Context
export function useGlobal() {
  return useContext(GlobalContext);
}
