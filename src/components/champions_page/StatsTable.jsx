import {Box, Divider, Typography} from "@mui/material";
import {TextBadge} from "../ui/TextBadge.jsx";
import {InternetImage} from "../ui/InternetImage.jsx";
import {
    getChampionAvatarUrl,
    getRuneImageUrl,
    getRuneStyleImageUrl,
    getSpellImageUrl
} from "../../services/ddragonApi.js";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {useGlobal} from "../../contexts/GlobalContext.jsx";
import {useEffect, useState} from "react";

export function StatsTable({championStats}) {
    const {currentPatch} = useGlobal();

    const [positionFilter, setPositionFilter] = useState("TOP");

    const statsList = championStats.filter((stat) => stat.position.includes(positionFilter));

    const positions = ["TOP", "JGL", "MID", "ADC", "SPT", ""];

    return (
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Box height={"40px"}></Box>
            <Box sx={{display: "flex",width: "1020px",
                backgroundColor: "bg.2_lighter",border: "1px solid",
                borderColor: "bg.3",
                borderRadius: "5px",}}>
                {positions.map((position, index) => (
                    <Box sx={{display: "flex"}} key={index}>
                        <Box
                            onClick={() => {setPositionFilter(position)}}
                            sx={{
                                paddingX: "20px",
                                paddingY: "10px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer"
                            }}
                        >
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
            <Box height={"10px"}></Box>
            <TableContent/>
        </Box>

    );

    function TableContent() {
        return (
            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Box sx={{
                    width: "1020px",
                    backgroundColor: "bg.2_lighter",
                    paddingX: "10px",
                    borderTop: "1px solid",
                    borderLeft: "1px solid",
                    borderRight: "1px solid",
                    borderColor: "bg.3",
                    borderTopRightRadius: "5px",
                    borderTopLeftRadius: "5px",
                    display: "flex"
                }}>
                    <Box sx={{width: "50px", display: "flex", justifyContent: "center", paddingY: "10px"}}>
                        <Typography sx={{color: "content.2", fontWeight: "400", fontSize: "12px"}}>
                            Rank
                        </Typography>
                    </Box>
                    <Box sx={{width: "60px", display: "flex", justifyContent: "center", paddingY: "10px"}}>
                        <Typography sx={{color: "content.2", fontWeight: "400", fontSize: "12px"}}>
                            Role
                        </Typography>
                    </Box>
                    <Box sx={{width: "180px", display: "flex", justifyContent: "center", paddingY: "10px"}}>
                        <Typography sx={{color: "content.2", fontWeight: "400", fontSize: "12px"}}>
                            Champion
                        </Typography>
                    </Box>
                    <Box sx={{
                        width: "80px",
                        display: "flex", alignItems: "center",
                        justifyContent: "center", paddingY: "10px", borderBottom: "2px solid",
                        borderColor: "main.1"
                    }}>
                        <Typography sx={{color: "content.1", fontWeight: "500", fontSize: "12px"}}>
                            Tier
                        </Typography>
                    </Box>
                    <Box sx={{
                        width: "80px",
                        display: "flex",
                        justifyContent: "center",
                        paddingY: "10px",
                        alignItems: "center"
                    }}>
                        <Typography sx={{color: "content.2", fontWeight: "400", fontSize: "12px"}}>
                            Win rate
                        </Typography>
                    </Box>
                    <Box sx={{
                        width: "80px",
                        display: "flex",
                        justifyContent: "center",
                        paddingY: "10px",
                        alignItems: "center"
                    }}>
                        <Typography sx={{color: "content.2", fontWeight: "400", fontSize: "12px"}}>
                            Pick rate
                        </Typography>
                    </Box>
                    <Box sx={{
                        width: "40px",
                        display: "flex",
                        justifyContent: "center", alignItems: "center"
                    }}>
                        <KeyboardArrowLeftIcon sx={{color: "content.2", fontSize: "16px"}}></KeyboardArrowLeftIcon>
                    </Box>
                    <Box sx={{
                        width: "80px",
                        display: "flex",
                        justifyContent: "center",
                        paddingY: "10px",
                        alignItems: "center"
                    }}>
                        <Typography sx={{color: "content.2", fontWeight: "400", fontSize: "12px"}}>
                            Avg. Kills
                        </Typography>
                    </Box>
                    <Box sx={{
                        width: "80px",
                        display: "flex",
                        justifyContent: "center",
                        paddingY: "10px",
                        alignItems: "center"
                    }}>
                        <Typography sx={{color: "content.2", fontWeight: "400", fontSize: "12px"}}>
                            Avg. Deaths
                        </Typography>
                    </Box>
                    <Box sx={{
                        width: "80px",
                        display: "flex",
                        justifyContent: "center",
                        paddingY: "10px",
                        alignItems: "center"
                    }}>
                        <Typography sx={{color: "content.2", fontWeight: "400", fontSize: "12px"}}>
                            Avg. Assists
                        </Typography>
                    </Box>
                    <Box sx={{
                        width: "80px",
                        display: "flex",
                        justifyContent: "center",
                        paddingY: "10px",
                        alignItems: "center"
                    }}>
                        <Typography sx={{color: "content.2", fontWeight: "400", fontSize: "12px"}}>
                            Avg. KDA
                        </Typography>
                    </Box>
                    <Box sx={{
                        width: "80px",
                        display: "flex",
                        justifyContent: "center",
                        paddingY: "10px",
                        alignItems: "center"
                    }}>
                        <Typography sx={{color: "content.2", fontWeight: "400", fontSize: "12px"}}>
                            Avg. KP
                        </Typography>
                    </Box>
                    <Box sx={{
                        width: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <KeyboardArrowRightIcon sx={{color: "content.2", fontSize: "16px"}}></KeyboardArrowRightIcon>
                    </Box>
                </Box>
                <Box sx={{
                    width: "1020px",
                    backgroundColor: "bg.2",
                    borderBottom: "1px solid",
                    borderLeft: "1px solid",
                    borderRight: "1px solid",
                    borderColor: "bg.3",
                    borderBottomRightRadius: "5px",
                    borderBottomLeftRadius: "5px",
                    display: "flex",
                    flexDirection: "column"
                }}>
                    {statsList?.map((stat, index) => (
                        <Box key={index}>
                            <StatRow stat={stat} index={index}/>
                            {index !== statsList.length - 1 && (
                                <Divider sx={{backgroundColor: "bg.3"}}/>
                            )}
                        </Box>
                    ))}
                </Box>
            </Box>
        )
    }

    function StatRow({stat, index}) {
        return (
            <Box sx={{
                width: "1020px",
                display: "flex",
                alignItems: "center",
                paddingY: "6px",
                paddingX: "10px"
            }}>
                <Box sx={{width: "50px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Typography sx={{color: "content.2", fontSize: "14px", fontWeight: "500"}}>
                        {index + 1}
                    </Typography>
                </Box>

                <Box sx={{width: "60px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Typography sx={{color: "content.1", fontSize: "14px", fontWeight: "500"}}>
                        {stat?.position}
                    </Typography>
                </Box>

                <Box sx={{width: "180px", display: "flex", alignItems: "center"}}>
                    <Box width={"10px"}></Box>
                    <InternetImage
                        height={"40px"}
                        width={"40px"}
                        url={getChampionAvatarUrl(stat?.championName, currentPatch)}
                        borderRadius={"10px"}
                        extraSx={{
                            outline: "2px solid",
                            outlineColor: "bg.2",
                            outlineOffset: "-1px", // pushes the outline inward
                        }}/>
                    <Box width={"10px"}></Box>
                    <Typography sx={{color: "content.1", fontSize: "14px", fontWeight: "500"}}>
                        {stat?.championDisplayName}
                    </Typography>
                </Box>
                <Box sx={{width: "80px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Typography sx={{color: "content.1", fontSize: "14px", fontWeight: "500"}}>
                        {stat?.tier}
                    </Typography>
                </Box>
                <Box sx={{width: "80px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Typography sx={{color: "content.2", fontSize: "14px", fontWeight: "500"}}>
                        {((stat?.winRate ?? 0) * 100).toFixed(2)}%
                    </Typography>
                </Box>
                <Box sx={{width: "80px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Typography sx={{color: "content.2", fontSize: "14px", fontWeight: "500"}}>
                        {((stat?.pickRate ?? 0) * 100).toFixed(2)}%
                    </Typography>
                </Box>
                <Box sx={{width: "40px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Typography sx={{color: "content.2", fontSize: "14px", fontWeight: "500"}}>

                    </Typography>
                </Box>
                <Box sx={{width: "80px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Typography sx={{color: "content.2", fontSize: "14px", fontWeight: "500"}}>
                        {(stat?.avgKills ?? 0).toFixed(2)}
                    </Typography>
                </Box>
                <Box sx={{width: "80px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Typography sx={{color: "content.2", fontSize: "14px", fontWeight: "500"}}>
                        {(stat?.avgDeaths ?? 0).toFixed(2)}
                    </Typography>
                </Box>
                <Box sx={{width: "80px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Typography sx={{color: "content.2", fontSize: "14px", fontWeight: "500"}}>
                        {(stat?.avgAssists ?? 0).toFixed(2)}
                    </Typography>
                </Box>
                <Box sx={{width: "80px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Typography sx={{color: "content.2", fontSize: "14px", fontWeight: "500"}}>
                        {(stat?.avgKda ?? 0).toFixed(2)}
                    </Typography>
                </Box>
                <Box sx={{width: "80px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Typography sx={{color: "content.2", fontSize: "14px", fontWeight: "500"}}>
                        {((stat?.avgKp ?? 0) * 100).toFixed(2)}%
                    </Typography>
                </Box>
                <Box sx={{width: "40px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Typography sx={{color: "content.2", fontSize: "14px", fontWeight: "500"}}>

                    </Typography>
                </Box>
            </Box>
        )
    }
}