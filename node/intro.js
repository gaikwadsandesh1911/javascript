/*  🔹 What is Node.js

        Node js is a runtime environment built on Google Chrome V8 Engine.
        that allows us to run JavaScript on the server-side.

        👉Runtime Environment
            is a system that execute code and provide all the necessary resources.
            like fs module, http module, os module etc.
            to execute the code.

    🔹Node js uses :
    
        💡single threaded, 
        💡event driven 
        💡non-blocking


        👉single threaded 
                One worker (thread) handles all requests.
                It does not create a new thread per request like Java/Spring

            “Node.js executes JavaScript in a single thread, 
            but still handles multiple requests efficiently using async mechanisms.”


        👉event driven
                Node.js works based on events (actions) and listeners (responses).

                👉 Real-world example:

                    User sends request → event triggered
                    Database responds → another event
                    Response sent → another event

                👉 Interview Insight:

                “Node.js uses an event-driven architecture 
                where actions trigger events, and listeners handle them asynchronously.”

        
        👉non-blocking
                Node.js does not wait for operations like file reading, DB calls, API calls.
                
                “Non-blocking I/O allows Node.js to handle multiple operations concurrently 
                without waiting for each to finish.”

*/


/* 🔹 Node.js Architecture

    Node.js is built on two main components:

        1. V8 Engine

        2. libuv Library

            libuv has : 

            a.  Event loop

            b.  Thread pool


            Thread pool execute async task,
            
            once task complete -> callback queued in event loop.

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

            👉 In terminal:  node
                    now you can write js code in terminal

*/


/* 🌐 How the Web Works

        🔹 1. You Enter a URL

            👉 Browser breaks it into:

                Protocol → HTTPS
                Domain → example.com

        Request is not sent directly to server.
        Browser has to resolve domain name to ip address

        it send request to dns [ domain name server. ]
        it is like phone book of an internet 
        which stores ip address of domain names.

        so dns matches the domain to correspondin ip address.
        
        
        🔹 2. DNS Lookup (Domain → IP)

            👉 Browser asks:

                “What is the IP address of this domain?

                    Browser Uses DNS (Domain Name System)
                        example.com → 93.184.216.34

                    👉 Think:

                    Domain = human-friendly name
                    IP = actual server address


        🔹 3. TCP Connection (Handshake)

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


/* 🔹Event Driven Arch. In general.

        Event-Driven Architecture is a design pattern where 
        systems communicate by producing and consuming events.


        👉Something happens → event
                eg. user login, order placed

        👉Other parts react → listeners/handlers


        🔹 Core Components of EDA

            1. Event Producer (Publisher) - creates event.

                    eg. Payment service → emits "payment_success"

            2. Event Consumer (Subscriber) - Listen and reacts to event

                    eg. Email service → sends confirmation email

            
            3. Event Broker (Optional but common)  - manage event between services

                eg. Apache Kafka, RabbitMQ


        💡“Node.js itself follows an event-driven architecture using EventEmitter and the event loop.

        👉 The "events" module allows Node.js to work with events 
            and listeners using the EventEmitter class.

            
            import { EventEmitter } from "events";

            const emitter = new EventEmitter();

            👉on() method listen to event, and recieve data. 

            👉emit() method trigger an event, here event name is greet.
                
                emitter.on("greet", (data) => { console.log(data) } )

                emitter.emit("greet", 'send any type of data');

                
            👉execution flow => first listen to an event => then emit the event.


            we can attach multiple event-listners for same event.

            we have different methods on emitter.

            if we need to remove listner then we have to define callback separetaly.

                const fn = () => console.log("Hello");
                emitter.on("greet", fn);
                emitter.off("greet", fn);       // remove
            
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


/* 🔹Process.

            process is running instance of your application.
            when we run node application os create process regarding our application.

        👉In Node.js process is global object, that provides information
            and control over current running node.js application(process)

            👉console.log(process.pid);

            process help you in :

            👉Access environment variables
              
            👉Communicate between processes

            👉process.on("uncaughtException", (err) => {
            console.log("Error:", err.message);
            });


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

            we are waisting our resources.

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

        👉Worker Thread → runs inside same process (shared memory)
            
        ✅ Use Worker Threads when:
                CPU-intensive tasks
                Image processing
                Data computation


            🔹  Worker thread has its own JS execution context
                ✅ Own V8 instance
                ✅ Own memory heap (separate from main thread)
                **Worker thread also has its own event loop
                ✅ Can handle asynchronous operations just like the main thread
                ✅ Can listen to messages, timers, or perform async I/O


            Main Thread (Event Loop)
            ├─ Handles HTTP requests
            ├─ Handles I/O
            └─ Creates Worker Thread
                    │  worker Thread Receives data
                    │  Does CPU-heavy calculation
                    │  Posts result back
                    ▼
            Main Thread receives result → continues processing


            🔹 2. Flow of Execution

                Main thread creates a worker thread.
                Worker thread starts running its JS code in parallel with main thread on the CPU.
                Worker thread finishes computation → sends result via postMessage.
                Main thread receives a message event → handler executes in main thread’s event loop.


            🔹 2. Why Send Result Back to Main Thread?

                The main reason is: main thread controls the “application logic” and I/O.

                Key Points:
                    Main thread handles I/O and requests
                    In Node.js, the main thread handles HTTP requests, DB calls, reading/writing files.
                    Worker thread should not directly send HTTP responses.


                Client Request
                    │
                    ▼
                Main Thread (Node.js)
                ├─ Receives HTTP request
                ├─ Offloads CPU task to Worker Thread
                └─ Continues listening for other requests

                Worker Thread
                ├─ Computes result (CPU-heavy)
                └─ Sends result to Main Thread via postMessage

                Main Thread
                ├─ Receives result from Worker
                └─ Sends HTTP response to client

        

            🎯 Interview One-Liner

                “Worker threads share memory within the same process and are used for CPU-intensive tasks, 
                    
                “Node.js uses worker threads for parallel computation 

                “Worker threads have their own JS execution context and own event loop, 
                so they can handle asynchronous tasks independently of the main thread 
                while staying in the same process.”


                // worker.js

                import { parentPort } from "worker_threads";

                parentPort.on("message", (num) => {
                    let result = 0;
                    for (let i = 0; i < 1e8; i++) result += num; // heavy CPU task
                    parentPort.postMessage(result);
                });



                // main.js

                import express from "express";
                import { Worker } from "worker_threads";

                const app = express();

                app.get("/", (req, res) => {
                    const worker = new Worker("./worker.js");

                    worker.postMessage(100);

                    worker.on("message", (result) => {
                        // Only main thread can send response
                        res.send(`Result is ${result}`);
                    });

                    worker.on("error", (err) => {
                        res.status(500).send(err.message);
                    });
                });

                app.listen(3000, () => console.log("Server running"));


            🔹 Interview One-Liner

                “In a Node.js web server, worker threads perform CPU-intensive tasks 
                but cannot directly handle HTTP responses. 
                The result is sent back to the main thread, 
                which then sends the response to the client.”
*/

