import { darkScrollbar } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#F6F9FC",
    },
    primary: {
      main: "#DF9545",
    },
    secondary: {
      main: "#ECDACF",
    },
    text: {
      primary: "#373F50",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: darkScrollbar({
          active: theme.palette.primary.dark,
          thumb: theme.palette.secondary.dark,
          track: theme.palette.secondary.main,
        }),
      }),
    },
  },
});

export default theme;
