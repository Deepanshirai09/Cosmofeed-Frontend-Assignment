import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { bulkAction } from '../redux/slices/taskSlice';
import '../styles/components.css';

const BulkActions = ({ selectedTasks }) => {
  const dispatch = useDispatch();
  const [actionType, setActionType] = useState('toggle');

  const handleBulkAction = () => {
    dispatch(bulkAction({ ids: selectedTasks, actionType }));
  };

  return (
    <div className="bulk-actions">
      <select onChange={(e) => setActionType(e.target.value)} value={actionType}>
        <option value="toggle">Mark as Done/Reopen</option>
        <option value="delete">Delete</option>
      </select>
      <button onClick={handleBulkAction}>Apply</button>
    </div>
  );
};

export default BulkActions;
