/* 🔷 What is express

        Express.js is a minimal and flexible web framework for Node.js 
        which is built on top of Node.js's core HTTP module. 

        Express.js simplifies building => web servers and REST APIs. 
        by providing features like routing, middleware, and request/response handling.
       

        👉Minimal means Express gives you only the basic building blocks (routing + middleware + req, res handling) 
            It does not provide built-in features like authentication, database layer, or strict architecture.

        👉Flexible means without forcing a fixed pattern, Express lets you decide 
            how to organize code, structure folders, handle requests,
            and add features.

            You can structure your project in many ways:

                MVC (Model-View-Controller)
                Layered (controller → service → model)
                Microservice
    */


/* 🔷 What is an API?

        An API (Application Programming Interface) is a set of rules
        allows communication between different software / application systems and exchange data.


        API (general concept)
            Any communication:
                Database API
                OS API
                Web API


    🔷 What is REST?

        REST (Representational State Transfer) is an architectural style 
        used to design APIs using Rsources and HTTP methods in structured way.
      
*/


/* 🔷 What is Middleware?

        Middleware is a function that executes between the request and response cycle.
        it has access to :
            req object, res object, and next() function.
            so it can modify req object, res object and pass control to next function.


    🔥 Middleware is used for:

        Authentication (JWT check)
        Authorization
        Error handling
        Rate limiting
        Logging requests
        Input validation


    🔥 Types of Middleware


        1. Built-in middleware :

            These are prdefined functions :

            👉app.use(express.json());
                convert json string to js object inside req.body, so express can use it.

            👉app.use(express.urlencoded({ extended: true }));
                parses form data (URL-encoded data) coming from the client and converts it into a JavaScript object inside req.body.

            👉app.use(express.static("public"));
                serves static files (like HTML, CSS, images, JS files) directly to the browser from a folder called public.
                public/
                ├── index.html
                ├── style.css
                ├── logo.png

                🌐 Access in browser

                You can directly access:

                http://localhost:3000/index.html
                http://localhost:3000/style.css
                http://localhost:3000/logo.png

                👉 No need to create routes like /get-image, /get-css, etc.

                const app = express()
                👉app.use()     means for entire application
                👉app.use("/api", ...);   means for /api


        2. Application-level middleware

            application level and can run for all routes or specified routes 
            depends on how you configure

            👉Runs for ALL routes (Global)

                app.use((req, res, next) => {
                    console.log("Global middleware");
                    next();
                });
                👉 This runs for:

                    /
                    /users
                    /products
                    everything
            
            👉Runs for specified path

                app.use("/users", (req, res, next) => {
                    console.log("Users middleware");
                    next();
                });

                👉 This runs only for:

                    /users
                    /users/1
                    /users/profile

        
        3. Route-level middleware

            This middleware runs only for specified route.

            app.get("/user", middleware, (req, res) => {
                res.send("User data");
            });


        4. Third-party middleware

            provided by external packages  to add extra functionality 
            like logging (morgan), CORS (cors), security (helmet) etc.

            const cors = require("cors");
            app.use(cors());


        5. Error-handling middleware

            This is special middleware function used to handle error in application.
            It takes four arguments (err, req, res, next)

            app.use((err, req, res, next) => {
                console.log(err);
                res.status(500).send("Server Error");
            });


        👉 it can  catch error from sync function or sync error.

            app.get("/test", (req, res) => {
                throw new Error("Something went wrong");  //sync error
            });

        👉  async errors are not automatically captured
            they handled using next(err) inside try-catch blocks, 
            which forwards the error to the error-handling middleware.

*/


/* 🔷 req object

        The req (request) object in Express.js represents the HTTP request 
        sent by the client to the server. 
        It contains all the information about the request 
        such as parameters, query strings, headers, body, and more.

        req.body

        req.query       "/users?age=25"     req.query.age

        req.params      "/user/:id"   /user/101     req.params.id

        req.headers      req.headers.authorization     used for auth

        req.ip           client ip

        req.url

        req.method

*/


