import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import {
  Stack,
  Typography,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add"; // You can use any icon for the floating button
import FactoredLogo from "./FactoredLogo";
import { homeTab, myRequestsTab, urlNewRequest } from "../constants/tabs";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <List sx={{ width: 250 }}>
      <ListItem>
        <ListItemText
          primary={homeTab}
          primaryTypographyProps={{ color: theme.palette.primary.dark }}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary={myRequestsTab}
          primaryTypographyProps={{ color: theme.palette.primary.dark }}
        />
      </ListItem>
    </List>
  );

  function handleNewRequest() {
    navigate(urlNewRequest);
  }

  return (
    <>
      {isPhone ? (
        <>
          <AppBar position="static" sx={{ backgroundColor: "#F2F2F2" }}>
            <Toolbar>
              <IconButton
                edge="start"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{ pl: 2, color: theme.palette.primary.dark }}
              >
                <MenuIcon />
              </IconButton>
              <Stack alignItems={"center"} width={"340px"}>
                <FactoredLogo />
              </Stack>
            </Toolbar>
          </AppBar>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              "& .MuiDrawer-paper": {
                backgroundColor: "#F2F2F2",
              },
            }}
          >
            {drawer}
          </Drawer>
          <Fab
            color="primary"
            aria-label="add"
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
              backgroundColor: theme.palette.primary.light,
              color: "#FFFFFF",
            }}
            onClick={handleNewRequest}
          >
            <AddIcon />
          </Fab>
        </>
      ) : (
        <AppBar position="static" sx={{ backgroundColor: "#F2F2F2" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <FactoredLogo />
            </IconButton>
            <Stack direction="row" spacing={6} sx={{ flexGrow: 1, pl: 8 }}>
              <Typography variant="body1" color={theme.palette.primary.dark}>
                {homeTab}
              </Typography>
              <Typography variant="body1" color={theme.palette.primary.dark}>
                {myRequestsTab}
              </Typography>
            </Stack>
            <Button
              variant="contained"
              sx={{
                color: "#FFFFFF",
                backgroundColor: theme.palette.primary.light,
              }}
              onClick={handleNewRequest}
            >
              New request
            </Button>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
};

export default NavBar;
