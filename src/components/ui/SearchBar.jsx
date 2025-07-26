import {Box, Divider, InputBase, Typography} from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import {useEffect, useState} from "react";
import {searchAll} from "../../services/challengerggApi.js";
import {positionTextFormatMap} from "../../utils/constants.js";
import {upperCaseFirstLowerCaseAll} from "../../utils/stringUtils.js";
import {getChampionAvatarUrl, getProfileIconUrl} from "../../services/ddragonApi.js";
import {InternetImage} from "./InternetImage.jsx";
import {useGlobal} from "../../contexts/GlobalContext.jsx";
import {Link, useNavigate} from "react-router";

export function SearchBar({barColor, width}) {
    const {currentPatch} = useGlobal();
    const navigate = useNavigate();

    const [isFocus, setIsFocus] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState({
        champions: [],
        players: [],
    });

    const barWidth = width ?? "600px";
    const resultWidth = `${parseInt(barWidth, 10) - 100}px`; // "500px"

    function reset() {
        setSearchText("");
        setIsFocus(false);
    }

    function onEnterDown() {
        if(searchText === "") {
            return;
        }
        if(searchResults.champions.length > 0) {
            navigate(`/champions/${searchResults.champions[0].championName}`);
            reset();
            return;
        }
        if(searchResults.players.length > 0) {
            navigate(`/profiles/${searchResults.players[0].gameName}-${searchResults.players[0].tagLine}`);
            reset();
            return;
        }

        if(searchText.includes("#")) {
            const [rawGameName, rawTagLine] = searchText.split("#");
            const gameName = rawGameName?.trim() || "";
            const tagLine = rawTagLine?.trim() || "VN2";

            if (gameName) {
                navigate(`/profiles/${gameName}-${tagLine}`);
                reset();
            }
        }
        else {
            navigate(`/profiles/${searchText}-VN2`);
            reset();
        }
    }

    async function searchIfNotBlank() {
        if(searchText === "") {
            setSearchResults({
                champions: [],
                players: [],
            });
            return;
        };
        const searchData = await searchAll(searchText);
        setSearchResults({
            champions: searchData.champions,
            players: searchData.players,
        });
    }

    useEffect(() => {
        searchIfNotBlank();
    }, [searchText]);

    return (
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative"}}>
            <Box sx={{
                height: "50px",
                width: barWidth,
                backgroundColor: barColor ?? "bg.2",
                borderRadius: "50px",
                border: "1px solid",
                borderColor: "bg.3",
                display: "flex",
                alignItems: "center",
                paddingX: "20px",
            }}>
                <Typography sx={{color: "main.1", fontSize: "14px", fontWeight: "800"}}>VN</Typography>
                <ArrowDropDownIcon sx={{color: "content.2", fontSize: "24px"}}/>
                <Box width={"10px"}></Box>
                <InputBase
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            onEnterDown();
                        }
                    }}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setTimeout(() => setIsFocus(false), 100)}
                    placeholder="Search for champions, players"
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
                <SearchIcon
                    onClick={onEnterDown}
                    sx={{color: "content.2", fontSize: "24px", cursor: "pointer", "&:hover": {color: "content.1"}}}
                />
            </Box>
            {isFocus && (<SearchResultsList/>)}
        </Box>
    )

    function SearchResultsList() {
        return (
            <Box sx={{
                marginTop: "6px",
                width: resultWidth,
                backgroundColor: "bg.2",
                border: "1px solid",
                borderRadius: "2px",
                borderColor: "bg.3",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingX: "4px",
                position: "absolute",
                zIndex: 10,
                top: "50px"
            }}>
                {searchResults?.champions.length === 0 && searchResults?.players.length === 0 ? (
                        <Box sx={{height: "60px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <Typography sx={{color: "content.2", fontSize: "14px", fontWeight: "500"}}>
                                Example: Hide on bush #VN2
                            </Typography>
                        </Box>
                ) : (
                    <>
                        {searchResults?.champions.map((champion, index) => (
                            <SearchResult
                                key={index}
                                mainText={champion.championDisplayName}
                                subText={positionTextFormatMap[champion.position]}
                                imgUrl={getChampionAvatarUrl(champion.championName, currentPatch)}
                                url={`/champions/${champion.championName}`}
                            />
                        ))}
                        {searchResults?.players.map((player, index) => (
                            <SearchResult
                                key={index}
                                mainText={player.gameName + " #" + player.tagLine}
                                subText={`${upperCaseFirstLowerCaseAll(player.ranks[0].tier)} ${player.ranks[0].division} (${upperCaseFirstLowerCaseAll(player.ranks[0].queue)})`}
                                imgUrl={getProfileIconUrl(player.profileIconId, currentPatch)}
                                url={`/profiles/${player.gameName}-${player.tagLine}`}
                            />

                        ))}
                    </>
                )}

            </Box>
        )
    }

    function SearchResult({mainText, subText, imgUrl, url}) {
        return (
            <Box sx={{width: "100%"}}>
                <Link to={url} style={{ textDecoration: "none" }}>
                    <Box sx={{
                        display: "flex",
                        paddingX: "4px",
                        paddingY: "6px",
                        "&:hover": {
                            backgroundColor: "bg.3",
                        }
                    }}>
                        <InternetImage
                            height={"40px"}
                            width={"40px"}
                            url={imgUrl}
                            borderRadius={"50%"}
                            extraSx={{
                                outline: "1px solid",
                                outlineColor: "bg.3",
                                outlineOffset: "-1px",
                            }}/>
                        <Box width={"6px"}></Box>
                        <Box>
                            <Typography sx={{color: "content.1", fontSize: "14px", fontWeight: "500"}}>{mainText}</Typography>
                            <Typography sx={{color: "content.2", fontSize: "12px", fontWeight: "400"}}>{subText}</Typography>
                        </Box>
                    </Box>
                </Link>

                <Divider sx={{ backgroundColor: "bg.3" }} />
            </Box>

        )
    }
}