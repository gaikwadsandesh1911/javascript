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

    js execution context has two phase:
        1. memory creation
        2. initializing value

        in memory creation phase. variable declare with var keyword initialize value to: undefined by js engine.

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
