import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    main: {
      1: "#ffd500",
      contrast: "#0d0d12"
    },
    bg: {
      1: "#0d0d12",
      2: "#15151e",
      3: "#20202c"
    },
    content: {
      1: "#ffffff",
      2: "#b3b3b3",
      3: "#666666"
    }
  },
});

export default darkTheme;
