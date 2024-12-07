import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { openModal } from '../redux/slices/modalSlice';

const AddTask=()=>{

    const dispatch = useDispatch();

    const handleOpenModal = () => {
        dispatch(openModal());
      };

    return (
        <>
        <Button variant="primary" onClick={handleOpenModal}>Add Task</Button>
        </>
    );
}


export default AddTask;