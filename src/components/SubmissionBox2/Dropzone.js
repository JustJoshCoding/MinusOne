import React, { useCallback, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { storage, db } from '../../firebase';
import { ref, getDownloadURL, uploadBytes } from '@firebase/storage';
import { addDoc, collection, updateDoc, doc, serverTimestamp, arrayUnion } from 'firebase/firestore';



const Dropzone = () => {

    const [selectedImages, setSelectedImages] = useState([])
    const captionRef = useRef(null)
    const titleRef = useRef(null)
    const uploadPost = async()=>{
      const docRef = await addDoc(collection(db, 'Timeline2'),{
        caption:captionRef.current.value,
        title:titleRef.current.value,
        timestamp:serverTimestamp()
      })
      await Promise.all(
        selectedImages.map(image=>{
          const imageRef = ref(storage, `Timeline2/${docRef.id}/${image.path}`); 
          uploadBytes(imageRef, image, "data_url").then(async()=>{
            const downloadURL = await getDownloadURL(imageRef)
            await updateDoc(doc(db, "Timeline2", docRef.id),{
              images:arrayUnion(downloadURL)  
            })
          })
        })  
      )
      captionRef.current.value=''
      titleRef.current.value=''
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
        
        <div {...getRootProps()}>
          <input  {...getInputProps()}  />
          <p>Drag 'n' drop some files here, or click to select files</p>    
        </div>

        <input ref={titleRef} type='text' placeholder='Enter Title'/> <br/>
        <input ref={captionRef} type='text' placeholder='Enter Description'/><br/>
        <button onClick={uploadPost}>Post</button>
          {selected_images}
        </div>
      )
}

export default Dropzone