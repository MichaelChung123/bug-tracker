import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import Login from './components/Login';
import SelectDemoUser from './components/SelectDemoUser';
import Projects from './components/admin/Projects';
import Tickets from './components/admin/tickets/Tickets';
import SideBar from './components/sidebar/Sidebar';
import TopNav from './components/navbar/TopNav';
import Dashboard from './components/admin/Dashboard';

class App extends Component {
  render() {
    return (
      <Router>

        <Route path='/admin'>
          <Container fluid='true'>
            <Row>
              <Col style={{ paddingLeft: '0px', paddingRight: '0px' }} xs={3} sm={3} md={3} lg={3}>
                <SideBar />
              </Col>
              <Col style={{ paddingLeft: '0px' }} xs={9} sm={9} md={9} lg={9}>
                <TopNav />
                <Container className='main-content' fluid='true'>
                  <Route path='/admin/dashboard' component={Dashboard} />
                  <Route path='/admin/tickets/all' component={Tickets} />
                  <Route path='/admin/projects/all' component={Projects} />
                  {/* <Route path='/admin/projects/create' component={Projects} />
                  <Route path='/admin/logout' component={Projects} /> */}
                </Container>
              </Col>
            </Row>
          </Container>
        </Route>

        <Route path='/' exact component={Login} />
        <Route path='/demo-user' component={SelectDemoUser} />

      </Router>
    );
  }
}

export default App;
