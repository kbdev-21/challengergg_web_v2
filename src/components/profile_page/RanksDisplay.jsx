import {Box, Typography} from "@mui/material";
import {queueEnumToTextMap, rankImgMap} from "../../utils/maps.js";
import {InternetImage} from "../ui/InternetImage.jsx";
import {upperCaseFirstLowerCaseAll} from "../../utils/stringUtils.js";

export function RanksDisplay({ranks}) {
    return (
        <Box sx={{
            width: "290px"
        }}>
            <RankDisplay index={0}></RankDisplay>
            <Box height={"10px"}></Box>
            <RankDisplay index={1}></RankDisplay>
        </Box>
    );

    function RankDisplay({index}) {
        return (<Box sx={{
                width: "290px",
                backgroundColor: "bg.2",
                padding: "12px",
                border: "0.5px solid",
                borderColor: "bg.3",
                borderRadius: "6px",
            }}>
                <Typography sx={{color: "content.1", fontSize: "14px", fontWeight: "500"}}>
                    {queueEnumToTextMap[ranks[index]?.queue]}
                </Typography>
                <Box height={"10px"}></Box>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Box sx={{display: "flex"}}>
                        <InternetImage height={"70px"} width={"70px"} url={rankImgMap[ranks[index]?.tier]}></InternetImage>
                        <Box width={"8px"}></Box>
                        <Box>
                            <Box height={"12px"}></Box>
                            <Typography sx={{color: "content.1", fontSize: "16px", fontWeight: "500"}}>
                                {upperCaseFirstLowerCaseAll(ranks[index]?.tier)} {ranks[index]?.division}
                            </Typography>
                            <Box height={"4px"}></Box>
                            <Typography sx={{color: "content.2", fontSize: "12px", fontWeight: "400"}}>
                                {ranks[index]?.points} LP
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{display: "flex", flexDirection: "column", alignItems: "flex-end"}}>
                        <Box height={"18px"}></Box>
                        <Typography sx={{color: "content.2", fontSize: "12px", fontWeight: "400"}}>
                            {ranks[index]?.wins}W {ranks[index]?.losses}L
                        </Typography>
                        <Box height={"4px"}></Box>
                        <Typography sx={{color: "content.2", fontSize: "12px", fontWeight: "400"}}>
                            Win rate {(ranks[index]?.winRate * 100)?.toFixed(0)}%
                        </Typography>
                    </Box>
                </Box>
            </Box>
        );
    }
}