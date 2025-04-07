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
import {
  kbScoreColor,
  kbScoreDescription,
  kdaFormat,
} from "../../utils/stringUtils";
import {
  getChampionAvatarUrl,
  getItemImageUrl,
  getRuneImageUrl,
  getRuneStyleImageUrl,
  getSpellImageUrl,
} from "../../services/ddragonApi";
import { Link } from "react-router";

function MatchDetail({ team1PlayersInfos, team2PlayersInfos, currentPatch }) {
  let highestDmg = 0;
  team1PlayersInfos.forEach((playerInfo) => {
    if (playerInfo.totalDamageDealt > highestDmg)
      highestDmg = playerInfo.totalDamageDealt;
  });
  team2PlayersInfos.forEach((playerInfo) => {
    if (playerInfo.totalDamageDealt > highestDmg)
      highestDmg = playerInfo.totalDamageDealt;
  });

  return (
    <Box
      sx={{
        marginTop: 1,
        backgroundColor: "bg.main",
        borderRadius: 1.2,
        border: "1px solid",
        borderColor: "content.light2",
      }}
    >
      <TeamTable players={team1PlayersInfos} teamName={"Blue Team"}></TeamTable>

      <TeamTable players={team2PlayersInfos} teamName={"Red Team"}></TeamTable>
    </Box>
  );

  function ChampInfoDisplay({ player, currentPatch }) {
    return (
      <Box sx={{ display: "flex", width: 200 }}>
        <Badge
          overlap="circular"
          badgeContent={player.championLevel}
          max={99}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "sub.main",
              borderRadius: "50%",
              fontSize: "0.6rem", // Smaller text inside the badge
              height: "16px", // Smaller badge height
              width: "16px", // Smaller badge width
              minWidth: "16px", // Ensures it's round
            },
          }}
        >
          <a
            onClick={(e) => e.stopPropagation()}
            href={`/champions/${player.championName}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Tooltip title={player.championName} placement="top" arrow>
              <Box
                sx={{
                  height: 36,
                  width: 36,
                  borderRadius: "50%",
                  border: "1px solid",
                  borderColor: "sub.main",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                <Box
                  component="img"
                  src={getChampionAvatarUrl(player.championName, currentPatch)}
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
            src={getSpellImageUrl(player.spell1Id, currentPatch)}
            sx={{
              height: 18,
              width: 18,
              borderRadius: "10%",
            }}
          />
          <Box sx={{ height: 2 }} />
          <Box
            component="img"
            alt=""
            src={getSpellImageUrl(player.spell2Id, currentPatch)}
            sx={{
              height: 18,
              width: 18,
              borderRadius: "10%",
            }}
          />
        </Box>
        <Box sx={{ width: 4 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: 18,
              width: 18,
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
              src={getRuneImageUrl(player.rune.primarySelections[0])}
              sx={{
                height: 16,
                width: 16,
                borderRadius: "10%",
              }}
            />
          </Box>
          <Box sx={{ height: 2 }} />
          <Box
            sx={{
              height: 18,
              width: 18,
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
              src={getRuneStyleImageUrl(player.rune.subStyle)}
              sx={{
                height: 12,
                width: 12,
                borderRadius: "10%",
              }}
            />
          </Box>
        </Box>
        <Box sx={{ width: 8 }} />
        <Box sx={{ display: "flex", alignItems: "center" }}>
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
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {player.name}
            </Typography>
          </a>
        </Box>
      </Box>
    );
  }

  function KbScoreDisplay({ kbScore }) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tooltip title={`${kbScoreDescription(kbScore)}`} placement="top" arrow>
          <Box
            sx={{
              backgroundColor: kbScoreColor(kbScore),
              borderRadius: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 0.2,
              width: 40,
            }}
          >
            <Typography
              sx={{ color: "white", fontSize: 18, userSelect: "none" }}
            >
              {kbScore}
            </Typography>
          </Box>
        </Tooltip>
      </Box>
    );
  }

  function DamageDisplay({ dmg }) {
    const lengthPercent = (dmg / highestDmg) * 100;
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption">{dmg}</Typography>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              backgroundColor: "red",
              width: `${lengthPercent}%`,
              height: 5,
              marginBottom: 1,
            }}
          ></Box>
          <Box
            sx={{
              backgroundColor: "bg.main",
              width: `${100 - lengthPercent}%`,
              height: 5,
              marginBottom: 1,
            }}
          ></Box>
        </Box>
      </Box>
    );
  }

  function AllItemsDisplay({ playerInfo }) {
    const imgSize = 22;
    const spaceBetween = 2;

    const items = [
      playerInfo.item0,
      playerInfo.item1,
      playerInfo.item2,
      playerInfo.item3,
      playerInfo.item4,
      playerInfo.item5,
      playerInfo.item6,
    ];

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: (imgSize + spaceBetween) * items.length, // Keep consistent width
        }}
      >
        <Box sx={{ display: "flex" }}>
          {items.map((item, index) => (
            <>
              <Box
                component={item !== 0 ? "img" : "div"}
                src={
                  item !== 0 ? getItemImageUrl(item, currentPatch) : undefined
                }
                sx={{
                  height: imgSize,
                  width: imgSize,
                  borderRadius: "10%",
                  backgroundColor:
                    item === 0
                      ? playerInfo.isWin
                        ? "win.dark1"
                        : "lose.dark1"
                      : "transparent",
                }}
              />
              {index < items.length - 1 && <Box sx={{ width: spaceBetween }} />}
            </>
          ))}
        </Box>
      </Box>
    );
  }

  function TeamTable({ players, teamName }) {
    return (
      <TableContainer
        sx={{
          backgroundColor: "bg.main",
          borderRadius: 1.2,
        }}
      >
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow sx={{ height: "30px" }}>
              <TableCell sx={{ padding: "4px 8px", width: 200 }}>
                <Typography variant="caption">
                  {teamName} ({players[0].isWin ? "Victory" : "Defeat"})
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ padding: "4px 0px", width: 60 }}>
                <Typography variant="caption">KB Score</Typography>
              </TableCell>
              <TableCell align="center" sx={{ padding: "4px 0px", width: 80 }}>
                <Typography variant="caption">KDA</Typography>
              </TableCell>
              <TableCell align="center" sx={{ padding: "4px 0px", width: 100 }}>
                <Typography variant="caption">Damage</Typography>
              </TableCell>
              <TableCell align="center" sx={{ padding: "4px 0px", width: 60 }}>
                <Typography variant="caption">CS (Gold)</Typography>
              </TableCell>
              <TableCell align="center" sx={{ padding: "4px 0px", width: 60 }}>
                <Typography variant="caption">Wards</Typography>
              </TableCell>
              <TableCell align="center" sx={{ padding: "4px 0px", width: 180 }}>
                <Typography variant="caption">Items</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player) => (
              <TableRow
                key={player.championName}
                sx={{
                  height: "30px",
                  backgroundColor: player.isWin ? "win.light1" : "lose.light1",
                }}
              >
                <TableCell sx={{ padding: "4px 8px", paddingRight: "0px" }}>
                  <ChampInfoDisplay
                    player={player}
                    currentPatch={currentPatch}
                  />
                </TableCell>
                <TableCell sx={{ padding: "4px 0px" }}>
                  <KbScoreDisplay kbScore={player.kbScore}></KbScoreDisplay>
                </TableCell>
                <TableCell sx={{ padding: "4px 0px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="subtitle2">
                      {player.kills} / {player.deaths} / {player.assists}
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                      {kdaFormat(player.kda ?? 0)}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ padding: "4px 8px" }}>
                  <DamageDisplay dmg={player.totalDamageDealt}></DamageDisplay>
                </TableCell>
                <TableCell sx={{ padding: "4px 8px" }}>
                  <Tooltip
                    title={`CS: ${player.totalCs} | Gold: ${player.totalGold}`}
                    placement="top"
                    arrow
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="body2">{player.totalCs}</Typography>
                      <Typography variant="caption">
                        ({player.totalGold})
                      </Typography>
                    </Box>
                  </Tooltip>
                </TableCell>
                <TableCell sx={{ padding: "4px 8px" }}>
                  <Tooltip
                    title={`Wards placed: ${player.wardsPlaced} | Wards killed: ${player.wardsKilled}`}
                    placement="top"
                    arrow
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="caption">
                        {player.wardsPlaced} / {player.wardsKilled}
                      </Typography>
                    </Box>
                  </Tooltip>
                </TableCell>
                <TableCell sx={{ padding: "4px 8px" }}>
                  <AllItemsDisplay playerInfo={player}></AllItemsDisplay>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default MatchDetail;
