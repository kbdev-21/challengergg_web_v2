import { useParams } from "react-router";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  Divider,
  GlobalStyles,
  Typography,
} from "@mui/material";
import InfoHeader from "../components/player_profile_page/InfoHeader";
import ProfileBody from "../components/player_profile_page/ProfileBody";
import LoadingCircular from "../components/ui/LoadingCircular";
import { getProfileIconUrl } from "../services/ddragonApi";
import { useGlobal } from "../contexts/GlobalContext";
import { useQuery } from "@tanstack/react-query";
import { fetchPlayerByRiotId } from "../services/leagueApi";

function PlayerProfilePage() {
  const { currentPatch } = useGlobal();
  const params = useParams();
  const name = params.nameAndTag.split("-")[0];
  const tag = params.nameAndTag.split("-")[1];
  const {
    data: playerInfo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["playerInfo", name, tag],
    queryFn: () => fetchPlayerByRiotId(name, tag),
  });

  async function handleUpdate() {
  }

  if (isLoading) {
    return <LoadingCircular />;
  }
  if (isError) {
    return <div>Player Not Found</div>;
  }
  return (
    <Box sx={{ backgroundColor: "bg.dark1", minHeight: "100vh"}}>
      <InfoHeader
        playerInfo={playerInfo}
        profileIconUrl={getProfileIconUrl(
          playerInfo.profileIconId,
          currentPatch
        )}
        handleUpdate={handleUpdate}
      ></InfoHeader>
      <ProfileBody povPuuid={playerInfo.puuid} playerRank={playerInfo.rank} />
    </Box>
  );
}

export default PlayerProfilePage;
