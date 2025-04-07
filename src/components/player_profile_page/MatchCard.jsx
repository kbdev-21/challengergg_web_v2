import {
  Box,
  Typography,
  Badge,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Link } from "react-router";
import {
  getChampionAvatarUrl,
  getItemImageUrl,
  getRuneImageUrl,
  getRuneStyleImageUrl,
  getSpellImageUrl,
} from "../../services/ddragonApi";
import {
  kdaFormat,
  formatSecondsToMinutesAndSeconds,
  kbScoreColor,
  getTimeSinceGameStart,
  kbScoreDescription,
} from "../../utils/stringUtils";
import { useGlobal } from "../../contexts/GlobalContext";
import { useState } from "react";
import MatchDetail from "./MatchDetail";
import { gameModeIdFormattedToTextMap } from "../../utils/maps";

function MatchCard({ matchData, povPuuid }) {
  const { currentPatch } = useGlobal();
  const [isFull, setIsFull] = useState(false);

  const povPlayerInfo = matchData.players.find(
    (player) => player.puuid === povPuuid
  );

  const team1PlayersInfos = [];
  const team2PlayersInfos = [];
  const totalPlayers = matchData.players.length;
  for (let i = 0; i < totalPlayers; i++) {
    if (i < totalPlayers / 2) {
      team1PlayersInfos.push(matchData.players[i]);
    } else {
      team2PlayersInfos.push(matchData.players[i]);
    }
  }

  return (
    <Box>
      <Box
        onClick={() => {
          isFull ? setIsFull(false) : setIsFull(true);
        }}
        sx={{
          display: "flex",
          width: 850,
          backgroundColor: povPlayerInfo?.isWin ? "win.light1" : "lose.light1",
          borderRadius: 1.2,
          padding: 1,
          height: 105,
          border: "1px solid",
          borderColor: "content.light2",
          borderLeft: "5px solid",
          borderLeftColor: povPlayerInfo?.isWin ? "win.main" : "lose.main",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: povPlayerInfo?.isWin
              ? "win.light2"
              : "lose.light2",
          },
        }}
      >
        <Box
          sx={{
            width: 120,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              sx={{ color: povPlayerInfo?.isWin ? "win.main" : "lose.main" }}
              variant="subtitle2"
            >
              {gameModeIdFormattedToTextMap[matchData.gameMode]}
            </Typography>
            <Typography
              sx={{ color: "content.light1", fontSize: 12, fontWeight: 500 }}
              variant="body2"
            >
              {getTimeSinceGameStart(matchData.gameStartTimestamp)}
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                color: povPlayerInfo?.isWin ? "win.main" : "lose.main",
                fontSize: 12,
                fontWeight: 500,
              }}
              variant="body2"
            >
              {povPlayerInfo?.isWin ? "Victory" : "Defeat"}
            </Typography>
            <Typography
              sx={{ color: "content.light1", fontSize: 12, fontWeight: 500 }}
              variant="body2"
            >
              {formatSecondsToMinutesAndSeconds(matchData.gameDuration)}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: 8 }} />
        <Box>
          <Box sx={{ display: "flex" }}>
            <Badge
              overlap="circular"
              badgeContent={povPlayerInfo?.championLevel}
              max={99}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "sub.main",
                  borderRadius: "50%",
                },
              }}
            >
              <a
                onClick={(e) => e.stopPropagation()}
                href={`/champions/${povPlayerInfo?.championName}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Tooltip
                  title={povPlayerInfo?.championName}
                  placement="top"
                  arrow
                >
                  <Box
                    sx={{
                      height: 55,
                      width: 55,
                      borderRadius: "50%",
                      border: "1px solid",
                      borderColor: "sub.main",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      component="img"
                      src={getChampionAvatarUrl(
                        povPlayerInfo?.championName,
                        currentPatch
                      )}
                      alt=""
                      sx={{
                        height: "100%",
                        width: "100%",
                        transform: "scale(1.15)",
                      }}
                    />
                  </Box>
                </Tooltip>
              </a>
            </Badge>
            <Box sx={{ width: 8 }} />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                component="img"
                alt=""
                src={getSpellImageUrl(povPlayerInfo?.spell1Id, currentPatch)}
                sx={{
                  height: 26,
                  width: 26,
                  borderRadius: "10%",
                }}
              />
              <Box sx={{ height: 2 }} />
              <Box
                component="img"
                alt=""
                src={getSpellImageUrl(povPlayerInfo?.spell2Id, currentPatch)}
                sx={{
                  height: 26,
                  width: 26,
                  borderRadius: "10%",
                }}
              />
            </Box>
            <Box sx={{ width: 8 }} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  height: 26,
                  width: 26,
                  borderRadius: "50%",
                  backgroundColor: "black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="img"
                  alt=""
                  src={getRuneImageUrl(
                    povPlayerInfo?.rune.primarySelections[0]
                  )}
                  sx={{
                    height: 24,
                    width: 24,
                    borderRadius: "10%",
                  }}
                />
              </Box>
              <Box sx={{ height: 4 }} />
              <Box
                sx={{
                  height: 26,
                  width: 26,
                  borderRadius: "50%",
                  backgroundColor: "black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="img"
                  alt=""
                  src={getRuneStyleImageUrl(povPlayerInfo?.rune.subStyle)}
                  sx={{
                    height: 18,
                    width: 18,
                    borderRadius: "10%",
                  }}
                />
              </Box>
            </Box>
            <Box sx={{ width: 10 }} />
            <Box
              sx={{
                marginTop: 1,
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <Typography variant="subtitle2">
                {povPlayerInfo?.kills} / {povPlayerInfo?.deaths} /{" "}
                {povPlayerInfo?.assists}
              </Typography>
              <Typography variant="caption">
                {kdaFormat(povPlayerInfo?.kda ?? 0)} KDA
              </Typography>
            </Box>
          </Box>
          <Box sx={{ height: 6 }} />
          <AllItems playerInfo={povPlayerInfo} />
        </Box>
        <Box sx={{ width: 40 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ fontSize: 12, color: "content.light1" }}>
              KB Score
            </Typography>
            <Box sx={{ height: 2 }}></Box>
            <Tooltip
              title={`${kbScoreDescription(povPlayerInfo?.kbScore)}`}
              placement="top"
              arrow
            >
              <Box
                sx={{
                  backgroundColor: kbScoreColor(povPlayerInfo?.kbScore),
                  borderRadius: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingX: 1,
                  paddingTop: 0.2,
                }}
              >
                <Typography
                  sx={{ color: "white", fontSize: 18, userSelect: "none" }}
                >
                  {povPlayerInfo?.kbScore}
                </Typography>
              </Box>
            </Tooltip>
          </Box>
        </Box>
        <Box sx={{ width: 50 }} />
        <PlayersList />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-end", // Ensures alignment to the right
            flexGrow: 1, // Allows it to take available space
          }}
        >
          {isFull ? (
            <KeyboardArrowUpIcon
              sx={{ color: povPlayerInfo?.isWin ? "win.main" : "lose.main" }}
            />
          ) : (
            <KeyboardArrowDownIcon
              sx={{ color: povPlayerInfo?.isWin ? "win.main" : "lose.main" }}
            />
          )}
        </Box>
      </Box>
      {isFull ? (
        <MatchDetail
          team1PlayersInfos={team1PlayersInfos}
          team2PlayersInfos={team2PlayersInfos}
          currentPatch={currentPatch}
        />
      ) : null}
    </Box>
  );

  function AllItems({ playerInfo }) {
    return (
      <Box sx={{ display: "flex" }}>
        {playerInfo?.item0 != 0 ? (
          <Box
            component="img"
            alt=""
            src={getItemImageUrl(playerInfo?.item0, currentPatch)}
            sx={{
              height: 26,
              width: 26,
              borderRadius: "10%",
            }}
          />
        ) : (
          <Box
            sx={{
              height: 26,
              width: 26,
              borderRadius: "10%",
              backgroundColor: playerInfo?.isWin ? "win.dark1" : "lose.dark1",
            }}
          />
        )}
        <Box sx={{ width: 4 }} />
        {playerInfo?.item1 != 0 ? (
          <Box
            component="img"
            alt=""
            src={getItemImageUrl(playerInfo?.item1, currentPatch)}
            sx={{
              height: 26,
              width: 26,
              borderRadius: "10%",
            }}
          />
        ) : (
          <Box
            sx={{
              height: 26,
              width: 26,
              borderRadius: "10%",
              backgroundColor: playerInfo?.isWin ? "win.dark1" : "lose.dark1",
            }}
          />
        )}
        <Box sx={{ width: 4 }} />
        {playerInfo?.item2 != 0 ? (
          <Box
            component="img"
            alt=""
            src={getItemImageUrl(playerInfo?.item2, currentPatch)}
            sx={{
              height: 26,
              width: 26,
              borderRadius: "10%",
            }}
          />
        ) : (
          <Box
            sx={{
              height: 26,
              width: 26,
              borderRadius: "10%",
              backgroundColor: playerInfo?.isWin ? "win.dark1" : "lose.dark1",
            }}
          />
        )}
        <Box sx={{ width: 4 }} />
        {playerInfo?.item3 != 0 ? (
          <Box
            component="img"
            alt=""
            src={getItemImageUrl(playerInfo?.item3, currentPatch)}
            sx={{
              height: 26,
              width: 26,
              borderRadius: "10%",
            }}
          />
        ) : (
          <Box
            sx={{
              height: 26,
              width: 26,
              borderRadius: "10%",
              backgroundColor: playerInfo?.isWin ? "win.dark1" : "lose.dark1",
            }}
          />
        )}
        <Box sx={{ width: 4 }} />
        {playerInfo?.item4 != 0 ? (
          <Box
            component="img"
            alt=""
            src={getItemImageUrl(playerInfo?.item4, currentPatch)}
            sx={{
              height: 26,
              width: 26,
              borderRadius: "10%",
            }}
          />
        ) : (
          <Box
            sx={{
              height: 26,
              width: 26,
              borderRadius: "10%",
              backgroundColor: playerInfo?.isWin ? "win.dark1" : "lose.dark1",
            }}
          />
        )}
        <Box sx={{ width: 4 }} />
        {playerInfo?.item5 != 0 ? (
          <Box
            component="img"
            alt=""
            src={getItemImageUrl(playerInfo?.item5, currentPatch)}
            sx={{
              height: 26,
              width: 26,
              borderRadius: "10%",
            }}
          />
        ) : (
          <Box
            sx={{
              height: 26,
              width: 26,
              borderRadius: "10%",
              backgroundColor: playerInfo?.isWin ? "win.dark1" : "lose.dark1",
            }}
          />
        )}
        <Box sx={{ width: 4 }} />
        {playerInfo?.item6 != 0 ? (
          <Box
            component="img"
            alt=""
            src={getItemImageUrl(playerInfo?.item6, currentPatch)}
            sx={{
              height: 26,
              width: 26,
              borderRadius: "10%",
            }}
          />
        ) : (
          <Box
            sx={{
              height: 26,
              width: 26,
              borderRadius: "10%",
              backgroundColor: playerInfo?.isWin ? "win.dark1" : "lose.dark1",
            }}
          />
        )}
        <Box sx={{ width: 4 }} />
      </Box>
    );
  }

  function PlayersList() {
    return (
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: 140 }}>
          {team1PlayersInfos.slice(0, 5).map((player, index) => (
            <Box key={index} sx={{ display: "flex" }}>
              <Box
                sx={{
                  height: 16,
                  width: 16,
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  src={getChampionAvatarUrl(player?.championName, currentPatch)}
                  alt=""
                  sx={{
                    height: "100%",
                    width: "100%",
                    transform: "scale(1.15)",
                  }}
                />
              </Box>
              <Box sx={{ width: 4 }} />
              <a
                onClick={(e) => e.stopPropagation()}
                href={`/profiles/${player.name}-${player.tag}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    whiteSpace: "nowrap", // Prevents text from wrapping
                    overflow: "hidden", // Hides overflow text
                    textOverflow: "ellipsis", // Adds "..." when text overflows
                    maxWidth: 120, // Set a fixed width to trigger the ellipsis
                    display: "block", // Ensure it behaves as a block element
                    fontWeight: player.puuid === povPuuid ? 600 : 400,
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {player.name}
                </Typography>
              </a>
            </Box>
          ))}
        </Box>
        <Box sx={{ width: 140 }}>
          {team2PlayersInfos.slice(0, 5).map((player, index) => (
            <Box key={index} sx={{ display: "flex" }}>
              <Box
                sx={{
                  height: 16,
                  width: 16,
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  src={getChampionAvatarUrl(player?.championName, currentPatch)}
                  alt=""
                  sx={{
                    height: "100%",
                    width: "100%",
                    transform: "scale(1.15)",
                  }}
                />
              </Box>
              <Box sx={{ width: 4 }} />
              <a
                onClick={(e) => e.stopPropagation()}
                href={`/profiles/${player.name}-${player.tag}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    whiteSpace: "nowrap", // Prevents text from wrapping
                    overflow: "hidden", // Hides overflow text
                    textOverflow: "ellipsis", // Adds "..." when text overflows
                    maxWidth: 120, // Set a fixed width to trigger the ellipsis
                    display: "block", // Ensure it behaves as a block element
                    fontWeight: player.puuid === povPuuid ? 600 : 400,
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {player.name}
                </Typography>
              </a>
            </Box>
          ))}
        </Box>
      </Box>
    );
  }
}

export default MatchCard;
