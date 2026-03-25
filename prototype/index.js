/* 🧠 What is Prototype.
    
    In JavaScript, every object has a hidden property called [[Prototype]] 
    (accessible via __proto__). property

    👉It allows objects to inherit properties and methods from other objects.

    👉If a property / mehtod is not found in an object, 
        JS looks up the chain: called prototype chain

*/

let user = {
    name: 'sandesh',
    role: 'admin'
}

/* 
    
*/

const arr = [1, 2, 3, 4, 5];

function greet () {

}


/*      console.log(typeof user)        // object
        console.log(typeof arr);        // object
        console.log(typeof greet);      // function



        console.log(user.__proto__ == Object.prototype)     // true

        console.log(arr.__proto__ == Array.prototype)       // true

        console.log(greet.__proto__ == Function.prototype)  // true */


console.log(typeof user)        // object
console.log(user.__proto__);
console.log(user.__proto__);
console.log(user.__proto__ == Object.prototype)


const name = 'sandeh'
console.log(name.__proto__ == String.prototype);





