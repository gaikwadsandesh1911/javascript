
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