import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, signIn, signOut, toggleCross } from './actions';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const response = await fetch(url);
    const data = await response.json();
    const item = data;
    setData(item);
    setLoading(false);
  }, []);

  return { data, loading };
}


function App() {
  const counter = useSelector(state => state.counter);
  const isLogged = useSelector(state => state.isLogged);
  const isCrossed = useSelector(state => state.isCrossed);
  const dispatch = useDispatch();

  const { data, loading } = useFetch("/users");
  
  console.log('in app ', isCrossed);

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={() => dispatch(increment(5))}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>

      {isLogged ? <button onClick={() => dispatch(signOut())}>Logout</button> : <button onClick={() => dispatch(signIn())}>Login</button>}
      {isLogged ? <h3>You're logged in to see this value</h3> : ''}

      <h1>User Data:</h1>
      {loading ?
        <div>
          LOADING...
      </div>
        :
        <div>
          <ul>
            {data.map(user =>
              <li onClick={() => {
                dispatch(toggleCross(user.id))
              }
              } className={() => {

              }}
               key={user.id}>{user.name}</li>
            )}
          </ul>
        </div>}
    </div>
  );
}

export default App;

    // OLD POSTGRESQL EXAMPLE
// import React, {Component} from 'react';

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
