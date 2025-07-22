import {Box, CircularProgress} from "@mui/material";

export function LoadingCircle() {
    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            padding: "100px"
        }}>
            <CircularProgress
                size={20}
                sx={{ backgroundColor: "main.1", color: "main.1" }}
            />
        </Box>
    )
}