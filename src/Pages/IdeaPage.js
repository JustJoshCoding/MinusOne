import React, { useEffect, useState }  from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import { Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import {Container} from "@material-ui/core";


import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';





import { LinearProgress } from '@material-ui/core';

import AvailableIdeas from '../components/IdeaComponents/AvailableIdeas';
import CurrAccProposals from '../components/IdeaComponents/CurrAccProposals';
import PastAcceptedPropsals from '../components/IdeaComponents/PastAcceptedPropsals';


import { useNavigate  } from "react-router-dom";
import { ProManageState } from '../ProManageContext';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function IdeaPage() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { loading } = ProManageState();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [tab, setTab] = useState("Available Ideas");
  const [anchorTab, setAnchorTab] = useState(null);

  function chooseTab () {

  }
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);

  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <StyledMenu
      id="demo-customized-menu"
      MenuListProps={{
        'aria-labelledby': 'demo-customized-button',
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose} >
        <EditIcon />
        Edit
      </MenuItem>
      <MenuItem onClick={handleClose} >
        <FileCopyIcon />
        Duplicate
      </MenuItem>
      <Divider sx={{ my: 0.5 }} />
      <MenuItem onClick={handleClose} >
        <ArchiveIcon />
        Archive
      </MenuItem>
      <MenuItem onClick={handleClose} >
        <MoreHorizIcon />
        More
      </MenuItem>
    </StyledMenu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <StyledMenu
    anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}

      
      MenuListProps={{
        'aria-labelledby': 'demo-customized-button',
      }}
    >
      <MenuItem onClick={handleClose} >
        <EditIcon />
        Edit
      </MenuItem>
      <MenuItem onClick={handleClose} >
        <FileCopyIcon />
        Duplicate
      </MenuItem>
      <Divider sx={{ my: 0.5 }} />
      <MenuItem onClick={handleClose} >
        <ArchiveIcon />
        Archive
      </MenuItem>
      <MenuItem onClick={handleClose} >
        <MoreHorizIcon />
        More
      </MenuItem>
    </StyledMenu>
  );

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" color="transparent">
        <Toolbar>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <GroupsRoundedIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"            
            color= "gold"
            fontFamily= "Montserrat"
            fontWeight= "bold"
            sx={{ display: { xs: 'none', sm: 'block'} }}
          >
            Idea Development
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <div>
              <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<ExpandMoreIcon />}
              >
                Options
              </Button>
            </div>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flex: 50 }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
              
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          {tab}
          <IconButton size='large' style={{color: 'white'}} onClick={chooseTab}> 
            <ExpandMoreIcon/>
          </IconButton>
        </Typography>
      </Container>
      {renderMobileMenu}
      {renderMenu}
      {loading ? (
      <LinearProgress style={{ backgroundColor: "gold" }} />
      ) : (
      <AvailableIdeas />)}
    </Box>
  );
} 