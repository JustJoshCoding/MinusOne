import { useState, useCallback, useRef } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { db } from '../firebase';
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import Submission from './Submission.tsx';
import { ProManageState } from '../ProManageContext';
import { useNavigate } from "react-router-dom";
import Dropzone from 'react-dropzone';
import { getDownloadURL, uploadBytes, ref  } from 'firebase/storage';
import { storage } from '../firebase';
import { useDropzone } from 'react-dropzone';
import { async } from '@firebase/util';
import firebaseConfig from '../config/firebaseConfig';
import "firebase/storage";



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
    const [selectedImages, setSelectedImages] = useState([])

    const [file, setFile] = useState(null)

    const onFileChange = (e) =>{
        setFile(e.target.files[0])
    }

    // const onUpload = async() => {
    //     const storageRef = storage.ref()
    //     const fileRef = storageRef.child(file.name)
    //     await fileRef.put(file)

    //     db.collection("Timeline").doc(timeline)
    // }


    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const [progress, setProgress] = useState(0);
    
    const handleChange = e => {
        if (e.target.files[0]) {
          setImages(e.target.files[0]);
        }
      };

      const handleUpload = () => {
        const uploadTask = storage.ref(`Timeline/${images.name}`).put(images);
        uploadTask.on(
          "state_changed",
          snapshot => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          error => {
            console.log(error);
          },
          () => {
            storage
              .ref("Timeline")
              .child(images.name)
              .getDownloadURL()
              .then(url => {
                setUrls(url);
              });
          }
        );
      };


    

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
            selectedImages: selectedImages
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



                        {/* <input type='file' onChange={handleChange}/>
                        <button onClick = {handleUpload}>Upload File</button> */}
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
