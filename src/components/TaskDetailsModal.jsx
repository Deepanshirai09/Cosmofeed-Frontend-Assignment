import React from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTaskState } from '../redux/slices/taskSlice';
import '../styles/components.css';

const TaskDetailsModal = ({ isOpen, onRequestClose, task }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    onRequestClose();
  };

  const handleToggleState = () => {
    dispatch(toggleTaskState(task.id));
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="task-modal" overlayClassName="modal-overlay">
      {task && (
        <>
          <h2>Task Details</h2>
          <p><strong>Title:</strong> {task.title}</p>
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>Priority:</strong> {task.priority}</p>
          <p><strong>Due Date:</strong> {task.dueDate || 'N/A'}</p>
          <p><strong>Status:</strong> {task.done ? 'Completed' : 'Pending'}</p>

          <div className="task-actions">
            <button onClick={handleToggleState}>
              {task.done ? 'Reopen' : 'Mark as Done'}
            </button>
            <button onClick={handleDelete}>Delete Task</button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default TaskDetailsModal;
