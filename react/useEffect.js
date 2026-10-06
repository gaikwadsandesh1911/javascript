/* useEffect

    useEffect is react hook used to perform side effects in React functional components.
    
    Some common examples of side effects include:

      - Fetching data from an API.
      - Directly interacting with the DOM.
      - Setting up timers (setTimeout / setInterval).
      - Event listeners (scroll, resize, etc.)


    useEffect accepts two arguments:
      1. callback function
      2. dependency array

      useEffect(<function>, <dependency>)


    useEffect hook runs after component render means 
    after browser has painted the updated UI.


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

// --------- fetch api ---------------------

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
    
  We use useRef when we need to persist the timer ID across renders or 
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