import React from 'react';
import { useNavigate } from "react-router-dom";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { IconButton, TextField } from '@material-ui/core';
import AvatarGroup from '@mui/material/AvatarGroup';
import { Button, Modal } from '@mui/material';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

import { db } from '../../firebase';
import { ProManageState } from '../../ProManageContext';
import { Search } from '@mui/icons-material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}; 

export default function GroupCards( { groups, search } ) {
  const { user, setAlert, userInfo, isAdmin } = ProManageState();
  
  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [docid, setDocid] = React.useState("");
  const [name, setName] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [i, setI] = React.useState(-1);
  const navigate = useNavigate();

  const handleOpen = (docid, name, pass, i) => {
    setDocid(docid);
    setName(name);
    setPass(pass);
    setI(i);
    setOpen(true);
  };

  

  const handleClose = () => setOpen(false);
  
  const handleJoinGroup = async () => {
    if (user) { 
      if (password !== pass){
        setAlert({
          open: true,
          message: "Incorrect Password",
          type: "error",
        });
        return;
      }
      else {
        const groupRef = doc(db, "Groups", docid);
        const uRef = doc(db, "users", user.uid);
        try {
          await Promise.all([ updateDoc(groupRef, {groupMembers: arrayUnion(userInfo) }), updateDoc(uRef, {groupName: name}) ]);
          setAlert({
            open: true,
            message: `Successfully Joined ${name}!`,
            type: "success",
          });
        // update grpups array
        groups[i].groupMembers.push(userInfo);
        userInfo.groupName = name;
        } catch (error) {
          setAlert({
            open: true,
            message: error.message,
            type: "error",
        });
        return;
        } 
      }
    }
    else{
      setAlert({
        open: true,
        message: "Please Login first",
        type: "error",
    });
    return;
    }
    handleClose();
  }

  const handleGoToGroupPage = (id) => {
    if (isAdmin) {
      navigate(`/group/${id}`);
    }
    else console.log("Not admin"); return;
  };

  const handleGoToUserProfile = (id) => navigate(`/userprofile/${id}`);

  
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      {groups.length > 0 ? <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12.5}} >
        {search()
        .map((group, index) => {
          return (
            <Grid item xs={4} sm={4} md={4} key={index}>
                <Item>
                    <Box sx={{ minWidth: 275 }}>
                        <Card variant="outlined">
                          <CardHeader
                            avatar = {
                              <Avatar onClick={()=>handleGoToGroupPage(group.id)} sx={{ bgcolor: "gold", color: "black", fontWeight: 'bold', width: 56, height: 56, cursor: 'pointer' }}>
                                {group.logo}
                              </Avatar>
                            }
                            title={group.groupName}
                            subheader={`Date Created: , ${group.dateCreated}`}
                          />
                          <CardContent>
                            <Typography variant="h5" fontFamily='sans-serif'>Project Name: </Typography>
                            {group.projectName !== '' ? <Typography variant="subtitle1">
                              {group.projectName}
                            </Typography> : <Typography variant="subtitle1" fontFamily='sans-serif' >Still Deciding</Typography>}
                          </CardContent>
                          <CardContent>
                            <Typography paragraph>Group Memebers</Typography>
                            <AvatarGroup max={4}>
                              {group.groupMembers
                                .map((member) => {
                                return (
                                <Tooltip title={`${member.firstname} ${member.lastname}  ${member['ID']} `} placement="bottom-end">
                                  <Avatar
                                    sx={{ bgcolor: 'gold', color: 'black' }} 
                                    alt={`${member.firstname} ${member.lastname}`} 
                                    src={member.img}
                                    onClick={() => handleGoToUserProfile(member.ID)}
                                    >
                                      {member.initials}
                                  </Avatar>
                                </Tooltip>
                                );
                              })}
                            </AvatarGroup>
                            {group.groupMembers.length < 4 && user && userInfo.groupName === "" &&
                            <Button variant="contained" style={{ width: 85, height: 40, marginLeft: 15,color: "black", backgroundColor: "#EEBC1D" }} onClick={ () => {handleOpen(group.id, group.groupName, group.password, index)}}>
                                Join
                            </Button>}
                          </CardContent>
                        </Card>
                    </Box>
                </Item>
            </Grid>);
        })}
      </Grid> : 
      <>
        <h1>No Groups Available</h1>
      </>}
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Enter Password to Join
          </Typography>
          <TextField
            variant="outlined"
            color='black'
            type="text"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained" 
            style={{ width: 85, height: 40, marginLeft: 15,color: "black", backgroundColor: "#EEBC1D" }} 
            onClick={handleJoinGroup}
          >
            Join
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}