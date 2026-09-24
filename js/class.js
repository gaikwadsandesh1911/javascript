/* Class

    a class is blueprint(template) for creating an object.
    It defines properties(data) and methods(functions) that every object will have created from that class.

    If we have to create multiple objects with simillar properties and methods class is used.
    so we do not have repeated code.
*/ 

class User {

    static company = 'Google';

    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    // instance method
    getDetails() {
        return `${this.name} - ${this.email}`
    }

    // static method
    static isValidEmail(email) {
        return email.includes("@")
    }
};

const user = new User('sandesh', 'sandesh@gmail.com');
user.getDetails();

// invoke static method.
User.isValidEmail('sandesh@gmail.com')

/* this

    this refers to the current object.

*/

/* constructor

    constructor is special method in class that runs automatically when 
    object is created using "new" keyword.

*/

/* static property or static method

    static method or property bolongs to an class and not to an perticular object.
    we can access static property or call static method directly on class.

    static property is used when value is common to class
    rather than different for each object 

    static method is useful for utility operations like validation.
    static method prevent us from creating un-neccesory object.

*/

// ------------------------------------------------------------------


/* private property, Getter and Setter

    private property: 
        can not be accessed outside of the class. can be accessed within that class only.


    Getter:  
        A getter is a method used to read or retrieve the value of a property.

    Setter:
        A setter is a method used to set or update the value of a property.



*/

class BankAccouunt {

    #balance

    constructor(balance) {
        this.#balance = balance;
    }
    
    // Getter
    get balance() {
        return this.#balance;
    }

    // setter
    set balance(amount) {
        this.#balance += amount;
    }

    withdraw(amount) {
        if(amount > this.#balance){
            console.log("Insufficient balance.")
            return;
        }
        this.#balance -= amount;
    }
}

const accountHolder = new BankAccouunt(1000);

// accountHolder.#balance    // error.. can not access private property outside class

accountHolder.balance = 5000; // accessing public setter

console.log(accountHolder.balance); // accessing public getter.

accountHolder.withdraw(1000);   //


// --------------------------------------------------------------

/* OOPs ( Object Oriented Programming )

    Its programming paradigm, where we organize program around Objects.
    which contains data(properties) and method(function)

    There are four pillars of OOPs:


        Abstraction:
            Hiding the internal implementation details and exposing only the essential functionality to the user.
                eg. we dont know what withdraw() method does.


        Encapsulation:
            Its process of bundling data and related method inside a class and
            restricting direct access to internal data outside class.
                eg. we make the balance property private and allow it to be accessed or modified only through methods like deposit() or withdraw().


        Inheritance:
            child class can acquire properties and method of parent class.

            1. single:      One child inherits from one parent.
            2. multilevel:  class inherits from a class, and another class inherits from that child
            3. multiple:    one child inherits from multiple parent. ** js does not support.
            4. Hierarchical: multiple child inherits from same parent.
        
        Polymorphism:
            means "many forms".
            It allow same method behave differently depending on the object that uses it.
*/

// --------------------------------------------------------

/* super, method overloading and mehtod overriding.


    super():
        is used inside child class to access parent class constructor or method.


    Method Overloading:
        means having multiple methods with the same name but different parameters.

            ** js does not support traditional method overloading.
               we achieve simillar behaviour using optional parameter with default value.

            
    Method Overriding:
        when a child class provides its own implementation of a method 
        that is already exists in the parent class.

*/

// super

class Animal {
    constructor(name) {
        this.name = name;
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);    // calling constructor of parent class
        this.breed = breed;
    }
}

const dog = new Dog("Tommy", "Labrador");

console.log(dog.name);  // Tommy
console.log(dog.breed); // Labrador


// ------------------------------------

// method overloading

class Calculator {
    add(a, b) {
        return a + b;
    }

    add(a, b, c) {
        return a + b + c;
    }
}

// the second add() replaces the first one.

// we can achieve simillar 

class Calculator {
    add(a, b, c = 0) {
        return a + b + c;
    }
}

const calc = new Calculator();

console.log(calc.add(10, 20));     // 30
console.log(calc.add(10, 20, 30)); // 60

// ---------------------------------------------

// method overriding

class Animal {
    sound() {
        console.log("Animal makes a sound");
    }
}

class Dog extends Animal {
    sound() {
        super.sound()   // calling method of parent class.
        console.log("Dog barks");
    }
}

const dog1 = new Dog();

dog1.sound(); 

// Animal makes a sound
// Dog barks

// ------------------------------------------