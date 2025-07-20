import {Badge} from "@mui/material";

export function TextBadge({children, content, color, textColor, left, fontSize}) {
    // Default font size if not provided
    const size = fontSize || "0.75rem";

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
                    left: left, // Position
                    fontSize: size,
                    minWidth: `calc(${size} * 2)`, // Scales horizontally
                    height: `calc(${size} * 2)`,    // Scales vertically
                    padding: `calc(${size} / 2)`,   // Inner padding scales
                    borderRadius: "50px",           // Keeps it round
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                },
            }}
        >
            {children}
        </Badge>
    );
}
