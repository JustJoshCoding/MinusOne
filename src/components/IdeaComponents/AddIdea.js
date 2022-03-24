import { useState } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { makeStyles } from "@material-ui/core";
import { ProManageState } from '../../ProManageContext';
import { db } from '../../firebase';
import { addDoc, collection } from "firebase/firestore";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FormControl, InputLabel } from "@mui/material";

const useStyles = makeStyles((theme) => ({
    Form: {
        flex: 1,
        backgroundColor: theme.palette.background.paper,
    },
    Name: {
        padding: 24,
        paddingTop: 0,
        display: "flex",
        gap: 20,
    },
    Description: {
        padding: 24,
        paddingTop: 0,
        display: "flex",
        gap: 20,
    },
    Select: {
        padding: 24,
        paddingTop: 0,
        display: "flex",
        gap: 20,
    },
    Btn: {
        padding: 24,
        paddingTop: 0,
        display: "flex",
        gap: 20,
    }
}));

const AddIdea = () => {
    const classes = useStyles();
    const { setAlert, availIdeas, setAvailIdeas } = ProManageState();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    
    const addToAvailIdeas = async (e) => {
        e.preventDefault()
        if (!name || !description || !type) {
            setAlert({
                open: true,
                message: 'Please fill all fields',
                type: "error",
            });
            return
        }
        const ideaRef = collection(db, "Available Ideas");
        const newData = {name: name, description: description, type: type};
        availIdeas.push(newData);
        try {
        await addDoc(
            ideaRef,
            newData
        );
        setAlert({
            open: true,
            message: `${name} Added to the Available Ideas!`,
            type: "success",
        });
        } catch (error) {
        setAlert({
            open: true,
            message: error.message,
            type: "error",
        });
        }
    };

    return (
        <Box component = 'form' className={classes.Form}>
            <div className={classes.Name}>
                <TextField 
                    id="ideaName" 
                    label="Name of Idea" 
                    variant="standard"
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                />
            </div>
            <div className={classes.Description}>
                <TextField 
                    id="ideaDescription"
                    value={description}
                    label="Description"
                    variant="standard"
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                />
            </div>
            <div className={classes.Select}>
                <FormControl sx={{ width: 'auto', minWidth: '20%'}}>
                    <InputLabel id="myTypeLabel">Type</InputLabel>
                    <Select
                        id="type"
                        labelId="myTypeLabel"
                        label="Type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        >
                        <MenuItem value="Technical Computer Science or Information Technology Projects"> 
                            Technical Computer Science or Information Technology Projects
                        </MenuItem>
                        <MenuItem value="Business-Oriented Computer Science or Information Technology Projects">
                            Business-Oriented Computer Science or Information Technology Projects
                        </MenuItem>
                        <MenuItem value="Research Projects">
                            Research Projects
                        </MenuItem>
                        <MenuItem value="Entrepreneurial or Student-Proposed Projects">
                            Entrepreneurial or Student-Proposed Projects
                        </MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className={classes.Btn}>
            <Button
                variant="contained"
                style={{
                width: 85,
                height: 40,
                marginLeft: 15,
                color: "black",
                backgroundColor: "#EEBC1D",
                }}
                onClick = {addToAvailIdeas}
            >
                Add
            </Button>
            </div>
        </Box>
    )
}

export default AddIdea