import { Typography } from '@mui/material';
import { useState } from 'react';
import { ProManageState } from '../ProManageContext';
import { Container } from "@material-ui/core";
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';

import { CardHeader } from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import { Card, IconButton  } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { makeStyles } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AppBar from '@mui/material/AppBar';

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const Input = styled('input')({
    display: 'none',
});

const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      width: 700,
      height: 400,
      backgroundColor: theme.palette.background.paper,
      color: "white",
      borderRadius: 10,
    },
    changeAvatar: {
        padding: 8,
        borderBottom: "2px solid grey",
        borderTop: "2px solid grey"
    }
}));

const ProfilePage = () => {
    const { userInfo, user, setAlert } = ProManageState();
    const [toggleproposal, setToggleproposal] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [fileUrl, setFileUrl] = useState(null);
    const classes = useStyles();

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        const userRef = doc(db,"users", user?.uid)
        try {
            await updateDoc(userRef, {image: fileUrl})
            userInfo.image = fileUrl.toString();
            setAlert({
                open: true,
                message: 'Updated Profile Picture',
                type: "success",
            });
            
        } catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: "error",
            });
        }
    }

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        const storage = getStorage();
        const storageRef = ref(storage, `profile-pictures/${userInfo.ID}`);
        

        await uploadBytes(storageRef, file)
        setFileUrl( await getDownloadURL(ref(storage, `profile-pictures/${userInfo.ID}`)))

    }



    const renderEdit  = (
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
                  <Typography fontSize={30} fontFamily='Montserrat'>Edit Profile</Typography>
                </Container>
                </AppBar>
                <Container style={{margin: 20, textAlign: "left"}}>
                    <form onSubmit={handleSaveProfile}>
                        <div className={classes.changeAvatar} >
                            <label htmlFor="contained-button-file">
                                <Input 
                                    onChange={onFileChange}
                                    accept="image/*"
                                    id="contained-button-file" 
                                    multiple type="file" 
                                />
                                <Button variant="contained" component="span">
                                    Change Avatar
                                </Button>
                            </label>
                        </div>
                        <div style={{marginTop: 40}}>
                            <Button style={{float: "right", display: 'inlineBlock', marginRight: 50}} variant='contained' color='success' onClick={handleSaveProfile}>
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </Container>
            </div>
          </Fade>
        </Modal>
      )

    return (
        <Container style={{ textAlign: "left" }}>
            <Grid container direction="column" spacing={2} p={4}>
                <Grid item xs={8} sx={{ alignContent: 'center', alignItems: 'center'}}>
                    <Card>
                        <CardHeader
                            sx={{ bgcolor: 'primary.main', color: 'white'}}
                            title={
                                <div>
                            <Typography variant='h4'>
                                {`${userInfo.firstname} ${userInfo.lastname}`}
                            </Typography>
                            <IconButton style={{color: 'white', float: 'right'}} onClick={()=>setOpenModal(true)}>
                                <ModeEditIcon sx={{ width: 40, height: 40 }}/>
                            </IconButton>
                            </div>
                            }
                            avatar={
                                <Avatar
                                    alt={`${userInfo.firstname} ${userInfo.lastname}`}
                                    src={userInfo?.image}
                                    sx={{ width: 120, height: 120 }}
                                />
                            }
                            subheader={`Email: ${userInfo.email}`}

                        />
                        <CardContent>
                            <Typography
                                variant='h4'
                            >
                            Skills:
                            </Typography>
                            {userInfo.skills ? 
                            <List>
                                {userInfo.skills.map(obj => {
                                    return (
                                    <ListItem style={{ marginLeft: 60, width:'800px' }}>
                                        <ListItemIcon>
                                            <StarIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={obj.skill} />
                                    </ListItem >
                                )})}
                            </List>
                            :
                            <Typography
                                variant='body1'
                                sx={{marginLeft: 10}}
                            >
                            None
                            </Typography>}
                            <Typography
                                variant='h6'
                            >
                                {`Group: ${userInfo?.groupName}`}
                            </Typography>

                            <div style={{display:"flex"}}>
                                <Typography
                                    variant='h6'
                                >
                                    Proposal:
                                </Typography>        
                                <Typography variant= 'h6' onClick={toggleproposal? ()=>{setToggleproposal(false)} : ()=>{setToggleproposal(true)}} style={{cursor: "pointer"}}>  Toggle View my proposal</Typography>          
                            </div>
                            {toggleproposal && userInfo?.proposal ?
                                    <div>
                                    <Typography
                                        variant='h4'
                                    >
                                        Project Name:
                                    </Typography>
                                    <br/>
                                    {userInfo?.proposal.projectName !== "" ? 
                                    <Typography
                                        variant='body1'
                                        sx={{marginLeft: 10}}
                                    >
                                        {userInfo?.proposal.projectName}
                                    </Typography>
                                    :
                                    <Typography
                                        variant='body1'
                                        sx={{marginLeft: 10}}
                                    >
                                    None
                                    </Typography>}
                                    <br/><br/>
                                    <Typography
                                        variant='h4'
                                    >
                                        Project Type:
                                    </Typography>
                                    <br/>
                                    {userInfo?.proposal.projectType !== "" ? 
                                    <Typography
                                        variant='body1'
                                        sx={{marginLeft: 10}}
                                    >
                                        {userInfo?.proposal.projectType}
                                    </Typography>
                                    :
                                    <Typography
                                        variant='body1'
                                        sx={{marginLeft: 10}}
                                    >
                                    None
                                    </Typography>}
                                    <br/><br/>
                                    <Typography
                                        variant='h4'
                                    >
                                        Project Scope:
                                    </Typography>
                                    <br/>
                                    {userInfo?.proposal.projectScope !== "" ? 
                                    <Typography
                                        variant='body1'
                                        sx={{marginLeft: 10}}
                                        width='800px'
                                    >
                                        {userInfo?.proposal.projectScope}
                                    </Typography>
                                    :
                                    <Typography
                                        variant='body1'
                                        sx={{marginLeft: 10}}
                                    >
                                    None
                                    </Typography>}
                                    <br/><br/>
                                    <Typography
                                        variant='h4'
                                    >
                                        Objectives:
                                    </Typography>
                                    {(userInfo?.proposal.objectives.length !== 0 && userInfo?.proposal.objectives[0].Objective !== "") ? 
                                    <List>
                                        {userInfo?.proposal.objectives.map(obj => {
                                            return (
                                            <ListItem style={{ marginLeft: 60, width:'800px' }}>
                                                <ListItemIcon>
                                                    <StarIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={obj} />
                                            </ListItem >
                                        )})}
                                    </List>
                                    :
                                    <Typography
                                        variant='body1'
                                        sx={{marginLeft: 10}}
                                    >
                                    None
                                    </Typography>}
                                    <br/>
                                    <Typography
                                        variant='h4'
                                    >
                                        Description:
                                    </Typography>
                                    <br/>
                                    {userInfo?.proposal.description !== "" ? 
                                    <Typography
                                        variant='body1'
                                        sx={{marginLeft: 10}}
                                        width='800px'
                                    >
                                        {userInfo?.proposal.description}
                                    </Typography>
                                    :
                                    <Typography
                                        variant='body1'
                                        sx={{marginLeft: 10}}
                                    >
                                    None
                                    </Typography>}
                                    <br/><br/>
                                    <Typography
                                        variant='h4'
                                    >
                                        Benefits:
                                    </Typography>
                                    <br/>
                                    {(userInfo?.proposal.benefits.length !== 0 && userInfo?.proposal.benefits[0].Benefit !== "") ? 
                                    <List>
                                        {userInfo?.proposal.benefits.map(obj => {
                                            return (
                                            <ListItem style={{ marginLeft: 60, width:'800px' }}>
                                                <ListItemIcon>
                                                    <StarIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={obj} />
                                            </ListItem >
                                        )})}
                                    </List>
                                    :
                                    <Typography
                                        variant='body1'
                                        sx={{marginLeft: 10}}
                                    >
                                    None
                                    </Typography>}
                                    <br/>
                                    <Typography
                                        variant='h4'
                                    >
                                        Beneficiaries:
                                    </Typography>
                                    <br/>
                                    {(userInfo?.proposal.beneficiaries.length !== 0 && userInfo?.proposal.beneficiaries[0].Beneficiary !== "") ? 
                                    <List>
                                        {userInfo?.proposal.beneficiaries.map(obj => {
                                            return (
                                            <ListItem style={{ marginLeft: 60 }}>
                                                <ListItemIcon>
                                                    <StarIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={obj} />
                                            </ListItem >
                                        )})}
                                    </List>
                                    :
                                    <Typography
                                        variant='body1'
                                        sx={{marginLeft: 10}}
                                    >
                                    None
                                    </Typography>}
                                    <br/>
                                    <Typography
                                        variant='h4'
                                    >
                                        Stakeholders:
                                    </Typography>
                                    <br/>
                                    {(userInfo?.proposal.stakeholders.length !== 0 && userInfo?.proposal.stakeholders[0].Stakeholder !== "")  ? 
                                    <List>
                                        {userInfo?.proposal.stakeholders.map(obj => {
                                            return (
                                            <ListItem style={{ marginLeft: 60 }}>
                                                <ListItemIcon>
                                                    <StarIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={obj} />
                                            </ListItem >
                                        )})}
                                    </List>
                                    :
                                    <Typography
                                        variant='body1'
                                        sx={{marginLeft: 10}}
                                    >
                                    None
                                    </Typography>}
                                    <br/>
                                    <Typography
                                        variant='h4'
                                    >
                                        Deliverables:
                                    </Typography>
                                    <br/>
                                    {(userInfo?.proposal.deliverables.length !== 0 && userInfo?.proposal.deliverables[0].Deliverable !== "" ) ? 
                                    <List>
                                        {userInfo?.proposal.deliverables.map(obj => {
                                            return (
                                            <ListItem style={{ marginLeft: 60 }}>
                                                <ListItemIcon>
                                                    <StarIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={obj} />
                                            </ListItem >
                                        )})}
                                    </List>
                                    :
                                    <Typography
                                        variant='body1'
                                        sx={{marginLeft: 10}}
                                    >
                                    None
                                    </Typography>}
                                    <br/>
                                    <Typography
                                        variant='h4'
                                    >
                                        Estimated Project Duration:
                                    </Typography>
                                    <br/>
                                    {userInfo?.proposal.duration !== -1 ? 
                                    <Typography
                                        variant='body1'
                                        sx={{marginLeft: 10}}
                                    >
                                        {`${userInfo?.proposal.duration} weeks`}
                                    </Typography>
                                    :
                                    <Typography
                                        variant='body1'
                                        sx={{marginLeft: 10}}
                                    >
                                    None
                                    </Typography>}
                                </div>
                                : <Typography>You have not submitted a proposal</Typography>
                                }
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            {renderEdit}
        </Container>
    )
}

export default ProfilePage