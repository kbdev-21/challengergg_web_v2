import {Box, Divider} from "@mui/material";
import {InternetImage} from "./InternetImage.jsx";
import {getRuneImageUrl, getRuneStyleImageUrl} from "../../services/ddragonApi.js";
import {runeBoardMainMap, runeBoardSubMap} from "../../utils/constants.js";

export function RuneBoard({mainStyle, subStyle, selections}) {
    const mainSize = "30px";
    const runeSize = `${mainSize + 2}px`;

    return (
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "flex-start"}}>
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                <Box sx={{
                    width: runeSize,
                    height: runeSize,
                    backgroundColor: "bg.1",
                    borderRadius: "50%",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2px",
                    display: "flex",
                    marginBottom: "12px",
                }}>
                    <InternetImage
                        height={mainSize}
                        width={mainSize}
                        url={getRuneStyleImageUrl(mainStyle)}
                        borderRadius={"6px"}
                    />
                </Box>
                <TripleRunesRow>
                    {runeBoardMainMap[mainStyle].map((runeId, index) => (
                        <MainRuneDisplay isHighlighted={runeId === selections[0]+""} runeId={runeId}/>
                    ))}
                </TripleRunesRow>
                <TripleRunesRow>
                    {runeBoardSubMap[mainStyle].slice(0, 3).map((runeId, index) => (
                        <SubRuneDisplay isHighlighted={selections.includes(parseInt(runeId))} runeId={runeId}/>
                    ))}
                </TripleRunesRow>
                <TripleRunesRow>
                    {runeBoardSubMap[mainStyle].slice(3, 6).map((runeId, index) => (
                        <SubRuneDisplay isHighlighted={selections.includes(parseInt(runeId))} runeId={runeId}/>
                    ))}
                </TripleRunesRow>
                <TripleRunesRow>
                    {runeBoardSubMap[mainStyle].slice(6, 9).map((runeId, index) => (
                        <SubRuneDisplay isHighlighted={selections.includes(parseInt(runeId))} runeId={runeId}/>
                    ))}
                </TripleRunesRow>
            </Box>
            <Divider variant="middle" orientation="vertical" flexItem sx={{
                backgroundColor: "bg.3",
                width: "1px",
                marginX: "12px"
            }}/>
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                <Box sx={{
                    width: runeSize,
                    height: runeSize,
                    backgroundColor: "bg.1",
                    borderRadius: "50%",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2px",
                    display: "flex",
                    marginBottom: "12px",
                }}>
                    <InternetImage
                        height={mainSize}
                        width={mainSize}
                        url={getRuneStyleImageUrl(subStyle)}
                        borderRadius={"6px"}
                    />
                </Box>
                <TripleRunesRow>
                    {runeBoardSubMap[subStyle].slice(0, 3).map((runeId, index) => (
                        <SubRuneDisplay isHighlighted={selections.includes(parseInt(runeId))} runeId={runeId}/>
                    ))}
                </TripleRunesRow>
                <TripleRunesRow>
                    {runeBoardSubMap[subStyle].slice(3, 6).map((runeId, index) => (
                        <SubRuneDisplay isHighlighted={selections.includes(parseInt(runeId))} runeId={runeId}/>
                    ))}
                </TripleRunesRow>
                <TripleRunesRow>
                    {runeBoardSubMap[subStyle].slice(6, 9).map((runeId, index) => (
                        <SubRuneDisplay isHighlighted={selections.includes(parseInt(runeId))} runeId={runeId}/>
                    ))}
                </TripleRunesRow>
            </Box>
        </Box>
    );

    function SubRuneDisplay({runeId, isHighlighted= false}) {
        return (
            <InternetImage
                height={"32px"}
                width={"32px"}
                url={getRuneImageUrl(runeId)}
                borderRadius={"6px"}
                extraSx={
                    !isHighlighted ? {
                            filter: "grayscale(80%) brightness(0.5)", transition: "filter 0.2s ease-in-out"
                        }
                        : null
                }
            />
        )
    }

    function MainRuneDisplay({runeId, isHighlighted= false}) {
        return (
            <Box sx={{
                width: runeSize,
                height: runeSize,
                backgroundColor: "bg.1",
                borderRadius: "50%",
                alignItems: "center",
                justifyContent: "center",
                padding: "2px",
                display: "flex",
            }}>
                <InternetImage
                    height={mainSize}
                    width={mainSize}
                    url={getRuneImageUrl(runeId)}
                    borderRadius={"6px"}
                    extraSx={
                        !isHighlighted ? {
                            filter: "grayscale(80%) brightness(0.5)", transition: "filter 0.2s ease-in-out"
                        }
                            : null
                    }
                />
            </Box>
        )
    }

    function TripleRunesRow({children}) {
        return (
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "150px", marginBottom: "12px"}}>
                {children}
            </Box>
        )
    }
}