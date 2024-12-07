import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../redux/slices/taskSlice';
import '../styles/components.css';

import { InputGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
const GlobalSearch = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(state => state.tasks.searchQuery);

  const handleSearch = e => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
      <>
        <InputGroup className='mb-3' >
   
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder='Search tasks...'
          onChange={handleSearch}
          minLength={3}
          maxLength={15}
        />
        </InputGroup>
      {/* <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={handleSearch}
      /> */}
      </>
      

  );
};

export default GlobalSearch;
