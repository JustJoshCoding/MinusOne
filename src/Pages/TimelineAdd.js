import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { db } from '../firebase';
import { addDoc, collection } from "firebase/firestore";
import { ProManageState } from '../ProManageContext';
import { useNavigate } from "react-router-dom";


const theme = createTheme({
    typography: {
      fontFamily: 'Arial',
      fontSize: 12,
    },
  });


export default function TimelineAdd() {

    const navigate = useNavigate();

    const { setAlert, timeline } = ProManageState();
    const [title, setTimelineTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!title || !description){
            setAlert({
              open: true,
              message: "Please fill out all fields",
              type: "error",
            });
            return;
          }

        const timelineData = {
            title: title, 
            description: description,
            dateCreated: new Date().toLocaleString(),
        } 

        const timelineRef = collection(db, "Timeline" );

            try {
            await Promise.all([ addDoc(timelineRef, timelineData)]);
            setAlert({
                open: true,
                message: `Successfully Added ${title}!`,
                type: "success",
            });
            timeline.push(timelineData)
            } catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: "error",
            });
            return;
            }
            navigate('/dashboard');
        }


  return (
    <ThemeProvider theme={theme}>
        <Box>
        <Card>                
                    <CardContent>
                        <Typography variant='h4'>Title:</Typography>
                        <br/>
                        <TextField
                            variant="filled"
                            type="text"
                            label="Timeline Title"
                            value={title}
                            onChange={(e) => setTimelineTitle(e.target.value)}
                            style={{width: 400, marginLeft: 40, marginTop: 5}}
                        />
                        <br/><br/>
                        
                        <Typography variant='h4'>Description:</Typography>
                        <br/>
                        <TextField
                            variant="filled"
                            multiline
                            type="text"
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{width: 800, marginLeft: 40, marginTop: 5, paddingBottom: 50}}
                            rows={10}
                        />

                    </CardContent>
                    <CardActions>
                        <Button 
                        size="large"
                        variant="contained"
                        style={{
                        marginLeft: '50px',
                        backgroundColor: "#EEBC1D",
                        }}
                        onClick={handleSubmit}
                        >
                            Add
                        </Button>
                    </CardActions>
        
                    

                </Card>
        </Box>   
   
    </ThemeProvider>
  );
}
