import {Box, Divider, InputBase, Typography} from "@mui/material";
import {TextBadge} from "../ui/TextBadge.jsx";
import {InternetImage} from "../ui/InternetImage.jsx";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SearchIcon from '@mui/icons-material/Search';
import {useGlobal} from "../../contexts/GlobalContext.jsx";
import {useEffect, useState} from "react";
import {PositionLogo} from "../ui/PositionLogo.jsx";
import {StatsTable} from "./StatsTable.jsx";

export function StatsPageContent({championStats}) {
    const {currentPatch} = useGlobal();

    const [positionFilter, setPositionFilter] = useState("TOP");
    const [nameFilter, setNameFilter] = useState("");

    const statsList = championStats
        .filter((stat) => stat.position.includes(positionFilter))
        .filter((stat) => stat.championDisplayName.toLowerCase().includes(nameFilter.toLowerCase()));

    const positions = ["TOP", "JGL", "MID", "ADC", "SPT", ""];

    return (
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Box height={"40px"}></Box>
            <Box sx={{width: "1060px"}}>
                <Typography
                    sx={{
                        color:  "content.1",
                        fontSize: "18px",
                        fontWeight: "500"
                    }}
                >
                    Champion Tier List
                </Typography>
                <Box height={"2px"}></Box>
                <Typography
                    sx={{
                        color:  "content.2",
                        fontSize: "14px",
                        fontWeight: "500"
                    }}
                >
                    Data from Elite Tier matches (Challenger, Grandmaster, Master) - Patch {currentPatch?.split(".").slice(0, 2).join(".")} - VN Server
                </Typography>
            </Box>
            <Box height={"20px"}></Box>
            <Box sx={{
                display: "flex",
                width: "1060px",
                backgroundColor: "bg.2_lighter",
                border: "1px solid",
                borderColor: "bg.3",
                borderRadius: "5px",
                justifyContent: "space-between",
                alignItems: "center"
            }}
            >
                <Box sx={{display: "flex"}}>
                    {positions.map((position, index) => (
                        <Box sx={{display: "flex"}} key={index}>
                            <Box
                                onClick={() => {setPositionFilter(position)}}
                                sx={{
                                    paddingX: "24px",
                                    paddingY: "12px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer"
                                }}
                            >
                                {position !== "" ?
                                    <Box sx={{display: "flex"}}>
                                        <PositionLogo position={position} colorMode={positionFilter === position ? 1 : 0}/>
                                        <Box width={"10px"}></Box>
                                    </Box>
                                    : null}
                                <Typography
                                    sx={{
                                        color: positionFilter === position ? "content.1" : "content.2",
                                        fontSize: "14px",
                                        fontWeight: "500"
                                    }}
                                >
                                    {position === "" ? "ALL" : position}
                                </Typography>
                            </Box>
                            <Divider orientation="vertical" sx={{ backgroundColor: "bg.3"}}/>
                        </Box>
                    ))}
                </Box>
                <Box sx={{display: "flex", justifyContent: "flex-end", paddingX: "6px"}}>
                    <Box sx={{
                        height: "40px",
                        width: "400px",
                        backgroundColor: "bg.1",
                        borderRadius: "4px",
                        border: "1px solid",
                        borderColor: "bg.3",
                        display: "flex",
                        alignItems: "center",
                        paddingX: "10px",
                    }}>
                        <SearchIcon
                            sx={{color: "content.2", fontSize: "24px"}}
                        />
                        <Box width={"10px"}></Box>
                        <InputBase
                            value={nameFilter}
                            onChange={(e) => {setNameFilter(e.target.value)}}
                            placeholder="Search champions"
                            sx={{
                                width: "100%",
                                color: "content.1",
                                fontSize: "14px",
                                fontWeight: "400",
                                backgroundColor: "transparent",
                                border: "none",
                                outline: "none",
                                "& input": {
                                    padding: 0,
                                }
                            }}
                        />
                        <Box width={"10px"}></Box>
                    </Box>
                </Box>
            </Box>
            <Box height={"10px"}></Box>
            <StatsTable statsList={statsList}/>
        </Box>
    );
}