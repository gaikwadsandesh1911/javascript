/* 
      👉  A function is a reusable block of code designed to perform a specific task.
          function can accept inputs (parameters), and return an output. 
          It can be assigned to variables, passed as arguments, and returned from other functions.”

*/

// 🎯 different ways to create function in js.

/* 
    📌1. Function Declaration (Classic) 
          ✔ Hoisted (can call before definition)
          ✔ Good for reusable logic
*/
function greet(name) {
  return `Hello, ${name}`;
}
const res = greet("sandesh");
console.log(res);

// when function return something we have to store it in variabale at the time calling.

// -------------------------------------------------------

/* 
    📌2. Function Expression
            A function stored inside a variable is called a function expression.

    ❌ Not hoisted

 
*/

// 1. Function has no name (anonymous)      => anonymous function expression
const greet1 = function () {
  return `Hello, ${name}`;
};

//  2. Can also be named (rare but useful)      => named function expression
const add = function sum(a, b) {
  return a + b;
};

// ------------------------------------------------------

/* 
    3. Arrow Function (Modern 🔥)

        An arrow function is a modern and shorter syntax for writing functions in JavaScript using the => operator. 
        It does not have its own this, arguments, or prototype, and instead inherits this from its surrounding scope.
*/

const greet2 = (name) => {
  return `Hello, ${name}`;
};

// -----------------------------------------------------------

/* 
    4.  An IIFE (Immediately Invoked Function Expression) 
        is a function that is defined and executed immediately after its creation.

*/
(function () {
  // console.log("Runs immediately");
})();

(() => {
  // console.log("Runs immediately");
})();

// *************************************************************

/* 
    🎯 callback function

          A callback function is a function that is passed as an argument to another
          function and is executed later, usually after some operation is completed.
    
*/

function greet3(name, callback) {
  // console.log("Hello " + name);
  callback();
}

function sayBye() {
  // console.log("Goodbye!");
}

greet3("Sandesh", sayBye);
// sayBye is a callback function
// greet3 is higher-order functin

// --------------------------------------------------

setTimeout(() => {
  // console.log("Runs after 2 seconds");
}, 2000);

// ✔ setTimeout takes a callback function
// ✔ Runs after delay (async behavior)

/* 
    🚀 Key Points for Interview

    Passed as argument ✅
    Executed later ⏳
    Used in async operations (API calls, timers) 🌐
    Can be synchronous or asynchronous.
*/

// ********************************************************

/* 
    ⚠️ Callback Hell
        When multiple callbacks are nested inside each other, 
        making code hard to read, maintain and debug.
*/
/* 
    🎯 “Callbacks are the foundation of asynchronous JavaScript, 
        but to avoid callback hell we use Promises and async/await.”
*/

// ********************************************************

/* 
    👉 Synchronous:

            JavaScript executes code line by line, 
            next line is not executed untill current line is finished its execution.
            so. long running task(api call, timers ) may block the main thread.
    
    👉 Asynchronous:

            JavaScript executes long-running tasks like(api call, timers) in the background(web api, callback queue, microtask queue)
            and does not block the main thread, and its result is handled later.
                simple Meaning
                    👉 JS does not wait for the async task to finish it execution.
                    👉 It moves to the next line immediately.


            👉 JavaScript is single-threaded, but handles async using:
                Call Stack
                Web APIs (browser / Node APIs)
                Callback Queue / Microtask Queue
                Event Loop
*/

/* 
    🎯 Promise
            to handle Asynchronous operations(like api call fetch, timers etc) in javascript, Promises are used.

            promise is an object, which has three state.
                1   pending     =   initial state
                2   fulfilled   =   means async operation is success
                3   rejected    =   measn async operation is failed
            
            👉 promise is created using Promise constructor function which takes
                callback function with two parameter, resolve, reject respectively.

            👉 resolve is function which is called when async operation successfully completed

            👉 reject is function which is called when async operation fails or some error occure.

            promise is consumed using then(), and handle error using catch() 

*/
const promise = new Promise((resolve, reject) => {
  let login = true;
  if (login) {
    setTimeout(() => {
      resolve("login success.");
    }, 1000);
  } else {
    reject("login failed");
  }
});

promise
  .then((data) => {
    // console.log(data);
  })
  .catch((error) => {
    // console.log(error)
  });

// ----------------------------------------------------------

function getData() {
  return fetch("https://fakestoreapi.com/products/1")
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}
// getData();

// ---------------------------------------------------------

