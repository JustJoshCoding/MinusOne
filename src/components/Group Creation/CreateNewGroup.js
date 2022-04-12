import {
  Typography,
  AppBar,
  Toolbar,
  TextField,
  Button,
  Box
} from "@material-ui/core";
import { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { db } from '../../firebase';
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { ProManageState } from '../../ProManageContext';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root:{
      '& .MuiTextField-root': {
        background: 'white',
        margin: theme.spacing(1),
      },
    },
    button:{
      margin: theme.spacing(1),
    },
    form: {
        marginTop: '20px',
        fontFamily: 'sans-serif',
        textAlign: 'center'
    }
}))

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 18,
    },
  }));

 
export default function CreateNewGroup() {
    const classes = useStyles();
    const { setAlert, groups, userInfo, user } = ProManageState();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [groupName, setGroupName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      if(!groupName || !password || !confirmPassword){
          setAlert({
            open: true,
            message: "Please fill out all fields",
            type: "error",
          });
          return;
        } 
      if (password !== confirmPassword) {
      setAlert({
          open: true,
          message: "Passwords do not match",
          type: "error",
      });
      return;
      }
      
      const groupData = {
          groupName: groupName, 
          password: password,
          logo: groupName[0],
          groupMembers: [userInfo],
          projectName: '',
          projectType: '',
          projectScope: '',
          objectives: [],
          description: '',
          beneficiaries: [],
          Benefits: [],
          stakeHolders: [],
          deliverables: [],
          Duration: 0,
          dateCreated: new Date().toLocaleString()
      }
      const groupRef = collection(db, "Groups" );
      const useRef = doc(db, "users", user.uid);
      try {
      await Promise.all([ addDoc(groupRef, groupData), updateDoc(useRef, {groupName: groupName}) ]);
      setAlert({
          open: true,
          message: `Successfully Created ${groupName}!`,
          type: "success",
      });
      groups.push(groupData)
      } catch (error) {
      setAlert({
          open: true,
          message: error.message,
          type: "error",
      });
      return;
      }
      navigate('/groups');
  };

    return (
        <div className={classes.form}>

        <Typography variant="h5">Enter the information below to create your group</Typography>
        <form className={classes.root}>
            <TextField
            style={{ width: "200px", margin: "5px" }}
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            label="Group Name"
            variant="outlined"
            />
            <br />
            <LightTooltip title="Enter a password for members to join" placement="right-start">
                <TextField
                style={{ width: "200px", margin: "5px" }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                variant="outlined"
                />
            </LightTooltip>
            <br />
            <TextField
            style={{ width: "200px", margin: "5px" }}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            label="Confirm Password"
            variant="outlined"
            />
            <br />
            <Button variant="contained" type="submit" onClick={handleSubmit} color="primary">
                Create
            </Button>
        </form>
        </div>
    );
}
