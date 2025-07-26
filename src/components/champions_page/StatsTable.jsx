import {Box, Divider, Typography} from "@mui/material";
import {PositionLogo} from "../ui/PositionLogo.jsx";
import {InternetImage} from "../ui/InternetImage.jsx";
import {getChampionAvatarUrl} from "../../services/ddragonApi.js";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {useGlobal} from "../../contexts/GlobalContext.jsx";
import {useState} from "react";
import {getColorForChampionTier} from "../../utils/stringUtils.js";
import {Link} from "react-router";

export function StatsTable({statsList}) {
    const {currentPatch} = useGlobal();

    const [sortBy, setSortBy] = useState("power");
    const [sortDirection, setSortDirection] = useState("DESC");

    statsList = statsList.sort((a, b) => sortDirection === "DESC" ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy]);

    function sortRequest(wannaSortBy) {
        if(wannaSortBy === sortBy) {
            setSortDirection(sortDirection === "DESC" ? "ASC" : "DESC");
        }
        else {
            setSortBy(wannaSortBy);
            setSortDirection("DESC");
        }
    }

    function TitleBox({text, width, isSelected = false, clickable = false, onClick}) {
        return (
            <Box
                onClick={onClick}
                sx={{
                    width: width,
                    display: "flex",
                    justifyContent: "center",
                    paddingY: "10px",
                    borderBottom: isSelected ? "2px solid" : null,
                    borderColor: isSelected ? "main.1" : null,
                    cursor: clickable ? "pointer" : null
                }}
            >
                <Typography sx={{
                    color: isSelected ? "content.1" : "content.2",
                    fontWeight: isSelected ? "500" : "400",
                    fontSize: "12px"
                }}>
                    {text}
                </Typography>
            </Box>
        )
    }

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
                <TitleBox text={"Rank"} width={"60px"}/>
                <TitleBox text={"Role"} width={"60px"}/>
                <TitleBox text={"Champion"} width={"180px"}/>
                <TitleBox
                    onClick={() => {
                        sortRequest("power");
                    }}
                    text={"Tier"}
                    width={"80px"}
                    isSelected={sortBy === "power"}
                    clickable={true}
                />
                <TitleBox
                    text={"Win rate"}
                    width={"80px"}
                    clickable={true}
                    isSelected={sortBy === "winRate"}
                    onClick={() => {
                        sortRequest("winRate");
                    }}
                />
                <TitleBox
                    text={"Pick rate"}
                    width={"80px"}
                    clickable={true}
                    isSelected={sortBy === "pickRate"}
                    onClick={() => {
                        sortRequest("pickRate");
                    }}
                />
                <Box sx={{
                    width: "40px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <KeyboardArrowLeftIcon sx={{color: "content.2", fontSize: "16px"}}></KeyboardArrowLeftIcon>
                </Box>
                <TitleBox
                    text={"Avg. Solokills"}
                    width={"80px"}
                    clickable={true}
                    isSelected={sortBy === "avgSolokills"}
                    onClick={() => {
                        sortRequest("avgSolokills");
                    }}
                />
                <TitleBox
                    text={"Avg. CS/m"}
                    width={"80px"}
                    clickable={true}
                    isSelected={sortBy === "avgCspm"}
                    onClick={() => {
                        sortRequest("avgCspm");
                    }}
                />
                <TitleBox
                    text={"Avg. Dmg/m"}
                    width={"80px"}
                    clickable={true}
                    isSelected={sortBy === "avgDpm"}
                    onClick={() => {
                        sortRequest("avgDpm");
                    }}
                />
                <TitleBox text={"Dmg type"} width={"80px"}/>
                <TitleBox text={"Weak against"} width={"100px"}/>
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
    );

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
                    <Link to={`/champions/${stat.championName}`} style={{ textDecoration: "none" }}>
                        <Box sx={{display: "flex",  alignItems: "center", cursor: "pointer"}}>
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
                    </Link>
                </Box>
                <Box sx={{width: "80px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Typography sx={{color: getColorForChampionTier(stat?.tier), fontSize: "14px", fontWeight: "800"}}>
                        {stat?.tier}
                    </Typography>
                </Box>
                <Box sx={{width: "80px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Typography sx={{color: sortBy === "winRate" ? "content.1" : "content.2", fontSize: "14px", fontWeight: "500"}}>
                        {((stat?.winRate ?? 0) * 100).toFixed(2)}%
                    </Typography>
                </Box>
                <Box sx={{width: "80px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Typography sx={{color: sortBy === "pickRate" ? "content.1" : "content.2", fontSize: "14px", fontWeight: "500"}}>
                        {((stat?.pickRate ?? 0) * 100).toFixed(2)}%
                    </Typography>
                </Box>
                <Box sx={{width: "40px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                </Box>
                <Box sx={{width: "80px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Typography sx={{color: sortBy === "avgSolokills" ? "content.1" : "content.2", fontSize: "14px", fontWeight: "500"}}>
                        {(stat?.avgSolokills ?? 0).toFixed(2)}
                    </Typography>
                </Box>
                <Box sx={{width: "80px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Typography sx={{color: sortBy === "avgCspm" ? "content.1" : "content.2", fontSize: "14px", fontWeight: "500"}}>
                        {(stat?.avgCspm ?? 0).toFixed(1)}
                    </Typography>
                </Box>
                <Box sx={{width: "80px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Typography sx={{color: sortBy === "avgDpm" ? "content.1" : "content.2", fontSize: "14px", fontWeight: "500"}}>
                        {(stat?.avgDpm ?? 0).toFixed(0)}
                    </Typography>
                </Box>
                <Box sx={{width: "80px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <DamageTypeDisplay
                        physical={stat?.avgPhysicalDmg}
                        magic={stat?.avgMagicDmg}
                        trueDmg={stat?.avgTrueDmg}
                        width={"56px"}
                        height={"3px"}
                    />
                </Box>
                <Box sx={{width: "100px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    {stat?.matchUps
                        ?.filter((m) => m.picks >= 10)
                        .filter((m) => m.winRate < 0.46)
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