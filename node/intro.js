/* 🔹 What is Node.js

        Node.js is  runtime environment for javascript built on Google Chrome V8 Engine.
        that allows us to run JavaScript on the server-side.

        👉Runtime Environment
            is a system that execute code and provide all the necessary resources,
            to execute the code.
            like fs module, http module, os module, event loop,  etc.

    🔹Node js uses :
    
        💡single threaded, 
        💡event driven 
        💡non-blocking  ...  architecture


        👉single threaded 

            Node.js is single-threaded means,

            Both the event loop and V8 engine run on the same thread.

            Event loop handle all incoming requests, manages scheduling and callbacks, 
            
            while the V8 engine executes JavaScript code.
            

                ** Java / spring boot create a new thread per request like


        👉event driven
                
                "Node.js follows an event-driven architecture,

                where any actions like ( User sends request, Database responds, Response sent to user ) 
                trigger events and listener functions handle them asynchronously. 
                
                When an event occurs, the event loop picks the corresponding callback 
                and executes it without blocking other operations."

        
        👉non-blocking

                "Node.js follows a non-blocking I/O model,

                meaning it does not wait for operations like file handling, 
                database calls, or API requests to complete. 
                
                Instead, these operations are handled asynchronously —
                    some by the OS (like network I/O) 
                    and some by the thread pool (like file system or crypto). 
                
                Once the operation completes, 
                    its callback is queued in correspong the event loop phase
                    and executed on the main thread by the V8 engine. 
                
                This allows Node.js to handle multiple operations concurrently 
                without blocking the thread."”

*/


/* 🔹 Node.js Architecture

    Node.js is built on two main components:

        1. V8 Engine 

             which execute js code on single main thread.

        2. libuv Library

            libuv has two components: 

            a.  Event loop

            b.  Thread pool(default size = 4)


            ✅Thread pool

                "Event loop offloads only blocking operations like 

                    file system   
                    Crypto ( CPU-intensive tasks )
                    Compression ( zlib )

                to the thread pool
            
                once task complete -> callback queued in event loop for their execution on main thread.

                [ other async operations like network I/O, timeres are handled by the OS." ]

            ✅Event loop

                👉 "Once a background operation (thread pool / OS) completes, 
                its callback is queued in the appropriate event loop phase, 
                where it is later executed by js engine."

                Event loop has 4 main phase and each phase has its own callback queue.

                    1. Timers Phase  
                        setTimeout()
                        setInterval()

                    2. Polling Phase
                        I/O operations like (fileSystem, DB, Network). most busy one

                    3. check phase
                        setImmediate()

                    4. close callback
                        server.close()
                        socket.on('close', ()=> {})

                ✅Event loop also has 2 most important Microtask Queues
                    they have higher proirity than these 4 phases

                    1. process.nextTick()  - highes priority than Promise
                    2. Promise(.then, catch) 


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


                Start
                End
                nextTick
                Promise
                setTimeout / setImmediate
                File read
                nextTick inside I/O
                Promise inside I/O

            
        🔥Order between setTimeout and setImmediate can not be  guranteed on top level it depends on os
        but

        inside an I/O callback (executed in poll phase), setImmediate() runs before setTimeout()

        if we have to perform something immediately after I/O ( polling ) opration setImmediate() is used
             

*/


/* 🔹 What is REPL in Node.js?
    
        REPL stands for:
            Read → Eval → Print → Loop

        👉 It is an interactive shell provided by Node.js to execute JavaScript code
            It’s mainly used for quick testing and debugging.”

        1. Read
            Takes user input (your code)

        2. Eval (Evaluate)
            Executes the code using the Google Chrome V8 Engine
        
        3. Print
            Outputs the result

        4. Loop
            Waits for next input again

        
        🔹 How to start REPL

            👉 In terminal: type  =>   node
                    now you can write js code in terminal

*/


