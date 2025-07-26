import {Box, Divider, Typography} from "@mui/material";
import {
    getChampionAvatarUrl,
    getItemImageUrl,
    getRuneImageUrl,
    getRuneStyleImageUrl,
    getSpellImageUrl
} from "../../services/ddragonApi.js";
import {InternetImage} from "../ui/InternetImage.jsx";
import {RuneBoard} from "../ui/RuneBoard.jsx";
import {useState} from "react";
import {useGlobal} from "../../contexts/GlobalContext.jsx";

export function BuildStatBody({build}) {
    const {currentPatch} = useGlobal();

    const [runeView, setRuneView] = useState(0);

    return (
        <Box sx={{display: "flex", justifyContent: "center"}}>
            <Box sx={{width: "1060px", display: "flex", justifyContent: "space-between"}}>
                <Box sx={{
                    width: "380px",
                    backgroundColor: "bg.1",
                    marginTop: "12px",
                }}>
                    <Runes/>
                    <Spells/>
                    <Boots/>
                </Box>
                <BestItems/>
                <MatchUps/>
            </Box>
        </Box>
    )

    function MatchUpPickWinRateRow({matchUp}) {
        return (
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Box sx={{display: "flex", alignItems: "center", width: "120px"}}>
                    <InternetImage
                        height={"36px"}
                        width={"36px"}
                        url={getChampionAvatarUrl(matchUp.opponentChampionName, currentPatch)}
                        borderRadius={"50%"}
                        extraSx={{
                            outline: "2px solid",
                            outlineColor: "bg.2",
                            outlineOffset: "-1px", // pushes the outline inward
                        }}/>
                    <Box width={"6px"}></Box>
                    <Typography sx={{
                        color: "content.1",
                        fontSize: "12px",
                        fontWeight: "500",
                        whiteSpace: "nowrap", // Prevents text from wrapping
                        overflow: "hidden", // Hides overflow text
                        textOverflow: "ellipsis", // Adds "..." when text overflows
                    }}>
                        {matchUp.opponentChampionDisplayName}
                    </Typography>
                </Box>
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                        <Typography sx={{color: "content.1", fontSize: "12px", fontWeight: "500"}}>
                            {(matchUp.pickRate * 100).toFixed(2)}%
                        </Typography>
                        <Typography sx={{color: "content.2", fontSize: "12px", fontWeight: "400"}}>
                            {matchUp.picks} games
                        </Typography>
                    </Box>
                </Box>
                <Typography sx={{color: "content.1", fontSize: "12px", fontWeight: "500"}}>
                    {(matchUp.winRate * 100).toFixed(2)}%
                </Typography>
            </Box>
        )
    }

    function ItemPickWinRateRow({itemStat}) {
        return (
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Box sx={{display: "flex"}}>
                    <InternetImage
                        height={"32px"}
                        width={"32px"}
                        url={getItemImageUrl(itemStat.itemId, currentPatch)}
                        borderRadius={"6px"}
                    />
                </Box>
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                        <Typography sx={{color: "content.1", fontSize: "12px", fontWeight: "500"}}>
                            {(itemStat.pickRate * 100).toFixed(2)}%
                        </Typography>
                        <Typography sx={{color: "content.2", fontSize: "12px", fontWeight: "400"}}>
                            {itemStat.picks} games
                        </Typography>
                    </Box>
                </Box>
                <Typography sx={{color: "content.1", fontSize: "12px", fontWeight: "500"}}>
                    {(itemStat.winRate * 100).toFixed(2)}%
                </Typography>
            </Box>
        )
    }

    function Boots() {
        return (
            <Box sx={{
                backgroundColor: "bg.2",
                marginTop: "12px",
                padding: "12px",
                border: "0.5px solid",
                borderColor: "bg.3",
                borderRadius: "6px",
            }}>
                <Typography sx={{color: "content.1", fontSize: "14px", fontWeight: "500"}}>
                    Boots
                </Typography>
                <Box height={"16px"}></Box>
                <ItemPickWinRateRow itemStat={build?.bestBootItems[0]}></ItemPickWinRateRow>
                <Divider orientation="horizontal" flexItem sx={{
                    backgroundColor: "bg.3",
                    height: "1px",
                    marginY: "12px"
                }}/>
                <ItemPickWinRateRow itemStat={build?.bestBootItems[1]}></ItemPickWinRateRow>
            </Box>
        )
    }

    function Spells() {
        return (
            <Box sx={{
                backgroundColor: "bg.2",
                marginTop: "12px",
                padding: "12px",
                border: "0.5px solid",
                borderColor: "bg.3",
                borderRadius: "6px",
            }}>
                <Typography sx={{color: "content.1", fontSize: "14px", fontWeight: "500"}}>
                    Spells
                </Typography>
                <Box height={"16px"}></Box>
                <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <Box sx={{display: "flex"}}>
                        <InternetImage
                            height={"32px"}
                            width={"32px"}
                            url={getSpellImageUrl(build?.bestSpellCombos[0].spell1, currentPatch)}
                            borderRadius={"6px"}
                        />
                        <Box width={"4px"}></Box>
                        <InternetImage
                            height={"32px"}
                            width={"32px"}
                            url={getSpellImageUrl(build?.bestSpellCombos[0].spell2, currentPatch)}
                            borderRadius={"6px"}
                        />
                    </Box>
                    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                            <Typography sx={{color: "content.1", fontSize: "12px", fontWeight: "500"}}>
                                {(build?.bestSpellCombos[0].pickRate * 100).toFixed(2)}%
                            </Typography>
                            <Typography sx={{color: "content.2", fontSize: "12px", fontWeight: "400"}}>
                                {build?.bestSpellCombos[0].picks} games
                            </Typography>
                        </Box>
                    </Box>
                    <Typography sx={{color: "content.1", fontSize: "12px", fontWeight: "500"}}>
                        {(build?.bestSpellCombos[0].winRate * 100).toFixed(2)}%
                    </Typography>
                </Box>
                <Divider orientation="horizontal" flexItem sx={{
                    backgroundColor: "bg.3",
                    height: "1px",
                    marginY: "12px"
                }}/>
                <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <Box sx={{display: "flex"}}>
                        <InternetImage
                            height={"32px"}
                            width={"32px"}
                            url={getSpellImageUrl(build?.bestSpellCombos[1].spell1, currentPatch)}
                            borderRadius={"6px"}
                        />
                        <Box width={"4px"}></Box>
                        <InternetImage
                            height={"32px"}
                            width={"32px"}
                            url={getSpellImageUrl(build?.bestSpellCombos[1].spell2, currentPatch)}
                            borderRadius={"6px"}
                        />
                    </Box>

                    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                            <Typography sx={{color: "content.1", fontSize: "12px", fontWeight: "500"}}>
                                {(build?.bestSpellCombos[1].pickRate * 100).toFixed(2)}%
                            </Typography>
                            <Typography sx={{color: "content.2", fontSize: "12px", fontWeight: "400"}}>
                                {build?.bestSpellCombos[1].picks} games
                            </Typography>
                        </Box>
                    </Box>
                    <Typography sx={{color: "content.1", fontSize: "12px", fontWeight: "500"}}>
                        {(build?.bestSpellCombos[1].winRate * 100).toFixed(2)}%
                    </Typography>
                </Box>
            </Box>
        )
    }

    function RuneChoice({index = 0, isSelected = false}) {
        return (
            <Box
                onClick={() => {setRuneView(index)}}
                sx={{
                    border: "1px solid",
                    borderColor: "bg.3",
                    borderRadius: "6px",
                    width: "fit-content",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: isSelected ? "bg.3" : "bg.2",
                    cursor: "pointer",
                }}
            >
                <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Box sx={{
                        width: "24px",
                        height: "24px",
                        backgroundColor: "bg.1",
                        borderRadius: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "2px",
                        display: "flex",
                    }}>
                        <InternetImage
                            height={"22px"}
                            width={"22px"}
                            url={getRuneImageUrl(build?.bestRunes[index].main)}
                            borderRadius={"6px"}
                        />
                    </Box>
                    <Box width={"10px"}></Box>
                    <InternetImage
                        height={"18px"}
                        width={"18px"}
                        url={getRuneStyleImageUrl(build?.bestRunes[index].subStyle)}
                        borderRadius={"6px"}
                    />
                </Box>
                <Box height={"10px"}></Box>
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                        <Typography sx={{color: "content.1", fontSize: "12px", fontWeight: "500"}}>
                            {(build?.bestRunes[index].pickRate * 100).toFixed(2)}%
                        </Typography>
                        <Typography sx={{color: "content.2", fontSize: "12px", fontWeight: "400"}}>
                            {build?.bestRunes[index].picks} games
                        </Typography>
                    </Box>
                    <Box width={"20px"}/>
                    <Typography sx={{color: "content.1", fontSize: "12px", fontWeight: "500"}}>
                        {(build?.bestRunes[index].winRate * 100).toFixed(2)}%
                    </Typography>
                </Box>
            </Box>
        )
    }

    function Runes() {
        return (
            <Box sx={{
                backgroundColor: "bg.2",
                padding: "12px",
                border: "0.5px solid",
                borderColor: "bg.3",
                borderRadius: "6px",
            }}>
                <Typography sx={{color: "content.1", fontSize: "14px", fontWeight: "500"}}>
                    Runes
                </Typography>
                <Box height={"10px"}></Box>
                <Box sx={{display: "flex"}}>
                    <RuneChoice index={0} isSelected={runeView === 0}/>
                    <Box width={"10px"}></Box>
                    <RuneChoice index={1} isSelected={runeView === 1}/>
                </Box>
                <Box height={"20px"}></Box>
                <RuneBoard
                    mainStyle={build.bestRunes[runeView].mainStyle}
                    subStyle={build.bestRunes[runeView].subStyle}
                    selections={build.bestRunes[runeView].selections}
                />

            </Box>
        )
    }

    function MatchUps() {
        return (
            <Box sx={{
                width: "340px",
                height: "980px",
                backgroundColor: "bg.2",
                marginTop: "12px",
                padding: "12px",
                border: "0.5px solid",
                borderColor: "bg.3",
                borderRadius: "6px",
                overflowY: "auto", //scrollable
                scrollbarWidth: "thin", //scrollable
                scrollbarColor: "#888 transparent" //scrollable
            }}>
                <Typography sx={{color: "content.1", fontSize: "14px", fontWeight: "500"}}>
                    Match-ups
                </Typography>
                <Box height={"16px"}></Box>
                {build.matchUps.filter((m) => m.picks >= 10).map((matchUp, index) => (
                    <>
                        <MatchUpPickWinRateRow matchUp={matchUp}></MatchUpPickWinRateRow>
                        <Divider orientation="horizontal" flexItem sx={{
                            backgroundColor: "bg.3",
                            height: "1px",
                            marginY: "12px"
                        }}/>
                    </>
                ))}
            </Box>
        )
    }

    function BestItems() {
        return (
            <Box sx={{
                width: "320px",
                backgroundColor: "bg.2",
                marginTop: "12px",
                padding: "12px",
                border: "0.5px solid",
                borderColor: "bg.3",
                borderRadius: "6px",
            }}>
                <Typography sx={{color: "content.1", fontSize: "14px", fontWeight: "500"}}>
                    Best Items
                </Typography>
                <Box height={"16px"}></Box>
                {build.bestLegendaryItems.map((item, index) => (
                    <>
                        <ItemPickWinRateRow itemStat={item}></ItemPickWinRateRow>
                        <Divider orientation="horizontal" flexItem sx={{
                            backgroundColor: "bg.3",
                            height: "1px",
                            marginY: "12px"
                        }}/>
                    </>
                ))}
            </Box>
        )
    }
}