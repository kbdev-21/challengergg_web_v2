import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  TextField,
  InputAdornment,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useState } from "react";
import { useSearchPlayer } from "../../hooks/useSearchPlayer";
import { useGlobal } from "../../contexts/GlobalContext";
import InfoDialog from "../ui/InfoDialog";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, setIsDarkMode } = useGlobal();
  const [searchText, setSearchText] = useState("");
  const { searchedPlayers, setSearchedPlayers, changeSearchText } =
    useSearchPlayer();
  const [isFocused, setIsFocused] = useState(false);
  const [currentSelect, setCurrentSelect] = useState(0);
  const [infoOpen, setInfoOpen] = useState(false);

  function findWithText() {
    if (searchedPlayers.length > 0 && searchedPlayers[currentSelect]) {
      const name = searchedPlayers[currentSelect].gameName;
      const tag = searchedPlayers[currentSelect].tagLine;
      navigate(`/profiles/${name}-${tag}`);
    } else if (searchText.includes("#")) {
      const [name, tag] = searchText.split("#");
      navigate(`/profiles/${name}-${tag}`);
    }

    setSearchedPlayers([]);
    setSearchText(""); // Optionally clear search bar
    setIsFocused(false);
  }

  function onPlayerClick(name, tag) {
    navigate(`/profiles/${name}-${tag}`);
    setSearchedPlayers([]);
    setSearchText(""); // Optionally clear search bar
    setIsFocused(false);
  }

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ backgroundColor: "main.main" }}
    >
      <Toolbar sx={{ display: "flex", alignItems: "center" }}>
        {/* Left-aligned content */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            CHALLENGER.GG
          </Typography>
          <Box width={80}></Box>
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 2,
              borderBottom: location.pathname === "/" ? "3px solid" : "none",
              borderBottomColor: "white",
              textDecoration: "none",
            }}
          >
            <Typography variant="subtitle1" sx={{ color: "white" }}>
              Home
            </Typography>
          </Box>
          <Box width={20}></Box>
          <Box
            component={Link}
            to="/champions"
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 2,
              borderBottom: location.pathname.includes("/champions")
                ? "3px solid"
                : "none",
              borderBottomColor: "white",
              textDecoration: "none",
            }}
          >
            <Typography variant="subtitle1" sx={{ color: "white" }}>
              Champions
            </Typography>
          </Box>
        </Box>

        {/* Right-aligned search bar and avatar */}
        {location.pathname !== "/" && (
          <Box
            sx={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
          >
            {/* Search Bar */}
            <Box position="relative">
              <TextField
                autoComplete="off"
                placeholder="Game name + #tag (VN)"
                size="small"
                sx={{ backgroundColor: "white", borderRadius: 2, width: 400 }}
                value={searchText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 100)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    findWithText();
                  } else if (e.key === "ArrowDown") {
                    if (searchedPlayers.length > 0) {
                      setCurrentSelect((prev) =>
                        Math.min(prev + 1, searchedPlayers.length - 1)
                      );
                    }
                  } else if (e.key === "ArrowUp") {
                    if (searchedPlayers.length > 0) {
                      setCurrentSelect((prev) => Math.max(prev - 1, 0));
                    }
                  }
                }}
                onChange={(e) => {
                  const text = e.target.value;
                  setSearchText(text);
                  changeSearchText(text);
                  setCurrentSelect(0);
                  if (text === "") {
                    setSearchedPlayers([]);
                  }
                }}
              />
              {isFocused && searchedPlayers.length > 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 40,
                    backgroundColor: "bg.main",
                    zIndex: 1300,
                    width: 400,
                    borderRadius: 1,
                    marginTop: 0.5,
                    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  {searchedPlayers.slice(0, 10).map((player, index) => (
                    <Box
                      key={index}
                      sx={{
                        backgroundColor:
                          index === currentSelect ? "bg.dark1" : "bg.main",
                        padding: 1,
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "bg.dark1" },
                      }}
                      onClick={() =>
                        onPlayerClick(player.gameName, player.tagLine)
                      }
                    >
                      <Typography color="content.main">
                        {player.gameName} #{player.tagLine}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
            <Box width={20} />
            <Box sx={{ cursor: "pointer" }}>
              <Brightness6Icon
                onClick={() => {
                  const current = isDarkMode;
                  setIsDarkMode(!current);
                }}
                sx={{ color: "white", fontSize: 24 }}
              ></Brightness6Icon>
            </Box>
            <Box width={20} />
            <Box sx={{ cursor: "pointer" }} onClick={() => setInfoOpen(true)}>
              <InfoOutlinedIcon
                sx={{ color: "white", fontSize: 26 }}
              ></InfoOutlinedIcon>
            </Box>
          </Box>
        )}
      </Toolbar>
      <InfoDialog open={infoOpen} onClose={() => setInfoOpen(false)}></InfoDialog>
    </AppBar>
  );
}

export default Navbar;
