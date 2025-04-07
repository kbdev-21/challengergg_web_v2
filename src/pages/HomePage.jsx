import {
  Box,
  Button,
  Container,
  Divider,
  GlobalStyles,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useSearchPlayer } from "../hooks/useSearchPlayer";

function HomePage() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const { searchedPlayers, changeSearchText } = useSearchPlayer();
  const [isFocused, setIsFocused] = useState(false);
  const [currentSelect, setCurrentSelect] = useState(0);

  function findWithText() {
    if (searchedPlayers.length > 0 && searchedPlayers[currentSelect]) {
      const name = searchedPlayers[currentSelect].gameName;
      const tag = searchedPlayers[currentSelect].tagLine;
      navigate(`/profiles/${name}-${tag}`);
    } else if (searchText.includes("#")) {
      const [name, tag] = searchText.split("#");
      navigate(`/profiles/${name}-${tag}`);
    }
  }

  function onPlayerClick(name, tag) {
    navigate(`/profiles/${name}-${tag}`);
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "main.dark1",
      }}
    >
      <Box height={40}></Box>
      <Typography variant="h3" sx={{ fontWeight: 500, color: "white" }}>
        CHALLENGER.GG
      </Typography>
      <Box height={20}></Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Container
          sx={{
            backgroundColor: "white",
            padding: 1,
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            width: "auto",
            borderRadius: 8,
          }}
        >
          <TextField
            autoComplete="off"
            sx={{
              marginTop: 0.5,
              width: 500,
              "& .MuiInput-underline:before": { borderBottom: "none" },
              "& .MuiInput-underline:after": { borderBottom: "none" },
              "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                borderBottom: "none",
              },
              "& .MuiInputLabel-root": { fontWeight: "1000" },
              "& .MuiInputAdornment-root": { fontWeight: "bold" },
            }}
            placeholder="Game name + #tag (VN)"
            label="Search player"
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
            value={searchText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 100)}
            onChange={(e) => {
              setSearchText(e.target.value);
              changeSearchText(e.target.value);
              setCurrentSelect(0);
            }}
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
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "sub.main",
              textTransform: "none",
              borderRadius: 2,
            }}
            onClick={() =>
              findWithText(searchText.split("#")[0], searchText.split("#")[1])
            }
          >
            Search
          </Button>
        </Container>
      </Box>
      <Box sx={{ height: 5 }}></Box>
      {isFocused && searchedPlayers.length > 0 && (
        <Box
          sx={{
            backgroundColor: "bg.main",
            width: 500,
            borderRadius: 1,
            cursor: "pointer",
          }}
        >
          {searchedPlayers.slice(0, 10).map((player, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor:
                  index === currentSelect ? "bg.dark1" : "bg.main",
                width: "100%",
                height: 50,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                padding: 1,
                "&:hover": { backgroundColor: "bg.dark1" },
              }}
              onClick={() => onPlayerClick(player.gameName, player.tagLine)}
            >
              <Typography>
                {player.gameName} #{player.tagLine}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default HomePage;
