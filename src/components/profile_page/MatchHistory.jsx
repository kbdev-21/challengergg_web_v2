import {Box, CircularProgress, Typography} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {fetchMatchesByPuuid,} from "../../services/challengerggApi.js";
import {InternetImage} from "../ui/InternetImage.jsx";
import {MatchCard} from "./MatchCard.jsx";

export function MatchHistory({playerData}) {
    const puuid = playerData?.puuid;
    const {
        data: matchesData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["matchesData", puuid],
        queryFn: () => fetchMatchesByPuuid(puuid, 0, 20),
    });

    if(isLoading) {
        return <CircularProgress />;
    }

    if(isError) {
        return <Typography>Error</Typography>
    }

    return (
        <Box >
            {matchesData?.map((match, index) => (
                <>
                    <MatchCard matchData={match} puuid={puuid} />
                    {index < matchesData.length - 1 && <Box height="10px" />}
                </>
            ))}
        </Box>
    );


}