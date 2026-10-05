/*  How we create server in node.js.

    we can create basic HTTP server using built-in http core module.
    
    http.createServer() method is used to create server.
    which accepts callback with req, res object.

    res.writeHead() is used to set the HTTP response status code and 
    response headers before sending the response body.

    we handle request and send response using res.end() method.

    server.listen() method start server on specified port.

*/

import http from 'http';

const server = http.createServer((req, res) => {

    res.writeHead(200, {
        "Content-Type": "application/json", //  type of response
        "cache-control": "no-cache",        //  caching instruction
        "set-cookie": "token=abc123"        //  browser store the cookie
    });

    res.end(JSON.stringify({
        message: "Hello from Node.js"
    }));

});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});


/*  When the server sends response headers, 
    the client (usually the browser) receives them before the response body and 
    uses them to understand how to handle the response.
*/

// ---------------------------------------------------------

/*  crypto

    The crypto module is a built-in Node.js module that provides cryptographic functionality.

    Used for things like hashing, encryption and decryption,
    generate secure random values, create digital signature.

    1. Hashing   
    
        Hashing is the process of converting data into a fixed-length string called a hash using a hashing algorithm. 
        It is a one-way process, so we cannot normally get the original data back from the hash.

        commonly used for data integrity and password storage. 

    2. Encryption / Decryption   
    
        converts readable data into encrypted data.
        which later decrypted ( convert into original ) using appropriate key.
        It's two way process.

*/

import crypto from 'crypto';

const randomBytes = crypto.randomBytes(16).toString('hex');


// ---------------------------------------------------------


/* EventEmitter.

    Node.js built-in 'events' module provides EventEmitter class,
    which allow objects to emit events and 
    other parts of application listen for those events.

    It is important pattern used in Node.js for event-driven programming.
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
    which allow us to create multiple Node.js processes called workers.

    These multiple workers can listen on same server port,
    and can handle incoming HTTP requests concurrently. 
    
    cluster is mainly used to scale a Node.js server across multiple CPU cores.

    Each worker has its own runtime.

    Since Node.js is single-threade, means only one cpu core is used.
    
    clustering help us utilize CPU's multiple cores.
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

import cluster from 'cluster';
import http from 'http';
import os from 'os'

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

/* child_process

    child_process module is used to create and manage separate processes
    for running..
        - external commands
        - scripts or
        - independant task

 ** It is not designed to handle incoming http requests like cluster module.

    for eg. if node.js api recieve request to generate pdf.
    we  could start separate process to run pdf-generation script.
*/

import { spawn } from "child_process";

app.get("/generate-pdf", (req, res) => {

  const process = spawn("node", ["generatePdf.js"]);

  process.on("close", (code) => {
    if (code === 0) {
      res.send("PDF generated");
    } else {
      res.status(500).send("Failed");
    }
  });
});

/*  in Node.js we can create child process using methods like
    fork() and spawn()

    fork()  =>   - create child process to run another .js file
                 - with fork() parent process and child process can communicate with IPC(inter-process-comnumnication) channel.
                   which is built-in channel called... process.send()
    
    spawn() =>   - create child process to run non-Node.js program such as python
                 - or even another node.js program as well.


                    With spawn(), we normally communicate with the child process through its standard streams—
                    stdin, stdout, and stderr. 
                    
                    Unlike fork(), spawn() does not automatically create a Node.js IPC channel.

*/

// parent.js 
const { spawn } = require("child_process");

const child = spawn("node", ["child.js"]);

// Send data to child
child.stdin.write("Hello child");

// Receive data from child
child.stdout.on("data", (data) => {
  console.log("Child says:", data.toString());
});

// Receive errors
child.stderr.on("data", (data) => {
  console.error(data.toString());
});


// child.js
process.stdin.on("data", (data) => {
  console.log("Received:", data.toString());
});

// *****************************************

// parent.js
const { fork } = require("child_process");

const child = fork("child.js");

// Parent → Child
child.send("Hello from parent");

// parent recieve sent from child using process.send()
child.on("message", (message) => {
  console.log("Child says:", message);
});

// child.js

// Child → Parent
process.send("Hello from child");


// child recieves send from parent's child.send()
process.on("message", (message) => {
  console.log("Parent says:", message);
});

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


/*  Worker class creates the worker, 
    parentPort allows communication from the worker, 
    
    worker.on("message") receives the result, and 

    Worker Threads are mainly used to prevent CPU-intensive JavaScript from blocking the event loop.

*/

// ---------------------------------------------------


/*  Worker Threads  →   multiple threads → CPU-intensive work

    Child Process   →   separate process → run another command/program

    Cluster         →   multiple processes → scale Node.js server
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


/* Stream module.

   Stream module in Node.js is used to process data piece by piece 
   instead of loading the entire data into memory at once.

   Streams are commonly used for large files, video streaming, file uploads/downloads, and HTTP data processing.

   Node.js has four types of stream:

    1. Readable Stream      -   used to read data.

    2. Writable Stream      -   used to write data.
    
    3. Duplex Stream        -   can read and write data as well. eg. TCP socket

    4. Transform Streamm    -   can read data, transform it and produce new data as well.


    important concept:

        pipe():     connect Readable Stream to Writable Stream

    

   Readable stream, common events are:

    1.  data    →   when a chunk of data is available.

    2.  end     →   when all data has been read.

    3.  error   →   when an error occurs.

    4.  close   →   when the stream is closed.


    Stream vs Normal file....

    The normal file is loaded into memory before processing.

    Stream entire file is not loaded into memory once. it is loaded in chunk
    and processed then next chunk comes and processed.

        ** The chunks pass through memory. The previous chunk doesn't need to remain in RAM while the next chunk is being processed.

*/

// readble stream
import fs  from "fs";

const stream = fs.createReadStream("large-video.mp4");

// readble strema event 'data'
stream.on("data", (chunk) => {
    console.log(chunk);
});

// writable stream
const stream = fs.createWriteStream("output.txt");
stream.write("Hello");
stream.write(" World");
stream.end();

// connect readble and writable stream
const readStream = fs.createReadStream("input.txt");
const writeStream = fs.createWriteStream("output.txt");

readStream.pipe(writeStream);

// --------------------------------------------------------

/* Buffer

    A Buffer is a temporary memory used to store binary data.

    data comes from outside applicaton like
        - files, images, videos, stream etc.
    often recieved as raw bytes. Node.js uses Buffer to handle those bytes.

*/

const buffer = Buffer.from("hello")
console.log(buffer)  // <Buffer 48 65 6c 6c 6f>
console.log(buffer.toString());  // convert back to string.


const stream = fs.createReadStream("video.mp4");

stream.on("data", (chunk) => {
    console.log(chunk);     // chunk is generally Buffer.
});

/* 
    - for text file, we can convert it into string.

    - For a video/image, you normally keep it as Buffer/binary data rather than converting it to a string 
*/

// --------------------------------------------------------


