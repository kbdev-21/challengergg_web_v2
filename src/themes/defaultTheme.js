import { createTheme } from "@mui/material/styles";

const defaultTheme = createTheme({
  palette: {
    main: {
      main: "#4527a0",
      dark1: "#311b92",
    },
    sub: {
      main: "#f9a825",
    },
    win: {
      main: "#1e88e5", //main content of match card
      light1: "#e3f2fd", //background
      light2: "#bbdefb", //hover background
      dark1: "#90caf9", //empty items
    },
    lose: {
      main: "#f44336",
      light1: "#ffebee",
      light2: "#ffcdd2",
      dark1: "#ef9a9a",
    },
    bg: {
      main: "#ffffff", //content box background
      dark1: "#eeeeee", //behind background
    },
    content: {
      main: "#000000", //text
      light1: "#757575", //light text
      light2: "#e0e0e0", //border
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

export default defaultTheme;
