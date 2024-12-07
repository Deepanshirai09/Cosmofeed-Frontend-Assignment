import React from 'react';
import { useSelector,useDispatch} from 'react-redux';
import { openModal } from '../redux/slices/modalSlice';
import { deleteTask, updateTask, setSortBy,updateSortOrder } from '../redux/slices/taskSlice';
import { Table,Button,Form } from 'react-bootstrap';
import { MdEdit } from "react-icons/md";
import { RiDeleteBin7Fill } from "react-icons/ri";
import moment from "moment";


const TaskList=({type})=>{

  const dispatch=useDispatch();
  
  let tasks=useSelector((state)=>state.tasks.tasks);
  const filteredTasks = useSelector((state)=> state.tasks.filteredTasks);
  const searchQuery = useSelector((state) => state.tasks.searchQuery);
  const isOrderAsc=useSelector((state)=>state.tasks.isOrderAsc);
  if(type==='completed'){
    tasks=tasks.filter((task)=>{return task.isCompleted});
  }else if(type==='pending'){
    tasks=tasks.filter((task)=>{return !task.isCompleted});
  }
  tasks=filteredTasks.length>0? filteredTasks: tasks;
  //filter tasks here
  const formatDate=(date)=>{
    return moment(date).format("Do MMM YYYY");
  }

  const handleEdit=(id)=>{


    const currentTask=tasks.filter((task)=>{return task.id===id})[0];

    //open modal
    dispatch(openModal(currentTask));


  }

  const handleDelete=(id)=>{
    
    // eslint-disable-next-line no-restricted-globals
    const isConfirm=confirm("Are you sure you want to delete this task?");

    if(!isConfirm){
      return;
    }

    dispatch(deleteTask(id));
  }


  const handleMarkOpen=(id)=>{

    const currentTask=tasks.filter((task)=>{return task.id===id})[0];
    const updatedTask = { ...currentTask, isCompleted: false };
    dispatch(updateTask(updatedTask));
  }


  const handleMarkClose=(id)=>{

    const currentTask=tasks.filter((task)=>{return task.id===id})[0];

    const updatedTask = { ...currentTask, isCompleted: true };
    dispatch(updateTask(updatedTask));
  }

  const handleSorting=(key)=>{
    dispatch(updateSortOrder({isOrderAsc : !isOrderAsc}));
    dispatch(setSortBy({key}));

  }
  const highlightText = (text, searchQuery) => {
    if (!searchQuery) return text;

    const regex = new RegExp(`(${searchQuery})`, 'gi');
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span>
      ) : (
        part
      )
    );
  };
 
  return (
    <Table   bordered hover >
      <thead>
        <tr>
          <th>S.No</th>
          <th onClick={()=>handleSorting('title')}>Title</th>
          <th onClick={()=>handleSorting('priority')}>Priority</th>
          <th onClick={()=>handleSorting('createdOn')}>Created On</th>
          <th onClick={()=>handleSorting('dueDate')}>Due Date</th>
          <th>Actions</th>
          <th>Select</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task,index)=>(
                  <tr>
                  <th>{index+1}</th>
                  <td>{highlightText(task.title, searchQuery)}</td>
                  <td>{highlightText(task.priority, searchQuery)}</td>
                  <th>{formatDate(task.createdOn)}</th>
                  <th>{formatDate(task.dueDate)}</th>
                  <th className='task-action-container'>
                    <MdEdit onClick={() => handleEdit(task.id)} />
                    <RiDeleteBin7Fill onClick={() => handleDelete(task.id)} />
                    <Button variant='outline-warning' hidden={!task.isCompleted} onClick={()=>handleMarkOpen(task.id)}>Mark as open</Button>
                    <Button variant='outline-success' hidden={task.isCompleted} onClick={()=>handleMarkClose(task.id)}>Mark as closed</Button>
                  </th>
        
                  <Form.Check
                    type='checkbox'
                  />
                  
                </tr>

        ))}

        
      </tbody>
    </Table>
  )
}
export default TaskList;
