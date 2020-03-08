import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import SelectDemoUser from './components/SelectDemoUser';
import AdminHome from './components/admin/index';
import UserHome from './components/user/index';
import Dashboard from './components/admin/Dashboard';
import Projects from './components/admin/Projects';
import Tickets from './components/admin/tickets/Tickets';
import AllTickets from './components/admin/tickets/AllTickets'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/demo-user' component={SelectDemoUser} />
          <Route path='/demo/admin/home/index' component={AdminHome} />
          <Route path='/demo/user/home/index' component={UserHome} />

          <Route path='/demo/admin/dashboard' component={Dashboard} />
          <Route path='/demo/admin/projects' exact component={Projects} />
          <Route path='/demo/admin/tickets' exact component={Tickets} />
          <Route path='/demo/admin/tickets/all' component={AllTickets} />
        </Switch>
      </Router>
    );
  }
}

export default App;