/* 🔹Event Driven Arch. In general.

        Event-Driven Architecture is a design pattern where 
        systems communicate by producing and consuming events.


        👉Something happens → event  ( Publisher )
                eg. user login, order placed

        👉Other parts react to an event → listeners/handlers function ( Subscriber )


        🔹 Core Components of EDA

            1. Event Producer (Publisher) - creates event.

            2. Event Consumer (Subscriber) - Listen and reacts to event

            3. Event Broker - manage event between different services( microservice )
                    eg. Apache Kafka, RabbitMQ


        💡“Node.js itself follows an event-driven arch using "events" module,
            with the help of EventEmitter class...

            
            import { EventEmitter } from "events";

            const emitter = new EventEmitter();

            👉new EventEmitter ()        
                create instance of EventEmitter class,
                which allow us to handle custom events

            👉on()            
                method listen to event, and recieve data. 

            👉emit()             
                method trigger an event

                
                emitter.on("greet", (data) => { console.log(data) } )

                emitter.emit("greet", 'send any type of data');

                    ** "greet" is name of an event

                👉 "EventEmitter is synchronous and does not store events, 
                    so listeners must be registered before emitting; 
                    otherwise, the event is lost."


            👉we can attach multiple event-listners for same event.

                    emitter.on("greet", () => {
                        console.log("Hello");
                    });

                    emitter.on("greet", () => {
                        console.log("Hi");
                    });

                    emitter.emit("greet");


            👉we have different methods on emitter. .... chatgpt it.


            👉if we need to remove listner then we have to define callback separetaly.

                const fn = () => console.log("Hello");
                emitter.on("greet", fn);
                emitter.off("greet", fn);       // remove
            
*/


/* 🔹Process.

            In general process is running instance of your application.
            when we run node application os create process regarding your node js application.

        👉In Node.js process is global object, which provides information
            about current running node.js application(process)

            👉console.log(process.pid);

            process help you in :

                👉Access environment variables
                👉Communicate between processes


        👉we have process level events.

            🔹 1. uncaughtException    => catch sync error only

                    Triggered when: synchronous error is not caught by try...catch

                    👉throw new Error("Something broke!");   // its sync error

                    process.on("uncaughtException", (err) => {
                        console.log("Caught:", err.message);
                    });

            
            🔹 2. unhandledRejection   => catch async error only

                    Triggered when: A Promise is rejected and not handled with .catch()

                    👉Promise.reject("Error happened");     // its async error.

                    process.on("unhandledRejection", (err) => {
                        console.log("Unhandled:", err);
                    });



                    🎯"uncaughtException and unhandledRejection 
                    are global error handlers in Node.js,

                    used as a fallback mechanism, 
                    not as a primary error-handling strategy."



        👉we have,   "SIGINT and SIGTERM 
                OS signals used in Node.js to perform graceful shutdown.

            🔹 SIGINT

                Triggered by Ctrl + C (manual stop)

                Used during development

            🔹 SIGTERM

                Sent by:
                    Docker
                    Kubernetes
                    Production servers

                    Used for controlled shutdown

            🔄 What is Graceful Shutdown?
                    👉 Instead of killing app immediately ❌

                    Stop accepting new requests
                    Finish ongoing requests
                    Close DB connections
                    Close Server
                    Exit process



                process.on("SIGTERM", () => {
                    console.log("Shutting down...");

                    server.close(() => {
                        console.log("Server closed");
                        process.exit(0);
                    });
                });


                process.exit(0); // success
                process.exit(1); // error


*/


