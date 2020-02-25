import React from 'react'
import Footer from './components/Footer'
import AddTodo from './containers/AddTodo'
import VisibleTodoList from './containers/VisibleTodoList'
const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)
export default App


// import React, { Component } from 'react';

// class App extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       testData: [],
//       users: []
//     }
//   }

//   componentDidMount() {
//     fetch('/ping')
//       .then(res => res.json())
//       .then(data => this.setState({ testData: data }));

//     fetch('/users')
//       .then(res => res.json())
//       .then(data => this.setState({ users: data }));
//   }

//   render() {
//     return (
//       <div>
//         <h1>Test Data:</h1>
//         <ul>
//           {this.state.testData.map(data =>
//             <li key={data.id}>{data.payload}</li>
//           )}
//         </ul>

//         <ul>
//           {this.state.users.map(user =>
//             <li key={user.id}>{user.name}</li>
//           )}
//         </ul>
//       </div>
//     );
//   }
// }

// export default App;
