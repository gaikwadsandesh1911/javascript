/* 🔹 What is Prop Drilling?

    👉while developing React applications, there is a need to pass data 
    from a component that is higher in the hierarchy

    to a component that is deeply nested. 

    To pass data between such components, 

    we pass props from a source component 
    and keep passing the prop to the next component in the hierarchy

    till we reach the deeply nested component.

    👉The disadvantag of this approach is that some component in heirarchy
    can un-neccesarily access to that data

    
    
    👉The solution to avoid prop drilling..  
    
        we have context api and state management libraries like Redux, Zustand. etc.


*/

/*  ✅ Context api

    useContext is a React Hook that lets you access data from 
    Context means container that store data globally directly, 
    without passing props manually (avoids prop drilling).

    we have Three steps to follow..

    👉createContext() → creates a global container
    👉Provider → shares data
    👉useContext() → reads data

    🔹 Step 1: Create Context

        import { createContext } from "react";

        export const UserContext = createContext();

    🔹 Step 2: Provide Context
        Wrap components with Provider:

        import { UserContext } from "./UserContext";

        function App() {
        const user = "Sandesh";
            return (
                <UserContext.Provider value={user}>
                    <Child />
                </UserContext.Provider>
            );
        }

    🔹 Step 3: Consume Context using useContext

            import { useContext } from "react";
            import { UserContext } from "./UserContext";

            function GrandChild() {
                const user = useContext(UserContext);
                return <h1>Hello {user}</h1>;
            }


*/


/* 

    src/
 ├── context/
 │    └── TodoContext.js
 ├── components/
 │    ├── AddTodo.jsx
 │    └── TodoList.jsx
 └── App.jsx




 // context/TodoContext.js

import { createContext, useState } from "react";

🔹export const TodoContext = createContext();



🔹export const TodoProvider = ({ children }) => {

  const [todos, setTodos] = useState([]);

  // Add Todo
  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text }]);
  };

  // Delete Todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};



// App.jsx

import { TodoProvider } from "./context/TodoContext";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

function App() {
  return (
🔹    <TodoProvider>
        <AddTodo />
        <TodoList />
    </TodoProvider>
  );
}

export default App;


*/