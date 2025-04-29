import {
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useSearchPlayer } from "../../hooks/useSearchPlayer.js";

function SearchPlayerBar() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [currentSelect, setCurrentSelect] = useState(0);

  const { searchedPlayers, changeSearchText } = useSearchPlayer();

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
    <Box >
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
            startAdornment: <InputAdornment position="start"></InputAdornment>,
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
          onClick={findWithText}
        >
          Search
        </Button>
      </Container>

      {isFocused && searchedPlayers.length > 0 && (
        <Box
          sx={{
            backgroundColor: "#ffffff",
            width: 500,
            borderRadius: 1,
            cursor: "pointer",
            marginLeft: 6,
            position: 'absolute'
          }}
        >
          {searchedPlayers.slice(0, 10).map((player, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor:
                  index === currentSelect ? "#eeeeee" : "#ffffff",
                width: "100%",
                height: 50,
                display: "flex",
                alignItems: "center",
                padding: 1,
                "&:hover": { backgroundColor: "#eeeeee" },
              }}
              onClick={() => onPlayerClick(player.gameName, player.tagLine)}
            >
              <Typography sx={{color: '#000000'}}>
                {player.gameName} #{player.tagLine}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default SearchPlayerBar;
