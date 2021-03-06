import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardHeader, Modal } from '@mui/material';
import { ProManageState } from '../../ProManageContext';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import { Button, Container } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { db } from '../../firebase';
import { doc, addDoc, updateDoc, collection, arrayUnion } from "firebase/firestore";



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

export default function IdeaProposal() {
    const { user, userInfo, setAlert } = ProManageState();

    const [open, setOpen] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [duration, setDuration] = useState(-1);
    const [projectScope, setProjectScope] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const navigate =useNavigate();

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
    
    const handleSaveChanges = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        if (!projectName || !type || !projectScope || !objectives || !description || !benefits || !beneficiaries || !stakeholders || !deliverables || !duration){
            setAlert({
                open: true,
                message: "You need to fill all fields",
                type: "error",
                });
            return;
        }
        const proposal = {
            projectName: projectName,
            projectType: type,
            projectScope: projectScope,
            objectives: objectives,
            description: description,
            benefits: benefits,
            beneficiaries: beneficiaries,
            stakeholders: stakeholders,
            deliverables: deliverables,
            duration: duration
        }

        //remove idea from available ideas, update user status adnd prrofile with proposal and add to pending proposals database
        try {
            await Promise.all([
                updateDoc(doc(db, "users", user.uid), { proposal: proposal, status: arrayUnion("Pending Proposal") }),
                addDoc(collection(db, "Pending Proposals"), { 
                    proposal: proposal, 
                    id: user.uid, 
                    studentID: userInfo.ID, 
                    fullname: userInfo.firstname + " " + userInfo.lastname, 
                    received: new Date().toLocaleString(),
                    idea: "Student-Proposed" 
                 }) 
            ]);
            userInfo.status.push("Pending Proposal");
            setAlert({
                open: true,
                message: "You have successfully submit your proposal",
                type: "success",
                });
                navigate('/');
        } catch (error) {
            setAlert({
            open: true,
            message: error.message,
            type: "error",
            });
        }
    }

    return (
        <ThemeProvider theme={theme}>
          <Container style={{ textAlign: "left" }}>
              <Card>
                  <CardHeader
                      sx={{ bgcolor: 'primary.main', color: 'white'}}
                      title={<Typography variant='h4'>Idea Proposal</Typography>}
                      
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
                          autoComplete
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
                          autoComplete
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
                          autoComplete
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
                          autoComplete
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
                          autoComplete
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
                          autoComplete
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
                          autoComplete
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
          </Container>
        </ThemeProvider>
    );
}