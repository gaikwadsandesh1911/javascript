
/* 
    👉 Synchronous:

            JavaScript executes code line by line, 
            next line is not executed untill current line is finished its execution.
            so. long running task(api call, timers ) may block the main thread.
    
    👉 Asynchronous:

            JavaScript executes long-running tasks like(api call, timers)
            in the background means inside (web api, callback queue, microtask queue)
            but does not block the main thread, and its result is handled later.
                simple Meaning
                    👉 JS does not wait for the async task to finish it execution.
                    👉 It moves to the next line immediately.


            👉 JavaScript is single-threaded, but handles async using:
                Call Stack
                Web APIs (browser / Node APIs)
                Callback Queue / Microtask Queue
                Event Loop
*/

// -----------------------------------------------------------------------------------------

/*      🔹 “Callbacks are the foundation of asynchronous JavaScript, 
            but to avoid callback hell we use Promises and async/await.”

                * by default callback fn do not return a promise.
    

        ⚠️ Callback Hell
            When multiple callbacks are nested inside each other, 
            making code hard to read, maintain and debug.
      
*/

// -----------------------------------------------------------------------------------------

/* 
    🔹 Promise

            👉 A Promise is an object that represents the result of an asynchronous operation 
                (something that will finish in the future).

                🔹 Why do we need Promises?

                    JavaScript is asynchronous, so tasks like:
                        API calls (fetch)
                        Timers (setTimeout)
                        take time ⏳

                    👉 Promises help us handle these operations cleanly 
                        instead of callback hell.

                🔹Promise object has three states...

                        1   pending     =   initial state
                        2   fulfilled   =   means async operation is success
                        3   rejected    =   measn async operation is failed
            
                👉 promise is created using Promise constructor function which takes
                    callback function with two parameter, resolve, reject respectively.

                👉 resolve is function which is called when async operation successfully completed

                👉 reject is function which is called when async operation fails or some error occure.

                👉promise is consumed using then(), and handle error using catch() 



        👉// creating promise

        🔹  const promise = new Promise((resolve, reject) => {
                let login = true;
                if (login) {
                    setTimeout(() => {
                        resolve("login success.");
                    }, 1000);
                } else {
                    reject("login failed");
                }
            });

        👉// consuming promise  .then() and .catch()

            promise
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error)
            });

// ----------------------------------------------------------

        🔹fetch API also returns a Promise.

            👉 Promise style:

                function getData() {
                    return fetch("https://fakestoreapi.com/products/1")
                        .then((res) => res.json())
                        .then((data) => console.log(data))
                        .catch((error) => console.log(error));
                    }
                getData();
                


            👉 Async/await style

                async function getUsers() {
                    try {

                        const res = await fetch("https://jsonplaceholder.typicode.com/users");

                        if (!res.ok) {
                            throw new Error("Network response was not ok");
                        }

                        const users = await res.json();
                        console.log(users);

                    } catch (error) {
                        console.error("Error:", error.message);       
                    }
                }

                getUsers();


                👉1. fetch api does NOT throw error on HTTP errors ❌

                    You must check:
                    if (!res.ok) throw new Error("Error");

                👉2. Always use try...catch with async/await


                🔹 Why 2 await?
                        const response = await fetch(...);      // waits for HTTP response
                        const data = await response.json();     // waits for JSON parsing

                👉 Because:
                        fetch() → returns Promise → Response
                        response.json() → returns Promise → actual data

            
            👉  async function always returns a Promise

                await pauses execution inside function only.
                ( do not jump to next line until response comes )

 
            ✅ then() vs async/await

                👉  .then() → promise chaining style

                👉  async/await → readable, modern way.

            ✅Under the hood → both use Promises.


// -----------------------------------------------------------

            async function sayHI() {
                return "HI..."; // not returning string, returning promise because function is async
            }
            sayHI().then((res) => {
                console.log(res)
            });

*/

// -----------------------------------------------------------

/*  🎯 Promise static methods

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

        getDashboardData()
        .then(data => console.log(data))
        .catch(err => console.error(err));



        🔹. we also have some other static methods...

*/


