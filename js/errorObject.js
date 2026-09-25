/* Error Object

    Error Object represent an error that occurs while program is running.
    It contain information about what went wrong.

    The main properties of error objects are
        - name      type/name of the error
        - message   description of the error
        - stack     stack trace shows where error occured

    Erron is constructor function so, we create using new keyword
        const error = new Error("something went wrong");

    Js provide several built-in type errors.
        - ReferenceError
        - TypeError
        - SyntaxError

    To check error type -   instaceof operator used.

    
    try...catch is used to handle errors without crashing the normal flow of the program.
*/

/* 
    throw immediately stops the normal flow of execution and 
    transfers control to the nearest matching catch block, where the error can be handled."

    If there is no matching catch, the error propagates up the call stack and 
    can eventually terminate the program/request.

*/

try {

  const age = 15;

  if (age < 18) {
    throw new Error("User must be 18 or older");
  }

  console.log("Allowed");

} catch (error) {

  console.log(error.message);

}

// op: User must be 18 or older


// -----------------------------------------


// create custom error class

class ValidationError extends Error {
    constructor(message) {
        super(message)
        this.name = 'ValidationError'
    }
}

// from your program your throws error.
try {
    // ...
    throw new ValidationError("Email is required");
} catch (error) {
    if (error instanceof ValidationError) {
        console.log("Validation problem");
    }
}

// --------------------------------------------------
