import {LoadingCircle} from "../components/ui/LoadingCircle.jsx";
import {useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {fetchBuildsByChampionName, fetchPlayerByRiotId} from "../services/challengerggApi.js";
import {Typography} from "@mui/material";
import {ChampInfoHeader} from "../components/champion_build_page/ChampInfoHeader.jsx";

export function ChampionBuildPage() {
    const params = useParams();
    const championName = params.championName;

    const {
        data: builds,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["builds", championName],
        queryFn: () => fetchBuildsByChampionName(championName),
    });

    if(isLoading) {
        return <LoadingCircle />;
    }

    if(isError) {
        return <>Error</>;
    }

    return (
        <ChampInfoHeader builds={builds}/>
    )
}