import { useState } from 'react';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardHeader, Modal } from '@mui/material';
import { ProManageState } from "../ProManageContext";
import { Box } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import TextField from '@mui/material/TextField';
import { Container } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { makeStyles } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AppBar from '@mui/material/AppBar';

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

const theme = createTheme({
    typography: {
      fontFamily: 'Montserrat', 
      fontSize: 12,
    },
  });

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
      borderRadius: 8,
    },
    changeGroupPicture: {
        padding: 6,
        borderBottom: "2px solid grey",
        borderTop: "2px solid grey"
    },
    section: {
        padding: 6,
        borderBottom: "2px solid grey",
    }
}));

export default function MyGroupPage() {
    const { userInfo, groupInfo, groups, setAlert } = ProManageState();
    const [editMode, setEditMode] = useState(false);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [fileUrl, setFileUrl] = useState(null);
    const classes = useStyles();

    const [projectName, setProjectName] = useState("");
    const [duration, setDuration] = useState(-1);
    const [projectScope, setProjectScope] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [trello, setTrello] = useState("");
    const [git, setGit] = useState("");

    const [deliverables, setDeliverables] = useState([
        {Deliverable: "" }
    ]);

    const [stakeholders, setStakeholders] = useState([
        { Stakeholder: "" }
    ]);

    const [beneficiaries, setBeneficiaries] = useState([
        {Beneficiary: "" }
    ]);

    const [benefits, setBenefits] = useState([
        { Benefit: "" }
    ]);

    const [objectives, setObjectives] = useState([
        { Objective: "" }
    ]);

    // benefits functions
    const handleChangeBenefits = (index, event) =>{
        const values = [...benefits];
        values[index] = event.target.value;
        setBenefits(values);
    };
    const handleAddBenefits = () => {
        setBenefits([...benefits, { Benefit: "" }])
    };
    const handleRemoveBenefits = id => {
        if (benefits.length === 1){
            return;
        } else {
            const values  = [...benefits];
            values.splice(values.findIndex(value => value.id === id), 1);
            setBenefits(values);
        }
    };

    // objectives functions
    const handleChangeObjective = (index, event) =>{
        const values = [...objectives];
        values[index] = event.target.value;
        setObjectives(values);
    }
    const handleAddObjective = () => {
        setObjectives([...objectives, { Objective: "" }])
    }
    const handleRemoveObjective = id => {
        if (objectives.length === 1){
            return;
        } else {
            const values  = [...objectives];
            values.splice(values.findIndex(value => value.id === id), 1);
            setObjectives(values);
        }
    }

    // beneficiaries functions
    const handleChangeBeneficiary = (index, event) =>{
        const values = [...beneficiaries];
        values[index] = event.target.value;
        setBeneficiaries(values);
    }
    const handleAddBeneficiary = () => {
        setBeneficiaries([...beneficiaries, { Beneficiary: "" }])
    }
    const handleRemoveBeneficiary = id => {
        if (beneficiaries.length === 1){
            return;
        } else {
            const values  = [...beneficiaries];
            values.splice(values.findIndex(value => value.id === id), 1);
            setBeneficiaries(values);
        }
    }

    // stackholders functions
    const handleChangeStakeholder = (index, event) =>{
        const values = [...stakeholders];
        values[index] = event.target.value;
        setStakeholders(values);
    }
    const handleAddStakeholder = () => {
        setStakeholders([...stakeholders, { Stakeholder: "" }])
    }
    const handleRemoveStakeholder = id => {
        if (stakeholders.length === 1){
            return;
        } else {
            const values  = [...stakeholders];
            values.splice(values.findIndex(value => value.id === id), 1);
            setStakeholders(values);
        }
    }

    // deliverables functions
    const handleChangeDeliverable = (index, event) =>{
        const values = [...deliverables];
        values[index] = event.target.value;
        setDeliverables(values);
    }
    const handleAddDeliverable = () => {
        setDeliverables([...deliverables, { Deliverable: "" }])
    }
    const handleRemoveDeliverable = id => {
        if (deliverables.length === 1){
            return;
        } else {
            const values  = [...deliverables];
            values.splice(values.findIndex(value => value.id === id), 1);
            setDeliverables(values);
        }
    }

    const handleSubmit = async () => {
        if (!projectName || !type || !projectScope || !objectives || !description || !benefits || !beneficiaries || !stakeholders || !deliverables || !duration){
            setAlert({
                open: true,
                message: "You need to fill all fields",
                type: "error",
                });
            return;
        }
        const mygroup = groups.findIndex(group => group.id === groupInfo.id);
        const groupData = {
            Benefits: groups[mygroup].Benefits = benefits,
            Duration: groups[mygroup].Duration = duration,
            beneficiaries: groups[mygroup].beneficiaries = beneficiaries,
            deliverables: groups[mygroup].deliverables = deliverables,
            objectives: groups[mygroup].objectives = objectives,
            projectScope: groups[mygroup].projectScope = projectScope,
            pojectType: groups[mygroup].pojectType = type,
            stakeHolders: groups[mygroup].stakeholders = stakeholders,
            projectName: groups[mygroup].projectName = projectName,
        };
        
        const groupRef = doc(db, "Groups", groupInfo?.id);
        try {
            await updateDoc(groupRef, groupData)
            setAlert({
            open: true,
            message: 'Successfully Updated Group Information!',
            type: "success",
        });
        } catch (error) {
            setAlert({
            open: true,
            message: error.message,
            type: "error",
        });
        return;
        }
        setEditMode(false);
        handleClose();
    };

    const handleSaveChanges = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        setEditMode(false);
    };

    const handleSaveGroupInfo = async (e) => {
        e.preventDefault();
        const groupRef = doc(db,"Groups", groupInfo?.id)
        if(trello === "" || git === ""){
            if(trello!==""){
                try {
                    await 
                        updateDoc(groupRef, {
                            trello: trello
                        })
                    groupInfo.trello = trello;
                    setAlert({
                        open: true,
                        message: 'Updated Group',
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
            if(git!==""){
                try {
                    await 
                        updateDoc(groupRef, {
                            git: git
                        })
                    groupInfo.git = git;
                    setAlert({
                        open: true,
                        message: 'Updated Group',
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
        }
        if(trello === "" && git === ""){
            if(fileUrl !== null){
                try {
                    await 
                        updateDoc(groupRef, {
                            image: fileUrl
                        })
                    groupInfo.image = fileUrl.toString();
                    setAlert({
                        open: true,
                        message: 'Updated Group',
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
            else setOpenModal(false)
        }
    }

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        const storage = getStorage();
        const storageRef = ref(storage, `group-pictures/${groupInfo.groupName}`);
        await uploadBytes(storageRef, file)
        setFileUrl( await getDownloadURL(ref(storage, `group-pictures/${groupInfo.groupName}`)))
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
                  <Typography fontSize={30} fontFamily='Montserrat'>Edit Group Information</Typography>
                </Container>
                </AppBar>
                <Container style={{margin: 20, textAlign: "left"}}>
                    <form onSubmit={handleSaveGroupInfo}>
                        <div className={classes.changeGroupPicture} >
                            <label htmlFor="contained-button-file">
                                <Input 
                                    onChange={onFileChange}
                                    accept="image/*"
                                    id="contained-button-file" 
                                    multiple type="file" 
                                />
                                <Button variant="contained" component="span">
                                    Change Group Picture
                                </Button>
                            </label>
                        </div>
                        <div className={classes.section}>
                            <Button variant="contained" onClick={(e)=> setEditMode(true) }>
                                Submit a Proposal
                            </Button>
                        </div>
                        <div className={classes.section}>
                            <TextField
                                type='url'
                                label='Trello Board Link'
                                defaultValue={groupInfo?.trello}
                                variant='outlined'
                                value={trello}
                                onChange={(e)=>setTrello(e.target.value)}
                            />
                        </div>
                        <div className={classes.section}>
                            <TextField
                                type='url'
                                defaultValue={groupInfo?.git}
                                label='GitHub Link'
                                variant='outlined'
                                value={git}
                                onChange={(e)=>setGit(e.target.value)}
                            />
                        </div>
                        <div style={{marginTop: 40}}>
                            <Button style={{float: "right", display: 'inlineBlock', marginRight: 50}} variant='contained' color='success' onClick={handleSaveGroupInfo}>
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
        <ThemeProvider theme={theme}>
             <Container style={{ textAlign: "left" }}>
                {renderEdit}
                {userInfo?.groupName !== "" ? <Box sx={{ m: 10}}>
                    {!editMode ? 
                    <Card>
                        <CardHeader
                            sx={{ bgcolor: 'primary.main', color: 'white'}}
                            title={<Typography variant='h4'>{groupInfo?.groupName}</Typography>}
                            avatar = {<EditIcon style={{ cursor: "pointer"}} fontSize="large" onClick={() => setOpenModal(true)}/>}
                        />
                        <CardMedia
                            component="img"
                            height={500}
                            alt={groupInfo?.groupName}
                            image={groupInfo?.image}
                        />
                        <CardContent>
                            <Typography
                                variant='h4'
                            >
                                Project Name:
                            </Typography>
                            <br/>
                            {groupInfo?.projectName !== "" ? 
                            <Typography
                                variant='body1'
                                sx={{marginLeft: 10}}
                            >
                                {groupInfo?.projectName}
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
                                Group Members:
                            </Typography>
                            {groupInfo?.groupMembers ? 
                            <List>
                                {groupInfo?.groupMembers.map(obj => {
                                    return (
                                    <ListItem style={{ marginLeft: 60, width:'800px' }}>
                                        <ListItemIcon>
                                            <PersonIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={`${obj.firstname} ${obj.lastname}`} />
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
                                variant='h4'
                            >
                                Project Type:
                            </Typography>
                            <br/>
                            {groupInfo?.projectType !== "" ? 
                            <Typography
                                variant='body1'
                                sx={{marginLeft: 10}}
                            >
                                {groupInfo?.projectType}
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
                            {groupInfo?.projectScope !== "" ? 
                            <Typography
                                variant='body1'
                                sx={{marginLeft: 10}}
                                width='800px'
                            >
                                {groupInfo?.projectScope}
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
                            <br/>
                            {(groupInfo?.objectives.length !== 0 && groupInfo?.objectives[0].Objective !== "" ) ? 
                            <List>
                                {groupInfo?.objectives.map(obj => {
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
                                sx={{ marginLeft: 10}}
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
                            {groupInfo?.description !== "" ? 
                            <Typography
                                variant='body1'
                                sx={{marginLeft: 10}}
                                width='800px'
                            >
                                {groupInfo?.description}
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
                            {(groupInfo?.Benefits.length !== 0 && groupInfo?.Benefits[0].Benefit !== "") ? 
                            <List>
                                {groupInfo?.Benefits.map(obj => {
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
                                sx={{ marginLeft: 10}}
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
                            {(groupInfo?.beneficiaries.length !== 0 && groupInfo?.beneficiaries[0].Beneficiary !== "") ? 
                            <List>
                                {groupInfo?.beneficiaries.map(obj => {
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
                            {(groupInfo?.stakeHolders.length !== 0 && groupInfo?.stakeHolders[0].Stakeholder !== "") ? 
                            <List>
                                {groupInfo?.stakeHolders.map(obj => {
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
                            {(groupInfo?.deliverables.length !== 0 && groupInfo?.deliverables[0].Deliverable !== "" ) ? 
                            <List>
                                {groupInfo?.deliverables.map(obj => {
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
                            {groupInfo?.duration !== -1 ? 
                            <Typography
                                variant='body1'
                                sx={{marginLeft: 10}}
                            >
                                {`${groupInfo?.Duration} weeks`}
                            </Typography>
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
                                Trello Board Link:
                            </Typography>
                            <br/>
                            {groupInfo?.trello !== undefined ? 
                            <a href={groupInfo?.trello}>
                                {groupInfo?.trello}
                            </a>
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
                                GitHub Link:
                            </Typography>
                            <br/>
                            {groupInfo?.git !== undefined ? 
                            <a href={groupInfo?.git}>
                                {groupInfo?.git}
                            </a>
                            :
                            <Typography
                                variant='body1'
                                sx={{marginLeft: 10}}
                            >
                            None
                            </Typography>}
                        </CardContent>
                        
                    </Card>
                    :
                    <Card>
                        <CardHeader
                            sx={{ bgcolor: 'primary.main', color: 'white'}}
                            title={<Typography variant='h4'>{groupInfo.groupName}</Typography>}
                            
                        />
                        
                        <CardContent>
                            <Typography variant='h4'>Project Name:</Typography>
                            <br/>
                            <TextField
                                variant="filled"
                                type="text"
                                label="Project Name"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                style={{width: 400, marginLeft: 40, marginTop: 5}}
                            />
                            <br/><br/>
                            <Typography variant='h4'>Project Type:</Typography>
                            <br/>
                            <FormControl variant="filled" sx={{width: 250, marginLeft: 5}}>
                                <InputLabel >Project Type</InputLabel>
                                <Select
                                value={type}
                                onChange={(e)=> setType(e.target.value)}
                                >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="Technical">Technical</MenuItem>
                                <MenuItem value="Business">Business</MenuItem>
                                <MenuItem value="Research">Research</MenuItem>
                                <MenuItem value="Entrepreneurial">Entrepreneurial</MenuItem>
                                </Select>
                            </FormControl>
                            <br/><br/>
                            <Typography variant='h4'>Project Scope:</Typography>
                            <br/>
                            <TextField
                                variant="filled"
                                type="text"
                                label="Project Scope"
                                value={projectScope}
                                multiline
                                onChange={(e) => setProjectScope(e.target.value)}
                                style={{width: 800, marginLeft: 40, marginTop: 5}}
                            />
                            <br/><br/>
                            <Typography variant='h4'>Objectives:</Typography>
                            <br/>
                            {objectives.map((inputField, index) => (
                            <div key={index}>
                                <TextField 
                                name='Objective'
                                label={`Objective ${index+1}`}
                                multiline
                                variant='filled'
                                type='text'
                                value={inputField.Objective}
                                style={{width: 400, marginLeft: 40, marginTop: 5}}
                                onChange={event => handleChangeObjective(index, event)}
                                />
                                
                                <Button onClick={() => handleRemoveObjective(inputField.id)}>
                                    <RemoveIcon style={{ color: 'black' }}/>
                                </Button>
                                <IconButton onClick={handleAddObjective}>
                                    <AddIcon style={{ color: 'black' }}/>
                                </IconButton>
                            </div>
                            ))}
                            <br/>
                            <Typography variant='h4'>Description:</Typography>
                            <br/>
                            <TextField
                                variant="filled"
                                multiline
                                type="text"
                                label="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                style={{width: 800, marginLeft: 40, marginTop: 5}}
                            />
                            <br/><br/>
                            <Typography variant='h4'>Benefits:</Typography>
                            <br/>
                            {benefits.map((inputField, index) => (
                            <div key={index}>
                                <TextField 
                                name='Benefit'
                                type='text'
                                label={`Benefit ${index+1}`}
                                variant='filled'
                                value={inputField.Benefit}
                                style={{width: 400, marginLeft: 40, marginTop: 5}}
                                onChange={event => handleChangeBenefits(index, event)}
                                />
                                
                                <Button onClick={() => handleRemoveBenefits(inputField.id)}>
                                    <RemoveIcon style={{ color: 'black' }}/>
                                </Button>
                                <IconButton onClick={handleAddBenefits}>
                                    <AddIcon style={{ color: 'black' }}/>
                                </IconButton>
                            </div>
                            ))}
                            <br/>
                            <Typography variant='h4'>Beneficiaries:</Typography>
                            <br/>
                            {beneficiaries.map((inputField, index) => (
                            <div key={index}>
                                <TextField 
                                name='Beneficiary'
                                type='text'
                                label={`Beneficiary ${index+1}`}
                                variant='filled'
                                value={inputField.Beneficiary}
                                style={{width: 400, marginLeft: 40, marginTop: 5}}
                                onChange={event => handleChangeBeneficiary(index, event)}
                                />
                                
                                <Button onClick={() => handleRemoveBeneficiary(inputField.id)}>
                                    <RemoveIcon style={{ color: 'black' }}/>
                                </Button>
                                <IconButton onClick={handleAddBeneficiary}>
                                    <AddIcon style={{ color: 'black' }}/>
                                </IconButton>
                            </div>
                            ))}
                            <br/>
                            <Typography variant='h4'>Stakeholders:</Typography>
                            <br/>
                            {stakeholders.map((inputField, index) => (
                            <div key={index}>
                                <TextField
                                name='Stakeholder'
                                type='text'
                                label={`Stakeholder ${index+1}`}
                                variant='filled'
                                value={inputField.Stakeholder}
                                style={{width: 400, marginLeft: 40, marginTop: 5}}
                                onChange={event => handleChangeStakeholder(index, event)}
                                />
                                
                                <Button onClick={() => handleRemoveStakeholder(inputField.id)}>
                                    <RemoveIcon style={{ color: 'black' }}/>
                                </Button>
                                <IconButton onClick={handleAddStakeholder}>
                                    <AddIcon style={{ color: 'black' }}/>
                                </IconButton>
                            </div>
                            ))}
                            <br/>
                            <Typography variant='h4'>Deliverables:</Typography>
                            <br/>
                            {deliverables.map((inputField, index) => (
                            <div key={index}>
                                <TextField
                                name='Deliverable'
                                type='text'
                                label={`Deliverable ${index+1}`}
                                variant='filled'
                                value={inputField.Deliverable}
                                style={{width: 400, marginLeft: 40, marginTop: 5}}
                                onChange={event => handleChangeDeliverable(index, event)}
                                />
                                
                                <Button onClick={() => handleRemoveDeliverable(inputField.id)}>
                                    <RemoveIcon style={{ color: 'black' }}/>
                                </Button>
                                <IconButton onClick={handleAddDeliverable}>
                                    <AddIcon style={{ color: 'black' }}/>
                                </IconButton>
                            </div>
                            ))}
                            <br/>
                            <Typography variant='h4'>Estimated Project Duration:</Typography>
                            <br/>
                            <TextField
                            label='Duration'
                            variant='filled'
                            type='number'
                            style={{width: 250, marginLeft: 40, marginTop: 5}}
                            value={duration}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                                }
                            }}
                            onChange={(e) => setDuration(e.target.value)}
                            />  
                        </CardContent>
                        <CardActions>
                            <Button 
                            size="large"
                            variant="contained"
                            style={{
                            marginLeft: '50px',
                            color: "black",
                            backgroundColor: "#EEBC1D",
                            }}
                            onClick={handleSaveChanges}
                            >
                                Finish
                            </Button>
                        </CardActions>
                    </Card>
                    }
                    <Modal
                        keepMounted
                        open={open}
                        onClose={handleClose}
                    >
                        <Box sx={style}>
                        <Typography variant="h6" component="h2">
                            Save these changes?
                        </Typography>
                        <Button
                            variant="contained" 
                            style={{ width: 85, height: 40, marginLeft: 15,color: "black", backgroundColor: "#EEBC1D" }} 
                            onClick={handleSubmit}
                        >
                            Yes
                        </Button>
                        <Button
                            variant="contained" 
                            style={{ width: 85, height: 40, marginLeft: 15,color: "black", backgroundColor: "#EEBC1D" }} 
                            onClick={handleClose}
                        >
                            No
                        </Button>
                        </Box>
                    </Modal>
                </Box>
                :
                <Box sx={{ m: 10}}>
                    <Typography variant='h2'>
                        You have not yet joined a group
                    </Typography>
                    <br/><br/>
                    <Link to="/groups">View Groups Here</Link>
                </Box>
                
                }
            </Container>
        </ThemeProvider>
    );
}