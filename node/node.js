
/* EventEmitter.

    Node.js built-in 'events' module provides EventEmitter class,
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
    which allow us to create multiple Node.js processes called workers,
    and those workers can handle incoming HTTP requests concurrently. 
    
    multiple workers can listen on same server port.
    
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

 ** it is not designed to handle incoming http requests like cluster module.

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





