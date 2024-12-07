import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTaskState, deleteTask } from '../redux/slices/taskSlice';
import '../styles/components.css';

const Actions = ({ task }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const handleToggleState = () => {
    dispatch(toggleTaskState(task.id));
  };

  return (
    <div className="task-actions">
      <button onClick={handleToggleState}>
        {task.done ? 'Reopen' : 'Mark as Done'}
      </button>
      <button onClick={handleDelete}>Delete Task</button>
    </div>
  );
};

export default Actions;
