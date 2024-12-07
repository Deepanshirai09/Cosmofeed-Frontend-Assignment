import React from "react";
import { Tab,Tabs,Container,Col,Row } from "react-bootstrap";
import GroupTasks from "./GroupTasks";
import TaskList from "./TaskList";
import GlobalSearch from "./GlobalSearch";
import AddTask from "./AddTask";
import TaskModal from "./TaskModal";
const TaskTabs=()=>{


    return (

        <>
        <Tabs
      defaultActiveKey="all-tasks"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="all-tasks" title="All Tasks">
      <Container className='mt-3 mb-5'>
          <Row className='mx-0 d-flex justify-content-between' >
            <Col md="6" >
              <GlobalSearch />
            </Col>
            <Col md="3">
            <GroupTasks/>
            </Col>
            <Col md="3">
            <AddTask />
            <TaskModal/>
            </Col>
          </Row>
        </Container>
       
        <TaskList type="all"/>
      </Tab>
      <Tab eventKey="pending" title="Pending">
      <Container className='mt-3 mb-5'>
          <Row className='mx-0 d-flex justify-content-between' >
            <Col md="6" >
              <GlobalSearch />
            </Col>
            <Col md="3">
            <GroupTasks/>
            </Col>
            <Col md="3">
            <AddTask />
            <TaskModal/>
            </Col>
          </Row>
        </Container>
       
        <TaskList type="pending"/>
      </Tab>
      <Tab eventKey="completed" title="Completed">
      <Container className='mt-3 mb-5'>
          <Row className='mx-0 d-flex justify-content-between' >
            <Col md="6" >
              <GlobalSearch />
            </Col>
            <Col md="3">
            <GroupTasks/>
            </Col>
            <Col md="3">
            <AddTask />
            <TaskModal/>
            </Col>
          </Row>
        </Container>
       
        <TaskList type="completed"/>
      </Tab>
    </Tabs>
        </>
    )
}


export default TaskTabs;