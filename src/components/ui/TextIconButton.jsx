import {Box, Typography} from "@mui/material";

export function TextIconButton({text, icon, onClick}) {
    return (
        <Box
            onClick={onClick}
            sx={{
                backgroundColor: "main.1",
                width: "fit-content",
                paddingX: "24px",
                paddingY: "5px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
            }}
        >
            {icon != null ?
                <>
                    {icon}
                    <Box width={"6px"}></Box>
                </>
                : null
            }
            <Typography sx={{color: "main.contrast", fontSize: "14px", fontWeight: "500"}}>{text}</Typography>
        </Box>
    )
}