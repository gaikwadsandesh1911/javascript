/*  useRef

    useRef mainly use for two purpose: 

    - access dom element directly throught its .current property

    - store mutable values that we want it to persist across re-renders like timer value.
      and updating that value does not re-render component. 
      Since component is not get re-rendered, It does not update the UI.
    
    - Common use cases of useRef:

      - Focus input fields.
      - Track scroll position.
      - Store timer/interval IDs, if we have to use same timer id in different functions.
      - Store previous values.
*/


/*
    we can access and manipulate dom elements directly inside useEffect through browser api like:
    document.getElementById() etc. methods,
    
    but useRef is recomnded way to acess dom element directly.
*/

// useEffect
import { useEffect } from "react";

function App() {
  
  useEffect(() => {
    const heading = document.getElementById("heading");

    console.log(heading);
    heading.style.color = "red";
  }, []);

  return <h1 id="heading">Hello React</h1>;
}


// useRef
import { useEffect, useRef } from "react";

function App() {
  
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current.style.color = "red";
  }, []);

  return <h1 ref={headingRef}>Hello React</h1>;
}

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
// not update UI

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

// eg 2. when component mount input focused

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