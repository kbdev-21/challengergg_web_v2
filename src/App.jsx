import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useGlobal } from "./contexts/GlobalContext.jsx";
import { ThemeProvider } from "@mui/material";
import defaultTheme from "./themes/defaultTheme.js";
import darkTheme from "./themes/darkTheme.js";
import {HomePage} from "./pages/HomePage.jsx";
import {ProfilePage} from "./pages/ProfilePage.jsx";
import {PageLayout} from "./components/layout/PageLayout.jsx";

const App = () => {
  const { isDarkMode } = useGlobal();
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : defaultTheme}>
      <BrowserRouter>
          <PageLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profiles/:nameAndTag" element={<ProfilePage />}/>
            </Routes>
          </PageLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
