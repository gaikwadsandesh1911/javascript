/* javascript introduction.

    JS is one of the most widely used web development languages.

    It was created with the intension of to be used in browser, and make Web pages interactive.

    later on server side version of js introduced with node.js runtime environment
  
    its synchronous, single threaded, dynamically  typed, object oriented programming language.


    Synchronous:
        js code executed line-by-line, 
        next line can not be executed untill the current line finishes its execution.


    Dynamically typed language  vs Statically typed language:

        - In Dynamic type language ( javascript ) only value has type. variable has no type. 
          variable can hold value of any data type. 

          let a = "sandesh"       // a hold string
          a = 19                  // a become number type, variable can also change its type dynamically.

        - In Static type language ( java ) variable and value both have type. 
           variable can not hold value of any data type. 
            
           int num = 20;
           num = 'twenty'  // error

        - A dynamically typed language variable types decided at runtime. ( javascript )

        A statically typed language variable types decided at compile time. ( Java )


     Single Threaded:
        js code is executed on single main thread 

        Engines like V8 may use multiple threads for:
        Garbage collection, JIT compilation, Optimization

        BUT, These threads do NOT execute your JS code directly
        If that single thread is block everything is block, That single thread also responsible for creating DOM, CSSOM.
        
    Object oriented:
        object oriented its programming approach where we design our program around object.

        
*/ 

// ---------------------------------------------------------

/*  JS Runtime Environment
        
        Javascript has syntax and rules, But by itself alone, It can not be run or execute.
        It needs Runtime Environment.

        Runtime Environment
            Runtime environment is a system,
            which provides all necessay components in order to use and run js program.
        
            On Client-Side 'Browser' is Runtime Environment.
            On Server-Side 'Node.js' is Runtime Environment.

    However basic structure of Runtime Environment remain same.

*/


/*  In case of browser it has four main component:

        1.  JS Engine
        2.  Web API ( DOM, Timer, fetch, console.log() )
        3.  Callback Queue and Microtask Queue
        4.  Event Loop.

    1. JS Engine:

        js engine is heart of any js runtime. 
        It's simple computer program which execute js code.

        JS Engine will always have: Call Stack and Heap.

            1. Call Stack: which stores primitive data types, reference of an object and 
                           also manages function execution.

            2. Heap: stores object and other dynamically updated data.

                let name = "sandesh"
                name = "sandesh"   →     stored on stack.

                // ----------------------------------

                let user = {
                    name: "Sandesh",
                };
                user                → stores in stack
                { name: "sandesh" } → stores in heap

                
                function greet() {
                    console.log("Hello");
                }
                greet(reference)  -> stores in stack 
                function() { console.log("Hello") }  -> stores in  Heap

                
    
    2. Web API's:

        Browser provides web api's such as Dom api, fetch api, timer functions, console.log() function. 
        It provides extra functionality to js engine, which is not part of js language itself.
        js simply get access to these api's through global window object.


    3. Callback Queue and Microtask Queue

        they are data structures that stores, callback functions of events and promises.

            callback function of events and timers function wait for their execution in  callback queue.
            callback function of promise wait for their execution in microtask queue.

            microtask queue has higher priority than callback queue.


    4. Event loop

        Event loop co-ordinate with Call Stack and these Callback and Microtask Queue.
        Event loop continuosly monitor main therad and 
        once it is empty it pushes these callback function to Call Stack to get it executed.


*/


/*  In case of Node.js it has three main component:

        1.  JS Engine

        2.  Node.js core modules
                - http module
                - file system module
                - os module
                - etc
                
        3. LIBUV
                - event loop,
                - thread pool

        
            Event loop has four phases:
                1.  Timer pahse (setTimeout, setInterval)
                2.  Polling phase (file/network)
                3.  Check pahse(setImmediate)
                4.  Close phase (for closing connection)

            Thread pool:
                collectioin of threads. where async operation are happens
                and their callback wait for their execution on one of the four phases of event loop.

                by defualt we have 4 threads in thread pool.


        Apart from four phases of event loop, there are two more queue
            - process.nextTick()
            - Promise queue that is (Microtask queue)

            process.nextTick() has higher priority.


*/


// ---------------------------------------------------------

/* Execution of Call Stack:

-   Call stack follows LIFO ( Last in First out ) principle.

    Execution Context:
        Execution Context is an environment where javascript code is executed.

    we have two types of Execution Context:

        1. Global Execution Context ( GEC )
            When first time program runs, js engine creates Global Execution Context (GEC) and pushed first into Call Stack
            which is remain there till program ends
            
        2. Function Execution Context
            Every time function is called new function execution context is created for that function on top of GEC.
            After the function finishes execution, its Execution Context is removed (popped) from the Call Stack.


    we have two Phases of Execution Context:

        1. Declaration phase( memory creation phase ):
            js parse your code and setup memory, during this phase:
                - variables are declared.
                - functions are stored in memory.

                    variable is declared with var keyword assigned "undefined" value in memory creation phase.
                    variable declared with let and const, assigned value in execution phase.
                                         
                        
        2. Execution phase ( Initialization phase ):
            js engine execute code line by line.
                values are assigned to let and const. variable with var keyword replace with provided value
                expressions are evaluted.

*/

// ---------------------------------------------------------

/* javascript code Execution:
        As we run js code. js engine comes in picture.

            1.  It parse (read) code. not get executed.
                if error occurs stop parsing and throw error.

            2.  if no error, it produces (AST) abastact syntax tree. It's tree like structure.

            3.  Just-in-time compiler get AST and generate machine code.

            4.  and this machine code get executed by js engine using single main theread on call stack .

            5.  we not done yet. 
                    To get execute as soon as possible,
                    In the beginning js engine do not create fully-optimize version of machine code,

                    But in the background ( during already running program execution ) 
                    This machine code get optimize and recompile again and again  
                    where un-optimize code swap with optimized code.
                        
                    This process makes, modern js engine like V8 so fast.
                        
*/
