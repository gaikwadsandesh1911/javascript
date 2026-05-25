/* 🔹 What is Prop Drilling?

    TO BUILD COMPLETE REACT APPLICATION, we combine multiple components together.
    sometimes these components are nested.

    so to pass the data from component that is higher in the heirarchy,
    to the component that is deeply nested,

    we need to pass the data from each and every component in the heirarchy
    till data is reached to target component, 
    because we can pass data in uni-direction only, from parent to child component only.
    
    THIS is Prop Drilling.
    

    👉The disadvantag of this approach is that some components in the heirarchy
    can have un-neccessery access to that data.

    👉The solution to avoid prop drilling..  
    we have context api and state management libraries like Redux, Zustand. etc.

*/

/*  ✅ Context api

    React Context provides a way to share data globally, across all the components
    without passing props manually through every level (prop drilling).

    It's three steps to follow...

    👉createContext() → Context acts as a shared data container.

    👉Provider →  we wrap the required component tree inside the Context Provider 
                  and pass the data using the value prop.

    👉useContext() → reads / consume data in child componet useContext() hook is used

*/

/* 

 src
 ├── context
 │     └── TodoContext.jsx
 │
 ├── components
 │     ├── AddTodo.jsx
 │     ├── TodoList.jsx
 │     └── TodoItem.jsx
 │
 └── App.jsx


*/

// context/TodoContext.js

import { createContext, useState } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {

  const [todos, setTodos] = useState([]);

  // Add Todo
  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text }]);
  };

  // Delete Todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};



// addTodo.jsx

import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";

export default function AddTodo() {

  const [text, setText] = useState("");
  const { addTodo } = useContext(TodoContext);

  const handleSubmit = () => {
    addTodo(text);
    setText("");
  };

  return (
    <div>
      <input
        value={text}
        placeholder="Enter todo..."
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
}


// TodoList.jsx

import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import TodoItem from "./TodoItem";

export default function TodoList() {

  const { todos } = useContext(TodoContext);

  return (
    <div>
      {todos.length === 0 ? (
        <p>No Todos</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        ))
      )}
    </div>
  );
};


// TodoItem

import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

export default function TodoItem({ todo }) {
  const { deleteTodo } =
    useContext(TodoContext);

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        margin: "10px 0",
      }}
    >
      <span>{todo.text}</span>

      <button
        onClick={() =>
          deleteTodo(todo.id)
        }
      >
        Delete
      </button>
    </div>
  );
}



// App.jsx

import { TodoProvider } from "./context/TodoContext";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

function App() {
  return (
    <TodoProvider>
      <AddTodo />
      <TodoList />
    </TodoProvider>
  );
}

export default App;
