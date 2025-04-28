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
import MatchHistory from "./MatchHistory";
import RankInfo from "./RankInfo";
import ChampStats from "./ChampStats";

function ProfileBody({ povPuuid, playerRank }) {
  return (
    <Box sx={{ marginX: "20%", display: "flex", width: 1200 }}>
      <Box sx={{ marginTop: 1, width: 260}}>
        <RankInfo playerRank={playerRank}></RankInfo>
        <Box sx={{height: 10}}></Box>
        <ChampStats puuid={povPuuid}></ChampStats>
      </Box>
      <Box sx={{ width: 10 }}></Box>
      <Box sx={{ marginTop: 1, width: 850 }}>
        <MatchHistory povPuuid={povPuuid}></MatchHistory>
      </Box>
    </Box>
  );
}

export default ProfileBody;
