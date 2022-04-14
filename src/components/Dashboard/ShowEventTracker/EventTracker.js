import { useState, useEffect } from 'react';
import Header from './Header';
import Tasks from './Tasks';
import "./styles.css";
import AddEvent from './addEvent';
import { makeStyles } from "@material-ui/core/styles";

import { db } from "../../../firebase";
import { getDocs, collection, setDoc, doc, getDoc, addDoc, deleteDoc, } from 'firebase/firestore';
import { ProManageState } from '../../../ProManageContext';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '500px',
    margin: '30px auto',
    overflow: 'auto',
    minHeight: '300px',
    padding: '30px',
    borderRadius: '5px',
  }
}));

const EventTracker = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  const classes = useStyles();
  const { setAlert, userInfo } = ProManageState();


  const getTasks = async () => {
    const eventsRef = collection(db, "Events");
    const data = await getDocs(eventsRef);
    if (data) {
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    else {
      console.log("No Events");
    }
  }


  useEffect(() => {
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Fetch Task
  const fetchTask = async (id) => {
    const eventRef = doc(db, "Events", id);
    const eventSnap = await getDoc(eventRef);
    return eventSnap.data();
  }

  // Add Task
  const addTask = async (event) => {
    await addDoc(collection(db, "Events"), 
      event
    );
    getTasks();
    setTasks([...tasks, event]);
  }

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "Events", id));
      setAlert({
        open: true,
        message: `Deleted ${id}` ,
        type: "success",
      });
      setTasks(tasks.filter((task) => task.id !== id))
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    const eventRef = doc(db, "Events", id);
    await setDoc(eventRef, 
      updTask
    );

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !taskToToggle.reminder } : task
      )
    )
  }

  return (
      <div className={classes.container}>
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <div>
          {showAddTask && userInfo?.isAdmin && <AddEvent onAdd={addTask} />}
          {tasks.length > 0 ? (
            <Tasks
              tasks={tasks}
              onDelete={deleteTask}
              onToggle={toggleReminder}
            />
          ) : (
            'No Upcomming Events'
          )}
        </div>
      </div>
  )
}

export default EventTracker
