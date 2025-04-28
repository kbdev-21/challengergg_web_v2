import {
  Box,
  Divider,
  GlobalStyles,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { getAllChampions } from "../services/leagueApi";
import { getChampionAvatarUrl } from "../services/ddragonApi";
import { useGlobal } from "../contexts/GlobalContext";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";
import Looks5Icon from "@mui/icons-material/Looks5";
import Looks6Icon from "@mui/icons-material/Looks6";
import { Link } from "react-router";
import LoadingCircular from "../components/ui/LoadingCircular";
import { champTierDescription } from "../utils/stringUtils";
import { useQuery } from "@tanstack/react-query";
import { positionTextFormatMap } from "../utils/maps";

function ChampionsPage() {
  const { currentPatch } = useGlobal();
  const [searchKey, setSearchKey] = useState("");
  const [positionFilter, setPositionFilter] = useState("ALL");
  const { data: champs, isLoading } = useQuery({
    queryFn: () => getAllChampions(),
    queryKey: ["champs"],
  });

  let showingChamps = [];
  if (!isLoading && positionFilter === "ALL") {
    showingChamps = champs
      .filter((champion) => champion.pickRate >= 1.0)
      .sort((a, b) => b.powerScore - a.powerScore);
  }
  if (!isLoading && positionFilter !== "ALL") {
    showingChamps = champs
      .filter((champ) => champ.position === positionFilter) // Filter by position
      .filter((champ) => champ.pickRate >= 1.0) // Ensure pickRate is >= 1.0
      .sort((a, b) => b.powerScore - a.powerScore); // Sort by powerScore
  }

  if (isLoading) {
    return <LoadingCircular />;
  }

  return (
    <Box
      sx={{
        backgroundColor: "bg.dark1",
        minHeight: "100vh",
      }}
    >
      <Box>
        <Box height={10} />
        <Box
          sx={{
            border: "1px solid",
            borderColor: "content.light2",
            marginX: "25%",
            display: "flex",
            width: 1000,
            height: 50,
            marginBottom: 1,
            backgroundColor: "bg.main",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setPositionFilter("ALL");
              }}
            >
              <Looks6Icon
                sx={{
                  fontSize: 30,
                  marginX: 2,
                  color:
                    positionFilter === "ALL" ? "main.main" : "content.main",
                }}
              ></Looks6Icon>
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ backgroundColor: "content.light2" }}
            />
            <Box
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setPositionFilter("TOP");
              }}
            >
              <LooksOneIcon
                sx={{
                  fontSize: 30,
                  marginX: 2,
                  color:
                    positionFilter === "TOP" ? "main.main" : "content.main",
                }}
              ></LooksOneIcon>
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ backgroundColor: "content.light2" }}
            />
            <Box
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setPositionFilter("JGL");
              }}
            >
              <LooksTwoIcon
                sx={{
                  fontSize: 30,
                  marginX: 2,
                  color:
                    positionFilter === "JGL" ? "main.main" : "content.main",
                }}
              ></LooksTwoIcon>
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ backgroundColor: "content.light2" }}
            />
            <Box
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setPositionFilter("MID");
              }}
            >
              <Looks3Icon
                sx={{
                  fontSize: 30,
                  marginX: 2,
                  color:
                    positionFilter === "MID" ? "main.main" : "content.main",
                }}
              ></Looks3Icon>
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ backgroundColor: "content.light2" }}
            />
            <Box
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setPositionFilter("ADC");
              }}
            >
              <Looks4Icon
                sx={{
                  fontSize: 30,
                  marginX: 2,
                  color:
                    positionFilter === "ADC" ? "main.main" : "content.main",
                }}
              ></Looks4Icon>
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ backgroundColor: "content.light2" }}
            />
            <Box
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setPositionFilter("SPT");
              }}
            >
              <Looks5Icon
                sx={{
                  fontSize: 30,
                  marginX: 2,
                  color:
                    positionFilter === "SPT" ? "main.main" : "content.main",
                }}
              ></Looks5Icon>
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ backgroundColor: "content.light2" }}
            />
          </Box>

          <Box
            sx={{
              marginLeft: "auto",
              display: "flex",
              height: "100%",
              alignItems: "center",
            }}
          >
            <Divider
              orientation="vertical"
              flexItem
              sx={{ backgroundColor: "content.light2" }}
            />
            <Box width={10}></Box>
            <TextField
              autoComplete="off"
              placeholder="Search champion..."
              variant="standard"
              size="small"
              sx={{
                backgroundColor: "bg.main",
                width: 400,
                marginLeft: "auto",
              }}
              value={searchKey}
              onChange={(e) => {
                setSearchKey(e.target.value);
              }}
            />
            <Box width={10}></Box>
          </Box>
        </Box>

        <TierChampsBox tier={"S"} color={"tier.s"} />
        <TierChampsBox tier={"A"} color={"tier.a"} />
        <TierChampsBox tier={"B"} color={"tier.b"} />
        <TierChampsBox tier={"C"} color={"tier.c"} />
        <TierChampsBox tier={"D"} color={"tier.d"} />
      </Box>
    </Box>
  );

  function TierChampsBox({ tier, color }) {
    return (
      <Box
        sx={{
          border: "1px solid",
          borderColor: "content.light2",
          marginX: "25%",
          paddingY: 0.5,
          display: "flex",
          width: 1000,
          marginTop: 1,
          backgroundColor: "bg.main",
          minHeight: 86
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 100,
            padding: 1,
          }}
        >
          <Tooltip title={champTierDescription(tier)} placement="top" arrow>
            <Box
              sx={{
                backgroundColor: color,
                clipPath:
                  "polygon(7.5% 25%, 50% 0, 92.5% 25%, 92.5% 75%, 50% 100%, 7.5% 75%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 50,
                height: 50,
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "white", fontSize: 20, userSelect: "none" }}
              >
                {tier}
              </Typography>
            </Box>
          </Tooltip>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: 900,
            flexWrap: "wrap", // Allow wrapping to new line
            gap: 1, // Adds spacing between items
            padding: 1,
          }}
        >
          {showingChamps
            .filter((champ) => champ.tier === tier)
            .map((champ) => (
              <ChampionIcon champ={champ}></ChampionIcon>
            ))}
        </Box>
      </Box>
    );
  }

  function ChampionIcon({ champ }) {
    return (
      <Tooltip
        title={
          <Box sx={{ padding: 0.5 }}>
            <Typography color="white" variant="subtitle2" fontWeight="bold">
              {champ.name} ({positionTextFormatMap[champ.position]})
            </Typography>
            <Typography color="white" variant="subtitle2">
              Win rate: {champ.winRate}%
            </Typography>
            <Typography color="white" variant="subtitle2">
              Pick rate: {champ.pickRate}%
            </Typography>
          </Box>
        }
        placement="top"
        arrow
      >
        <Box
          sx={{
            height: 60,
            width: 60,
            borderRadius: "50%",
            border: "1px solid",
            borderColor: "sub.main",
            overflow: "hidden",
            cursor: "pointer",
            filter: champ.name.toLowerCase().includes(searchKey.toLowerCase())
              ? "brightness(1.0)"
              : "brightness(0.4)",
          }}
          component={Link}
          to={`/champions/${champ.name}`}
        >
          <Box
            component="img"
            src={getChampionAvatarUrl(champ.name, currentPatch)}
            alt=""
            sx={{
              height: "100%",
              width: "100%",
              transform: "scale(1.15)",
            }}
          />
        </Box>
      </Tooltip>
    );
  }
}

export default ChampionsPage;
