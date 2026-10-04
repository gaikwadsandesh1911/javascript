/* scope, scope chain, lexical scope, closure.

    scope:
        accessibility of variables and functions at various parts of code
        define scope of that variable or function.

    we have,

    1.  Global Scope:    
            variable declared inside global namespace can be accessed anywhere in the code.
    
    2.  Local or Function Scope:
            variable declared inside function have local or functional scope.
            eg. variable declared with var keyword has functional scope.
    
    3.  Block Scope:
            variable declared inside a block { } accessible only inside that block.
            eg. variable declared with let and const has block scope.

    
    scope chain:
        if js engine do not find variable in local scope, it try to find variable in its outer scope.
        if variable not exist in outer scope, it try to find in global scope
        if variable not found in global scope, it throws an reference error.

*/
const globalVar = "Global";

function outer() {
  const outerVar = "Outer";

  function inner() {
    const innerVar = "Inner";

    console.log(innerVar);
    console.log(outerVar); // lexical scope => inner function access variable defined in its outer function.
    console.log(globalVar);
  }

  inner();
}

outer();

/* Lexical Scope

    Inner function have access to variables declared in the outer function
    is called "lexical scope".

*/

// --------------------------------------------------------------------------------------------------------

/* closure:

    closure is a function or ability of the function,
    that remember variable from its outer scope,
    even after outer function finishes its execution.

    *** closure is possible because of lexical scope.

*/

function outer() {
  let count = 0;

  return function inner() {
    count++;
    return count;
  };
}

const counter = outer();

const counter2 = outer();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// remeber variables from outer scope, thats why count is increments.

console.log(counter2()); // 1   .. new closure
console.log(counter2()); // 2

/* 
    outer() function returns function, counter is reference of inner()

*/

// --------------------------------------------------------------------------------------------------------

/* Currying

    function with multiple arguments is transformed into sequence of functions,
    where each function takes one argument at a time.

*/

// normal function
function add(a, b, c) {
  return a + b + c;
}
add(1, 2, 3); // 6

// curried version
function addition(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}
addition(1)(2)(3);

// --------------------------------------------


/* memoization

    Memoization is a form of caching 
    where the return value of a function is cached based on its parameters. 
    If the parameter of that function is not changed, the cached version of the function is returned.

    *** memoization is used for cpu intensive work.
*/

function memoize() {

  let cache = {};

  return function (num) {
    if (num in cache) {
      console.log("result from cache..");
      return cache[num];
    } else {
      cache[num] = num + 100;
      return cache[num];
    }
  };
}

const memoFun = memoize();
console.log(memoFun(20));   // 120
console.log(memoFun(20));   // result from cache   120
console.log(memoFun(40));   // 140


// --------------------------------------------
