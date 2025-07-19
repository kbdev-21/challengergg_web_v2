import {Box, Typography} from "@mui/material";
import {RanksDisplay} from "./RanksDisplay.jsx";
import {MatchHistory} from "./MatchHistory.jsx";

export function OverviewBody({playerData}) {
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{
                width: "1060px",
                marginTop: "12px",
                display: "flex",
                justifyContent: "space-between",
            }}>
                <RanksDisplay ranks={playerData?.ranks} />
                <MatchHistory playerData={playerData??null} />
            </Box>
        </Box>
    )
}