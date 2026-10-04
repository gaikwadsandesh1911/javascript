/* Prototype

    A prototype is an object from which another object can inherit properties and methods.

    JavaScript uses the prototype chain:
    to look for a property or method when it is not found directly on the object.

    and if not found in prototype chain return null.

*/
const arr = [1, 2, 3];
arr.push(4);

/* 
    we didn't define push(). JavaScript finds it through the prototype chain:

    prototype chain:
        arr  ->  Array.prototype  ->  Object.prototype ->  null

        
| Data type | Prototype          | Example methods                                |
| --------- | ------------------ | ---------------------------------------------- |
| Array     | `Array.prototype`  | `push()`, `pop()`, `map()`, `filter()`         |
| String    | `String.prototype` | `toUpperCase()`, `toLowerCase()`, `includes()` |
| Object    | `Object.prototype` | `toString()`, `hasOwnProperty()`               |


Object.prototype is the base prototype object in JavaScript. 
Most JavaScript objects ultimately inherit from it.

*/
