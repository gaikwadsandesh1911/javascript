/* ES6 or ecmascript 6.

    Its 6th version of javascript released in 2015.

    In ES6 many important features were introduced such as

        let and const keyword,
        string literal
        destructuring,
        rest and spread operators
        arrow function,
        classes,
        promises,
        modules( import / export ) keyword.

*/

// -------------------------------------------------------

/* var, let and const keywords, used to declare variable in js.

|            | `var`     | `let` | `const` |
| ---------- | --------  | ----- | ------- |
| Scope      |  Function | Block | Block   |
| Redeclare  |  Yes      | No    |  No     |
| Reassign   |  Yes      | Yes   |  No     |


variable declared with var has function scope.
can be used inside function.

varibale declared with let and const has block scope
can be used inside that { } block only.

*/

var a = 10;
var a = 20;     // re-declare and re-asigned

let b = 50;
b = 100;         // re-assigned value but can not re-declare.

const c = 100;
c = 101;         // error.. can't re-declared or re-assigned value.


if (true) {
    let x = 10;
    const y = 20;
    var z = 30;
}


console.log(x); // ❌
console.log(y); // ❌
console.log(z); // ✅

// ------------------------------------------------------

/* Template literal

    Template literal is nothing but string written using backtics ( `sandesh` ) instead of quotes ( "sandesh" or 'sandesh').  

    It support multi-line string without need of \n

    It let you insert value of variable into string using $ operator
*/

// --------------------------------------------------------

/* Destructuring

    destructuring allow us to extract:
    elements from an arrays or properties from an objects
    and assign them to variables.

*/

const user = {
    name: "Sandesh",
    age: 25
};
let { name, age } = user;


const numbers = [10, 20, 30];
const [first, second, third] = numbers;

// -----------------------------------------------------------

/* Spread and Rest operators

    Both are denoted with ... ( three dots ) but serve for different purpose.

    Spread:
        It expands elements of an array or properties of an object into another array or object.
    
    Rest:
        It collects multiple remaining elements or properties into single array or objects.

        ***
        spread is at right side of an expression.
        rest is at left side of an expressiioin.
    

*/


// spread
const x = [1, 2, 3];
const y = [...x, 4, 5];

const user1 = {
    name: 'sandesh',
    age: 20
};
const user2 = {
    ...user1,
    city: 'mumbai'
}


// rest
function sum(...numbers) {
    console.log(numbers);       // [10, 20, 30]
}
sum(10, 20, 30);

const obj = {
    name: 'sandesh',
    age: 20,
    city: 'mumbai'
};
const {city, ...rest } = obj;
console.log(rest)   // { age: 20, name: 'sandesh' }


// --------------------------------------------------------------------------


/* ES modules (ESM)

    ES module allow us to split code into multiple file and 
    share functionality using export and import keywords.

    we have default export:
        which is one per file and can be imported with any name.

    we have named export:
        which can be multiple in file and must be imported using same name.

*/

// -------------------------------------------------------


