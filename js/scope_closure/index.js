/* 👉scope and scope chain, lexical scope, clousure,

    scope
    
        accessibility of variables and functions at various parts of code
        define scope of that variable or function.

        we have,

    1.  Global Scope    

            variable declared inside global namespace can be accessed anywhere in the code.
    
    2.  Local or Function Scope

            variable declared inside function have local or functional scope.
            means that variable can be accessed within that function only.
    
    3.  Block Scope

            variable declared inside a block { } accessible only inside that block.

    4.  scope chain

            if js engine do not find variable in local scope, it try to find variable in its outer scope.
            if variable not exist in outer scope, it try to find in global scope
            if variable not found in global scope, it throws an reference error.


            const globalVar = "Global";

            function outer() {

                const outerVar = "Outer";

                function inner() {

                    const innerVar = "Inner";

                    console.log(innerVar); // ✅ found in inner
                    console.log(outerVar); // ✅ found in outer
                    console.log(globalVar); // ✅ found in global
                }

                inner();
            }

            outer();

            ❌ When not found → ReferenceError

*/

// --------------------------------------------------------------------------------------------------------

/*  👉Lexical scope

            inner functions have access to variables declared in their outer function
            is called “lexical scope”.
            
                function outerFunction() {

                    let outerVar = "I am outside!";

                    function innerFunction() {

                        console.log(outerVar); // Can access outerVar
                    }

                    innerFunction();
                }

                outerFunction();

            👉 Scope is decided by where code is written, NOT where it is called.
*/



// --------------------------------------------------------------------------------------------------

/*  👉 Closure

        A closure is a function or ability of the function 
        that remembers the variables from its outer scope, 
        even after that outer function has finished its execution.

            function outer() {

                let count = 0;

                return function inner() {
                    count++;
                    return count;
                };
            }

            const counter = outer();
        
        👉     when function return something, we store it in variable,
                but that variable itself is a function,
                because we return function from...  function outer() {}

                console.log(typeof counter)         // function. 

        👉      here counter is reference ( variable ), that stores inner function.
                
        👉      counter();      // actually calls inner()


            console.log(counter());         // 1
            console.log(counter());         // 2
            console.log(counter());         // 3 

            👉 Scope is decided by where code is written, NOT where it is called.
                our count variable is inside outer function.
                and we increse its value from inner function. even though outer function finished its execution.


        🔥 Why this works?
            outer() => finished execution ✅
            But inner() still remembers count ❗
            👉 That’s closure

            👉closure is possible because of lexical scope.            

*/

/*  👉 Currying

            Currying is a technique where a function with multiple arguments 
            is transformed into a sequence of functions, each taking one argument at a time.

            👉Currying helps you break big functions into smaller reusable steps

        🔹 Normal Function (No Currying)

            function add(a, b, c) {
                return a + b + c;
            }

            add(1, 2, 3); // 6



        🔹 Curried Version

            function add(a) {
                return function (b) {
                    return function (c) {
                        return a + b + c;
                    };
                };
            }

            add(1)(2)(3); // 6


*/


/* 
    function memoize(){
        return function(num){
            console.log(num)
        }
    }
    const memo = memoize();
    memo(20) 
*/

// 👍 memoization is a classic example of closure 

function memoize(){
    let  cache = {};
    return function(num){
        if(num in cache){
            console.log('...from cache...');
            return cache[num]
        }else{
            cache[num] = num + 100;
            return cache[num];
        }
    }
}
const memoFun = memoize();
console.log(memoFun(20));
console.log(memoFun(20));
console.log(memoFun(40));

/* 
op
    120
    ...from cache...
    120
    140

    first time 20 value provided.  120
    second time 20 value provided.      ...from cache  120

    

    Memoization is a form of caching 
    where the return value of a function is cached based on its parameters. 
    If the parameter of that function is not changed, the cached version of the function is returned.

        * memoization is used for expensive function.

*/



