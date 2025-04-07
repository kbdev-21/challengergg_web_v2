import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import PlayerProfilePage from "./pages/PlayerProfilePage";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Navbar from "./components/layout/Navbar";
import { useGlobal } from "./contexts/GlobalContext.jsx";
import { ThemeProvider } from "@mui/material";
import defaultTheme from "./themes/defaultTheme.js";
import HomePage from "./pages/HomePage.jsx";
import ChampionsPage from "./pages/ChampionsPage.jsx";
import ChampDetailPage from "./pages/ChampDetailPage.jsx";
import darkTheme from "./themes/darkTheme.js";
import Footer from "./components/layout/Footer.jsx";

const App = () => {
  const { isDarkMode } = useGlobal();
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : defaultTheme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profiles/:nameAndTag" element={<PlayerProfilePage />} />
          <Route path="/champions" element={<ChampionsPage />} />
          <Route
            path="/champions/:championName"
            element={<ChampDetailPage />}
          />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
