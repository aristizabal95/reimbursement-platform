import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { Stack, Typography } from "@mui/material";

const NavBar = () => {
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: theme.palette.primary.dark }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Stack direction="row" spacing={2}>
          <Typography variant="h6">Home</Typography>
          <Typography variant="h6">Tasks</Typography>
          <Typography variant="h6">Events</Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
