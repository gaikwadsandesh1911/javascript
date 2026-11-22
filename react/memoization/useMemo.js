/* useMemo:

    it is mainly used to memoize value of expensive function.
    because it may freeze the UI.

    Is takes callback function and dependecy array.
    useMemo(() => {},[]) 

    it memoized value return by callback function.
    and does not re-calculate (does not execute callback) untill one of its dependency changed.


*/


// without memo

import { useState } from "react";

const products = [
  "iPhone",
  "Samsung",
  "OnePlus",
  "Realme",
  "Redmi"
];

function App() {
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);

  console.log("Component rendered");

  // Filtering happens on every render
  const filteredProducts = products.filter(product =>
    product.toLowerCase().includes(search.toLowerCase())
  );

  console.log("Filtering products...");

  return (
    <>
      <h2>Search Products</h2>

      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search product..."
      />

      <h3>Products:</h3>

      {filteredProducts.map(product => (
        <p key={product}>{product}</p>
      ))}

      <hr />

      <h3>Count: {count}</h3>

      <button onClick={() => setCount(count + 1)}>
        Increase Count
      </button>
    </>
  );
}

export default App;

// ---------------------------------------------------

// with memo

import { useState, useMemo } from "react";

const products = [
  "iPhone",
  "Samsung",
  "OnePlus",
  "Realme",
  "Redmi"
];

function App() {
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);

  const filteredProducts = useMemo(() => {
    console.log("Filtering products...");

    return products.filter(product =>
      product.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <>
      <h2>Search Products</h2>

      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search product..."
      />

      <h3>Products:</h3>

      {filteredProducts.map(product => (
        <p key={product}>{product}</p>
      ))}

      <hr />

      <h3>Count: {count}</h3>

      <button onClick={() => setCount(count + 1)}>
        Increase Count
      </button>
    </>
  );
}

export default App;

// -------------------------------------------------------
