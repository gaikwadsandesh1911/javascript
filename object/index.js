/* Object

    object is a collection of key-value pairs. 
    It’s used to store related data and functions together in a structured way

    let user = { name: 'sandesh' };

    …under the hood, the JavaScript engine does something very similar to:
    
    let user = new Object();     

        👉create new empty object in memory { }
        👉Internally, this object is linked to Object.prototype.
            
        
        👉An object inherits properties and methods from Object.prototype

            👉console.log(user.__proto__);
            👉console.log(user.__proto__ == Object.prototype);    // true
            

*/

// ----------------------------------------------------------------------------------------------------

/* 
    A constructor function in JavaScript is a special function used to 
    create and initialize objects.

    🔹 Basic Idea
    Instead of creating multiple similar objects manually, [using object literal]
    we use a constructor to generate blueprint of an object.

*/

// 🔹 Creating Objects (using new)
function Person(name,age){

    // properties
    this.name = name;
    this.age = age;

    // method
    /* 
        this.greet = function () {
            console.log(`Hello, I am ${this.name}`);
        }; 
    */
    // 👉 Problem: Every object gets its own copy of greet (wastes memory)
};

/* 

    🔹 Better Approach (Prototype)
            Instead of creating the method every time:
    
    🔹 Why Prototype?
            To share methods across all objects instead of duplicating them.

        1.  Every constructor function has a prototype property, 
            on that we can create new properties or functions.

                console.log(Person.prototype);   // { greet: [Function (anonymous)] }

        2. Every object has __proto__

                console.log(user1.__proto__ === Person.prototype); // true

*/

Person.prototype.greet = function () {
    return`Hello, I am ${this.name}`
}

const user1 = new Person('john', 20);
const user2 = new Person('mark', 21);

user1.greet();
user2.greet();


// --------------------------------------------------------------

// 🔹 Modern Alternative (Class)
class Person1 {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const roman = new Person1('roman', 19);
const brock = new Person1('brock', 29);

// 👉 Under the hood, this still uses constructor functions.
//     Class is just syntactic sugar of Constructor function


// --------------------------------------------------------------------------
