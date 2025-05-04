import { Box, CircularProgress } from "@mui/material";

function LoadingCircular({ isPage }) {
  let minHeight = "100vh";
  let pt = 4;
  if (isPage === false) {
    minHeight = "0vh";
    pt = 0;
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        paddingTop: pt, // optional margin-top if needed
        minHeight: minHeight,
        backgroundColor: "bg.dark1",
      }}
    >
      <CircularProgress
        size={20}
        sx={{ backgroundColor: "main.main", color: "main.main" }}
      />
    </Box>
  );
}

export default LoadingCircular;
