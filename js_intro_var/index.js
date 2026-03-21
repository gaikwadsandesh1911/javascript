/* 

    Javascript
        javascript is programming language. It has syntax and rules.
        But by itself alone, It can not be run or execute.
        It needs Runtime Environment.

    Runtime Environment
        Runtime environment is a system which execute javascript code,
        and provide all the necessory resources to execute the code.
        
        On Client-Side 'Browser' is Runtime Environment which execute js code.
        On Server-Side 'nodejs' is Runtime Environment.
*/

// ---------------------------------------------------------------------------------------------------------

/* 
    Javscript is synchronous, dynamically typed, single-threaded programming language.

        🔵synchronous 
            code execute line-by-line, next line can not be executed untill the current line finishes its execution.

        🔵Dynamically typed language  vs Statically typed language

            1️⃣.  
                👉A dynamically typed language variable types decided at runtime. ( javascript )
                👉A statically typed language variable types decided at compile time. ( Java )

            2️⃣. 
                👉In Dynamic type language only value has type. variable has no type. variable can hold value of any data type.
                👉In Static type language variable and value both have type. variable can not hold value of any data type

                let a = "sandesh"       // a hold string
                a = 19                  // a become number type
                //    variable can also change its type dynamically.

        🔵Single Thread
            on client side Browser execute js code.
            Every Browser has got js engine( computer program ). Chrome has js engine called V8.
            That js engine has got something called [ Call Stack ] which execute all the js code. which runs on single main thread.
            Thats why js called single threaded language.

            If that single thread is block everything is block,
            That single thread also responsible for creating DOM, CSSOM.

        
        But To achieve asynchronization Browser provide resources like,
            👉Web Api ( timers, fetch, DOM API, console ) they runs on different threads.
            👉Callback Queue( callback functions => function from timers, eventListners )
            👉MicroTask Queue (Promise, fetch (.then, .catch) ) 
            👉Event loop (pulls functions from these queues and push to Call Stack when call stack is empty)
                * microtask queue has higher priority. which get executed before callback queue

        
        🔵run and execution.
        
            setTimeout(()=>{
            },1000)

            setTimeout(, 1000)      => timing  runs in background ( web api )
            ()=>{}                  => callback executed on main thread => processor(core)
        
            
--------------------------------------------------------------------------
        
        🔁Js Engine (separate embedded program) in browser.

        🔁js Engine has got.

            🎯Stack( Call Stack ) -     primitive type stores  in stack memory

            🎯Heap memory -             reference type (array, object, function as an object) stores in Heap memory. 
                                        It's unstructured memory pool which grows dynamically.      


            🔹let a = 19;     
                👉a → stored directly in stack

            🔹let obj = { name: "sandesh" };
                👉obj → is reference(memory address like 0x123) stores in stack
                👉the actual object { name: "sandesh" } → stores in heap

            🔹function greet() {
                console.log("Hello");
            }

            Stack:                Heap:
            ------                ------
            a = 10                
            
            obj = 0x123         { name: "JS" }

            greet(reference)    function() { console.log("Hello") }

------------------------------------------------------------------------

            greet(); when fun call.
                👉 Now something new happens:

                    A new execution context is created
                    It is pushed into the Call Stack
                    | Part                                  | Where      |
                    | --------------------------------------| ---------- |
                    | Function definition                   | Heap       |
                    | Function reference                    | Stack      |
                    | Function execution [calling function] | Call Stack |

-----------------------------------------------------------------------------------------

            🎯 Final Correct Statement

            👉Primitive values are stored directly in the stack, 
            👉while reference types like objects and arrays are stored in the heap, with their references kept in the stack.”

            👉“The JavaScript engine uses a [ call stack ] for execution.

            -----------------------------------------------------------------------------------------

            🎯Stack contain [ execution context ] where program executed LIFO manner.
            
                    👉As a program runs GEC( Global  Execution Context ) is created. There is only one GEC.
                        This GEC stores all top level variables, functions which are not inside any other functions and get executed
                        
                    👉Every time function is called new execution context is created for that function
                        where that function get executed.
                    
        
*/

// ------------------------------------------------------------------------------------------------------------------

/* 
    🎯Process and Thread

        Process
                is running instance of your program. 
                When you run program Operating system create process.
                    👉Allocates memory (RAM)
                    👉Load program code.                  
                eg. when you open chrome. It becomes process.
        
        Thread  
                is smallest unit of execution withing process.
                    👉Every process has atleas 1 main thread 
                    👉can have multiple worker threads and background threads.
        
        CPU(processor)
                    👉process gets instruction from ram
                    👉processor has cores where threads get executed
                    👉OS decides which thread runs where
                    👉one cpu core one thread at a time

                    Time-Slicing and Context-Switching Operating System Concept.

*/

// ---------------------------------------------------------------------------------------------------------------

/* 
    🎯HIgh-Level Language
            The program which we write is using any programming language like c, c++, java, javascript etx.
            is called high level programming language, which is readable and understandable by human.
    
    🎯Machine Code
            But computer processor does not understand high-level language, It only understand 0's and 1's
            So in order to get it execute on processor, code need to be converted into 0's and 1's
            This converted code is called 'machine code'
            
            ** This conversion is happen either by 'Compilation process' or 'Interpretation process',
                But modern js,use mixed of both called 'just-in-time' compilation.

    🎯Compilation process( compiler is use )
            Entire source code get converted into machine code once and stored on separated file.
            And then this machine code can be executed any time on  operating system.

                in java
                    Hello.java =>   source code
                    Hello.class =>  byte code generated by javac ( compile time ). platform-independant
                    and then jvm convert .class file into machine code at runtime java

    🎯Interpretaion process( Interpreter is use )
            Source code get converted into machine code line by line and execured.
            first line  converted and executed, then comes to second line.

    🎯Just-In-Time compilation(moder js)
            Entire source code converted into machine code once but not store on separate file
            it get executed immediately

// ---------------------------------------------------------------------------------------------------------------
    
    🎯javascript code Execution
            As we run js code. js engine comes in pic.

                1.  It parse (read) code. not get executed.
                    if error occurs stop parsing and throw error.

                2.  if no error, it produces (AST) abastact syntax tree.

                3.  Just-in-time compiler get AST and generate machine code.

                4.  and this machine code get executed by js engine on call stack .

                5.  we not done yet. 
                        To get execute as soon as possible,
                        In the beginning js engine do not create optimize version of machine code,

                        But in the background this machine code get optimize and recompile  
                        during already running program execution. 
                        This happen multiple time. un-optimize code swap with optimized code.

                        🎯This process modern js engine like V8 makes so fast.
                        

*/