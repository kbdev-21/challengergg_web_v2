import {Box} from "@mui/material";

export function PageLayout({ children }) {
    return (
        <Box sx={{
            backgroundColor: "bg.1",
            minHeight: "100vh",
            minWidth: "1000px",
            display: "flex",
            flexDirection: "column",
        }}>
            <Box sx={{ flex: 1 }}>{children}</Box>
        </Box>
    )
}