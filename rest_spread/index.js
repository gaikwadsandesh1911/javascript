/* 
    🛑Array Destructuring 

            we can extract values from an array and
            assign them to variables.
            
            👉  const arr = [1, 2, 4, 5, 6];

                const [first, second] = arr;

                        insted of       arr[0]
                        we have         first
    
    

    🛑Object Destructuring

            we can extract properties from an object and
            assign them to variables.

            👉const user = {
                name: 'sandesh',
                designation: "developer",
                role: "admin"
            }

            const { name } = user;

                    instead of                  user.name 
                    we can use directly         name



    🛑Rest operator(...)

            collect multiple values/properties into single array/object.

            ** to remember ourself [ rest operator is always at left side of the expression. ]

            const [first, second, ...rest] = arr;
            console.log(rest);      // [4, 5, 6]
            
            const { name, ...remaining } = user;
            console.log(remaining);   //{ designation: 'developer', role: 'admin' }
            


    🛑Spread operator(...)

            expand elements of an array or object into individual values.

            ** to remember ourself [ spread operator is always at right side of the expression. ]


            const arr2 = [...arr, 4, 5]     // [1, 2, 3, 4, 5]

            const copyUser = { ...user }

*/


// -----------------------------------------------------

/*  
        const user = {
            name: "Sandesh",
            address: { 
                city: "Pune" 
            }
        };


        👉shallow copy  

                ✅ Only top-level properties are copied
                ❌ Nested objects are shared reference
                    👉 so changes in nested properties DO reflect in original

                const copy = { ...user };
                    or
                const copy = Object.assign({}, user)    // 2nd way


                copy.address.city = "Mumbai";

                console.log(user.address.city); // Mumbai ❗


        
        👉deep copy 

            ✅with structuredClone(obj) method we can make deep copy
            ✅ Entire object is copied
                👉so change in nested properties of copied obj, will not reflect in original obj.


        const deepCopy = structuredClone(user);
        deepCopy.address.city = "Mumbai";

        // console.log(user.address.city);  // // ✅ Pune (original safe)


 */   
