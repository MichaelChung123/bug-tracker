import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from './actions';
import { decrement } from './actions';

function App() {
  const counter = useSelector(state => state.counter);
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={() => dispatch(increment(5))}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>

      {isLogged ? <h3>You're logged in to see this value</h3> : ''}
    </div>
  );
}

export default App;

// OLD POSTGRESQL EXAMPLE
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
