import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import SelectDemoUser from './components/SelectDemoUser';
import AdminHome from './components/admin/index';
import UserHome from './components/user/index';
import Dashboard from './components/admin/Dashboard';
import Projects from './components/admin/Projects';
import Tickets from './components/admin/Tickets';

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
          <Route path='/demo/admin/projects' component={Projects} />
          <Route path='/demo/admin/tickets' component={Tickets} />
        </Switch>
      </Router>
    );
  }
}

export default App;
