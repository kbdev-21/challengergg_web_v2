import {Box, Typography} from "@mui/material";
import {getProfileIconUrl} from "../../services/ddragonApi.js";
import {useGlobal} from "../../contexts/GlobalContext.jsx";
import {InternetImage} from "../ui/InternetImage.jsx";
import {TextBadge} from "../ui/TextBadge.jsx";
import ShareIcon from '@mui/icons-material/Share';
import {TextIconButton} from "../ui/TextIconButton.jsx";
import {OverviewBody} from "./OverviewBody.jsx";

export function ProfileHeader({playerData}) {
    const {currentPatch} = useGlobal();
    console.log(playerData);
    const profileIconUrl = getProfileIconUrl(playerData?.profileIconId, currentPatch);
    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{
                    width: "1060px",
                    backgroundColor: "bg.2",
                    marginTop: "40px",
                    padding: "20px",
                    paddingBottom: "0px",
                    border: "0.5px solid",
                    borderColor: "bg.3",
                    borderRadius: "6px",
                }}>
                    <Box>
                        <Box sx={{display: "flex"}}>
                            <TextBadge left={"50%"} color={"bg.3"} textColor={"content.1"} content={playerData?.summonerLevel}>
                                <InternetImage
                                    url={profileIconUrl}
                                    height={"100px"}
                                    width={"100px"}
                                    borderRadius={"6px"}
                                ></InternetImage>
                            </TextBadge>
                            <Box width={"20px"}></Box>
                            <Box>
                                <Box sx={{display: "flex"}}>
                                    <Typography sx={{color: "content.1", fontSize: "26px", fontWeight: "500"}}>
                                        {playerData?.gameName}
                                    </Typography>
                                    <Box width={"10px"}></Box>
                                    <Typography sx={{color: "content.2", fontSize: "26px", fontWeight: "400"}}>
                                        #{playerData?.tagLine}
                                    </Typography>
                                </Box>
                                <Box height={"12px"}></Box>
                                <TextIconButton text={"Share"} icon={<ShareIcon sx={{fontSize: "14px"}}/>}></TextIconButton>
                            </Box>
                        </Box>
                        <Box height={"20px"}></Box>
                        <Box sx={{display: "flex"}}>
                            <Box sx={{
                                padding: "10px",
                                cursor: "pointer",
                                borderBottom: "2px solid",
                                borderBottomColor: "main.1"
                            }}>
                                <Typography sx={{color: "content.1", fontSize: "14px", fontWeight: "500"}}>
                                    Overview
                                </Typography>
                            </Box>
                            <Box width={"20px"}></Box>
                            <Box sx={{padding: "10px", cursor: "pointer"}}>
                                <Typography sx={{color: "content.2", fontSize: "14px", fontWeight: "500"}}>
                                    Analytics
                                </Typography>
                            </Box>
                            <Box width={"20px"}></Box>
                            <Box sx={{padding: "10px", cursor: "pointer"}}>
                                <Typography sx={{color: "content.2", fontSize: "14px", fontWeight: "500"}}>
                                    Live Game
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <OverviewBody playerData={playerData ?? null}></OverviewBody>
        </Box>



    )
}