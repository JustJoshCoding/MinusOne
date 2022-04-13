import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { makeStyles,Grid } from '@material-ui/core';
import { storage, db } from '../../firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { addDoc, collection, updateDoc, doc, arrayUnion } from 'firebase/firestore'

 
const useStyles = makeStyles((theme) => ({
  dropzone: {
    border: `2px dashed ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.background.default,
    height: theme.spacing(10),
    outline: 'none',
  },
}));

const Dropzone = () => {
    const classes = useStyles();
    const  [selectedImages, setSelectedImages] = useState([])

    const uploadPost = async() =>{
      const docRef = await addDoc(collection(db, 'Timeline'))

      await Promise.all(
        selectedImages.map(image=>{
        const imageRef = ref(storage, `Timeline/${docRef.id}/${image.path}`);
        uploadBytes(imageRef, image, 'data_url').then(async()=>{
          const downloadURL = await getDownloadURL(imageRef)
          await updateDoc(doc(db,'Timeline',docRef.id),{
            images:arrayUnion(downloadURL)
          })
        })
      })
    )

    setSelectedImages([])

    }











    const onDrop = useCallback(acceptedFiles => {
        setSelectedImages(acceptedFiles.map(file=>
          Object.assign(file,{
            preview:URL.createObjectURL(file)
          })
        ))
      }, [])
      const {getRootProps, getInputProps} = useDropzone({onDrop})
      const selected_images = selectedImages?.map(file=>(
        <div>
          <img src={file.preview} style={{width:'200px'}} alt=''/> 
        </div>
      ))
      return (
        <div>
        <Grid>
        <div {...getRootProps()}>
          <input {...getInputProps()} />

          <p>Drag 'n' drop some files here, or click to select files</p>    
        </div>
        </Grid>
          {selected_images}
        </div>
      )
}

export default Dropzone