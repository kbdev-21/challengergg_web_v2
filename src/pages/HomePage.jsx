import { Box, Typography } from "@mui/material";
import {ChallengerggLogo} from "../components/ui/ChallengerggLogo.jsx";

export function HomePage() {
    return (
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
            <Box height={"100px"}></Box>
            <ChallengerggLogo sizeCode={"l"}></ChallengerggLogo>
        </Box>
    );
}