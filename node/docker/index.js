/* 🎯 What is Docker?

        Docker is a tool that helps you package your application 
        along with everything it needs (like code, libraries, and dependencies) 
        into a container, so it can run the same on any system.

        
    💡 In Simple Words

        Docker is like a box that contains your app and all required setup, 
        so you can run it anywhere without problems.



    💡What problem docke solves

        “It works on my machine, but not on yours.”


    🎯 Real-World Story (Strong Answer)

        I built a Node.js app on my Windows system using Node 18 and some libraries.

        On my machine (Windows, Node 18) → ✅ Works perfectly
        My teammate tries on macOS → ❌ Fails due to some dependency issues
        We deploy to production (Linux, Node 14) → 💥 App crashes

        👉 This happened because:

            Different OS (Windows / macOS / Linux)
            Different Node versions
            Different dependencies


        📦 How Docker Solved It

        Docker create a container 
        and run my app inside tha  container with:

            Node 18
            All required dependencies
            Linux environment (docker uses linux environment)

        Now:

            Runs on my Windows → ✅
            Runs on teammate’s macOS → ✅
            Runs on Linux production → ✅

        👉 Same result everywhere 🎯



        📦 How Docker Fixes It (Simple)

            Docker doesn’t run your app directly on your OS.
            It runs your app inside a container with its own OS environment (usually Linux).

        So:

        Your Windows machine → runs Docker
        Docker → runs a Linux container
        Your app → runs inside that Linux container

        👉 Result:
        App always sees Linux, no matter where it runs
*/


/* 🎯 What is a Container?

        A container is a lightweight package that contains your application 
        and everything it needs to run (code, libraries, dependencies).

        container runs separately from other containers and 
        from the host system, so they don’t interfere with each other

        A container is a running instance of a Docker image.

        👉 When you run an image → it becomes a container
*/


/* 🎯 What is a Docker Image?

        A Docker image is a blueprint (template) used to create containers.

        we write instructions in Dockerfile
        to create an image.

        👉 When you run an image → it becomes a container

        A container is a running instance of a Docker image.

*/


/* 🎯 What is Docker Port Mapping?

        Docker connects a port on your system (host) 
        to a port inside the container,

        your app runs inside container,
        that container has its own port
        but we cant access it directly from our system

        so docker maps it to our system

        docker run -p <hostPort>:<containerPort> image_name

        👉Always use the host port when accessing from browser/Postman.
        http://localhost:5000/api

*/


/* 🎯 What is Docker Network?

        👍  for multi-container apps 

            Docker network is a virtual network allows containers to communicate with each other 
            and with the host machine. 
            It defines how containers are connected and how they can talk

        💡 Simple Understanding

            By default, Docker isolates containers.

            If you want two containers (like Node app + MongoDB) to talk → you need a network.

            Docker gives you different types of networks to manage communication.

            
            🧩 Types of Docker Networks

                1.  bridge (default)

                        Default network for containers
                        💡Containers can talk to each other using IP or container name
                        Example: Node app → MongoDB

                2.  host

                        Container shares host’s network
                        No isolation
                        Fast, but less secure

                3.  none

                        No networking
                        Container is completely isolated

                4.  overlay

                        Used in Docker Swarm / multi-host
                        Connects containers across multiple machines


                docker run -d --name mongo --network my-network mongo
                docker run -d --name node-app --network my-network my-node-app

                💡both container communicate with each other with same network name.

*/


/* 🎯 What is a Docker Volume?

        A Docker volume is a special storage area outside the container 
        that lets containers save and share data even after the container is removed.

        💡 Simple Understanding

            Containers are ephemeral (temporary).
            By default, if a container is deleted → all its data is lost.
            
            Volume = persistent storage
            You can store database files, logs, uploads, etc.


            docker run -d -v my-mongo-data:/data/db --name new-mongo mongo

            --name new-mongo   =>   name of the container
            mongo              =>   name of the image
            -v                 =>   name of volume

            ✅/data/db    => storage  are insde container 
                            if container deleted everything is lost

                            but my-mongo-data will survive
                            and can share with other container.

            
            ✅ if database is hosted we do not need  -v
*/


/* 🎯 Dockerfile for Node.js / Express App


            # 1️⃣ Base image 
            
            FROM node:18

            # 2️⃣ Set working directory inside container
            
            WORKDIR /app            
            
                    ✅inside container we created app folder
                    ✅All commands after this  runs inside  /app

            # 3️⃣ Copy package files and install dependencies
            
            COPY package*.json ./
           
            RUN npm install

            # 4️⃣ Copy the rest of the app
            COPY . .                        // copy all our code into  app directory

            # 5️⃣ Expose port    Its container port
            EXPOSE 5000     

            # 6️⃣ Command to start app
            CMD ["node", "index.js"]

            Or use npm start if you have script in package.json:

            CMD ["npm", "start"]

*/


/* 🎯 Build docker image from Dockerfile instructions


        ✅docker build -t my-node-app .

                my-node-app is name of the image
                .  is current directory[look for Dockerfile or docker-compose file]


        ✅docker run -d -p 4000:5000 --name node-container --env-file .env my-node-app

                use --env   .env 
                
                when run container
                .env is our project .env file

        
        ✅ if our node app server.listen(8000, ()=>{}) does not matter

                inside container app is running on 5000
                outside it is on port 4000

                if we dont want to run our app on container, use 8000

*/


/* 🎯 docker-compose.yml

        docker-compose.yml file define and run multi-container Docker applications.

        Instead of running multiple docker run commands manually, you define all containers, networks, and volumes in a single YAML file (docker-compose.yml).


        version: "3.9"

        services:
            backend:                       # backend is name given to container
                build: ./backend           # look for Dockerfile is located inside backend folder
                ports:
                    - "5000:5000"          # access backend at localhost:5000
                env_file:
                    - ./backend/.env       # contains DB_URI for Mongo Atlas
                volumes:
                    - ./backend:/app       # hot reload during development

            frontend:
                build: ./frontend
                ports:
                    - "3000:3000"          # access frontend at localhost:3000
                volumes:
                    - ./frontend:/app      # hot reload
                depends_on:
                    - backend              # start backend first
*/

/*      
            docker-compose up -d      # start frontend and backend containers
            docker-compose down        # stop and remove containers
            docker-compose logs -f backend   # see backend logs
*/



