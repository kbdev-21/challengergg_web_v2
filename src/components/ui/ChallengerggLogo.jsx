import {Box, Typography} from "@mui/material";
import {Link} from "react-router";

export function ChallengerggLogo({sizeCode = "m"}) {
    let challengerSize = "26px";
    let ggSize = "16px";
    let gap = "4px";
    if (sizeCode === "l") {
        challengerSize = "54px";
        ggSize = "30px";
        gap = "4px";
    }
    return (
        <Link to="/" style={{ textDecoration: "none" }}>
        <Box sx={{display: "flex", cursor: "pointer"}}>
            <Typography sx={{color: "content.1", fontSize: challengerSize, fontWeight: "500"}}>
                CHALLENGER
            </Typography>
            <Box width={gap}></Box>
            <Typography sx={{color: "main.1", fontSize: ggSize, fontWeight: "500"}}>
                .GG
            </Typography>
        </Box>
        </Link>
    )
}