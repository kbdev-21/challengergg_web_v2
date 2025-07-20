import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    main: {
      1: "#f5b400",
      contrast: "#0d0d12"
    },
    sub: {
      win: "#2cbfdd",
      lose: "#e53e3e",
    },
    rate: {
      1: "#f5b400",
      2: "#2cbfdd",
      3: "#00bd84",
      4: "#e53e3e",
      5: "#b3b3b3"
    },
    bg: {
      1: "#0d0d12",
      2: "#15151e",
      "2_lighter": "#1a1a23",
      3: "#21212c"
    },
    content: {
      1: "#ffffff",
      2: "#b3b3b3",
      3: "#666666"
    }
  },
});

export default darkTheme;
