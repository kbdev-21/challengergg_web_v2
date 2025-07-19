import {Box, Divider, Typography} from "@mui/material";
import {InternetImage} from "../ui/InternetImage.jsx";
import {
    getChampionAvatarUrl, getItemImageUrl,
    getRuneImageUrl,
    getRuneStyleImageUrl,
    getSpellImageUrl
} from "../../services/ddragonApi.js";
import {useGlobal} from "../../contexts/GlobalContext.jsx";
import {KbScoreDisplay} from "../ui/KbScoreDisplay.jsx";
import {kdaFormat, placementToDisplayString} from "../../utils/stringUtils.js";

export function MatchDetail({matchData}) {
    const {currentPatch} = useGlobal();

    let highestDmg = 0;
    matchData?.performances.forEach((performance) => {
        if (performance.totalDamageDealt > highestDmg)
            highestDmg = performance.totalDamageDealt;
    });

    const champImgSize = "34px";
    const miniImgSize = "16px";
    const gapSize = "2px";

    return (
        <>
            <Box sx={{
                width: "750px",
                backgroundColor: "bg.2_lighter",
                padding: "10px",
                borderTop: "1px solid",
                borderLeft: "1px solid",
                borderRight: "1px solid",
                borderColor: "bg.3",
                borderTopRightRadius: "5px",
                borderTopLeftRadius: "5px",
                display: "flex",
                marginTop: "10px"
            }}>
                <Box sx={{width: "180px"}}>
                    <Typography sx={{color: "content.1", fontWeight: "500", fontSize: "12px"}}>
                        Scoreboard
                    </Typography>
                </Box>
                <Box sx={{width: "80px", display: "flex", justifyContent: "center"}}>
                    <Typography sx={{color: "content.1", fontWeight: "500", fontSize: "12px"}}>
                        KB Score
                    </Typography>
                </Box>
                <Box sx={{width: "100px", display: "flex", justifyContent: "center"}}>
                    <Typography sx={{color: "content.1", fontWeight: "500", fontSize: "12px"}}>
                        KDA
                    </Typography>
                </Box>
                <Box sx={{width: "80px", display: "flex", justifyContent: "center"}}>
                    <Typography sx={{color: "content.1", fontWeight: "500", fontSize: "12px"}}>
                        Damage
                    </Typography>
                </Box>
                <Box sx={{width: "60px", display: "flex", justifyContent: "center"}}>
                    <Typography sx={{color: "content.1", fontWeight: "500", fontSize: "12px"}}>
                        CS
                    </Typography>
                </Box>
                <Box sx={{width: "50px", display: "flex", justifyContent: "center"}}>
                    <Typography sx={{color: "content.1", fontWeight: "500", fontSize: "12px"}}>
                        Vision
                    </Typography>
                </Box>
                <Box sx={{width: "160px", display: "flex", justifyContent: "center", marginX: "10px"}}>
                    <Typography sx={{color: "content.1", fontWeight: "500", fontSize: "12px"}}>
                        Items
                    </Typography>
                </Box>
            </Box>
            <Box sx={{
                width: "750px",
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
                {matchData?.performances.map((performance, index) => (
                    <>
                        <PerformanceDetail performance={performance}></PerformanceDetail>
                        {index !== matchData.performances.length - 1 && (
                            <Divider sx={{ backgroundColor: "bg.3" }} />
                        )}
                    </>
                ))}
            </Box>
        </>

    )

    function DamageDisplay({ dmg, highestDmg, width }) {
        const lengthPercent = (dmg / highestDmg) * 100;
        return (
            <Box
                sx={{
                    width: width,
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <Typography sx={{
                    color: "content.1",
                    fontSize: "12px",
                    fontWeight: "500",
                    marginBottom: "4px",
                    textAlign: "center"
                }}>
                    {dmg}
                </Typography>
                <Box sx={{ display: "flex" }}>
                    <Box
                        sx={{
                            backgroundColor: "rate.4",
                            width: `${lengthPercent}%`,
                            height: "5px",
                            marginBottom: "4px",
                        }}
                    ></Box>
                    <Box
                        sx={{
                            backgroundColor: "bg.3",
                            width: `${100 - lengthPercent}%`,
                            height: "5px",
                            marginBottom: "4px",
                        }}
                    ></Box>
                </Box>
            </Box>
        );
    }

    function PerformanceDetail({performance}) {
        return (
            <Box sx={{
                width: "750px",
                display: "flex",
                alignItems: "center",
                paddingY: "6px",
                paddingX: "10px"
            }}>
                <Box sx={{width: "80px", display: "flex"}}>
                    <InternetImage
                        height={champImgSize}
                        width={champImgSize}
                        url={getChampionAvatarUrl(performance?.championName, currentPatch)}
                        borderRadius={"50%"}
                        extraSx={{
                            outline: "2px solid",
                            outlineColor: performance?.win ? "sub.win" : "sub.lose",
                            outlineOffset: "-1px", // pushes the outline inward
                        }}
                    />
                    <Box width={"4px"}></Box>
                    <Box sx={{display: "flex", flexDirection: "column"}}>
                        <InternetImage
                            height={miniImgSize}
                            width={miniImgSize}
                            url={getSpellImageUrl(performance?.spell1Id, currentPatch)}
                            borderRadius={"2px"}
                        />
                        <Box height={gapSize}></Box>
                        <InternetImage
                            height={miniImgSize}
                            width={miniImgSize}
                            url={getSpellImageUrl(performance?.spell2Id, currentPatch)}
                            borderRadius={"2px"}
                        />
                    </Box>
                    <Box width={gapSize}></Box>
                    <Box sx={{display: "flex", flexDirection: "column"}}>
                        <InternetImage
                            height={miniImgSize}
                            width={miniImgSize}
                            url={getRuneImageUrl(performance?.runeMain)}
                            borderRadius={"2px"}
                        />
                        <Box height={gapSize}></Box>
                        <InternetImage
                            height={miniImgSize}
                            width={miniImgSize}
                            url={getRuneStyleImageUrl(performance?.runeSubStyle)}
                            borderRadius={"2px"}
                        />
                    </Box>
                </Box>
                <Box sx={{width: "100px", display: "flex"}}>
                    <a
                        onClick={(e) => e.stopPropagation()}
                        href={`/profiles/${performance.gameName}-${performance.tagLine}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{textDecoration: "none", color: "inherit"}}
                    >
                        <Typography sx={{
                            whiteSpace: "nowrap", // Prevents text from wrapping
                            overflow: "hidden", // Hides overflow text
                            textOverflow: "ellipsis", // Adds "..." when text overflows
                            maxWidth: "80px", // Set a fixed width to trigger the ellipsis
                            color: "content.1",
                            fontSize: "12px",
                            fontWeight: "400",
                            cursor: "pointer",
                            "&:hover": {textDecoration: "underline", color: "content.1"},
                        }}>
                            {performance?.gameName}
                        </Typography>
                    </a>
                </Box>
                <Box sx={{width: "80px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <KbScoreDisplay score={performance?.kbScore} extraSx={{paddingY: "1px", paddingX: "8px"}}/>
                    <Box width={"4px"}></Box>
                    <Box sx={{display: "flex", width: "30px", justifyContent: "center"}}>
                        <Typography sx={{
                            color: performance?.mvp ? "rate.1" : "content.2",
                            fontSize: "12px",
                            fontWeight: (performance?.mvp || performance?.svp) ? "800" : "500"
                        }}>
                            {placementToDisplayString(
                                performance?.kbScorePlacement,
                                performance?.mvp,
                                performance?.svp)}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{
                    width: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column"
                }}>
                    <Typography sx={{
                        color: "content.1",
                        fontSize: "12px",
                        fontWeight: "500",
                    }}>
                        {performance?.kills} / {performance?.deaths} / {performance?.assists}
                    </Typography>
                    <Typography sx={{
                        color: "content.2",
                        fontSize: "12px",
                        fontWeight: "400",
                    }}>
                        {kdaFormat(performance?.kda)} ({(performance?.killParticipation * 100).toFixed()}%)
                    </Typography>
                </Box>
                <Box sx={{
                    width: "80px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column"
                }}>
                    <DamageDisplay dmg={performance?.totalDamageDealt} highestDmg={highestDmg} width={"60px"}/>
                </Box>
                <Box sx={{
                    width: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column"
                }}>
                    <Typography sx={{
                        color: "content.1",
                        fontSize: "12px",
                        fontWeight: "500",
                    }}>
                        {performance?.totalCs}
                    </Typography>
                    <Typography sx={{
                        color: "content.2",
                        fontSize: "12px",
                        fontWeight: "400",
                    }}>
                        {performance?.totalGold}
                    </Typography>
                </Box>
                <Box sx={{
                    width: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column"
                }}>
                    <Typography sx={{
                        color: "content.1",
                        fontSize: "12px",
                        fontWeight: "500",
                    }}>
                        {performance?.pinkWardsPlaced}
                    </Typography>
                    <Typography sx={{
                        color: "content.2",
                        fontSize: "12px",
                        fontWeight: "400",
                    }}>
                        {performance?.wardsPlaced} / {performance?.wardsKilled}
                    </Typography>
                </Box>

                <Box sx={{
                    width: "160px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginX: "10px"
                }}>
                    {performance?.itemIds?.map((itemId) => (
                        <>
                            {itemId !== 0 ?
                                <InternetImage
                                    height={"20px"}
                                    width={"20px"}
                                    url={getItemImageUrl(itemId, currentPatch)}
                                    borderRadius={"2px"}
                                /> :
                                <Box
                                    sx={{
                                        height: "20px",
                                        width: "20px",
                                        backgroundColor: "bg.3",
                                        borderRadius: "2px"
                                    }}
                                />
                            }
                        </>
                    ))}
                </Box>
            </Box>

        )
    }
}