import { Box, Typography, Link } from "@mui/material";
import { useLocation } from "react-router";

function Footer() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: isHome ? "main.dark1" : "bg.dark1",
        color: isHome ? "white" : "content.main",
        py: 3,
        px: '20%',
        textAlign: "center",
        mt: "auto",
      }}
    >
      <Typography
        sx={{ color: isHome ? "white" : "content.main" }}
        variant="caption"
      >
        Challenger.gg is not endorsed by Riot Games and does not reflect the
        views or opinions of Riot Games or anyone officially involved in
        producing or managing League of Legends. League of Legends and Riot
        Games are trademarks or registered trademarks of Riot Games, Inc. League
        of Legends © Riot Games, Inc.
      </Typography>
      <Typography
        variant="body2"
        sx={{ mt: 1, color: isHome ? "white" : "content.main" }}
      >
        Challenger.gg - Contact the developer on{" "}
        <Link
          href="https://github.com/kbdev-21"
          target="_blank"
          rel="noopener"
          underline="hover"
          sx={{ color: isHome ? "white" : "content.main", fontWeight: 500 }}
        >
          GitHub
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer;
