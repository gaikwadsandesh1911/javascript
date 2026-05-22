/* 🔹 What is Prop Drilling?

    TO BUILD COMPLETE REACT APPLICATION, we combine multiple components together.
    sometimes these components are nested.

    so to pass the data from component that is higher in the heirarchy,
    to the component that is deeply nested,

    we need to pass the data from each and every component in the heirarchy
    till data is reached to target component, 
    because we can pass data in unidirection only, from parent to child component only.
    
    THIS is Prop Drilling.
    

    👉The disadvantag of this approach is that some components in the heirarchy
    can have un-neccessery access to that data.

    👉The solution to avoid prop drilling..  
    we have context api and state management libraries like Redux, Zustand. etc.


*/

/*  ✅ Context api

    React Context API provides a way 
    to share data globally, across all tue components 
    without passing props manually through every level (prop drilling).

    we have Three steps to follow..

    👉createContext() → creates a global container
    👉Provider → shares data
    👉Consumer / useContext() → reads / consume data

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