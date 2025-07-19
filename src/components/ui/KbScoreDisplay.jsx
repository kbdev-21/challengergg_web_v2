import {Box, Typography} from "@mui/material";

export function KbScoreDisplay({score, extraSx}) {
    let color = "rate.4";
    if(score >= 75) color = "rate.1";
    else if(score >= 50) color = "rate.3";

    return (
        <Box sx={{
            backgroundColor: color,
            width: "fit-content",
            paddingX: "10px",
            paddingY: "2px",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            ...extraSx,
        }}>
            <Typography sx={{color: "content.1", fontSize: "18px", fontWeight: "400"}}>{score}</Typography>
        </Box>
    )
}