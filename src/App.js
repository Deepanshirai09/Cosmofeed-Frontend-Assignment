import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import TaskTabs from './components/TaskTabs';

import './styles/index.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Provider store={store}>
      <Container>
        <h1 className='text-center mt-3'>Task Manager</h1>
        <Container className='mt-5'>

          <Row>
            <TaskTabs/>
          </Row>
        </Container>

       
      </Container>
    </Provider>
  );
};

export default App;
