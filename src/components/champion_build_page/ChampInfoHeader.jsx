import {Box, Divider, Typography} from "@mui/material";
import {TextBadge} from "../ui/TextBadge.jsx";
import {InternetImage} from "../ui/InternetImage.jsx";
import {TextIconButton} from "../ui/TextIconButton.jsx";
import ShareIcon from '@mui/icons-material/Share';
import {useState} from "react";
import {PositionLogo} from "../ui/PositionLogo.jsx";
import {useGlobal} from "../../contexts/GlobalContext.jsx";
import {getChampionAvatarUrl} from "../../services/ddragonApi.js";
import {positionTextFormatMap} from "../../utils/constants.js";
import {formatNumber, getColorForChampionTier} from "../../utils/stringUtils.js";
import {BuildStatBody} from "./BuildStatBody.jsx";

export function ChampInfoHeader({builds}) {
    const {currentPatch} = useGlobal();

    const [currentBuildIndex, setCurrentBuildIndex] = useState(0);

    const currentBuild = builds[currentBuildIndex];

    let totalPickRate = 0;
    builds.forEach((build) => {
        totalPickRate += build.pickRate;
    })

    return (
        <>
            <Box sx={{display: "flex", justifyContent: "center"}}>
                <Box sx={{
                    width: "1060px",
                    backgroundColor: "bg.2",
                    marginTop: "40px",
                    padding: "10px",
                    paddingBottom: "0px",
                    border: "0.5px solid",
                    borderColor: "bg.3",
                    borderRadius: "6px",
                }}>
                    <Box>
                        <Box sx={{display: "flex"}}>
                            <InternetImage
                                url={getChampionAvatarUrl(currentBuild.championName, currentPatch)}
                                height={"100px"}
                                width={"100px"}
                                borderRadius={"20px"}
                                extraSx={{
                                    outline: "10px solid",
                                    outlineColor: "bg.2",
                                    outlineOffset: "-6px", // pushes the outline inward
                                }}
                            ></InternetImage>
                            <Box width={"20px"}></Box>
                            <Box>
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                    <Typography sx={{color: "content.1", fontSize: "26px", fontWeight: "500"}}>
                                        {currentBuild.championDisplayName}
                                    </Typography>
                                    <Box width={"10px"}></Box>
                                    <Typography sx={{color: "content.2", fontSize: "14px", fontWeight: "500"}}>
                                        Build for {positionTextFormatMap[currentBuild.position]}, Elite Tier,
                                        Patch {currentPatch?.split(".").slice(0, 2).join(".")}, VN
                                    </Typography>
                                </Box>
                                <Box height={"12px"}></Box>
                                <Box sx={{display: "flex"}}>
                                    {builds.map((build, index) => (
                                        <Box
                                            onClick={() => {
                                                setCurrentBuildIndex(index);
                                            }}
                                            sx={{
                                                display: "flex",
                                                paddingY: "8px",
                                                paddingX: "12px",
                                                borderRadius: "4px",
                                                border: "1px solid",
                                                borderColor: currentBuildIndex === index ? "main.1" : "content.2",
                                                marginRight: "10px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <PositionLogo
                                                colorMode={currentBuildIndex === index ? 2 : 0}
                                                height={"20px"}
                                                position={build.position}
                                            />
                                            <Box width={"10px"}></Box>
                                            <Typography sx={{
                                                color: currentBuildIndex === index ? "main.1" : "content.2",
                                                fontSize: "14px",
                                                fontWeight: "500"
                                            }}>
                                                {(build.pickRate / totalPickRate * 100).toFixed(0)}%
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                        <Box height={"20px"}></Box>
                        <StatSummary/>
                        <Box height={"20px"}></Box>
                        <Box sx={{display: "flex"}}>
                            <Box sx={{
                                padding: "10px",
                                cursor: "pointer",
                                borderBottom: "2px solid",
                                borderBottomColor: "main.1"
                            }}>
                                <Typography sx={{color: "content.1", fontSize: "14px", fontWeight: "500"}}>
                                    Build
                                </Typography>
                            </Box>
                            <Box width={"20px"}></Box>
                            <Box sx={{padding: "10px", cursor: "pointer"}}>
                                <Typography sx={{color: "content.2", fontSize: "14px", fontWeight: "500"}}>
                                    Pro Matches
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <BuildStatBody build={currentBuild}></BuildStatBody>
        </>
    )

    function StatSummary() {
        return (
            <Box sx={{
                display: "flex",
                border: "1px solid",
                borderColor: "content.3",
                borderRadius: "6px",
                width: "fit-content"
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingY: "10px",
                    paddingX: "20px"
                }}>
                    <Typography sx={{color: "content.2", fontSize: "12px", fontWeight: "400"}}>
                        Tier
                    </Typography>
                    <Box height={"8px"}></Box>
                    <Typography
                        sx={{color: getColorForChampionTier(currentBuild.tier), fontSize: "16px", fontWeight: "800"}}>
                        {currentBuild.tier}
                    </Typography>
                </Box>
                <Divider variant={"middle"} flexItem orientation={"vertical"}
                         sx={{backgroundColor: "content.3"}}></Divider>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingY: "10px",
                    paddingX: "20px"
                }}>
                    <Typography sx={{color: "content.2", fontSize: "12px", fontWeight: "400"}}>
                        Win rate
                    </Typography>
                    <Box height={"8px"}></Box>
                    <Typography sx={{color: "content.1", fontSize: "16px", fontWeight: "500"}}>
                        {(currentBuild.winRate * 100).toFixed(2)}%
                    </Typography>
                </Box>
                <Divider variant={"middle"} flexItem orientation={"vertical"}
                         sx={{backgroundColor: "content.3"}}></Divider>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingY: "10px",
                    paddingX: "20px"
                }}>
                    <Typography sx={{color: "content.2", fontSize: "12px", fontWeight: "400"}}>
                        Pick rate
                    </Typography>
                    <Box height={"8px"}></Box>
                    <Typography sx={{color: "content.1", fontSize: "16px", fontWeight: "500"}}>
                        {(currentBuild.pickRate * 100).toFixed(2)}%
                    </Typography>
                </Box>
                <Divider variant={"middle"} flexItem orientation={"vertical"}
                         sx={{backgroundColor: "content.3"}}></Divider>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingY: "10px",
                    paddingX: "20px"
                }}>
                    <Typography sx={{color: "content.2", fontSize: "12px", fontWeight: "400"}}>
                        Matches
                    </Typography>
                    <Box height={"8px"}></Box>
                    <Typography sx={{color: "content.1", fontSize: "16px", fontWeight: "500"}}>
                        {formatNumber(currentBuild.picks)}
                    </Typography>
                </Box>
            </Box>
        )
    }
}