import { Box, Typography } from "@mui/material";
import SearchPlayerBar from "../components/home_page/SearchPlayerBar.jsx";

function HomePage() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "main.dark1",
      }}
    >
      <Box height={40}></Box>
      <Typography variant="h3" sx={{ fontWeight: 500, color: "white" }}>
        CHALLENGER.GG
      </Typography>
      <Box height={20}></Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <SearchPlayerBar />
      </Box>
    </Box>
  );
}

export default HomePage;
