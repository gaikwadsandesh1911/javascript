/* 
    ⚡coercion 

        conversion of value from one data type to another.
        
    
    Types of coercion:

        2. Explicit, we have to manually do that.

        1. Implicit
        
            javascript  automatic convert value from one data type to another. 
            It takes place when the operands of an expression are of different data types.

        
        👉Boolean coercion

                boolean  coercion takes place when using logical operator,
                ternary operators, if statement, and loop check.

                To understand boolean coercion in
                if statements and operators,

            ✅   we need to understand truthy and falsy values.

                👉Truthy values are those which will be converted (coerced) to true. 
                👉Falsy values are those which will be converted to false.

                All values except false, 0, 0n, -0, “”, null, undefined, and NaN are truthy values.
        

            ✅if statement

                let x = 0;

                if(x){
                    console.log(x)      // this will not run because x=0 and 0 is falsy value
                }
                else{
                    console.log("hi")
                }

            ✅Logical operators:

                Logical operators in javascript, unlike operators in other programming languages, 
                do not return true or false. They always return one of the operands.

                ✅OR ( || ) operator - 
                
                    👉If the first value is truthy, then the first value is returned. 
                    👉Otherwise, always the second value gets returned.

                ✅AND ( && ) operator - 

                    👉If both the values are truthy, always the second value is returned. 
                    👉If the first value is falsy then the first value is returned or if the second value is falsy then the second value is returned.

                
                ✅Short-circuit Evalution
                    is happen with Logical AND ( && ),  and Logical OR( || ) operator.

                    👉 JavaScript stops evaluating an expression as soon as the result is known.

                        👉0 && "hello"    => 0 is return, js does not even look at second operand.

                        👉"hello" || 0     => hello is return, js does not even look at second operand.


            let x = 100   
            let y = "Hello";
            let z = undefined;
                    
            x | | y    // Returns 220 since the first value is truthy
                    
            x | | z   // Returns 220 since the first value is truthy
                    
            x && y    // Returns "Hello" since both the values are truthy
                    
            y && z   // Returns undefined since the second value is falsy
                    
            if( x && y ){ 
                console.log("Code runs" ); // This block runs because x && y returns "Hello" (Truthy)
            }   
                    
            if( x || z ){
                console.log("Code runs");  // This block runs because x || y returns 220(Truthy)
            }

*/

/* 
        check for...

            string coersion

            equality coersion
*/

// --------------------------------------------------------------

/*  ⚡ ?. optional chaining

        if we try to access property on an undefined or null,
        instead of throwing an error, js return [ undefined ]

        const user = {
            name: 'sandesh',
            role: 'admin',
        }

        user.address ....               //  undefined

        // address is undefined. and we try to access property on it.
        user.address.city ....          //  error

        user.address?.city  ....        //  undefined
                👉 It stops execution before accessing .city


*/      

/*   ⚡ nullish coalescing operator (??)

            if left-hand value is null or undefined then only it return right hand value.
            👉 Otherwise, it returns the left value

            console.log(null ?? "Guest");        // "Guest"
            console.log(undefined ?? "Guest");   // "Guest"
            console.log("Sandesh" ?? "Guest");   // "Sandesh"

            
            console.log(0 || 10);   // 10 ❌
            console.log(0 ?? 10);   // 0 ✅

            console.log("" || "Hi"); // "Hi" ❌
            console.log("" ?? "Hi"); // "" ✅


    🔥Best Practice (Very Important)

        👉 Combine with optional chaining:

        const city = user.address?.city ?? "Unknown";

*/