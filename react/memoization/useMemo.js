/* useMemo:

    Is react hook which takes callback function and dependecy array.
    useMemo(() => {},[]) 

    it memoized value return by callback function.
    and does not re-calculate (does not execute callback) untill one of its dependency changed.

    it is mainly used to memoize value of expensive function
    because it may freeze the UI.
*/

const products = [
  { id: 1, name: "iPhone", price: 70000 },
  { id: 2, name: "Laptop", price: 50000 },
  { id: 3, name: "Headphones", price: 2000 },
  { id: 4, name: "Smart Watch", price: 5000 },
];

// without memo
function Products() {
    
  const [search, setSearch] = useState("");

  const [cartCount, setCartCount] = useState(0);

  const getFilteredProducts = (products) => {
    console.log("Filtering + sorting...");
    return products
      .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => a.price - b.price);
  };

  const filteredProducts = getFilteredProducts(products);

  return (
    <>
      <input
        value={search}
        placeholder="Search product..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />

      <button onClick={() => setCartCount(cartCount + 1)}>
        Cart: {cartCount}
      </button>

      <hr />

      {filteredProducts.map((item) => (
        <p key={item.id}>
          {item.name} - ₹{item.price}
        </p>
      ))}
    </>
  );
}

export default Products;

/* 
    when cartCount changes, component re-renders.

    Without useMemo, getFilteredProducts run every time component re-render
    even it has nothing to do with cart count.

*/


// ---------------------------------------------------

// with memo

import { useMemo, useState } from "react";

function Products() {
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);

  function getFilteredProducts(products, search) {
    console.log("Filtering + sorting...");

    return [...products]
      .filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => a.price - b.price);
  }

  const filteredProducts = useMemo(() => {
    return getFilteredProducts(products, search);
  }, [search]);

  return (
    <>
      <input
        value={search}
        placeholder="Search product..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />

      <button onClick={() => setCartCount(cartCount + 1)}>
        Cart: {cartCount}
      </button>

      <hr />

      {filteredProducts.map((item) => (
        <p key={item.id}>
          {item.name} - ₹{item.price}
        </p>
      ))}
    </>
  );
}

/* 
    here filteredProducts executed only serch is changed,
    not on click of button.
*/

// -------------------------------------------------------
