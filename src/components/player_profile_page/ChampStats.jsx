import { Box, Button, Divider, Tooltip, Typography } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import { useQuery } from "@tanstack/react-query";
import { fetchAccountStatsByPuuid } from "../../services/leagueApi";
import LoadingCircular from "../ui/LoadingCircular";
import { getChampionAvatarUrl } from "../../services/ddragonApi";
import { useGlobal } from "../../contexts/GlobalContext";
import { kdaFormat } from "../../utils/stringUtils";
import { useState } from "react";

function ChampStats({ puuid }) {
  const { currentPatch } = useGlobal();
  const [maxChampsShow, setMaxChampsShow] = useState(10);
  const {
    data: stats,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["stats", puuid],
    queryFn: () => fetchAccountStatsByPuuid(puuid),
  });

  return (
    <>
      <Box
        sx={{
          padding: 1.2,
          backgroundColor: "bg.main",
          borderRadius: 1,
          width: 260,
        }}
      >
        <Box sx={{ marginX: 0.5, borderRadius: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2">Champions (Ranked only)</Typography>
            <Box sx={{ cursor: "pointer" }} onClick={() => refetch()}>
              <CachedIcon
                sx={{ fontSize: 18, color: "content.main" }}
              ></CachedIcon>
            </Box>
          </Box>
          {isLoading || isError ? (
            <LoadingCircular></LoadingCircular>
          ) : (
            <>
              <Box>
                {stats?.slice(0, maxChampsShow).map((stat, index) => (
                  <Box key={index}>
                    <Divider
                      sx={{ borderColor: "content.light2", marginTop: 1 }}
                    />
                    <ChampDisplay stat={stat}></ChampDisplay>
                  </Box>
                ))}
              </Box>
              {stats.length > 10 && maxChampsShow < stats.length ? (
                <Box
                  onClick={() => setMaxChampsShow(stats.length)}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 2,
                    cursor: "pointer",
                  }}
                >
                  <Typography variant="caption">
                    Show {stats.length - 10} more
                  </Typography>
                </Box>
              ) : (
                null
              )}
            </>
          )}
        </Box>
      </Box>
    </>
  );

  function ChampDisplay({ stat }) {
    const loseRate = 100 - stat.winRate;
    const winWidth = (82 * stat.winRate) / 100;
    const loseWidth = (82 * loseRate) / 100;
    return (
      <Box
        sx={{
          display: "flex",
          marginTop: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <a
            onClick={(e) => e.stopPropagation()}
            href={`/champions/${stat.championName}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Tooltip title={stat.championName} placement="top" arrow>
              <Box
                sx={{
                  height: 34,
                  width: 34,
                  borderRadius: "50%",
                  border: "0.5px solid",
                  borderColor: "sub.main",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                <Box
                  component="img"
                  src={getChampionAvatarUrl(stat.championName, currentPatch)}
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
          <Box sx={{ width: 6 }}></Box>
          <Box sx={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <a
              onClick={(e) => e.stopPropagation()}
              href={`/champions/${stat.championName}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography sx={{ fontWeight: 800 }} variant="caption">
                {stat.championName}
              </Typography>
            </a>
            <Typography
              variant="caption"
              sx={{ fontSize: 11, marginTop: "-2px", color: "content.light1" }}
            >
              {kdaFormat(stat.avgKda)} KDA
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {winWidth > 0 && (
            <Box
              sx={{
                width: winWidth,
                backgroundColor: "#1e88e5",
                height: 20,
                display: "flex",
                alignItems: "center",
                paddingTop: 0.2,
                paddingX: 0.5,
                borderTopRightRadius: loseRate == 0 ? 5 : 0,
                borderBottomRightRadius: loseRate == 0 ? 5 : 0,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
              }}
            >
              <Typography
                sx={{ color: "white", fontSize: 11 }}
                variant="caption"
              >
                {stat.wins}W
              </Typography>
            </Box>
          )}
          {loseWidth > 0 && (
            <Box
              sx={{
                width: loseWidth,
                backgroundColor: "#f44336",
                height: 20,
                display: "flex",
                alignItems: "center",
                paddingTop: 0.2,
                paddingX: 0.5,
                borderTopLeftRadius: stat.winRate == 0 ? 5 : 0,
                borderBottomLeftRadius: stat.winRate == 0 ? 5 : 0,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                justifyContent: "end",
              }}
            >
              <Typography
                sx={{ color: "white", fontSize: 11 }}
                variant="caption"
              >
                {stat.losses}L
              </Typography>
            </Box>
          )}
          <Box sx={{ width: 5 }}></Box>
          <Box
            sx={{
              width: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="caption">
              {stat.winRate.toFixed(0)}%
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default ChampStats;
