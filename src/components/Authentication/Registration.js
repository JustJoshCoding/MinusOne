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

const steps = ['User Credentials', 'My Skills'];


export default function HorizontalNonLinearStepper({ handleClose }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
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

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const {renderSignUp, firstname, lastname, email, password, confirmPassword} = Signup();
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Passwords do not match",
        type: "error",
      });
      return;
    }
    
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const userRef = doc(db, "users", auth.currentUser.uid);
      const skills = {
        docu: docu, web: web, css: css, pro: pro, lea: lea, dat: dat, res: res, ent: ent, bac: bac, 
      }
      await setDoc(
        userRef,
        { firstname: firstname, lastname: lastname, initials: firstname[0] + lastname[0], email: email, skills: skills},
        { merge: true }
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
      return;
    }
  };

  return (
    <Box sx={{paddingTop: 3, m: 5}}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit">
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 && renderSignUp}
      {activeStep === 1 && renderMySkills}
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
              <Box sx={{ flex: '1 1 auto' }} />
                {activeStep === 0 ? (
                <React.Fragment>
                  <Button
                      variant="contained"
                      size="medium"
                      style={{ marginRight: 5, color: 'black', backgroundColor: "#EEBC1D" }}
                      onClick={handleComplete}
                      >
                      Next
                    </Button>
                </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Button
                      variant="contained"
                      size="medium"
                      style={{ marginRight: 5, color: 'black', backgroundColor: "#EEBC1D" }}
                      onClick={handleComplete}
                      >
                      Next
                    </Button>
                  </React.Fragment>
                )} 
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
