import React, { useState } from 'react'
import { Container } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const useStyles = makeStyles((theme) => ({
  root:{
    '& .MuiTextField-root': {
      background: 'white',
      margin: theme.spacing(1),
    },
  },
  button:{
    margin: theme.spacing(1),
  }

  
}))


function GroupForm() {
  const classes = useStyles();
  const [inputField, setInputField] = useState([
    { firstName: "", lastName: "", email: "" }
  ]);

  const handleChangeInput = (index, event) =>{
    const values = [...inputField];
    values[index][event.target.name] = event.target.value;
    setInputField(values);
  } 

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log("InputField", inputField)
  }
 
  const handleAddFields = () => {
    setInputField([...inputField, { firstName: '', lastName: '', email: '' }])
  }

  const handleRemoveFields = id => {
    const values  = [...inputField];
    values.splice(values.findIndex(value => value.id === id), 1);
    setInputField(values);
  }

  return (
    <Container>
      <h1>GroupForm</h1>

      <form className={classes.root} onSubmit={handleSubmit}>
        { inputField.map((inputField, index) => (
          <div key={index}>
            <TextField 
              name='firstName'
              label='First Name'
              variant='filled'
              value={inputField.firstName}
              onChange={event => handleChangeInput(index, event)}
            />
            <TextField 
              name='lastName'
              label='Last Name'
              variant='filled'
              value={inputField.lastName}
              onChange={event => handleChangeInput(index, event)}
            />  
            <TextField 
              name='email'
              label='Email'
              variant='filled'
              value={inputField.email}
              onChange={event => handleChangeInput(index, event)}
            />
            <IconButton disabled={inputField.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
              <RemoveIcon style={{ color: 'white' }}/>
            </IconButton>
            <IconButton onClick={handleAddFields}>
              <AddIcon style={{ color: 'white' }}/>
            </IconButton>
          </div>
        )) }
        <Button
        className={classes.button} 
        variant="contained" 
        color="primary" 
        type="submit"
        onClick={handleSubmit}
        >Submit</Button>
      </form>
    </Container>
    
  )
}

export default GroupForm