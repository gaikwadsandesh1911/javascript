/* env variables.
    env variable contain configuration values that application can read while it is running.

    in node we store it in .env file and access through:
        dotenv library and process object 

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
    httpOnly: true,     // Cookie NOT accessible via JS (secure)
    secure: true,       // Cookie sent only over HTTPS
    sameSite: "strict"
});

// on req object we read like
app.get("/profile", (req, res) => {

    const token = req.cookies.token;

    // ...................

});

// -------------------------------------------------------------

/* How do you write custom middleware for authentication and authorization?

    Authentication means verifieing who the user is using login or register info.
    
    Authorization checks whether that authenticated user has permission to access a particular resource.”

    In express app we use JWT(json web token) for authentication and authorization.
    jwt generate token using sign() method based on info we provide, usually after login or register. 
    and that token we send back to client using cookies().

    Now, client sends the token with subsequent request.

    now we create authentication middleware that extract token and validate using verify() method.
    now we decode that infomation and find user using db query.
    and attach the user on req object.

    Now, controller check the permision on req object first 
    and then perfom further task.
*/

import jwt from "jsonwebtoken";

app.post("/login", async (req, res) => {

  const { email, password } = req.body;

  // Find user and verify password
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Password verification would normally use bcrypt
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h"
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000
  });

  res.json({
    message: "Login successful"
  });
});


const authMiddleware = async(req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Authentication required"
        });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get current user from database.
        const user =  await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        // Attach current user to request
        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};


app.delete("/users/:id", authMiddleware, async (req, res) => {

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied"
    });
  }

    //   --------

  // Delete user
  res.json({
    message: "User deleted successfully"
  });
});

// --------------------------------------------------------
