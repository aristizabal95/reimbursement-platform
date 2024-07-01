import MainLayout from "./pages/MainLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utils/themes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainLayout />
    </ThemeProvider>
  );
}

export default App;
