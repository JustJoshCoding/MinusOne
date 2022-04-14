import React, { useEffect, useState }  from 'react';
import { styled, alpha } from '@mui/material/styles';
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
import GroupCards from '../components/Group Creation/GroupCards';

import { Container, LinearProgress } from '@material-ui/core';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

import { useNavigate  } from "react-router-dom";
import { ProManageState } from '../ProManageContext';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  display: 'flex'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(10)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));



export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { setAlert, user, userInfo} = ProManageState();
  const isMenuOpen = Boolean(anchorEl);
  const [loading, setLoading] = useState(false);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [searchValue, setSearchValue] = React.useState("");
  const [groups, setGroups] = React.useState([]);

  const fetchAllGroups  = async () => {
    setLoading(true);
    const groupRef = collection(db, "Groups");
    const data = await getDocs(groupRef);
      if (data) {
        setGroups(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
      }
      else {
        console.log("No Groups Available");
      }
  }

  useEffect(() => {
    fetchAllGroups();
  }, [])

  const search = () => {
    
    return groups.filter (
      (group) => 
        group.groupName.toString().toLowerCase().includes(searchValue) ||
        group.projectName.toString().toLowerCase().includes(searchValue) ||
        group.groupMembers.find((member) => (`${member.firstname.toString().toLowerCase()} ${member.lastname.toString().toLowerCase()}`.includes(searchValue))) ||
        group.groupMembers.find((member) => member['ID'].toString().toLowerCase().includes(searchValue))
    ); 
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

  const navigate = useNavigate();

  
  const handleGoToCreateForm = () => {
    if (user) {
      if (userInfo.groupName === "") {
        navigate(`/groupadd`);
      }
      else {
        setAlert({
          open: true,
          message: "You already belong to a group",
          type: "error",
      });
      return;
      }
    }
    else {
      setAlert({
        open: true,
        message: "Please Login first",
        type: "error",
    });
    return;
    }
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
          <Button onClick={handleGoToCreateForm}> New Group</Button>
          </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
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
    >
      
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="add group"
          aria-controls="primary-search-group-menu"
          aria-haspopup="true"
          color="inherit"
        >
          
        </IconButton>
        <p>Create New Group</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Container>
      <Box sx={{ flexGrow: 1}}>
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
            Groups
          </Typography>
          <Search>
            <StyledInputBase
              placeholder="Search…"
              value={searchValue}
              onChange={(e)=> setSearchValue(e.target.value)}
              inputProps={{ 'aria-label': 'search' }}
            />
          
            <SearchIconWrapper>
              <SearchIcon/>
            </SearchIconWrapper>
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            
            
            <IconButton
              size="small"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
                <p>Create New Group</p>
              <AddIcon />
            </IconButton>
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
        
        {renderMobileMenu}
        {renderMenu}
        {loading ? (
        <LinearProgress style={{ backgroundColor: "gold" }} />
        ) : (
        <GroupCards groups={groups} search={search} />)}
      </Box>
    </Container>
  );
} 