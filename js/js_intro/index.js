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

