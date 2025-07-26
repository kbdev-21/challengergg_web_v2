import {Box, CircularProgress, Typography} from "@mui/material";
import {queueEnumToShortTextMap} from "../../utils/constants.js";
import {
    formatSecondsToMinutesAndSeconds,
    getTimeSinceGameStart, kdaFormat,
    placementToDisplayString
} from "../../utils/stringUtils.js";
import {useGlobal} from "../../contexts/GlobalContext.jsx";
import {InternetImage} from "../ui/InternetImage.jsx";
import {
    getChampionAvatarUrl,
    getItemImageUrl,
    getRuneImageUrl,
    getRuneStyleImageUrl,
    getSpellImageUrl
} from "../../services/ddragonApi.js";
import {KbScoreDisplay} from "../ui/KbScoreDisplay.jsx";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {Fragment, useState} from "react";
import {MatchDetail} from "./MatchDetail.jsx";
import {Link} from "react-router";

export function MatchCard({matchData, puuid}) {
    const {currentPatch} = useGlobal();

    const selfPerformance = matchData?.performances.find(p => p.puuid === puuid);
    const win = selfPerformance.win;
    const champImgSize = "54px";
    const miniImgSize = "25px";
    const gapSize = "4px";

    const [showDetail, setShowDetail] = useState(false);

    return (
        <>
            <Box
                onClick={() => {
                    setShowDetail(!showDetail);
                }}
                sx={{
                width: "750px",
                backgroundColor: "bg.2",
                padding: "10px",
                border: "1px solid",
                borderColor: "bg.3",
                borderRadius: "5px",
                display: "flex",
                cursor: "pointer",
                "&:hover": {backgroundColor: "bg.2_lighter"},

                borderLeft: "5px solid",
                borderLeftColor: win ? "sub.win" : "sub.lose",
            }}>
                <Box sx={{display: "flex", flexDirection: "column", justifyContent: "space-between", width: "110px"}}>
                    <Box>
                        <Typography sx={{color: win ? "sub.win" : "sub.lose", fontSize: "14px", fontWeight: "500"}}>
                            {queueEnumToShortTextMap[matchData?.queue]}
                        </Typography>
                        <Typography sx={{color: "content.2", fontSize: "12px", fontWeight: "400"}}>
                            {getTimeSinceGameStart(matchData?.startTimeStamp)}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography sx={{color: "content.1", fontSize: "12px", fontWeight: "500"}}>
                            {win ? "Victory" : "Defeat"}
                        </Typography>

                        <Typography sx={{color: "content.2", fontSize: "12px", fontWeight: "400"}}>
                            {formatSecondsToMinutesAndSeconds(matchData?.duration)}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{width: "210px"}}>
                    <Box sx={{display: "flex"}}>
                        <a
                            onClick={(e) => e.stopPropagation()}
                            href={`/champions/${selfPerformance?.championName}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{textDecoration: "none", color: "inherit"}}
                        >
                            <InternetImage
                                height={champImgSize}
                                width={champImgSize}
                                url={getChampionAvatarUrl(selfPerformance?.championName, currentPatch)}
                                borderRadius={"6px"}
                                extraSx={{
                                    outline: "2px solid",
                                    outlineColor: win ? "sub.win" : "sub.lose",
                                    outlineOffset: "-3px", // pushes the outline inward
                                }}
                            />
                        </a>

                        <Box width={gapSize}></Box>
                        <Box sx={{display: "flex", flexDirection: "column"}}>
                            <InternetImage
                                height={miniImgSize}
                                width={miniImgSize}
                                url={getSpellImageUrl(selfPerformance?.spell1Id, currentPatch)}
                                borderRadius={"6px"}
                            />
                            <Box height={gapSize}></Box>
                            <InternetImage
                                height={miniImgSize}
                                width={miniImgSize}
                                url={getSpellImageUrl(selfPerformance?.spell2Id, currentPatch)}
                                borderRadius={"6px"}
                            />
                        </Box>
                        <Box width={gapSize}></Box>
                        <Box sx={{display: "flex", flexDirection: "column"}}>
                            <InternetImage
                                height={miniImgSize}
                                width={miniImgSize}
                                url={getRuneImageUrl(selfPerformance?.runeMain)}
                                borderRadius={"6px"}
                            />
                            <Box height={gapSize}></Box>
                            <InternetImage
                                height={miniImgSize}
                                width={miniImgSize}
                                url={getRuneStyleImageUrl(selfPerformance?.runeSubStyle)}
                                borderRadius={"6px"}
                            />
                        </Box>
                        <Box width={"2px"}></Box>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "84px"
                        }}>
                            <Typography sx={{color: "content.1", fontSize: "14px", fontWeight: "500"}}>
                                {selfPerformance?.kills} / {selfPerformance?.deaths} / {selfPerformance?.assists}
                            </Typography>
                            <Typography sx={{color: "content.2", fontSize: "12px", fontWeight: "500"}}>
                                {kdaFormat(selfPerformance?.kda)} KDA
                            </Typography>
                        </Box>
                    </Box>
                    <Box height="8px"></Box>
                    <Box sx={{display: "flex"}}>
                        {selfPerformance?.itemIds?.map((itemId, index) => (
                            <Fragment key={index}>
                                {itemId !== 0 ? <InternetImage
                                    height={miniImgSize}
                                    width={miniImgSize}
                                    url={getItemImageUrl(itemId, currentPatch)}
                                    borderRadius={"6px"}
                                /> : <Box
                                    sx={{
                                        height: miniImgSize,
                                        width: miniImgSize,
                                        backgroundColor: "bg.3",
                                        borderRadius: "6px"
                                    }}/>
                                }
                                <Box width={gapSize}></Box>
                            </Fragment>
                        ))}
                    </Box>
                </Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "110px",
                    marginRight: "20px",
                    flexDirection: "column"
                }}>
                    <Typography sx={{color: "content.2", fontSize: "12px", fontWeight: "400"}}>KB-Score</Typography>
                    <Box height={"4px"}></Box>
                    <KbScoreDisplay score={selfPerformance?.kbScore}></KbScoreDisplay>
                    <Box height={"4px"}></Box>
                    <Typography sx={{
                        color: selfPerformance?.mvp ? "rate.1" : "content.1",
                        fontSize: "12px",
                        fontWeight: (selfPerformance?.mvp || selfPerformance?.svp) ? "800" : "400"
                    }}>
                        {placementToDisplayString(
                            selfPerformance?.kbScorePlacement,
                            selfPerformance?.mvp,
                            selfPerformance?.svp)}
                    </Typography>
                </Box>
                <PerformanceList startIndex={0}/>
                <PerformanceList startIndex={5}/>
                <Box width={"30px"}></Box>
                <Box sx={{width: "20px", display: "flex", flexDirection: "column", justifyContent: "flex-end"}}>
                    {showDetail ? <KeyboardArrowUpIcon sx={{fontSize: "24px", color: "content.1"}}/> : <KeyboardArrowDownIcon sx={{fontSize: "24px", color: "content.1"}}/>}
                </Box>
            </Box>
            {showDetail ? (
                <MatchDetail matchData={matchData}></MatchDetail>
            ) : null}

        </>

    );

    function PerformanceList({startIndex}) {
        return (
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                width: "110px",
                flexDirection: "column",
            }}
            >
                {matchData?.performances.slice(startIndex, startIndex + 5).map((performance, index) => (
                    <Box sx={{display: "flex"}} key={index}>
                        <InternetImage
                            height={"18px"}
                            width={"18px"}
                            url={getChampionAvatarUrl(performance.championName, currentPatch)}
                            borderRadius={"50%"}
                            extraSx={{
                                outline: "1px solid",
                                outlineColor: "bg.1",
                                outlineOffset: "-1px"
                            }}
                        />
                        <Box width={"4px"}></Box>
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
                                color: performance.puuid === puuid ? "content.1" : "content.2",
                                fontSize: "12px",
                                fontWeight: performance.puuid === puuid ? "500" : "400",
                                cursor: "pointer",
                                "&:hover": {textDecoration: "underline", color: "content.1"},
                            }}>
                                {performance.gameName}
                            </Typography>
                        </a>

                    </Box>
                ))}
            </Box>
        )
    }
}