/* 🔷 res object

        The res (response) object in Express.js represents the HTTP response 
        that the server sends back to the client. 
        It is used to send data, set status codes, headers, cookie and 
        end the request-response cycle.


        res.send("")       send string, html, buffer

        res.json({})

        res.status(200)

        res.end()           end res without sending data.

        res.redirect("/")    redirecto to another url

        res.set() / res.header()        both are same

                res.set("Content-Type", "application/json");
                res.header("Content-Type", "application/json");

                res.header("Authorization", "Bearer abc123");
                
                fetch("/api")
                    .then(res => {
                        console.log(res.headers.get("Authorization"));
                    });

                axios.get("/api")
                .then(res => {
                    console.log(res.headers["authorization"]);
                });


        res.cookie()

                res.cookie("token", "abc123", {
                    httpOnly: true,         // Cookie NOT accessible via JS (secure)
                    secure: true,           // Cookie sent only over HTTPS
                    maxAge: 24 * 60 * 60 * 1000     // browser auto delete after specified time.
                });

                👉browser automatically reads cookie and store 
                in Application -> Cookies

                👉then browser automatically send cookie to server
                on each requset.

                👉how server read cookie

                const cookieParser = require("cookie-parser");
                app.use(cookieParser());

                app.get("/profile", (req, res) => {
                    console.log(req.cookies.token);
                });


                ✅app.get("/logout", (req, res) => {
                    res.clearCookie("token");
                });

*/


/*  🌐 CORS (Cross-Origin Resource Sharing)

            CORS is a browser security mechanism 
            that controls whether a frontend from one origin can access resources from another origin.

            Origin = protocol + domain + port

            http://localhost:3000   ❌ different origin
            http://localhost:5000   ❌ different port → different origin

            
            If different origin, browser block request

            ✅ Solution using CORS middleware
            
            const cors = require("cors");

                app.use(cors({
                    origin: "http://localhost:3000",
                    credentials: true
                }));

            CORS is a mechanism where the server tells the browser 
            that it is allowed to access its resources from a different origin.

            🔁 credentials: true 
                
                allows the browser to send and receive credentials (cookies, authorization headers, TLS certificates) 
                in cross-origin requests.

                By default ❌:

                    Browser does NOT send cookies in cross-origin requests
                    With credentials: true ✅
                    Browser sends cookies automatically


            🔁 Frontend must also allow it

                    fetch("http://localhost:5000/api", {
                        credentials: "include"
                    });

                    axios.get("http://localhost:5000/api", {
                        withCredentials: true
                    });

*/


/* 🔷 🔐 Authentication vs Authorization

    1. Authentication (Who are you?)

        Authentication is the process of verifying the identity of a user.

            eg. Login with email & password

            We usually handle authentication using:

                JWT (JSON Web Token)
                Sessions + Cookies
                OAuth (Google login)


    2. Authorization (What are you allowed to do?)

        Authorization determines what an authenticated user is allowed to access.

            Admin can delete users
            Normal user can only view profile


*/


/* 🔷   Redis

        “We use Redis as a caching layer between Express and database 
        to reduce repeated DB calls and improve response time.”

        Client → Express API → Redis (check cache)
                      ↘
                       MongoDB (if cache miss)

        
        Where SHOULD we use Redis?

            Caching frequently read data
                Product list
                User profile

            🚦 Rate limiting

             📩 OTP / email verification
                Store OTP in Redis

*/


/* 🔷 socket.io

    “Socket.io is used for real-time communication between client and server, 
    but the database remains the single source of truth. 
    Whether we update the database depends on whether the data needs to be persisted or not.”

    whenever the server state changes, we don’t need to manually send repeated API requests. 
    The server can push updates automatically to all connected clients, keeping the UI in sync.”

*/