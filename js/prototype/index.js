/* 🧠 What is Prototype.
    
    In JavaScript, every object has a hidden property called [[Prototype]] 
    (accessible via __proto__). property

    👉eg. 
        const user = {
            name: 'sandesh',
            role: 'admin'
        }
        console.log(user.__proto__)

    👉The prototype allows us to use properties and methods on an object 
        even if the properties and methods do not exist on the current object.

    👉If a property / method is not found in an current object, 
        JS looks up the chain: called prototype chain



        🔹let user = {
            name: 'sandesh',
            role: 'admin'
        }

        🔹const arr = [1, 2, 3, 4, 5];

        🔹function greet () {

        }


        🔹object inherits properties from Object.prototype

        🔹array object inherits properties from Array.prototype

        🔹even function is considered as an object, 
            thats why we call methods on it like call(), apply(), bind()
            function inherits properties from Function.prototype

        console.log(typeof user)        // object
        console.log(typeof arr);        // object
        console.log(typeof greet);      // function


        console.log(user.__proto__ == Object.prototype)         // true
        👉user → Object.prototype → null                    // object prototype chain
        
        console.log(arr.__proto__ == Array.prototype)           // true
        console.log(arr.__proto__.__proto__.__proto__)
        👉arr → Array.prototype → Object.prototype → null     // array prototype chain

        console.log(greet.__proto__ == Function.prototype)  // true 
        console.log(greet.__proto__.__proto__.__proto__)
        👉greet → Function.prototype → Object.prototype → null
    
*/

// ------------------------------------------------------------

/*  ✅constructor function.
 
    🔹A constructor function in JavaScript is a special function used to 
    create and initialize objects.

    🔹 Basic Idea
    Instead of creating multiple similar objects manually, [using object literal]
    we use a constructor to generate blueprint of an object.


    function Person(name,age){

        this.name = name;
        this.age = age;
    
        this.greet = function () {
            console.log(`Hello, I am ${this.name}`);
        };
        // 👉 Problem: Every object gets its own copy of greet (wastes memory).
            The better approach use prototype
    } 
    

        👉 Every constructor function has prototype property on that we can create properties and method
            so that method or property will available to all object. 

            Person.prototype.greet = function () {
                return`Hello, I am ${this.name}`
            };

            const user1 = new Person('john', 20);
            const user2 = new Person('mark', 21);

            user1.greet();
            user2.greet();
*/

/* ✅ modern alternative way of constructor function is class

        class Person1 {
            constructor(name, age) {
                this.name = name;
                this.age = age;
            }
            greet() {
                console.log(`hello..${this.name}`);
                
            }
        
        }

        const roman = new Person1('roman', 19);
        const brock = new Person1('brock', 29);
        roman.greet();
        brock.greet();

        
        👉 Under the hood, this still uses constructor functions.
        Class is just syntactic sugar of Constructor function

*/





       







