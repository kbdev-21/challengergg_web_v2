import { formatRank } from "../../utils/stringUtils";
import {
    Badge,
    Box,
    Button,
    CircularProgress,
    Divider,
    GlobalStyles,
    Typography,
  } from "@mui/material";

function InfoHeader({ playerInfo, profileIconUrl, handleUpdate }) {
  return (
    <Box
      sx={{
        display: "flex",
        paddingX: "20%",
        paddingY: 4,
        backgroundColor: "bg.main",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Badge
          badgeContent={playerInfo?.summonerLevel}
          max={9999}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "sub.main",
              color: "black",
              left: "50%",
            },
          }}
        >
          <Box
            component="img"
            src={profileIconUrl}
            alt=""
            sx={{
              height: 100,
              width: 100,
              borderRadius: "20%",
              border: "2px solid",
              borderColor : 'sub.main'
            }}
          />
        </Badge>
      </Box>
      <Box sx={{ width: 20 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {playerInfo?.gameName}
          </Typography>
          <Box sx={{ width: 5 }} />
          <Typography variant="h5" color="content.light1" sx={{ fontWeight: 400 }}>
            #{playerInfo?.tagLine}
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography
            variant="subtitle2"
            color="content.light1"
            sx={{ fontWeight: 500 }}
          >
            {formatRank(playerInfo?.rank[0]?.rank || "UNRANKED I")}
          </Typography>
          <Divider
            orientation="vertical"
            sx={{ marginX: 0.7, height: 15, alignSelf: "center", backgroundColor: 'content.light2' }}
          />
          <Typography
            variant="subtitle2"
            color="content.light1"
            sx={{ fontWeight: 500 }}
          >
            {playerInfo?.rank[0]?.leaguePoints} LP (
            {playerInfo?.rank[0]?.queue === "RANKED_SOLO" ? "Solo/Duo" : "Flex"}
            )
          </Typography>
        </Box>
        <Box sx={{ mt: 0.5 }} />
        <Box>
          <Button
            onClick={handleUpdate}
            variant="contained"
            sx={{
              boxShadow: "none",
              backgroundColor: "main.main" ,
              transition: "none",
              textTransform: "none",
              "&:hover": {
                boxShadow: "none",
                backgroundColor: "main.dark1",
              },
            }}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default InfoHeader;