import { FaTimes } from 'react-icons/fa'
import { ProManageState } from '../../../ProManageContext'

const Task = ({ task, onDelete, onToggle }) => {
  const {userInfo} = ProManageState();
  return (
    <div
      className={`task ${task.reminder && 'reminder'}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}{' '} 
        {userInfo?.isAdmin && <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(task.id)}
        />}
      </h3>
      <p>{task.day}</p>
      <a href={task.link}>{task.link}</a>
    </div>
  )
}

export default Task
