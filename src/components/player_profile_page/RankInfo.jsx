import {
  Badge,
  Box,
  Button,
  CircularProgress,
  Divider,
  GlobalStyles,
  Typography,
} from "@mui/material";
import MatchCard from "./MatchCard";
import { rankImgMap } from "../../utils/maps";
import { formatRank } from "../../utils/stringUtils";

function RankInfo({ playerRank }) {
  const unrank = {
    rank: "UNRANKED I",
    leaguePoints: 0,
    wins: 0,
    losses: 0,
  };
  const soloRank = playerRank.find((r) => r.queue === "RANKED_SOLO") || unrank;
  const flexRank = playerRank.find((r) => r.queue === "RANKED_FLEX") || unrank;
  const soloRankImgUrl = rankImgMap[soloRank.rank.split(" ")[0]];
  const flexRankImgUrl = rankImgMap[flexRank.rank.split(" ")[0]];

  return (
    <>
      <Box
        sx={{
          padding: 0.6,
          backgroundColor: "bg.main",
          borderRadius: 1,
          width: 260,
        }}
      >
        <Box sx={{ marginX: 0.5, padding: 1, borderRadius: 1 }}>
          <Typography variant="body2">Ranked Solo/Duo</Typography>
          <Box sx={{ height: 5 }}></Box>
          <Box sx={{ display: "flex" }}>
            <Box
              component="img"
              alt=""
              src={soloRankImgUrl ?? ""}
              sx={{
                height: 80,
                width: 80,
              }}
            ></Box>
            <Box sx={{ width: 10 }}></Box>
            <Box>
              <Typography variant="h6">
                {formatRank(soloRank.rank ?? "UNRANKED I")}
              </Typography>
              <Box></Box>
              <Typography variant="caption" color="content.light1" display="block">
                {soloRank.leaguePoints} LP
              </Typography>
              <Typography variant="caption" color="content.light1" display="block">
                {soloRank.wins}W {soloRank.losses}L
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ marginX: 0.5, padding: 1, borderRadius: 1 }}>
          <Typography variant="body2">Ranked Flex</Typography>
          <Box sx={{ height: 5 }}></Box>
          <Box sx={{ display: "flex" }}>
            <Box
              component="img"
              alt=""
              src={flexRankImgUrl ?? ""}
              sx={{
                height: 80,
                width: 80,
              }}
            ></Box>
            <Box sx={{ width: 10 }}></Box>
            <Box>
              <Typography variant="h6">
                {formatRank(flexRank.rank ?? "UNRANKED I")}
              </Typography>
              <Typography variant="caption" color="content.light1" display="block">
                {flexRank.leaguePoints} LP
              </Typography>
              <Typography variant="caption" color="content.light1" display="block">
                {flexRank.wins}W {flexRank.losses}L
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default RankInfo;
