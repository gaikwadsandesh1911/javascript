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


