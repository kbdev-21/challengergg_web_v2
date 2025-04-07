import { Box, Divider, GlobalStyles, Tooltip, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { getChampionsByName } from "../services/leagueApi";
import LoadingCircular from "../components/ui/LoadingCircular";
import { useGlobal } from "../contexts/GlobalContext";
import { getChampionAvatarUrl } from "../services/ddragonApi";
import { champTierColor, champTierDescription } from "../utils/stringUtils";
import { useState } from "react";
import { positionTextFormatMap } from "../utils/maps";

function ChampDetailPage() {
  const { currentPatch } = useGlobal();
  const params = useParams();
  const name = params.championName;
  const [curPosSelection, setCurPosSelection] = useState(0);
  const { data: champions, isLoading } = useQuery({
    queryFn: () => getChampionsByName(name),
    queryKey: ["champions", name],
  });

  let showingChamps = [];
  let totalPickRate = 0;
  if (!isLoading) {
    champions.forEach((champ) => {
      totalPickRate += champ.pickRate;
    })
    showingChamps = champions.filter((champion) => champion.pickRate >= 1.0);
  }

  if (isLoading) {
    return <LoadingCircular />;
  }

  return (
    <Box sx={{ backgroundColor: "bg.dark1", minHeight: "100vh", }}>
      <Box height={10}></Box>
      <Box
        sx={{
          marginX: "20%",
          backgroundColor: "bg.main",
          borderRadius: 1,
          border: "1px solid",
          borderColor: "content.light2",
          padding: 1,
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              height: 70,
              width: 70,
              borderRadius: "10%",
              border: "1px solid",
              borderColor: "sub.main",
              overflow: "hidden",
            }}
            component={Link}
            to={`/champions/${showingChamps[curPosSelection]?.name}`}
          >
            <Box
              component="img"
              src={getChampionAvatarUrl(
                showingChamps[curPosSelection]?.name,
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
          <Box marginLeft={2}>
            <Typography variant="h6">
              {showingChamps[curPosSelection]?.name}
            </Typography>
            <Box sx={{ height: 20, display: "flex" }}>
              {showingChamps?.map((champ, index) => (
                <Box
                  onClick={() => setCurPosSelection(index)}
                  sx={{
                    borderRadius: "10%",
                    border: "2px solid",
                    borderColor:
                      index == curPosSelection ? "main.main" : "content.light1",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "5px",
                    padding: 1,
                    paddingTop: 1.5,
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: index == curPosSelection ? 800 : 400,
                      color:
                        index == curPosSelection
                          ? "main.main"
                          : "content.light1",
                    }}
                  >
                    {positionTextFormatMap[champ.position]} {Math.round((champ.pickRate / totalPickRate) * 100)}%
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Box sx={{ height: 10 }}></Box>
        <Box
          sx={{
            display: "inline-flex",
            borderRadius: 2,
            border: "1px solid",
            borderColor: "content.light2",
            padding: 1,
          }}
        >
          <Box
            sx={{
              padding: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="caption">Tier</Typography>
            <Tooltip
              title={champTierDescription(showingChamps[curPosSelection]?.tier)}
              placement="top"
              arrow
            >
              <Box
                sx={{
                  backgroundColor: champTierColor(
                    showingChamps[curPosSelection]?.tier
                  ),
                  clipPath:
                    "polygon(7.5% 25%, 50% 0, 92.5% 25%, 92.5% 75%, 50% 100%, 7.5% 75%)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 26,
                  height: 26,
                  paddingTop: 0.2
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "white", fontSize: 12, userSelect: "none" }}
                >
                  {showingChamps[curPosSelection]?.tier}
                </Typography>
              </Box>
            </Tooltip>
          </Box>
          <Divider
            orientation="vertical"
            variant="middle"
            sx={{ color: "content.main", height: "50px", marginX: 1 ,backgroundColor: 'content.light2'}}
          ></Divider>
          <Box
            sx={{
              padding: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="caption">Win rate</Typography>
            <Typography variant="subtitle2" sx={{ fontSize: 16 }}>
              {showingChamps[curPosSelection]?.winRate}%
            </Typography>
          </Box>
          <Divider
            orientation="vertical"
            variant="middle"
            sx={{ color: "content.main", height: "50px", marginX: 1 ,backgroundColor: 'content.light2'}}
          ></Divider>
          <Box
            sx={{
              padding: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="caption">Pick rate</Typography>
            <Typography variant="subtitle2" sx={{ fontSize: 16 }}>
              {showingChamps[curPosSelection]?.pickRate}%
            </Typography>
          </Box>
          <Divider
            orientation="vertical"
            variant="middle"
            sx={{ color: "content.main", height: "50px", marginX: 1 ,backgroundColor: 'content.light2'}}
          ></Divider>
          <Box
            sx={{
              padding: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="caption">Games</Typography>
            <Typography variant="subtitle2" sx={{ fontSize: 16 }}>
              {showingChamps[curPosSelection]?.picks}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ChampDetailPage;
