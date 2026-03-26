/*    🎯function

      👉  A function is a reusable block of code designed to perform a specific task.
          function can accept inputs (parameters), and return an output. 
          It can be assigned to variables, passed as arguments, and returned from other functions.”

          function greet() { }

          👉console.log(typeof greet)    // function

          👉function is also object. but to distinguish itself from other object 
            typeof function return function

            👉function is an object thats why we access property on it like... greet.call()

            👉function inherits properties and method from Function.prototype.

            👉console.log(greet.__proto__ == Function.prototype)   // true


   🎯different ways to create function in js.

 
      👉1. Function Declaration (Classic) 

      function greet(name) {
        return `Hello, ${name}`;
      }
      const res = greet("sandesh");
      console.log(res);

      console.log(typeof greet)     // function
            
      // when function return something we have to store 
      // it in variabale at the time calling.



 
      👉2. Function Expression
              A function stored inside a variable is called a function expression.

          1.anonymous function expression      //Function has no name (anonymous)

                const greet1 = function () {
                  return `Hello, ${name}`;
                };

          2. named function expression        //Can also be named (rare but useful)

                const add = function sum(a, b) {
                  return a + b;
                };

 
      👉3. Arrow Function (Modern 🔥)

          An arrow function is a modern and shorter syntax for writing functions in JavaScript 
          using the =>(arrow) operator. 

          const greet2 = (name) => {
            return `Hello, ${name}`;
          };



      👉4.  An IIFE (Immediately Invoked Function Expression) 
              is a function that is defined and executed immediately after its creation.

            (function () {
              // console.log("Runs immediately");
            })();

*/

// -------------------------------------------------------------

/* 

    👉callback function

          A callback function is a function that is passed as an argument to another
          function and is executed later, usually after some operation is completed.

            function greet3(name, callback) {
                console.log("Hello " + name);
                callback();
            }

            function sayHi() {
                console.log("Hi...!");
            }

            greet3("Sandesh", sayHi);    // sayHi is callback funtion

            👉sayHi is a callback function

            👉greet3 is higher-order function



            setTimeout(() => {
                console.log("Runs after 2 seconds");
            }, 2000);

            ✔   setTimeout is Higher-order function that takes
                another function as its argument ( callback function )
                which runs after delay (async behavior)

*/


/*  👉 Higher-Order function (HOF)

        A Higher-Order Function is a function that:

            1. Takes another function as an argument, OR

            2. Returns a function.


    🔹 in-built HOF  map(()=>), setTimeOut(()=>)       

    🔹 Example 2: Function Returning Another Function

        function multiplyBy(factor) {
            return function (number) {
                return number * factor;
            };
        }

        const double = multiplyBy(2);
        const result = double(5);
        console.log(result);

*/

// ------------------------------------------------------

/* 👉 pure function

        🔹does not modify global variable
        🔹does not change input
        🔹does not make api call, console.log()
        🔹and if same input provided, same output produces

        function add(a, b) {
          return a + b;
        }

        add(2, 3); // 5
        add(2, 3); // always 5 ✅



    👉 Impure function

        let total = 0;

        function addToTotal(num) {
          total += num;  // ❌ modifies external variable
        }


        function randomNum() {
          return Math.random(); // ❌ different output every time
        }


    👉  eg1.  Impure to pure conversion

          function addItem(arr, item) {
            arr.push(item); // ❌ mutates original array
            return arr;
          }

        function addItem(arr, item) {
          return [...arr, item]; // ✅ new array
        }
          👉 Original data safe

          


    👉    eg2.  Impure to pure conversion

        function greet(name) {
            console.log("Hello " + name); // ❌ side effect
        }
        
        function greet(name) {
          return "Hello " + name;
        }
          👉 Let caller decide what to do with result

*/