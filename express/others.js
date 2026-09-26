/* env variables.

    env variables provided to application by its os.
    they contain configuration values that application can read while it is running.

    in node we access through:
        dotenv library and process.env.Name-of-variable
        and store in .env file.


*/

// ---------------------------------------------------------

/* HTTP status code

    it's  three digit number returned by server in HTTP response,
    which indicates status or result of client's request.

    code    meaning         use for


    200     OK              successfull GET, PUT, PATCH

    201     Created         new resource create. POST

    204     No Content      Successfull req with no request body.


    400     Bad Req         Invalid request/data.

    401     Unathorized     Authentication required.

    403     Forbidden       Authenticated but Unauthorized.

    404     Not Found       Resource/route doesn't exist.

    422     Unprocessable   Validation failed.

    429     Too many req    Rate limit exceeded.


    500     server error    Internal server error.

*/

// ----------------------------------------------------------

/* CORS

    CORS - stands for Cross Origin Resource Sharing.

    It's browsers internal security mechanism that controls wheater
    web application from one origin is allowd to make request to server from different origin

        origin  - protocol + domain + port

        frontent    http://localhost:3000
        backend     http://localhost:5000

        they are different origin because their ports are different.

    
    we implement in express using CORS library.
    we rigister cors() middleware in app.use() middleware.

*/

import cors from 'cors'
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true                   // if we using coockie()
}));

// ---------------------------------------------------------------

/* Cookie

    A cookie is small piece of data that server sends to the browser.
    Browser store it and send it back to the server with each request to the same domain.

    cookie are commenly used for things like authentication.

    on the res object we got:
        - res.cookie('token', 'abc123')
        - res.clearCookie()
    
    but to read/parse on req object,
    we need cookieParse() function from 'cookie-parser' library 

*/

import cookieParser from 'cookie-parser'
app.use(cookieParser())

res.cookie("token", "abc123", {
    httpOnly: true,
    secure: true,
    sameSite: "strict"
});

// on req object we read like
app.get("/profile", (req, res) => {

    const token = req.cookies.token;

    // ...................

});

// -------------------------------------------------------------