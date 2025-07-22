import {Box, Typography} from "@mui/material";
import {ChallengerggLogo} from "../ui/ChallengerggLogo.jsx";
import {Link, useLocation} from "react-router";
import LanguageIcon from '@mui/icons-material/Language';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import {SearchBar} from "../ui/SearchBar.jsx";

export function Navbar() {
    const location = useLocation();
    function NavItem({text, url}) {
        return (
            <Link to={url} style={{ textDecoration: "none" }}>
                <Box sx={{
                    cursor: "pointer",
                    paddingX: "30px",
                    height: "70px",
                    display: "flex",
                    alignItems: "center",
                    "&:hover .inner-text": {
                        color: "content.1",
                        fontWeight: "500"
                    },
                }}>
                    <Typography
                        className="inner-text"
                        sx={{
                            color: location.pathname === url ? "content.1" : "content.2",
                            fontSize: "16px",
                            fontWeight: location.pathname === url ? "500" : "400",
                        }}>
                        {text}
                    </Typography>
                </Box>
            </Link>
        )
    }

    return (
        <Box sx={{
            minWidth: "1060px",
            backgroundColor: "bg.2",
            borderBottom: "1px solid",
            borderBottomColor: "bg.3",
            paddingX: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
        }}>
            <Box sx={{display: "flex", alignItems: "center"}}>
                <ChallengerggLogo/>
                <Box width={"30px"}></Box>
                <NavItem text={"Champions"} url={"/champions"}></NavItem>
                <NavItem text={"Leaderboards"} url={"/leaderboards"}></NavItem>
                <NavItem text={"Chat"} url={"/chat"}></NavItem>
            </Box>
            <Box sx={{display: "flex", alignItems: "center", justifyContent: "flex-end", paddingY: "4px"}}>
                {location.pathname === "/" ? null : <SearchBar width={"360px"} barColor={"bg.1"}></SearchBar>}
                <Box width={"30px"}></Box>
                <LanguageIcon sx={{
                    fontSize: "26px",
                    color: "content.2",
                    cursor: "pointer",
                    "&:hover": {
                        color: "content.1"
                    }
                }}/>
                <Box width={"30px"}></Box>
                <InfoOutlineIcon sx={{
                    fontSize: "26px",
                    color: "content.2",
                    cursor: "pointer",
                    "&:hover": {
                        color: "content.1"
                    }
                }}/>
            </Box>
        </Box>
    )
}