/* useReducer

useReducer is a React Hook used for complex state management 
by updating state through dispatched actions and a reducer function.

useReducer takes two main parameters: a reducer function and an initial state. 
The initial state can be of any type, but it is commonly an object when managing complex state.

useReducer returns the current state and a dispatch function that sends actions to the reducer for state updates..

reducer function recieves two parameters (state, action) and return new state

*/

const [state, dispatch] = useReducer(reducer, initialState);
/* 
    state → current state value
    dispatch → function used to send actions.
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
