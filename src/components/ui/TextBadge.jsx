import {Badge} from "@mui/material";

export function TextBadge({children, content, color, textColor, left}) {
    return (
        <Badge
            max={9999}
            badgeContent={content}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            sx={{
                "& .MuiBadge-badge": {
                    backgroundColor: color,
                    color: textColor,
                    left: left, // 50% means middle
                },
            }}
        >
            {children}
        </Badge>
    )
}