import { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  addForm: {
    marginBottom: '40px'
  },
  formControl: {
    margin: '20px 0'
  },
  formControlCheck: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btn: {
    display: 'inline-block',
    background: '#000',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    margin: '5px',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: '15px',
    fontFamily: 'inherit'
  }
}));

const AddEvent = ({ onAdd }) => {
  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)
  const classes = useStyles();

  const onSubmit = (e) => {
    e.preventDefault()

    if (!text) {
      alert('Please add a task')
      return
    }

    onAdd({ text, day, reminder })

    setText('')
    setDay('')
    setReminder(false)
  }

  return (
    <form className={classes.addForm} onSubmit={onSubmit}>
      <div className={classes.formControl}>
        <label>Task</label>
        <input
          type='text'
          placeholder='Add Task'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className={classes.formControl}>
        <label>Day & Time</label>
        <input
          type='text'
          placeholder='Add Day & Time'
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className={classes.formControlCheck}>
        <label>Set Reminder</label>
        <input
          type='checkbox'
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>

      <input type='submit' value='Save Task' className={classes.btn} />
    </form>
  )
}

export default AddEvent
