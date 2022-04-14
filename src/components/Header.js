import {
  AppBar,
  Container,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import { ProManageState } from "../ProManageContext";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { IconButton } from "@material-ui/core";
import CssBaseline from '@mui/material/CssBaseline';
import * as React from "react";

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 0.8,
    color: "gold",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#ffff",
    },
    type: "dark",
  },
});



function Header() {

  const classes = useStyles();
  const { user,isAdmin } = ProManageState();
  const pages = ['Dashboard','Groups', 'Ideas', 'Submission','Students','Inbox'];
  

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar color="transparent" position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate('/')}
              variant="h6"
              className={classes.title}
            >
              Project Management App
            </Typography>
            

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" }
              }}
            >
              
            <MenuItem onClick={handleCloseNavMenu}>
              <Typography textAlign="right" onClick={() => navigate(`/${pages[0]}`)}>{pages[0]}</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <Typography textAlign="right" onClick={() => navigate(`/${pages[1]}`)}>{pages[1]}</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <Typography textAlign="right" onClick={() => navigate(`/${pages[2]}`)}>{pages[2]}</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <Typography textAlign="right" onClick={() => navigate(`/${pages[3]}`)}>{pages[3]}</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <Typography textAlign="right" onClick={() => navigate(`/${pages[4]}`)}>{pages[4]}</Typography>
            </MenuItem>
            {isAdmin && <MenuItem onClick={handleCloseNavMenu}>
              <Typography textAlign="right" onClick={() => navigate(`/${pages[5]}`)}>{pages[5]}</Typography>
            </MenuItem>}
            </Menu>
          </Box>
          
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              
                <Button
                  onClick={() => navigate(`/${pages[0]}`)}
                  sx={{ my: 2, color: "gold", fontFamily: "Montserrat", display: "block" }}
                >
                  {pages[0]}
                </Button>
                <Button
                  onClick={() => navigate(`/${pages[1]}`)}
                  sx={{ my: 2, color: "gold", fontFamily: "Montserrat", display: "block" }}
                >
                  {pages[1]}
                </Button>
                <Button
                  onClick={() => navigate(`/${pages[2]}`)}
                  sx={{ my: 2, color: "gold", fontFamily: "Montserrat", display: "block" }}
                >
                  {pages[2]}
                </Button>
                 <Button
                  onClick={() => navigate(`/${pages[3]}`)}
                  sx={{ my: 2, color: "gold", fontFamily: "Montserrat", display: "block" }}
                >
                  {pages[3]}
                </Button>
                <Button
                  onClick={() => navigate(`/${pages[4]}`)}
                  sx={{ my: 2, color: "gold", fontFamily: "Montserrat", display: "block" }}
                >
                  {pages[4]}
                </Button>
                {isAdmin && <Button
                  onClick={() => navigate(`/${pages[5]}`)}
                  sx={{ my: 2, color: "gold", fontFamily: "Montserrat", display: "block" }}
                >
                  {pages[5]}
                </Button>}
              
            </Box>
            {user ? <UserSidebar /> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;