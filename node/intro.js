/*  what is node.js

        Node.js is js runtime built on google chrome's v8 engine,
        which allow us to run js on server side.

*/

/*  runtime

    runtime is system or environment which provides all necessory component
    to run and execute code.

*/

/* Node.js arch.

    There are three main componets of Node.js runtime:

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
                and their callback wait for their execution on one
                of the four phases of event loop.

                by defualt we have 4 threads in thread pool


        Apart from four phases of event loop, there are two more queue
            - process.nextTick()
            - Promise queue that is (Microtask queue)

            process.nextTick() has higher priority.

*/

console.log("Start");

setTimeout(() => {
    console.log("setTimeout");
}, 0);

setImmediate(() => {
    console.log("setImmediate");
});

fs.readFile(__filename, () => {
    
    console.log("File read");

    process.nextTick(() => {
        console.log("nextTick inside I/O");
    });

    Promise.resolve().then(() => {
        console.log("Promise inside I/O");
    });
});

process.nextTick(() => {
    console.log("nextTick");
});

Promise.resolve().then(() => {
    console.log("Promise");
});

console.log("End");


/*  Start
    End
    nextTick
    Promise
    setTimeout / setImmediate
    File read
    nextTick inside I/O
    Promise inside I/O

            
    Order between setTimeout and setImmediate can not be  guranteed on top level it depends on os
        
    inside poll phase setImmediate() runs before setTimeout().

    if we have to perform something immediately after I/O ( polling ) opration setImmediate() is used 
        
*/
             