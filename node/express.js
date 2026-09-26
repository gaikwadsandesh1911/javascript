


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


/* 🔷 socket.io

    “Socket.io is used for real-time communication between client and server, 
    but the database remains the single source of truth. 
    Whether we update the database depends on whether the data needs to be persisted or not.”

    whenever the server state changes, we don’t need to manually send repeated API requests. 
    The server can push updates automatically to all connected clients, keeping the UI in sync.”

*/