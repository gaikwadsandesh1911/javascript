/* what is middleware

    middleware is nothing but function in Express.js.
    which is runs between recieving request and sending response.

    It has access to request object, response object and next() function.

    middleware commonly used for authentication, validatiion, and error handling.

    we mostly call next() function within middleware.
    which passes control to next function in request-response cycle.

*/

/*  Express.js provides several built-in middleware functions
    like:

        - express.json()        -   it parse incoming request containing json data into js object.
        
        - express.urlencoded()  -   Used to parse data useualy sent from HTML forms.
        
        - express.static()      -   Used to serve static file.     

*/

    app.use(express.json());

    app.use(express.urlencoded({ extended: true }));

    app.use(express.static("public"));

// --------------------------------------------------

/* what do next() function do.

    next() function passes an control to next function in the request-response cycle.

    if we pass any argument to next(arg) function,
    it is considered as error and it is get caught by centralize error handler function.

*/

// --------------------------------------------------------

/* app.use() and app.get()

    app.use() is middleware in express.js and mainly used for register other middleware
    like express.json()
    
    if we register other route, it will run for all http method of that route.


    app.get() is specifically used to handle GET requests for a particular route.

*/

app.use(express.json());    // register express.json() middleware.

app.use("/api", productRoute);    // runs for all http methods of productRotue.

// run for GET method of /user route.
app.get("/users", (req, res) => {
    res.send("Users");
});

// --------------------------------------------------------

/* How we serve static file in expres.js?

    using built-in express.static() middleware.

    It allows the server to serve files like HTML, CSS, JavaScript, images, and 
    other assets directly to the client

*/

app.use(express.static("public"));

/* 
    if public folder contains

    public/
        index.html
        style.css
        images/
            logo.png

    Then the files can be accessed directly through their URLs.
    like http://localhost:8080/images/logo.png
*/

// -------------------------------------------------------

/* what is Router() function in express.

    Router() is built-in function on express object.
    which is used to create route and separate route handler.

    It helps organize routes into different files,
    instead of keeping all routes in the main application file.

*/

import express from 'express'
const router = express.Router();

router.get('/user', (req, res) => {
    // ...
})

router.post('/user', (req, res) => {
    // ...
})

export default userRoutes

// on main file. server.js or app.js we import it... and register it in app.use() middleware.
app.use('/api', userRoute);


// -------------------------------------------------------

/* Route and Controller and modal in express.js

    we separate routes and controller based on their responsibilites.
    which makes code easier to maintain.

    Routes defines API endpoints and connect them to appropriate controller.

    Controller handles HTTP request/response logic.

    Modal handles database interaction

*/

// route
router.get("/users/:id", getUser);

// controller
const getUser = async (req, res) => {
    const user = await User.findOne(req.params.id);
    res.json(user);
};

// User is basically Modal used for database interatcion.


// -----------------------------------------------------

/* How we handle errors in express app.

    Instead of passing error through every route,
    we pass the error to next(error) function.

    the centralized error-handling middleware, which has got four parameters:
    will recieves an error and sends appropriate response to the client.

*/

app.get("/users", (req, res, next) => {
    try {
        // some operation
    } catch (error) {
        next(error);
    }
});


app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        message: "Internal server error"
    });
});

// ----------------------------------------------------------

/* uncaughtException

    when an error is thrown synchronously and 
    there is no try...catch to handle it.

    node.js emits an 'uncaughtException' event.

*/

throw new Error("Something went wrong");

process.on("uncaughtException", (err) => {
    console.log(err);
});

/* unhandledRejection

    when a Promise is rejected(async operation) and there is no .catch() or try...catch with await handling it.

    node.js emits an 'unhandledRejection' event
*/

Promise.reject(new Error("Database failed"));

process.on("unhandledRejection", (reason) => {
    console.log(reason);
});

// ----------------------------------------------------

/*  How to handle graceful shutdown.

    Graceful shut down means shutting down the Node.js server safely 
    instead of terminating it immediately.

    Gracefull shutdown means:
        - allow existing request to finish.
        - stop accepting new request.
        - close db connection.
        - exit the process.


    in Node.js we use SIGINT and SIGTERM, the os signals to gracefully shutdown.

    SIGINT is typically generated when we press Ctrl+C in the terminal. 
    SIGTERM is a termination request commonly sent by the operating system or process managers in production.

    on process object using on() method.. we register a listener(callback) function for 
    perticular event or siganl.
    means when this event/signal happens execute this callback.

*/

import express from "express";

const app = express();

// ................

const server = app.listen(3000, () => {
  console.log("Server running on port 3000");
});

const gracefulShutdown = () => {
  console.log("Shutting down...");

  server.close(() => {
    console.log("HTTP server closed");

    // Close database connection here

    process.exit(0);
  });
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);

/* 
    process.exit(0)
        - 0 means successful/normal termination.

    process.exit(1)
        - 1 means the process terminated because of an error/failure.

*/

// ------------------------------------------------------------
