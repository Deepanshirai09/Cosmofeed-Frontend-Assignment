import React from 'react';
import { Modal, Button, Form , Row, Col,Spinner} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../redux/slices/modalSlice';
import { addTask, updateTask } from '../redux/slices/taskSlice';
import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; 

function TaskModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);
  const currentTask=useSelector((state)=>state.modal.formData);


  const handleClose = () => {
    //setting values to default before closing
    setFormData({title :'',description :'',priority:'none',dueDate:''});
    setIsSaving(false);
    dispatch(closeModal());
  };

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'none',
    dueDate: ''
  });

  const [isSaving,setIsSaving]=useState(false);
  const [isEdit,setIsEdit]=useState(false);

    // Update formData when currentTask changes
    useEffect(() => {
      if (currentTask.id) {
        setFormData(currentTask); // Prefill formData with currentTask data
        setIsEdit(true);
      }
    }, [currentTask]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle change in the rich text editor
  const handleDescriptionChange = value => {
    setFormData({ ...formData, description: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted', formData);
  };


  const getRandomId=()=>{
    return Math.floor(10000 + Math.random() * 90000);
  }
  
  const handleSave = (e) => {
  
    // eslint-disable-next-line no-restricted-globals
    const isConfirm = confirm(`Are you sure you want to ${isEdit ? "update" :"add"} this task?`);
  
    if (!isConfirm) {
      return; // Exit if the user cancels the action
    }
  
    // Showing loader
    setIsSaving(true);
  
    setTimeout(() => {
      
      if(isEdit){

        //updating
        dispatch(updateTask({...formData,id:currentTask.id,createdOn:currentTask.createdOn,isCompleted:currentTask.isCompleted}));
        // Showing alert
        alert("Task updated successfully!");

      }else{

        // Saving the task
        dispatch(addTask({...formData,createdOn:new Date(),id:getRandomId(),isCompleted:false}));
        // Showing alert
        alert("Task added successfully!");
      }
  
      
  
      // Closing modal
      handleClose();
  
      // Resetting the loader state
      setIsSaving(false);
    }, 1000);
  };


  


  return (
    <Modal show={isOpen} onHide={handleClose} centered size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? "Update Task" :"Add Task"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task title"
            name="title"
            minLength={10}
            maxLength={140}
            required
            autoFocus
            value={formData.title}
            onChange={handleChange}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
  <Form.Group as={Col} controlId="formDescription">
    <Form.Label>Description</Form.Label>
    <ReactQuill
      value={formData.description}
      onChange={handleDescriptionChange}
      placeholder="Description (max 500 chars)"
      modules={{
        toolbar: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['bold', 'italic', 'underline'],
          [{ align: [] }],
          ['link'],
          ['blockquote'],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ direction: 'rtl' }],
        ],
      }}
      formats={[
        'header', 'font', 'list', 'bold', 'italic', 'underline',
        'align', 'link', 'blockquote', 'script', 'indent', 'direction',
      ]}
     
    />
  </Form.Group>
</Row>


      <Row className="mb-3">
        <Form.Group as={Col} controlId="formPriority">
          <Form.Label>Priority</Form.Label>
          <Form.Control
            as="select"
            name="priority"
            required
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="none">None</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Form.Control>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formDueDate">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            name="dueDate"
            value={formData.dueDate}
            required
            onChange={handleChange}
          />
        </Form.Group>
      </Row>
    </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" hidden={isSaving || isEdit} onClick={handleSave}>
          Save
        </Button>
        <Button variant='primary' hidden={isSaving || !isEdit} onClick={handleSave}>
          Update
        </Button>
        <Button variant="primary" hidden={!isSaving} >
        <Spinner animation="border" role="status" size='sm'>
    </Spinner>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TaskModal;