async function loadData() {
  const res = await fetch("https://fakestoreapi.com/products/1");
  if (!res.ok) {
    throw new Error("HTTP error " + res.status);
  }
  return res.json();
}
loadData()
  .then((data) => {
    // console.log(data);
  })
  .catch((error) => {
    // console.log(error);
  });
// -------------------------------------------------------

async function dataFetching() {
  const res = await fetch("https://fakestoreapi.com/products/1");
  if (!res.ok) {
    throw new Error("HTTP error " + res.status);
  }
  return res.json();
}

async function main() {
  try {
    const data = await dataFetching();
    // console.log(data);
  } catch (error) {
    // console.log(error);
  }
}

// main();

// ---------------------------------------------------

const fetchingData = async () => {
  try {
    const data = await fetch("https://fakestoreapi.com/products/1");
    const res = await data.json();
    // console.log(res);
  } catch (error) {
    // console.log(error)
  }
};
fetchingData();
// --------------------------------------------------

/* 
    async function always returns a Promise

    await pauses execution inside function only

    fetch does NOT reject on HTTP errors

    res.json() is also asynchronous
*/

/* 
    ✅ 2. .then() vs async/await

    .then() → chaining style

    async/await → readable, modern

    👉 Under the hood → both use Promises
*/
// ----------------------------------------------------------
// async function always return promise..
async function sayHI() {
  return "HI..."; // not returning string, returning promise because function is async
}
sayHI().then((res) => {
  // console.log(res)
});

// -----------------------------------------------------------

/* 
    🎯 Promise static methods

    🔹 1. Promise.resolve()
            👉 Creates a resolved promise

    🔹 2. Promise.reject()
            👉 Creates a rejected promise

    🔹 3. Promise.all()
            👉 Runs multiple promises in parallel
            👉 if one fails → whole thing fails

            🔥 Advantages of Promise.all()
                1. ⚡ Parallel Execution (Huge Performance Boost)
                👉 All promises run at the same time, not one by one
    
*/

async function getDashboardData() {
  try {
    const [user, products, orders] = await Promise.all([
      fetch("https://fakestoreapi.com/users/1").then((res) => res.json()),
      fetch("https://fakestoreapi.com/products").then((res) => res.json()),
      fetch("https://fakestoreapi.com/carts").then((res) => res.json()),
    ]);

    return { user: user, products: products, orders: orders }; // ✅ return data
  } catch (err) {
    throw err;
  }
}

getDashboardData();
// .then(data => console.log(data))
// .catch(err => console.error(err));

// ********************************************************

// ********************************************************

/* 
    🎯 Higher-Order function (HOF)
        A Higher-Order Function is a function that:
            1. Takes another function as an argument, OR
            2. Returns a function.
*/

// in-built HOF  map(()=>), setTimeOut(()=>)

// 🔹 Example 2: Function Returning Another Function
function multiplyBy(factor) {
  return function (number) {
    return number * factor;
  };
}

const double = multiplyBy(2);
const result = double(5);
// console.log(result);

// ********************************************************

/* 
    🎯 scope and scope chain, lexical scope, clousure

    scope
    
        accessibility of variables and functions at various parts of code
        define scope of that variable or function.

        we have,

    1.  Global Scope    

            variable declared inside global namespace can be accessed anywhere in the code
    
    2.  Local or Function Scope

            variable declared inside function have local or functional scope.
            means that variable can be accessed within that function only.
    
    3.  Block Scope

            block scope is related to variable declared with let and const keyword
            variable declared inside a block { } accessible only inside that block.

    scope chain

            if js engine do not find variable in local scope, it try to find variable in its outer scope.
            if variable not exist in outer scope, it try to find in global scope
            if variable not found in global scope, it throws an reference error.

*/

// --------------------------------------------------------------------------------------------------------

/* 
    Lexical scope
          inner functions have access to variables declared in their outer functions It’s called “lexical”
*/

function outerFunction() {
  let outerVar = "I am outside!";

  function innerFunction() {
    console.log(outerVar); // Can access outerVar
  }

  innerFunction();
}

// outerFunction();

// --------------------------------------------------------------------------------------------------

/* 
    A closure is a function that remembers the variables from its outer scope, 
    even after that outer function has finished executing.
    It’s possible because of lexical scope.
*/

function outer() {
  let count = 0; // Variable in outer scope

  return function inner() {
    // Closure
    count++;
    return count;
  };
}

const counter = outer();

/* console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3 */

// -------------------------------------------------------------------------------------------
