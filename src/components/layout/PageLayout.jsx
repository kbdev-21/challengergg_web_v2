import {Box} from "@mui/material";
import {Navbar} from "./Navbar.jsx";

export function PageLayout({ children }) {
    return (
        <Box sx={{
            backgroundColor: "bg.1",
            minHeight: "2000px",
            minWidth: "1060px",
            display: "flex",
            flexDirection: "column",
        }}>
            <Navbar/>
            <Box sx={{ flex: 1, marginBottom: "100px" }}>{children}</Box>
        </Box>
    )
}