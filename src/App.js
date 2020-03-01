import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import SelectDemoUser from './components/SelectDemoUser';
import AdminHome from './components/admin/index';
import UserHome from './components/user/index';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/sidebar/NavigationBar';
import { Home } from './components/Home';
import { About } from './components/About';
import { NoMatch } from './components/NoMatch';
import Sidebar from './Sidebar';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/demo-user' component={SelectDemoUser} />
          <Route path='/demo/admin/home/index' component={AdminHome} />
          <Route path='/demo/user/home/index' component={UserHome} />
        </Switch>
      </Router>
      // <React.Fragment>
      //   <Router>
      //     <NavigationBar />
      //     <Sidebar />
      //     <Switch>
      //       <Route exact path="/" component={Home} />
      //       <Route path="/about" component={About} />
      //       <Route component={NoMatch} />
      //     </Switch>
      //   </Router>
      // </React.Fragment>
    );
  }
}

export default App;
