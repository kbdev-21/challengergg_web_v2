import {Box} from "@mui/material";

export function InternetImage({url, height, width, borderRadius, extraSx}) {
    return (
        <Box
            component="img"
            src={url}
            alt=""
            sx={{
                height: height,
                width: width,
                borderRadius: borderRadius,
                ...extraSx,
                //auto insert the addittional property base on custom parameters
            }}
        />
    )
}