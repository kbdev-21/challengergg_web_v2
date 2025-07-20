import {Box, InputBase, Typography} from "@mui/material";
import {ChallengerggLogo} from "../ui/ChallengerggLogo.jsx";

import {SearchBar} from "../ui/SearchBar.jsx";

export function ContentBody() {
    return (
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
            <Box height={"100px"}></Box>
            <ChallengerggLogo sizeCode={"l"}></ChallengerggLogo>
            <Box height={"40px"}></Box>
            <SearchBar/>
        </Box>
    )
}