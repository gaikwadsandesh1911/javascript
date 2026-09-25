/* Promise

    promise is an object that represents..
    eventual completation or failure of asynchronous operation.

    A Promise has three states:

        - pending (still working), 
        - fulfilled (completed successfully), or 
        - rejected (failed).


    Nowadays,Promises are often used through async/await, 
    which makes asynchronous code easier to read.
*/

// -------------------------------------------

/*  async operations

    An asynchronous operation is an operation that may take some time to complete,  
    But js doesn't have to wait for it to finish, It continuing with other work.

    some common async operations.
        
        - API request fetch()
        - Database operation
        - Reading file
        - Promise
        - Timers

*/

// -------------------------------------------------------

/* async - await

    async
        When you put async before a function, the function always returns a Promise.

    await
        is used to wait for a Promise to settle.

        await does not block entire javascript program.
        It pauses execution of that perticular async function till promise settle.
*/

// ------------------------------------------------------

/* Promise constructor is used to manually create a new Promise.

    - we pass function to Promise Constructor.. which is called executor function.
    - it automatically receives two functions.
        1. resolve()    called when operation is succeed.
        2. reject()     called when operation fails.
    
    .then()     
        - handles successfull result(resolve)
        - executes when the Promise is fulfilled.
        - The value passed to resolve() becomes the argument of .then():

    .catch()    
        - handle failed result(reject)
        - executes when the Promise is rejected.
        - The value passed to reject() becomes the argument of .catch()
*/

const promise = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve({ name: "sandesh", message: "operation successfull." });
  } else {
    reject({ status: "failed", message: "something went wrong." });
  }
});

promise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

// --------------------------------------------------------------

// async await try catch

async function getData() {
  try {
    console.log("1");

    const data = await fetch("/api/users");

    console.log("2");
  } catch (error) {
    console.log("Error:", error);
  }
}

getData();

console.log("3");

// op:
/* 
    1
    3
    2
*/

// --------------------------------------------

/*  callbakc and callback hell.

    Before Promise and asych-await callback were used to handle async operations.

    callback: 
        A callback is a function passed as an argument to another function.
        so that it can be executed later, commonly after an asynchronous operation completes. 
    
    callback hell:
        callback hell occurs when multiple asynchronous operations depend on each other and 
        callbacks become deeply nested, making the code difficult to read, maintain, and debug. 
        
    
    Promises and async/await provide cleaner ways to handle such asynchronous operations

*/

function getData(callback) {
  setTimeout(() => {
    console.log("Data received");
    callback();
  }, 2000);
}

getData(() => {
    console.log("Process the data")
})

/* 
    op: 
        after 2 sec

        Data received
        Process the data.
*/

/*  Callbacks are especially useful when we don't want to know
    when async operation is finished.

    so, we dont want to process the data before it arrives.

    so when async operation finished call this function.

*/
