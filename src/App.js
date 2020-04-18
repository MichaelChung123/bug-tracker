import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import Login from './components/Login';
import SelectDemoUser from './components/SelectDemoUser';
import Projects from './components/admin/projects/Projects';
import ProjectDetails from './components/admin/projects/ProjectDetails';
import Tickets from './components/admin/tickets/Tickets';
import TicketDetails from './components/admin/tickets/details/TicketDetails';
import CreateTickets from './components/admin/tickets/CreateTickets';
import SideBar from './components/sidebar/Sidebar';
import TopNav from './components/navbar/TopNav';
import Dashboard from './components/admin/Dashboard';
import ScrollToTop from './components/ScrollToTop';
import About from './components/About';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  render() {
    return (
      <Router>
        <ScrollToTop>
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
                    <Route path='/admin/about' component={About} />
                    <Route path='/admin/tickets/all' component={Tickets} />
                    <Route path='/admin/tickets/create' component={CreateTickets} />
                    <Route path='/admin/projects/all' component={Projects} />
                    <Route exact path='/admin/projects/details/:id' component={(appProps) => <ProjectDetails appProps={appProps} />} />
                    <Route exact path='/admin/tickets/details/:id' component={(appProps) => <TicketDetails appProps={appProps} />} />
                  </Container>
                </Col>
              </Row>
            </Container>
          </Route>

          <Route path='/' exact component={Login} />
          <Route path='/demo-user' component={SelectDemoUser} />
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
