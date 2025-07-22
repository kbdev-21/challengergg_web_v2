import {Box, CircularProgress, Typography} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router";
import {PageLayout} from "../components/layout/PageLayout.jsx";
import {ProfileHeader} from "../components/profile_page/ProfileHeader.jsx";
import {fetchPlayerByRiotId} from "../services/challengerggApi.js";
import {LoadingCircle} from "../components/ui/LoadingCircle.jsx";

export function ProfilePage() {
    const params = useParams();
    const name = params.nameAndTag.split("-")[0];
    const tag = params.nameAndTag.split("-")[1];

    const {
        data: playerData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["playerData", name, tag],
        queryFn: () => fetchPlayerByRiotId(name, tag),
    });

    if(isLoading) {
        return <LoadingCircle />;
    }

    if(isError) {
        return <Typography>Error</Typography>
    }

    return (
        <>
            <ProfileHeader playerData={playerData} />
        </>
    );
}