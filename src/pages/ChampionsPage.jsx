import {StatsPageContent} from "../components/champions_page/StatsPageContent.jsx";
import {useQuery} from "@tanstack/react-query";
import {fetchAllChampionStats, fetchPlayerByRiotId} from "../services/challengerggApi.js";
import {CircularProgress, Typography} from "@mui/material";
import {LoadingCircle} from "../components/ui/LoadingCircle.jsx";

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
        return <LoadingCircle />;
    }

    if(isError) {
        return <Typography>Error</Typography>
    }

    return (
        <>
            <StatsPageContent championStats={championStats} />
        </>
    );
}
