/* useEffect

    useEffect Hook allows you to perform side effects in React components.
    Some common examples of side effects include:

        Fetching data from an API
        Directly interacting with the DOM
        Setting up timers (setTimeout / setInterval)
        Event listeners (scroll, resize, etc.)


        useEffect accepts two arguments :
            1. callback function
            2. dependency array

        useEffect(<function>, <dependency>)


    ** useEffect hook runs after component render means 
        after browser has painted the updated UI.


    useEffect runs in following three situations :

        🔹 if no dependecy array is provided, useEffect runs after evey render of the component.
        🔹 if empty dependecy array[], is provided, useEffect runs once when component mount.
        🔹 if [ value ] provided then will Run on when value change.



    

    It also has cleanup function

    The cleanup function is used to undo or stop side effects.
    
    which runs in two situation

        🔹 just before effect runs again.
                when state change component re-renders, and useEffect runs
                but before useEffect runs again, cleanup runs before it.

        🔹  before component unmount. means component removed from UI 
            ( eg. conditional rendering, route change, parent unmount )

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
