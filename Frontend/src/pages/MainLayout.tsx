import { useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import NavBar from "../components/NavBar";
import theme from "../utils/themes";

const MainLayout = () => {
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={theme}>
      {/* //Large Screen */}
      {!isPhone && <NavBar />}
    </ThemeProvider>
  );
};

export default MainLayout;
