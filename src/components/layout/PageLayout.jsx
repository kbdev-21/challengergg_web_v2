import {Box} from "@mui/material";
import {Navbar} from "./Navbar.jsx";
import {useLocation} from "react-router";
import {useEffect} from "react";

export function PageLayout({ children }) {
    const location = useLocation();

    useEffect(() => {
        // Scroll to top whenever the route changes
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <Box sx={{
            backgroundColor: "bg.1",
            minHeight: "2000px",
            minWidth: "1060px",
            display: "flex",
            flexDirection: "column",
        }}>
            <Navbar/>
            <Box sx={{ marginBottom: "100px" }}>{children}</Box>
        </Box>
    )
}