
/* 🔹 1. Worker Threads

        👉 developer create worker thread by programming,
            to perform CPU-intensive tasks like image processing, Large computing.

        👉Worker Thread → runs inside same process (shared memory)

            each worker thread have their own v8 instance, execution context and event loop
        
            but cannot directly handle HTTP responses. 
            The result is sent back to the main thread, 
            which then sends the rsponse to the client.”

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

// ----------------------------------------------------------

/* EventEmitter.

    Node.js built-in 'events' module proviedes EventEmitter class,
    which allow objects to emit events and 
    ohter parts of application listen for those events.

    It is important pattern used in Node.js for evernt-driven programming.
*/

import EventEmitter  from 'events'

const emitter = new EventEmitter();

const handleLogin = (user) => {
    console.log(user);
};

// listen for event
emitter.on("login", handleLogin);

// trigger an event
emitter.emit('login', { name: 'sandesh', role: 'admin'});

// 
emitter.off()   

/* 
    on()    -   listen an event.
    emit()  -   triger an event.
    once()  -   listen only once.
    off()   -   remove listner.

*/

// --------------------------------------------------------

/* Cluster.

    cluster is built-in node.js module, 
    which allow us to create multiple Node.js process called workers, 
    
    Each worker has its own runtime.

    Since Node.js is single-threade, means only one core is used.
    
    clustering help us utilize multiple CPU cores.
    so, we can handle more requests concurrently.



                Operating System
                       │
              Primary Node Process
                       │
             ┌─────────┼─────────┐
             ↓         ↓         ↓
          Worker 1  Worker 2  Worker 3
             │         │         │
          Runtime   Runtime   Runtime
            |          |         |
          CORE 1    CORE 2    CORE 3       

*/

const cluster = require("cluster");
const http = require("http");
const os = require("os");

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary process: ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  const server = http.createServer((req, res) => {
    res.end(`Handled by worker ${process.pid}`);
  });

  server.listen(3000);

  console.log(`Worker started: ${process.pid}`);
}

/*  fork()

    cluster.fork() create new worker process from primary process.

*/

/* PM2

    PM2 is a process manager for Node.js applications. 
    It can run and manage multiple instances of a Node.js application, 
    restart applications if they crash, 
    provide monitoring, manage logs, and support zero-downtime reloads.

    we generally don't need to manually write that cluster-management code.

    pm2 start app.js -i max.

    -i max tells PM2 to create instances based on the available CPU cores.
*/

// ---------------------------------------------------

/* worker thread.

    To perform cpu heavy tasks like:
        - Large calculations
        - Image processing
        - video/audio processing

    worker thread is created.

    worker thread runs inside same Node.js process, but it has its own v8 instance and event loop.
    so main event loop doesn't get blocked.

    communication between main thread and worker thread is happen using message passing.
    and shared memory can also be used when required.

*/

// worker.js
import { parentPort } from "worker_threads";

let sum = 0;

for (let i = 0; i < 1e9; i++) {
    sum += i;
}

parentPort.postMessage(sum);    //send message to main thread.



// main.js
import { Worker }  from "worker_threads";

console.log("Main thread started");

const worker = new Worker("./worker.js");  // create worker thread


// main thread recieves the message.
worker.on("message", (result) => {
    console.log("Result from worker:", result);
});

worker.on("error", (error) => {
    console.error("Worker error:", error);
});

worker.on("exit", (code) => {
    console.log("Worker exited with code:", code);
});

console.log("Main thread continues...");


/*  Worker creates the worker, parentPort allows communication from the worker, 
    
    worker.on("message") receives the result, and 
    Worker Threads are mainly used to prevent CPU-intensive JavaScript from blocking the event loop.

*/

// ---------------------------------------------------

//  file hanldling in node.js

    import { readFile, appendFile, writeFile, unlink } from 'fs/promises';

    const data = await readFile("data.txt", 'utf-8');

    // write data to file
    await writeFile("data.txt", "Hello Node.js");

    // append content to file
    await appendFile("data.txt", "\n new content")

    // delete
    await unlink('data.txt')

    // search for other operations.


    /*  File data is stored as bytes.
        Those bytes represent text, images, videos etc.
    
        utf-8 tells Node.js to decode the bytes as UTF-8 text and 
        return a JavaScript string.

        but every file is not text file, some file are image file or pdf file.
        those file handled as binary data, rather than decoded directly as UTF-8
    */

// ----------------------------------------------------