/* 🔹 Cluster

        The cluster module allows Node.js to create multiple worker processes
        to utilize multi-core CPUs.

    🔹 Why Cluster is Needed?

        👉 suppose we installed our node server on system.
            system cpu has multiple core.  

        👉 By default:

            Node.js is single-threaded
            Uses only one CPU core ❌

            we are waisting our resources by not utilizing it.

        👉 Solution:

            Use cluster to run multiple instances of your app

        🔥 How Cluster Works

            👉 One Master Process + Multiple Worker Processes.

                Master → manages workers

                Workers → handle requests

            👉 All workers share the same port


        🔹 Load Balancing

            👉 Node.js cluster does:

                Round-robin (default in most OS)

            👉 So:

                Request 1 → Worker 1

                Request 2 → Worker 2


        🔹 Key Benefits

            ✅ Uses all CPU cores
            ✅ Improves performance
            ✅ Handles more concurrent users
            ✅ Better scalability

        🔹 Important Points (🔥 Interview)
            1. Workers are separate processes
                has its Own memory
                has its Own event loop

        🔹 Real-World Use

            👉 Used in:

            High-traffic APIs
            Production servers
            Microservices

        🔹 Cluster vs PM2 (🔥 Common Question)

            👉 Cluster

                Built-in Node module
                Manual setup

            👉 PM2

                Process manager
                Handles clustering automatically


        🔹 What is PM2

            PM2 is a process manager for Node.js applications used to 
            run, monitor, and manage apps in production.


        🔹“In production, we rarely use raw cluster module directly — 
        we use PM2 because it simplifies process management and adds reliability.”

        ❌ No, you do NOT write PM2 code inside your Express app
        👉 It runs outside your app and manages it from the command line.

*/


/* 🔹 1. Worker Threads

        👉 developer create worker thread by programming,
            to perform CPU-intensive tasks like image processing, Large computing.

        👉Worker Thread → runs inside same process (shared memory)

            each worker thread have their own v8 instance, execution context and event loop
        
            but cannot directly handle HTTP responses. 
            The result is sent back to the main thread, 
            which then sends the response to the client.”

                ** chatgpt for program...

    
    🔹 we have four thread in thread pool

            👉they do not have their own v8 instance, execution context and event loop
*/


/* 🔹Stream

        👉A stream is a way to handle data piece by piece (in chunks) 
        instead of loading the entire data into system memory

        👉 Without streams ❌

            File is fully loaded → high memory usage

        👉 With streams ✅

            Data processed in chunks → efficient & fast

        🔥 Real-Life Example

            ❌ Download full movie → then watch
            ✅ Stream movie → watch while downloading

        
        🔹 Key Benefits

            ✅ Memory efficient
            ✅ Faster processing
            ✅ Handles large files
            ✅ Works well with real-time data

        🔹 chatgpt streams used on files.

        🔹 req and res are streams:
                req → Readable stream
                res → Writable stream


        🔹Backpressure => see details
*/


/* 🌐 How the Web Works

        🔹 1. You Enter a URL

            👉 Browser breaks url into:

                1. Protocol → HTTPS

                2. Domain → google.com

        Request is not sent directly to our node or java server.
        Browser has to resolve domain name to ip address first

        it send request to dns [ domain name server. ]
        it is like phone book of an internet 
        which stores ip address of domain names.

        so dns matches the domain to correspondin ip address.
        hence, dns is resolved
        
    
        🔹 . TCP Connection (Handshake)

                Once DNS is resolve a TCP/IP socket connection is made
                between browser and server.

            👉 Browser connects to server using TCP

                3-way handshake:
                    SYN
                    SYN-ACK
                    ACK

            ✅TCP/IP Connection established. and 
            It kept alive entire time for send the req and recive the res

        
            ✅TCP/IP  => transmission control protocol / internet protocol  
            Together they are communication protocol they define how data transfer across the web.
        
                    These are internet fundamental.

            
        🔹 4. HTTPS

                now finally https req is sent.


        🔹 5. Server Handles Request
                👉 Server (could be Node.js, Java, etc.):
                    
                    Receives request
                    Processes logic
                    Talks to database if needed
                    Prepares response

        🔹 6. HTTP Response 

                is sent back to browser

        🔹 7. Browser Rendering

*/


