import {Box} from "@mui/material";
import {Navbar} from "./Navbar.jsx";

export function PageLayout({ children }) {
    return (
        <Box sx={{
            backgroundColor: "bg.1",
            minHeight: "100vh",
            minWidth: "1060px",
            display: "flex",
            flexDirection: "column",
        }}>
            <Navbar/>
            <Box sx={{ flex: 1 }}>{children}</Box>
        </Box>
    )
}