import React, { useState } from 'react';

function Todo({ todo, index, completeTodo }) {
  return (
    <div style={{ textDecoration: todo.isComplete ? 'line-through' : '' }} className="todo"> {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
      </div>
    </div>
  )
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" className="input" value={value} onChange={e => setValue(e.target.value)} />
    </form>
  );
}


function App() {
  const [todos, setTodos] = useState([
    {
      text: "Learn about React",
      isComplete: false
    },
    {
      text: "Meet friend for lunch",
      isComplete: false
    },
    {
      text: "Build really cool todo app",
      isComplete: false
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  }

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isComplete = true;
    setTodos(newTodos);
  }

  return (
    <div>
      <div>
        {todos.map((todo, index) =>
          <Todo key={index} index={index} todo={todo} completeTodo={completeTodo} />
        )}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  )
}

export default App;


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
