import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardHeader, Container } from '@mui/material';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import CardActions from '@mui/material/CardActions';
import LightbulbRoundedIcon from '@mui/icons-material/LightbulbRounded';
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AppBar from '@mui/material/AppBar';

import { ProManageState } from '../../ProManageContext';
import { useParams } from "react-router-dom";


import { db } from "../../firebase";
import { getDoc, doc, addDoc, updateDoc, arrayUnion, collection, deleteDoc} from "firebase/firestore";

const theme = createTheme({
    typography: {
      fontFamily: 'Arial',
      fontSize: 12,
    },
    palette: {
      primary: {
        main: "#000000",
      },
      type: "light",
    },
});

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 1000,
    backgroundColor: theme.palette.background.paper,
    color: "black",
    borderRadius: 10,
    padding: 50,
  },
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "100%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 25,
    borderRight: "2px solid grey",
  },
  heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
  },
  description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
  },
}));

export default function ViewProposal() {
  const { id } = useParams();
  const [viewIdea, setViewIdea] = useState(false);
  const { setAlert, availIdeas, pendingProposals } = ProManageState();
  const [openModal, setOpenModal] = useState(false);
  const classes = useStyles();
  const navigate =useNavigate();
  const [proposal, setProposal] = useState({
      fullname: "",
      id: "",
      idea: {
        name: "",
        description: "",
        type: ""
      },
      proposal: {
        benefits: [],
        duration: -1,
        beneficiaries: [],
        deliverables: [],
        objectives: [] ,
        projectScope: "",
        pojectType: "" ,
        stakeholders: [],
        projectName: "",
      }
  });
  const [comment, setComment] = useState("");

    
  const fetchProposal = async () => {
    const pRef = doc(db, "Pending Proposals", id);
    const pSnap = await getDoc(pRef);
    setProposal(pSnap.data());
  }

  useEffect(() => {
    fetchProposal();
    })

  const handleAccept = async () => {

    // update user status, add to accepted proposals
    const accRef = collection(db, "Current Proposals");
    const userRef = doc(db, "users", proposal?.id);
    const pendRef = doc(db, "Pending Proposals", id);

    try  {
    await Promise.all([
        addDoc(accRef, proposal.proposal),
        updateDoc(userRef, {status: arrayUnion("Proposal Accepted")}),
        deleteDoc(pendRef)
      ]);
      setAlert({
        open: true,
        message: `Accepted ${proposal.studentID}'s proposal`,
        type: "success",
      });
      const index = pendingProposals.indexOf((pendingProposals.find(idea => idea.id === id)));
      pendingProposals.splice(index);
      navigate('/submission');
    }
    catch (error) {
      setAlert({
      open: true,
      message: error.message,
      type: "error",
      });
    }
  }

  const handleDeny = async () => {
    // update user status, delete from pending proposals, option to add the idea back to
    // available ideas open comment section for teacher to add comments
    const userRef = doc(db, "users", proposal?.id);
    const pendRef = doc(db, "Pending Proposals", id);

    try {
      await Promise.all([
        updateDoc(userRef, {comment: comment, status: arrayUnion("Proposal Denied")}),
        deleteDoc(pendRef)
      ]);
      setAlert({
        open: true,
        message: `Dennied ${proposal.studentID}'s proposal`,
        type: "success",
      });
      const index = pendingProposals.indexOf((pendingProposals.find(idea => idea.id === id)));
      pendingProposals.splice(index);
      navigate('/submission');
    } 
    catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
        });
    }
  }

  const handleAddtoAvail = async () => {
    const availRef = collection(db, "Available Ideas");
    try {
      await addDoc(availRef, proposal?.idea);
      setAlert({
        open: true,
        message: `Successflly added ${proposal.idea.name} to Available ideas`,
        type: "success",
      });
      availIdeas.push(proposal.idea);
      setViewIdea(false);
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  }

  const CommentSection = (
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
              <Typography fontSize={24} fontFamily='Montserrat'>Comments</Typography>
            </Container>
          </AppBar>
          <Typography onClick={viewIdea? ()=>{setViewIdea(false)} : ()=>{setViewIdea(true)}} style={{cursor: "pointer"}}>view idea student selected</Typography>
          <div className={classes.container}>
          
            <div className={classes.sidebar}>
              {viewIdea && <div>
                {proposal?.idea !== "Student-Proposed" ? <div>
                  <LightbulbRoundedIcon style={{ color: 'gold', height: 100, width: 100 }}/>
                      
                  <Typography variant='h3' className={classes.heading}>
                      {proposal?.idea.name}
                  </Typography>
                  <Typography variant="subtitle1" className={classes.description}>
                  {proposal?.idea.description}
                  </Typography>
                  <Typography variant="h5" className={classes.heading}>
                      Project Type:
                  </Typography>
                  &nbsp; &nbsp;
                  <Typography
                      variant="h5"
                      style={{
                          fontFamily: "Montserrat",
                      }}
                      >
                      {proposal?.idea.type}
                  </Typography>
                  &nbsp; &nbsp;
                  <Typography style={{padding: 20 }}>Do you want to add this idea back to the list of Available ideas?</Typography>
                  
                  <Button
                    variant="contained"
                    style={{
                    width: 85,
                    height: 40,
                    marginLeft: 15,
                    color: "black",
                    backgroundColor: "#EEBC1D",
                    }}
                    onClick = {handleAddtoAvail}
                  >
                    Add 
                  </Button>
                </div>: <Typography variant='h4'>Student-Proposed Project</Typography>
                }
              </div>
              }

            </div>
              <TextField
                label="Leave your comment here"
                variant="outlined"
                multiline
                autoComplete='fail'
                style={{ marginBottom: 20, width: "100%" }}
                onChange={(e) => setComment(e.target.value)}
                />
                <Button
                  variant="contained"
                  style={{
                  width: 85,
                  height: 40,
                  marginLeft: 15,
                  color: "black",
                  backgroundColor: "#EEBC1D",
                  }}
                  onClick = {handleDeny}
                >
                  Done
                </Button>
            </div>
        </div>
      </Fade>
    </Modal>
  )
 
  return (
      <ThemeProvider theme={theme}>
          <Box sx={{ m: 10}}>
              <Card>
                  <CardHeader
                      sx={{ bgcolor: 'primary.main', color: 'white'}}
                      title={<Typography variant='h4'>Student Name: {proposal?.fullname }</Typography>}
                      
                      subheader={<Typography variant='h5'>Student ID: {proposal?.studentID}</Typography>}
                      
                    
                  />
                  <CardContent>
                      <Typography
                          variant='h4'
                      >
                          Project Name:
                      </Typography>
                      <br/>
                      {proposal?.proposal.projectName !== "" ? 
                      <Typography
                          variant='body1'
                          sx={{marginLeft: 10}}
                      >
                          {proposal?.proposal.projectName}
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
                      {proposal?.proposal.projectType !== "" ? 
                      <Typography
                          variant='body1'
                          sx={{marginLeft: 10}}
                      >
                          {proposal?.proposal.projectType}
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
                      {proposal?.proposal.projectScope !== "" ? 
                      <Typography
                          variant='body1'
                          sx={{marginLeft: 10}}
                          width='800px'
                      >
                          {proposal?.proposal.projectScope}
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
                      {(proposal?.proposal.objectives.length !== 0 && proposal?.proposal.objectives[0].Objective !== "") ? 
                      <List>
                          {proposal?.proposal.objectives.map(obj => {
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
                      {proposal?.proposal.description !== "" ? 
                      <Typography
                          variant='body1'
                          sx={{marginLeft: 10}}
                          width='800px'
                      >
                          {proposal?.proposal.description}
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
                      {(proposal?.proposal.benefits.length !== 0 && proposal?.proposal.benefits[0].Benefit !== "") ? 
                      <List>
                          {proposal?.proposal.benefits.map(obj => {
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
                      {(proposal?.proposal.beneficiaries.length !== 0 && proposal?.proposal.beneficiaries[0].Beneficiary !== "") ? 
                      <List>
                          {proposal?.proposal.beneficiaries.map(obj => {
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
                      {(proposal?.proposal.stakeholders.length !== 0 && proposal?.proposal.stakeholders[0].Stakeholder !== "")  ? 
                      <List>
                          {proposal?.proposal.stakeholders.map(obj => {
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
                      {(proposal?.proposal.deliverables.length !== 0 && proposal?.proposal.deliverables[0].Deliverable !== "" ) ? 
                      <List>
                          {proposal?.proposal.deliverables.map(obj => {
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
                      {proposal?.proposal.duration !== -1 ? 
                      <Typography
                          variant='body1'
                          sx={{marginLeft: 10}}
                      >
                          {`${proposal?.proposal.duration} weeks`}
                      </Typography>
                      :
                      <Typography
                          variant='body1'
                          sx={{marginLeft: 10}}
                      >
                      None
                      </Typography>}
                  </CardContent>
                  <CardActions>
                    <Container style={{ textAlign: "center" }}>
                      <Button 
                      size="large"
                      variant="contained"
                      style={{
                      marginLeft: '50px',
                      color: "black",
                      backgroundColor: "#EEBC1D",
                      }}
                      onClick={handleAccept}
                      >
                          Accept
                      </Button>
                      <Button 
                      size="large"
                      variant="contained"
                      style={{
                      marginLeft: '50px',
                      color: "black",
                      backgroundColor: "#EEBC1D",
                      }}
                      onClick={()=>setOpenModal(true)}
                      >
                          Deny
                      </Button>
                    </Container>
                  </CardActions> 
              </Card>
              {CommentSection}
          </Box>
      </ThemeProvider>
  );
}