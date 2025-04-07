import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    main: {
      main: "#4527a0",
      dark1: "#311b92",
    },
    sub: {
      main: "#f9a825",
    },
    win: {
      main: "#42a5f5", //main content of match card
      light1: "#0d2f63", //background
      light2: "#14428c", //hover background
      dark1: "#164da6", //empty items
    },
    lose: {
      main: "#ef5350",
      light1: "#522626",
      light2: "#732727",
      dark1: "#8a2f2f",
    },
    bg: {
      main: "#222222", //content box background
      dark1: "#111111", //behind background
    },
    content: {
      main: "#ffffff", //text
      light1: "#bdbdbd", //light text
      light2: "#424242", //border
    },

    tier: {
      s: "#f44336",
      a: "#f9a825",
      b: "#1e88e5",
      c: "#757575",
      d: "#6d4c41",
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#000000", // your custom tooltip background
          color: "#ffffff", // text color
        },
        arrow: {
          color: "#000000", // match tooltip background
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.content.main,
        }),
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.content.main,
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({theme}) => ({
          borderBottom: '1px solid', // or 'none' to remove
          borderColor: theme.palette.content.light2, // Use your custom theme color
        }),
      },
    },
  
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiInputBase-root": {
            color: "black",
            borderRadius: 8,
            padding: "2px 4px",
          },
          "& .MuiInputLabel-root": {
            color: theme.palette.content.light1,
            fontWeight: "bold",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: theme.palette.main.main,
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: theme.palette.main.main,
          },
          "& .MuiInputAdornment-root": { fontWeight: "bold" },
        }),
      },
    },
  },
});

export default darkTheme;
