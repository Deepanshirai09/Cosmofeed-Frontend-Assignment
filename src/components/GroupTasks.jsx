import React from "react";
import { Form, Col } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setGroupBy } from "../redux/slices/taskSlice";
const GroupTasks=()=>{
    
    const [groupTask,setGroupTask]=useState('none');
    const dispatch =  useDispatch()
    const handleChange=(e)=>{
        setGroupTask(e.target.value)
        dispatch(setGroupBy(e.target.value))
    }
    return (
        <>
        <Form.Group as={Col}  controlId="taskGroup">
          <Form.Control
            as="select"
            name="taskGroup"
            required
            value={groupTask}
            onChange={handleChange}
          >
            <option value="none" disabled>Group tasks by</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
            <option value="CreatedOn">Created On</option>
            <option value="dueDate">Due Date</option>
            
          </Form.Control>
        </Form.Group>
        </>
    );
}


export default GroupTasks;