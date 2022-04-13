import React, { useState }  from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {Container} from "@material-ui/core";

// icons
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import MoreIcon from '@mui/icons-material/MoreVert';
import LightbulbRoundedIcon from '@mui/icons-material/LightbulbRounded';

// AddModal
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";


import { LinearProgress } from '@material-ui/core';

import AvailableIdeas from '../components/IdeaComponents/AvailableIdeas';
import CurrAccProposals from '../components/IdeaComponents/CurrAccProposals';
import CreateProposal from '../components/IdeaComponents/CreateProposal';

import { ProManageState } from '../ProManageContext';
import AddIdea from '../components/IdeaComponents/AddIdea';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 700,
    backgroundColor: theme.palette.background.paper,
    color: "white",
    borderRadius: 10,
  }
}));

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
  const [anchorTab, setAnchorTab] = useState(null);
  const open = Boolean(anchorEl);
  const tabOpen = Boolean(anchorTab);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { loading, isAdmin } = ProManageState();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [tab, setTab] = useState("Available Ideas");
  const [renderTab, setRenderTab] = useState(<AvailableIdeas />);

  const [openModal, setOpenModal] = useState(false);
  const classes = useStyles();

  function tabToCurrAccept () { 
    setTab("Current Accepted Proposals");
    setRenderTab(<CurrAccProposals/>);
  }

  function tabToCreateProposal () {
    setTab("Create and Submit Proposal");
    setRenderTab(<CreateProposal/>);
  }

  function tabToAvailIdeas () {
    setTab("Available Ideas");
    setRenderTab(<AvailableIdeas/>);
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickTab = (event) => {
    setAnchorTab(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseTab = () => {
    setAnchorTab(null);
  };

  const handleAdd = () => {
    setOpenModal(true);
    handleClose();
  }
  
  const renderAddModal  = (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openModal}
      onClose={()=> setOpenModal(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModal}>
        <div className={classes.paper}>
          <AppBar
            position="static"
            style={{
              backgroundColor: "transparent",
              color: "black",
            }}
          >
            <Container style={{ textAlign: "center"}} >
              <Typography fontSize={24} fontFamily='Montserrat'>Add Idea</Typography>
            </Container>
          </AppBar>
          <AddIdea/>
        </div>
      </Fade>
    </Modal>
  );

  const renderTabMenu = (
    <StyledMenu
      id='my-tab-menu'
      MenuListProps={{
        'aria-labelledby': 'demo-customized-button',
      }}
      anchorEl={anchorTab}
      open={tabOpen}
      onClose={handleCloseTab}
    >
      <MenuItem onClick={tabToAvailIdeas} >
        Available Ideas
      </MenuItem>
      <MenuItem onClick={tabToCurrAccept} >
        Current Accepted Proposals
      </MenuItem>
      <MenuItem onClick={tabToCreateProposal} >
        Create and Submit proposal
      </MenuItem>
    </StyledMenu>
 );

  const renderMenu = (
    <StyledMenu
      id="demo-customized-menu"
      MenuListProps={{
        'aria-labelledby': 'demo-customized-button',
      }}
      anchorEl={anchorEl}
      open={isMenuOpen}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose} >
        <EditIcon />
        Edit
      </MenuItem>
      <MenuItem onClick={handleAdd} >
        <AddIcon />
        Add
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

  const renderMobileMenu = (
    <StyledMenu
    anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id='primary-search-account-menu-mobile'
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
      <MenuItem onClick={handleMobileMenuClose} >
        <EditIcon />
        Edit
      </MenuItem>
      <MenuItem onClick={handleAdd} >
        <FileCopyIcon />
        Add
      </MenuItem>
      <Divider sx={{ my: 0.5 }} />
      <MenuItem onClick={handleMobileMenuClose} >
        <ArchiveIcon />
        Archive
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose} >
        <MoreHorizIcon />
        More
      </MenuItem>
    </StyledMenu>
  );

  return (
    <Container style={{ textAlign: "center" }}>
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
      >
        <LightbulbRoundedIcon />
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
    </Toolbar>
    <Container style={{ textAlign: "center"}} >

      <Typography
        variant="h4"
        style={{ margin: 18, fontFamily: "Montserrat" }}
      >
        {tab}
        <IconButton
          size='large' 
          aria-controls={tabOpen ? 'my-tab-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={tabOpen ? 'true' : undefined}
          style={{color: 'white'}}
          onClick={handleClickTab}
        > 
          <ExpandMoreIcon/>
        </IconButton>
          {isAdmin && <Button
            id="demo-customized-button"
            style={{ float:'right',  width: 100,
            height: 30,
            marginLeft: 15,
            backgroundColor: "#EEBC1D", }}
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<ExpandMoreIcon />}
          >
            Options
          </Button>}
        </Typography>
        {isAdmin && <Box sx={{ display: { xs: 'flex', md: 'none' }, flex: 50 }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls='primary-search-account-menu-mobile'
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
            
          >
            <MoreIcon />
          </IconButton>
        </Box>}
        {renderAddModal}
      </Container>
      {renderMobileMenu}
      {isAdmin && renderMenu}
      {renderTabMenu}
      {loading ? (
      <LinearProgress style={{ backgroundColor: "gold" }} />
      ) : (
      renderTab)}
    </Container>
  );
} 