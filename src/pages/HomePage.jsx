import { Box, Typography } from "@mui/material";

export function HomePage() {
    return (
        <>
            <Box height={40}></Box>
            <Typography variant="h3" sx={{ fontWeight: 500, color: "white" }}>
                CHALLENGER.GG
            </Typography>
            <Box height={20}></Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
            </Box>
        </>
    );
}