import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGroupBy, setSortBy } from '../redux/slices/taskSlice';
import '../styles/components.css';

const Tabs = () => {
  const dispatch = useDispatch();
  const { groupBy, sortBy } = useSelector(state => state.tasks);

  const handleGroupChange = e => {
    dispatch(setGroupBy(e.target.value));
  };

  const handleSortChange = e => {
    dispatch(setSortBy(e.target.value));
  };

  return (
    <div className="tabs-container">
      <select value={groupBy} onChange={handleGroupChange}>
        <option value="none">No Grouping</option>
        <option value="priority">Group by Priority</option>
        <option value="status">Group by Status</option>
      </select>

      <select value={sortBy} onChange={handleSortChange}>
        <option value="createdAt">Sort by Created Date</option>
        <option value="dueDate">Sort by Due Date</option>
        <option value="priority">Sort by Priority</option>
      </select>
    </div>
  );
};

export default Tabs;
