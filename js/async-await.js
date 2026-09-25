/* async - await

    async/await is a way to work with asynchronous operations in JavaScript 
    using a syntax that looks like synchronous code.
    so, it makes code more readable.

    async
        When you put async before a function, the function always returns a Promise.

    await
        is used to wait for a Promise to settle.
*/

/* 
    await does not block entire javascript program.
    It pauses execution of that perticular async function till promise settle.
*/

async function getData() {
  const result = await fetch("/api/users");

  console.log(result);
}

// using promise
getUser()
  .then((user) => {
    console.log(user);
  })
  .catch((error) => {
    console.log(error);
  });


// using async await
async function showUser() {
  try {
    const user = await getUser();
    console.log(user);
  } catch (error) {
    console.log(error);
  }
}

// ------------------------------------------------

/* async operations

    An asynchronous operation is an operation that may take some time to complete,  
    JavaScript doesn't have to wait for it to finish, It continuing with other work.

    some common async operations.
        
        - API request
        - Database operation
        - Reading file
        - Promise
        - Timers

*/

async function getData() {
    
    console.log("1");

    const data = await fetch("/api/users");

    console.log("2");
}

getData();

console.log("3");

// OP:
/* 
    1
    3
    2
*/
