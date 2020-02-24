// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import Contacts from './components/contacts';
import React, { Component } from 'react';

class App extends Component {
  state = {
    testData: []
  }

  componentDidMount() {
    fetch('/ping')
      .then(res => res.json())
      .then(data => this.setState({ testData: data }));
  }

  render() {
    return (
      <div>
        <h1>Test Data:</h1>
        <ul>
          {this.state.testData.map(user =>
            <li key={user.id}>{user.payload}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
