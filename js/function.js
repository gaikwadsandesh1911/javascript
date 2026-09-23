/* what is function.

    function is re-usable block of code.

    function accepts parameters and return result.
    when we call function we send the arguments.

*/


// Different ways to create functions.


// 1. function declarations.

    function greet() {
        console.log('hello')
    }


// 2. Function Expression:  when we assign a function to variable is called a function expression.

        // 2.1  anonymous function expression:  Function has no name (anonymous)

                const greet1 = function () {
                  console.log("hello")
                };

        // 2.2  named function expression:  When function has name as well (rarelyy used)

                const greet2 = function greet () {
                  console.log("hello")
                };

// 3. Arrow function:  It's shorter way of writing functions using the => (arrow) operator where we ommit function keyword.

    const greet3 = () => {
        console.log('hello')   
    };


// --------------------------------------------------------


/* What is immediately invoked function

    An IIFE (Immediately Invoked Function Expression) pronounced as IIFY
    that is run immediately as it is defined.

    we decalre function without name and wrap it inside () parenthesis.
    and then invoke immediately with another set of paranthesis.
*/

    (function () {
        console.log("Runs immediately");
    })();

// -----------------------------------------------------------


/* Higher order function

    Higher order function is a function:

        1. that takes another function as its argument

        2. or return a function

    map(), filter() etc. are in-built higher order functions in js.
*/

// 1. Takes another function as an argument.

function higherOrder(fn) {
    fn();
}
higherOrder(function() { console.log("hello")});


// 2. return function

function multiplyBy(factor) {
    return function (number) {
        return number * factor;
    };
}

    const double = multiplyBy(2);
    const result = double(5);
    console.log(result);

// ---------------------------------------------------

/* Callback function

    Function that is used as an argument to another function is called callback function.

*/

    function greet4(name, callback) {
        console.log("Hello " + name);
        callback();
    }

    function sayHi() {
        console.log("Hi...!");
    }

    greet4("Sandesh", sayHi);    // sayHi is callback funtion

    // sayHi is a callback function

    // greet3 is higher-order function

// --------------------------------------------------------

/* Function as a first-class citizen in js.

    function in javascript:
    
        can be used as an argument of another function, 
        can be returned by another function, and 
        can be used as a property of an object.

    that's why it is called first-class citizen.

*/

// -------------------------------------------------------

/* what is pure function.

    does not modify global variable.
    does not change input.
    does not make api call, console.log().
    and if same input provided, same output produces.

*/

    function add(a, b) {
        return a + b;
    }
    add(2, 3); // 5
    add(2, 3); // always 5


    // Impure function because modifies external variable.
    let total = 0;

    function addToTotal(num) {
        total += num;  // ❌ modifies external variable
    }


    // impure function because different output everytime.
    function randomNum() {
        return Math.random(); // ❌ different output every time
    }


    // impure function, mutate original array
    function addItem(arr, item) {
        arr.push(item); // ❌ mutates original array
        return arr;
    }

    // pure function, original data safe.
    function addItem(arr, item) {
        return [...arr, item]; // ✅ new array, original data is safe.
    }
    
// -------------------------------------------------------------