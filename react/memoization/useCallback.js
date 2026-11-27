//  without useCallback:

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


// ---------------------------------------------------------------------------


// with usecallback

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


