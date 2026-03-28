/* 🧠this keyword..

        🔑this keyword refers to an object,
            the object that is executing current function/method.


        🧠Easy Way to Remember
        👉 "Who is calling the function?" = this.

        
        ✅1. Global Context

                👉in global context this belongs to → window
        
                    console.log(this)       // window object

                👉// because console.log()  is method of window object
                    and this is inside console.log() method


        ✅2. Inside a Regular Function( function declaration )

                👉in strict mode          ... undefined
                👉in non-strict mode      ... window

            function show() {
                console.log(this);      
            }

                👉// regular function also attach to window object
                    like variable defined with  var keyword.


        ✅3. Inside an Object Method

                👉this belongs to object who is calling that method

                const user = {
                    name: "Sandesh",
                    greet() {
                        console.log(this.name);
                    }
                };

                👉// this ... belongs to user object


        ✅4. Inside arrrow function

                👉 Arrow functions DO NOT have their own this
                    They take this from surrounding scope (lexical this)

                const user = {
                    name: "Sandesh",
                    greet: () => {
                        console.log(this.name);
                    }
                };

                user.greet();

                👉//  this  ... not belongs to user object 

        
        ✅5. Constructor Function / Class

                👉 this belongs to newly created object.

                function User(name) {
                    this.name = name;
                }

                const u1 = new User("Sandesh");
                console.log(u1.name);

                👉// this belongs to .... u1 object


        ✅6. Explicit Binding (call, apply, bind)

            👉 You manually set value of this

    
    ⚡ Quick Summary Table
                
    | Scenario            | `this` value        |
    | ------------------- | ------------------- |
    | Global              | window / {}         |
    | Function            | global / undefined  |
    | Object method       | object itself       |
    | Arrow function      | inherited (lexical) |
    | Constructor (`new`) | new object          |
    | call/apply/bind     | explicitly set      |


            
    🧠 What is Binding in JavaScript?

        👉 Binding means:
            How the value of 'this' keyword is decided for a function.

            
        🔑 Types of Binding (Core Concept)
            1. Implicit Binding     👉 Happens when a function is called through an object
            2. Explicit Binding     👉 You manually set this using: call(), apply(), bind()
            3. Default Binding      👉 When no rule applies. eg. regular function.
            4. New Binding          👉 When using new. Class, Constructor function.
        
        
        ⚡ Binding Priority (INTERVIEW GOLD)
            👉 If multiple rules apply:

            👉new binding > explicit binding > implicit binding > default binding

        
        // ---------------------------------------------------

        
    🧠Use of call(), apply() and bind()

        call(), apply(), bind(). used to control/set value of 'this' keyword in function. 
                or
        with the help of call(), apply(), bind() methods, user explicitly set the value of 'this' keyword in function.
        
        👉simple words.
            call(), apply(), bind() let us decides, which object 'this' keyword should be when function runs.
            The control is in user hand.(explicit binding)

            
            ⚡  const user = { 
                    name: 'sandesh'
                }

    
    1. call()
            call() invokes function immediately. 
            and pass values one by one

            function greet(city, country) {
                console.log(`${this.name} from ${city}, ${country}.`);   
                //  this belongs to user object.
            }

            👉greet.call(user, 'mumbai', "india");  


    2. apply()
            apply() also invoke function immediately like call()
            but arguments are passed as an array.

            function greet(city, country) {
                console.log(`${this.name} from ${city}, ${country}.`);   
            }
            👉greet.apply(user, ['mumbai', "india"]);


    3. bind()
            bind() does not invoke function immediately
            it returns new function with fixed value of this keyword,
            and arguments are also passed one by one.

            function greet(city, country) {
                console.log(`${this.name} from ${city}, ${country}.`);   
            }

            👉const newBound = greet.bind(user, 'mumbai', "india");
            👉newBound();

    
        🧠Real world use cases of call(), apply(), bind().

        ⚡. call() 

                1.  sometime one object does not have method, but another object does have.
                    we can borrow method using call().
                
                const person1 = {
                    name: 'sandesh',
                    greet: function(){
                        console.log(`hello, ${this.name}`);   
                    }
                };

                const person2 = {
                    name: 'brock'
                }

                person1.greet.call(person2)

                👉 person2 borrow method from person1


        ⚡. apply() 

                2. when arguments are already in an array.

                    function sum(a, b, c) {
                        return a + b + c;
                    }

                    const nums = [10, 20, 30];
                    console.log(sum.apply(null, nums));

                👉 Today, many apply() use cases are replaced by spread operator
                    Math.max(...numbers);

                👉 apply() is still useful when
                        You already have arguments as an array
                        You need dynamic argument forwarding
                        Working with older codebases

        
        ⚡. bind()

                1.  Fixing this in callbacks.
                
                    const user = {
                    name: "Sandesh",
                        greet() {
                            console.log(this.name);
                        }
                    };
                    setTimeout(user.greet, 1000);
                        output 👉 this is lost.


                    setTimeout(user.greet.bind(user), 1000);
                        👉 Now this always refers to user

                    setTimeout(() => user.greet(), 1000);
                        👉 Modern JS often prefers arrow functions

                
                2. you fix some arguments now, and pass the rest later

                    function add(a, b) {
                    return a + b;
                    }

                    const add5 = add.bind(null, 5);

                    console.log(add5(10)); // 15

                    👉 What happened:
                        5 is fixed as a
                        Later you pass b = 10
                        

                function greet(greeting, name) {
                    console.log(greeting + " " + name);
                }

                const sayHello = greet.bind(null, "Hello");

                sayHello("Sandesh"); // Hello Sandesh
                sayHello("Rahul");   // Hello Rahul


*/







