import { Box, CircularProgress } from "@mui/material";

function LoadingCircular() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        paddingTop: 4, // optional margin-top if needed
        minHeight: "100vh",
        backgroundColor: 'bg.dark1'
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
