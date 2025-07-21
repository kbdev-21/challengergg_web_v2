import {StatsTable} from "../components/champions_page/StatsTable.jsx";
import {useQuery} from "@tanstack/react-query";
import {fetchAllChampionStats, fetchPlayerByRiotId} from "../services/challengerggApi.js";
import {CircularProgress, Typography} from "@mui/material";

export function ChampionsPage() {
    const {
        data: championStats,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["championStats"],
        queryFn: () => fetchAllChampionStats()
    });

    if(isLoading) {
        return <CircularProgress />;
    }

    if(isError) {
        return <Typography>Error</Typography>
    }

    return (
        <>
            <StatsTable championStats={championStats} />
        </>
    );
}
