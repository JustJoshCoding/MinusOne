import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Signup from "./Signup";
import MySkills from './MySkills';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { ProManageState } from "../../ProManageContext";
import Slider from '@mui/material/Slider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const steps = ['User Credentials', 'My Skills', 'Skill Confidence Levels', 'Degree Type'];


export default function HorizontalNonLinearStepper({ handleClose }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [confidenceLevels, setConfidenceLevels] = React.useState([]);
  const [degree, setDegree] = React.useState("");
  const { setAlert } = ProManageState();
  

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const {renderSignUp, firstname, lastname, email, id, password, confirmPassword} = Signup();
  const {
    renderMySkills,
    docu,
    web,
    css,
    pro,
    lea,
    dat,
    res,
    ent,
    bac, 
  } = MySkills();

  var skills = [];
  if (docu) skills.push("documentation");
  if (web) skills.push("web design");
  if (css) skills.push("cascading style sheets");
  if (pro) skills.push("programming");
  if (lea) skills.push("leadership");
  if (dat) skills.push("databasse management");
  if (res) skills.push("researching and information gathering");
  if (ent) skills.push("entrepreneurship");
  if (bac) skills.push("backend development");
  
  let confidence = [];
  const handleSliderChange = (skill, value) => {
    confidence.push({skill: skill, confidence: value});
  };
 
  
  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    if (activeStep === 2){
      let tempArr = [];
      skills.forEach(i => {
        let temp = 0;
        confidence.forEach(j =>{
          if (i === j.skill && j.confidence > temp)
            temp = j.confidence
        })
        tempArr.push({skill: i, confidence: temp})
        //console.log("skill: ", i, "value: ", temp )
      })
      setConfidenceLevels(tempArr);
    }
    setCompleted(newCompleted);
    handleNext();
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(firstname === "" || lastname === "" || email === ""){
      setAlert({
        open: true,
        message: "Please fill out all the fields for User Credentials",
        type: "error",
      });
      handleReset();
      return;
    } 
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Passwords do not match",
        type: "error",
      });
      handleReset();
      return;
    }
    
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const userRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(
        userRef,
        { ID: id,
          firstname: firstname, 
          lastname: lastname, 
          initials: (firstname[0] + lastname[0].toUpperCase()), 
          email: email, skills: confidenceLevels, 
          groupName: "", 
          degree: degree, 
          status: ["No Group"]
        }
      );
      setAlert({
        open: true,
        message: `Registration Successful. Welcome ${result.user.email}`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      handleReset();
      return;
    }
  };

  const PrettoSlider = styled(Slider)({
    color: '#52af77',
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#52af77',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });

  return (
    <Box sx={{psetingTop: 3, m: 5}}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 && renderSignUp}
      {activeStep === 1 && renderMySkills}
      {activeStep === 2 && <Box>
            <Typography>How confident are you in your skills</Typography>
            <List spacing={2}>
                {skills.map(skill => 
                    <ListItem>
                        {skill}
                        <PrettoSlider
                            valueLabelDisplay="auto"
                            aria-label="pretto slider"
                            onChange={(e) => 
                                handleSliderChange(skill, e.target.value)
                            }
                        />
                    </ListItem>)
                }
            </List>
      </Box>}
      {activeStep === 3 && <Box sx={{m: 10}}>
        <FormControl variant="outlined" style={{color: 'white'}} sx={{width: 250, marginLeft: 5}}>
            <InputLabel style={{color: 'white' }}> Select a Degree</InputLabel>
            <Select
            value={degree}
            onChange={(e)=> setDegree(e.target.value)}
            >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            <MenuItem value="BSc Information Technology">BSc Information Technology</MenuItem>
            <MenuItem value="BSc Computer Science">BSc Computer Science</MenuItem>
            </Select>
        </FormControl>
      </Box>}
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button
                variant="contained"
                size="medium"
                style={{ marginRight: 5, color: 'black', backgroundColor: "#EEBC1D" }}
                onClick={handleSubmit}
              >
                Done
              </Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ ml: 10, mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              { activeStep !== 0 && <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  style={{ marginRight: 5, color: 'black', backgroundColor: "#EEBC1D" }}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
              </Button>}
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }} style={{ marginRight: 5, color: 'black', backgroundColor: "#EEBC1D" }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete} style={{ marginRight: 5, color: 'black', backgroundColor: "#EEBC1D"}}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Finish'
                      : 'Complete Step'}
                  </Button>
                ))} 
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
