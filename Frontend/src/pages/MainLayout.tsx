import { ThemeProvider } from "@mui/material/styles";
import NavBar from "../components/NavBar";
import theme from "../utils/themes";
import { Router } from "../Router";

const MainLayout = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Router />
    </ThemeProvider>
  );
};

export default MainLayout;
