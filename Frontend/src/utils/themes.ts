import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0043FF",
      light: "#8F90A6",
      dark: "#1B418C",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#C7C9D9",
      light: "#00FFFF",
      dark: "#00FFC5",
      contrastText: "#191E3E",
    },
    success: {
      main: "#71BF74",
      light: "#83C785",
      dark: "#4EAF51",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#F6564A",
      light: "#F87B72",
      dark: "#F54336",
      contrastText: "#F6564A",
    },
    background: {
      default: "#EAEAF1",
      paper: "#555770",
    },
    text: {
      primary: "#191E3E",
      secondary: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "40px",
      fontWeight: 600,
    },
    h2: {
      fontSize: "32px",
      fontWeight: 600,
    },
    h3: {
      fontSize: "32px",
      fontWeight: 500,
    },
    h4: {
      fontSize: "24px",
      fontWeight: 600,
    },
    h5: {
      fontSize: "24px",
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: "20px",
      fontWeight: 500,
    },
    body1: {
      fontSize: "20px",
      fontWeight: 400,
    },
    body2: {
      fontSize: "16px",
      fontWeight: 500,
    },
    button: {
      fontSize: "12px",
      fontWeight: 500,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
