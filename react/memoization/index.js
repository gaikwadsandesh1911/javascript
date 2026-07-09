/* 
        What happens when a component re-renders ?
        
                Component re-renders deu to change in state, prop, context value, parent component re-render, 
                Component re-renders means React calls the component function again.
                
                During every render:

                        - primitive values are re-evaluated

                        - objects / arrays / functions are re-created 
                          means new reference ( memory address ) is assigned to them.

        There is no problem in that, React is built like that way.
        Thats how react detect the change, and efficiently update the UI.
        

        It become a problems mainly in two situation?

        1. Expensive calculations run on every render:

            which can decrease performance or freeze the UI.
                
                ✅ Solution: useMemo
                    Memoizes(cache) the computed value and
                    Re-computes only when dependencies change

        2. When Functions is passed to child component,
            and child component re-render un-neccesory on every render of parent component.

                ✅ Solution: useCallback
                    memoize function itself and pass same function reference until dependency is changed

                🔹 Important condition
                        useCallback is only effective when the child component 
                        is wrapped with React.memo.

                            useCallback → stabilizes function reference(does not create new reference unless dependency is changed).
                            React.memo → skips re-render of the child component if props are not changed.


                - useMemo()             Memoizes the result (value) of a expensive computation.

                - useCallback()         Memoizes a function so it isn't recreated on every render. 

                - React.memo()          memoize component

        These hook are used to optimize performance of an application.

        
        🔹 React.memo()
        React.memo is a Higher-Order Component (HOC) 
        that memoizes a component and prevents it from un-necessary-rendering 
        if its props have not changed.

*/

// ------------------------------------------------------------------------

/*🔹memoization

        Memoization is a form of caching. 
        where the return value of a function is cached based on its parameters. 
        If the parameter of that function is not changed, the cached version of the function is returned.

        // 👍 memoization is a classic example of closure. 
*/

function memoize() {
  let cache = {};
  return function (num) {
    if (num in cache) {
      console.log("...from cache...");
      return cache[num];
    } else {
      cache[num] = num + 100;
      return cache[num];
    }
  };
}
const memoFun = memoize();
console.log(memoFun(20));
console.log(memoFun(20));
console.log(memoFun(40));

/* 
        op
            120

            ...from cache...
            120

            140

            first time 20 value provided.  120
            second time 20 value provided.      ...from cache  120
*/

// -----------------------------------------------

/*  🔹 What is useMemo?

        useMemo is a React Hook:

          - which is used to memoize value return by expensive calculation.
          
          - useMemo takes a callback function and a dependency array. 
            and returns memoizes value: the value returned by the callback function. 
          
            - React does not executes the callback until one of it's dependency is changed; 

            - The callback passed to useMemo usually performs an expensive calculation.
            
            ** it cache value of any type.. like array, object, number

            ** expensive calculation means 
                cpu heavy task, 
                filtering large list of products, may slow down UI.
*/

      const Memoizedvalue = useMemo(callback, dependencies);

      const memoizedValue = useMemo(() => {
        // Perform calculation
        return value;
      }, [dependencies]);



// -----  eg without useMemo  -------------------------------------------------

import { useState } from "react";

function Products() {
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const products = [
    { id: 1, name: "iPhone", price: 70000 },
    { id: 2, name: "Laptop", price: 50000 },
    { id: 3, name: "Headphones", price: 2000 },
    { id: 4, name: "Smart Watch", price: 5000 },
  ];

const getFilteredProducts = () => {

  console.log("Filtering + sorting...");

  return products
    .filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.price - b.price);
}

  const filteredProducts = getFilteredProducts();

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

    Without useMemo, filtering and sorting run again
    even though they do not depend on cartCount.

*/

// -----  eg with useMemo  -------------------------------------------------

import { useMemo, useState } from "react";

function Products() {
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const products = [
    { id: 1, name: "iPhone", price: 70000 },
    { id: 2, name: "Laptop", price: 50000 },
    { id: 3, name: "Headphones", price: 2000 },
    { id: 4, name: "Smart Watch", price: 5000 }
  ];

  const filteredProducts = useMemo(() => {
    console.log("Filtering + sorting...");
    return products
      .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a,b)=>a.price-b.price);
  }, [search]);

  /* 
      const filteredProducts = useMemo(()=> getFilteredProducts() ,[ search] )
  */

  return (
    <>
      <input
        value={search}
        placeholder="Search product..."
        onChange={(e)=> setSearch(e.target.value)}
      />

      <br />

      <button onClick={() => setCartCount(cartCount+1)}>
        Cart: {cartCount}
      </button>

      <hr />

      {
        filteredProducts.map(item=>(
          <p key={item.id}>
            {item.name} - ₹{item.price}
          </p>
        ))
      }
    </>
  );
}

export default Products;

/* 
    here filteredProducts executed only serch is changed,
    not on click of button.
*/



// ----------------------------------------------------------------------------



/* 🔹 What is useCallback?

        useCallback is a React Hook which is used to memoize function.

        It takes callback function and dependency array and   
        returns the same function reference between renders, unless dependencies change.

        *** It memoize callback function.

        for eg.1
        when we pass function to child componet we can prevent child component from un-necessory re-rendering

        if the pass same reference is passed to child component, child component does not re-renders.

        But it is effective only when child wrapped with React.memo()

*/
        
//  ----------------without useCallback-------------------------------------------------------

function Parent() {

  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const handleClick = () => {
    setCount((prev)=>prev + 1);
  };

  return (
    <>
      <p>Count: {count}</p>

      <input
        value={text}
        onChange={(e)=> setText(e.target.value)}
        placeholder="Type..."
      />

      <hr />

      <Child onClick={handleClick} />

    </>
  );
}

const Child = React.memo( ({ onClick }) => {
    console.log("Child rendered");
    return (
      <button onClick={onClick}>
        Child Button
      </button>
    );
  }
);

export default Parent;

/*  when we change text, component re-renders
    so on every re-render handleClick function re-created
    everytime new reference is passed to child component
    React.memo() sees new reference of prop and it re-render un-necessory on change of text  

*/

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
    return (
      <button onClick={onClick}>
        Child Button
      </button>
    );
  }
);

export default Parent;

/*  when we change text, component re-renders
    useCallback executes again
     
    React returns the previously memoized
    function reference because dependencies
    did not change

    so handleClick keeps same reference

    React.memo() sees same reference of prop and it prevent re-renders of child component.
 

*/


// -----------------------------------------------------------------------------