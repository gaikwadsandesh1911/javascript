/* useEffect

    React component manages state, prop and UI. 
    but it also has to communicate with external system like browsers api, timers, event listeners etc. 

    useEffect help react component to synchronous with external system.
    
    It allow us to perform side effects. 
    Some common examples of side effects include:

      - Fetching data from an API on component mount.
      - Setting up timers (setTimeout / setInterval) as component lifecycle rather being triggered by user action
      - Adding browser Event listeners (scroll, resize, etc.)
      - Directly interact with browser api
      - Subscribe to external system


  useEffect hook runs after component render means after browser has painted the UI.


  useEffect runs in following three situations :

      - if no dependecy array is provided, useEffect runs after evey render of the component.
      
      - if empty dependecy array[], is provided, useEffect runs once when component mount.
      
      - if [ value ] provided then will Run on when value change.



    It also returns cleanup function:
    which is used to undo or stop side effects.
    
    clean up function runs in two situation:

      - when the component unmounts means component removed from UI.
        deu to route change, conditional rendering, parent component unmount

      - before the effect runs again when its dependencies change.

*/

useEffect(() => {
  // side effect code

  // clean-up function
  return () => {};
}, []);

// --------- fetch api on component mount ---------------------

import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>API Fetch Example</h2>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {data && (
        <div>
          <h3>{data.title}</h3>
          <p>{data.body}</p>
        </div>
      )}
    </div>
  );
  
}


// api call on btn click, we dont need useEffect.

import { useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchUsers() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      // Handle HTTP errors
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      setUsers(data);

    } catch (err) {
      setError(err.message);
      setUsers([]);

    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button onClick={fetchUsers} disabled={loading}>
        {loading ? "Loading..." : "Fetch Users"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}

export default Users;


// ---------------------------------------------------

useEffect(() => {
  const timer = setInterval(() => {
    console.log("Running");
  }, 1000);

  return () => {
    clearInterval(timer);
  };
}, []);

/*  
  We don't have to use useRef for every timer. 
  If the timer is created and cleaned up within the same effect, 
  a local variable is sufficient. 
    
  We use useRef when we need to persist the timer ID across renders and
  access it from other functions.

*/

// A very practical example is a Start / Stop timer. The timer ID is stored in useRef so both functions can access it.

import { useRef, useState } from "react";

function Timer() {

  const timerRef = useRef(null);

  const [seconds, setSeconds] = useState(0);

  function startTimer() {

    if (timerRef.current) return; // already running

    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerRef.current);
    timerRef.current = null;
  }

  return (
    <div>
      <p>Time: {seconds} seconds</p>

      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}

// ----------------------------------------------

// eventListner example

import { useEffect, useState } from "react";

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };

  }, []);

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>
        Open Modal
      </button>

      {isModalOpen && (
        <div>
          <h2>My Modal</h2>
          <button onClick={() => setIsModalOpen(false)}>
            Close
          </button>
        </div>
      )}
    </>
  );
}