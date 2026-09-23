/* javascript introduction.

    JS is one of the most widely used web development languages.
    created by Brenden Eich in 1995.

    It was created with the intension of being used in browser.
    But now can be run on the server and 
    on almost any device that has the JavaScript Engine installed.

    A language that was originally designed to build dynamic web pages.
    Today, server side version of js known as Node.js is available to create:
        real-time application, streaming applications and video games.

    ** A script is a JS program that may be added to the HTML of any web page

*/

// ---------------------------------------------------------------------------------------------------------

/* 🎯   What is javascript ?

        Javscript is synchronous, single-threaded, dynamically typed, object-oriented programming language.

        synchronous 
            code execute line-by-line, 
            next line can not be executed untill the current line finishes its execution.


        Dynamically typed language  vs Statically typed language


            1️⃣ In Dynamic type language ( javascript ) only value has type. variable has no type. 
                variable can hold value of any data type. 

                        let a = "sandesh"       // a hold string
                        a = 19                  // a become number type, variable can also change its type dynamically.

                In Static type language ( java ) variable and value both have type. 
                    variable can not hold value of any data type. 
            
                        int num = 20;
                        num = 'twenty'  // error

            2️⃣ A dynamically typed language variable types decided at runtime. ( javascript )

                A statically typed language variable types decided at compile time. ( Java )


        🔵Single Threaded
                ❗   js code is executed on single main thread 
                    Thats why js called single threaded language.

            Engines like V8 may use multiple threads for:
                    Garbage collection
                    JIT compilation
                    Optimization

            ❗ BUT:
            👉 These threads do NOT execute your JS code directly

            ❗If that single thread is block everything is block,
            That single thread also responsible for creating DOM, CSSOM.

        
*/ 

