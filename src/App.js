import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import Login from './components/Login';
import SelectDemoUser from './components/SelectDemoUser';
import AdminHome from './components/admin/index';
import UserHome from './components/user/index';
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
                <Container className='main-content' fluid='true'>
                  <TopNav />
                  <Route path='/admin/dashboard' component={Dashboard} />
                  <Route path='/admin/tickets/all' component={Tickets} />
                  <Route path='/admin/projects/all' component={Projects} />
                </Container>
              </Col>
            </Row>
          </Container>
        </Route>

        <Route path='/' exact component={Login} />
        <Route path='/demo-user' component={SelectDemoUser} />

      </Router>

      // <Router>
      //   <Switch>
      //     <Route path='/' exact component={Login} />
      //     <Route path='/demo-user' component={SelectDemoUser} />
      //     <Route path='/demo/admin/home/index' component={AdminHome} />
      //     <Route path='/demo/user/home/index' component={UserHome} />

      //     <Route path='/demo/admin/dashboard' component={Dashboard} />
      //     <Route path='/demo/admin/projects' exact component={Projects} />
      //     <Route path='/demo/admin/tickets' exact component={Tickets} />
      //     <Route path='/demo/admin/tickets/all' component={AllTickets} />
      //   </Switch>
      // </Router>
    );
  }
}

export default App;
