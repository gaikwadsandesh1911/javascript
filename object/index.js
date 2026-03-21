/* 
    object is a collection of key-value pairs. 
    It’s used to store related data and functions together in a structured way

    let obj = { name: 'sandesh' };

    …under the hood, the JavaScript engine does something very similar to:
    
    let obj = new Object();     

            create new empty object in memory { }
            Internally, this object is linked to Object.prototype
            
            so, obj can access all properties of Object.prototype

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

    // property
    this.name = name;
    this.age = age;

    // create method
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

        1. Every constructor function has a prototype property, on that we can create new property or function.
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


// --------------------------------------------------------------------------
