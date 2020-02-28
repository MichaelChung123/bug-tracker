import React, { useState, Component } from 'react';

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}

      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>Remove</button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={value} onChange={e => setValue(e.target.value)} />
    </form>
  )
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          text: "Learn about React",
          isCompleted: false
        },
        {
          text: "Meet friend for lunch",
          isCompleted: false
        },
        {
          text: "Build really cool todo app",
          isCompleted: false
        }
      ]
    }
  }

  completeTodo = (index) => {
    const newTodos = [...this.state.todos];
    newTodos[index].isCompleted = !newTodos[index].isComplete;
    this.setState({
      todos: newTodos
    });
  }

  removeTodo = (index) => {
    const newTodos = [...this.state.todos];
    newTodos.splice(index, 1);
    this.setState({
      todos: newTodos
    });
  }

  addTodo = (text) => {
    const newTodos = [...this.state.todos];
    newTodos.push({
      text,
      isComplete: false
    });
    this.setState({
      todos: newTodos
    })
  }

  render() {
    return (
      <div>
        <div>
          {this.state.todos.map((todo, index) => (
            <Todo todo={todo} index={index} completeTodo={this.completeTodo} removeTodo={this.removeTodo} />
          ))}

          <TodoForm addTodo={this.addTodo} />
        </div>
      </div>
    );
  }
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
