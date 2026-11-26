/* useReducer

to manage complex state or
when multiple state updates depends on different action
useReducer hook is used.

it's an alternative to usestate.

useReducer takes two main parameters: 

- a reducer function and an initial state.

- and returns current state and dispatch function.

dispatch function sends action ( plain js object ) to reducer function. action has type and payload property.

The initial state can be of any type, but it is commonly an object when managing complex state.

- useReducer manage state using reducer function.
reducer function recieves two parameters (state, action) and return new state



*/

const [state, dispatch] = useReducer(reducer, initialState);
/* 
    state → current state value
    dispatch → function used to send action to reducer function.
*/

import { useReducer } from "react";

const initialState = {
  count: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        count: state.count + action.payload,
      };

    case "decrement":
      return {
        ...state,
        count: state.count - action.payload,
      };

    default:
      return state;
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h2>{state.count}</h2>

      <button
        onClick={() =>dispatch({
            type: "increment",
            payload: 5,
          })
        }
      >
        +5
      </button>

      <button
        onClick={() =>dispatch({
            type: "decrement",
            payload: 2,
          })
        }
      >
        -2
      </button>
    </div>
  );
}

export default App;


/*

useState vs useReducer
useState useReducer
Manages state directly Manages state through a reducer
Uses setter function Uses dispatch function
Suitable for simple state Useful for complex state logic
Update logic often stays in component Update logic is centralized in reducer
No action required Uses actions
*/
