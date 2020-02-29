import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import SelectDemoUser from './components/SelectDemoUser';
import AdminHome from './components/admin/index';
import UserHome from './components/user/index';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path='/' exact component={Login} />
          <Route path='/demo-user' component={SelectDemoUser} />
          <Route path='/demo/admin/home/index' component={AdminHome} />
          <Route path='/demo/user/home/index' component={UserHome} />
        </div>
      </Router>
    );
  }
}

export default App;
