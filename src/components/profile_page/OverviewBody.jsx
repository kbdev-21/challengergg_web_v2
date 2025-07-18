import {Box, Typography} from "@mui/material";
import {RanksDisplay} from "./RanksDisplay.jsx";

export function OverviewBody({playerData}) {
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{
                width: "1000px",
                marginTop: "16px",
                display: "flex",
                justifyContent: "space-between",
            }}>
                <RanksDisplay ranks={playerData?.ranks} />
                <Box sx={{
                    width: "700px"
                }}>
                    <Box sx={{
                        width: "700px",
                        backgroundColor: "bg.2",
                        padding: "20px",
                        border: "0.5px solid",
                        borderColor: "bg.3",
                        borderRadius: "6px",
                    }}>qwef</Box>
                    <Box height={"10px"}></Box>
                    <Box sx={{
                        width: "700px",
                        backgroundColor: "bg.2",
                        padding: "20px",
                        border: "0.5px solid",
                        borderColor: "bg.3",
                        borderRadius: "6px",
                    }}>qwef</Box>
                </Box>
            </Box>
        </Box>
    )
}