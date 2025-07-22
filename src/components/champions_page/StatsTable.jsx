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
import {PositionLogo} from "../ui/PositionLogo.jsx";

export function StatsTable({championStats}) {
    const {currentPatch} = useGlobal();

    const [positionFilter, setPositionFilter] = useState("TOP");

    const statsList = championStats.filter((stat) => stat.position.includes(positionFilter));

    const positions = ["TOP", "JGL", "MID", "ADC", "SPT", ""];

    return (
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Box height={"40px"}></Box>
            <Box sx={{display: "flex",width: "1060px",
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
            <Box height={"10px"}></Box>
            <TableContent/>
        </Box>

    );

    function TableContent() {
        return (
            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Box sx={{
                    width: "1060px",
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
                    <Box sx={{width: "60px", display: "flex", justifyContent: "center", paddingY: "10px"}}>
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
                            Avg. Solokills
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
                            Avg. CS/m
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
                            Avg. Dmg/m
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
                            Dmg Type
                        </Typography>
                    </Box>
                    <Box sx={{
                        width: "100px",
                        display: "flex",
                        justifyContent: "center",
                        paddingY: "10px",
                        alignItems: "center"
                    }}>
                        <Typography sx={{color: "content.2", fontWeight: "400", fontSize: "12px"}}>
                            Weak against
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
                    width: "1060px",
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
                width: "1060px",
                display: "flex",
                alignItems: "center",
                paddingY: "6px",
                paddingX: "10px"
            }}>
                <Box sx={{width: "60px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Typography sx={{color: "content.2", fontSize: "14px", fontWeight: "500"}}>
                        {index + 1}
                    </Typography>
                </Box>

                <Box sx={{width: "60px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <PositionLogo position={stat?.position} colorMode={1}/>
                </Box>

                <Box sx={{width: "180px", display: "flex", alignItems: "center", paddingY: "2px"}}>
                    <Box width={"16px"}></Box>
                    <InternetImage
                        height={"32px"}
                        width={"32px"}
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
                        {(stat?.avgSolokills ?? 0).toFixed(2)}
                    </Typography>
                </Box>
                <Box sx={{width: "80px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Typography sx={{color: "content.2", fontSize: "14px", fontWeight: "500"}}>
                        {(stat?.avgCspm ?? 0).toFixed(1)}
                    </Typography>
                </Box>
                <Box sx={{width: "80px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Typography sx={{color: "content.2", fontSize: "14px", fontWeight: "500"}}>
                        {(stat?.avgDpm ?? 0).toFixed(0)}
                    </Typography>
                </Box>
                <Box sx={{width: "80px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <DamageTypeDisplay
                        physical={stat?.avgPhysicalDmg}
                        magic={stat?.avgMagicDmg}
                        trueDmg={stat?.avgTrueDmg}
                        width={"60px"}
                        height={"3px"}
                    />
                </Box>
                <Box sx={{width: "100px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    {stat?.matchUps
                        ?.filter((m) => m.picks >= 10)
                        .filter((m) => m.winRate < 0.45)
                        .sort((a, b) => a.winRate - b.winRate)
                        .slice(0, 3)
                        .map((matchUp) => (
                            <InternetImage
                                height={"26px"}
                                width={"26px"}
                                url={getChampionAvatarUrl(matchUp.opponentChampionName, currentPatch)}
                                borderRadius={"50%"}
                                extraSx={{
                                    outline: "2px solid",
                                    outlineColor: "bg.2",
                                    outlineOffset: "-1px", // pushes the outline inward
                                }}/>
                        ))
                    }
                </Box>
                <Box sx={{width: "40px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Typography sx={{color: "content.2", fontSize: "14px", fontWeight: "500"}}>

                    </Typography>
                </Box>
            </Box>
        )
    }

    function DamageTypeDisplay({ physical, magic, trueDmg, width, height = "4px" }) {
        const total = physical + magic + trueDmg || 1; // avoid divide by zero
        const physicalPercent = Math.round((physical / total) * 100);
        const magicPercent = Math.round((magic / total) * 100);
        const trueDmgPercent = Math.round((trueDmg / total) * 100);

        console.log(physical + " " + magic + " " + trueDmg + " " + physicalPercent + " " + magicPercent + " " + trueDmgPercent);
        return (
            <Box
                sx={{
                    width: width,
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <Box sx={{ display: "flex" }}>
                    <Box
                        sx={{
                            backgroundColor: "sub.lose",
                            width: `${physicalPercent}%`,
                            height: height,
                            marginBottom: "4px",
                        }}
                    ></Box>
                    <Box
                        sx={{
                            backgroundColor: "content.1",
                            width: `${trueDmgPercent}%`,
                            height: height,
                            marginBottom: "4px",
                        }}
                    ></Box>
                    <Box
                        sx={{
                            backgroundColor: "sub.win",
                            width: `${magicPercent}%`,
                            height: height,
                            marginBottom: "4px",
                        }}
                    ></Box>
                </Box>
            </Box>
        );
    }
}