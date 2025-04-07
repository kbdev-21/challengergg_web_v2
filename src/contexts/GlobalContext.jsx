import { createContext, useContext, useEffect, useState } from "react";
import { fetchCurrentLeaguePatch } from "../services/ddragonApi";
import { useQuery } from "@tanstack/react-query";

// Create the Global Context
const GlobalContext = createContext();

// Provider Component
export function GlobalProvider({ children }) {
  const storedIsDarkMode = localStorage.getItem('isDarkMode') === 'true';

  const [isDarkMode, setIsDarkMode] = useState(storedIsDarkMode);
  const {data: currentPatch, isLoading, isError} = useQuery({
    queryKey: ['currentPatch'],
    queryFn: () => fetchCurrentLeaguePatch()
  });

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode);
  }, [isDarkMode]);


  return (
    <GlobalContext.Provider value={{ currentPatch, isLoading, isError, isDarkMode, setIsDarkMode }}>
      {children}
    </GlobalContext.Provider>
  );
}

// Custom Hook to use Global Context
export function useGlobal() {
  return useContext(GlobalContext);
}
