/*  useRef

    useRef is a React Hook that returns a mutable object that has only one property.   [.current] property.
    
    useRef is primarily used to store mutable values that persist across renders 
    and updating that value does not re-render component. 
    
    when component does not re-render. It does not update the UI.

    useRef() Commonly use for:

    Access and manipulate DOM elements directly
    Focus input fields
    Track scroll position
    Store mutable values without re-rendering
    Store timer/interval IDs
    Store previous values
*/

/*  
    value also persists with useState but updating it cause component re-render
*/

export default function App() {
  const countRef = useRef(0);
  const handleClick = () => {
    console.log(countRef.current++);
  };
  return (
    <div className="App">
      <p>hi: {countRef.current}</p>
      <button onClick={handleClick}>click</button>
    </div>
  );
}

// useRef is primarily used to store mutable values that persist across renders without updating the UI.

// ---------------- focus input element -------------------------------------

function App() {

  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleFocus}>Focus</button>
    </>
  );
}

// eg 2. when component mount input focuesed

function App() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <input ref={inputRef} placeholder="Auto focused input" />
    </div>
  );
}

// ---------Track scroll position -------------------

// when scroll > 300 show button at bottom and click of button scroll to  top

import { useEffect, useRef, useState } from "react";

function App() {
  const scrollRef = useRef(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
      setScrollY(scrollRef.current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div style={{ height: "2000px", padding: "20px" }}>
      <h2>Scroll Y Position: {scrollY}</h2>

      {scrollY > 300 && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "10px 15px",
            cursor: "pointer",
          }}
        >
          ↑ Back to Top
        </button>
      )}
    </div>
  );
}

export default App;


// -------- store timers value ----------------------

import "./styles.css";
import { useRef, useState } from "react";

export default function App() {
  const timerRef = useRef(null);
  const [count, setCount] = useState(0);

  const startTimer = () => {
    // reset first
    clearInterval(timerRef.current);
    timerRef.current = null;

    timerRef.current = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setCount(0);
  };

  return (
    <div>
      <h2>Count: {count}</h2>

      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Pause</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}


// ------Store prev value or state

import { useEffect, useRef, useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(0);

  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  return (
    <div>
      <h2>Current: {count}</h2>
      <h3>Previous: {prevCountRef.current}</h3>

      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}

// useEffect is basically run after browser paint

// ----------------------------------------------

/* 
    search for different properties available on .current property
    to manipulate or access dom

    give me categorywise result
*/