/* hoisting

    hoisting is default behaviour of js,
    where all variables and function declaration are move on top.

    only variable declaration is hoisted, not initialization is hoisted.

*/

x = 20;
console.log(x)  // 20
var x;

/* 
    let and const are also hoisted but cannot be accessed before their declaration is executed.
    They are in temporal dead zone (tdz).
    and accessing these varibale will result in reference error. 
*/



x = 20;
console.log(x)      // reference error
let x;


console.log(a);     // undefined
var a = 10


/* TDZ ( temporal dead zone )

   TDZ happens with let and compnst keyword
   It is the period between entering a block scope and initializing value to let or const variable. 
   Accessing the variable during this period throws a ReferenceError. 

   It exists because let and const are hoisted but are not initialized with undefined like var."

    js execution context where js code getsexecuted has two phases:
        1. memory creation
        2. initializing value

        variable declare with var keyword initialize undefined value in memory creation phase.
        and replace actual value in initialize phase

        let and const variables not assigned any value in memory creation phase.
        they assigned value in initialize phase.
        

*/


/*  null vs undefined

    - undifined means variable is declared but has not been assigned a value.
        let a ;
        console.log(a)  // undefined

    - type of undefined is undefined

    
    null means we intentionally assign a empty (absense of value) value to variable.
        let b = null;
        console.log(b)   // null.

    - type of null is an object. ( type of bug in js )

*/

let a;
let b = null

console.log(a == b)  // true    // compares values with type conversion.
console.log(a === b)  // false  // compares values without type conversion.
