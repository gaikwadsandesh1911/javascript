/* useCallback:

    useCallback is a React Hook used to memoize a function.

    It returns the same function reference between renders 
    until one of its dependencies changes.
*/

function Parent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <>
      <p>Count: {count}</p>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type..."
      />

      <hr />

      <Child onClick={handleClick} />
    </>
  );
}

const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Child Button</button>;
});



// -----------------with useCallback ----------------------------------------------------------

function Parent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const handleClick = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  /* const handleClick = useCallback(() => {
    setCount(count + 1);  // dependency neede only when, otherwise stale clousere problem
  }, [count]); */

  return (
    <>
      <p>Count: {count}</p>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type..."
      />

      <hr />

      <Child onClick={handleClick} />
    </>
  );
}

const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Child Button</button>;
});



/* 
    It memoize callback function of useCallback() hook.

    for eg.1
    when we pass function to child componet we can prevent child component from un-necessory re-rendering

    if the pass same reference is passed to child component, child component does not re-renders.

    But it is effective only when child wrapped with React.memo()


*/
