/* 
    Array Destructuring 

            means extracting values from an array and
            assigning them to variables.

    Object Destructuring

            means extracting properties from an object and
            assigning them to variables.

    Rest operator(...)

            collect multiple values/properties into single array/object.

            ** rest operator is always at left side of the expression.

    Spread operator(...)

            expand elements of an array or object into individual values.

            ** spread operator is always at right side of the expression.
*/

// -----------------------------------------------------

/* 
    // rest operator


        const [first, second, ...rest] = [1, 2, 4, 5, 6]

        console.log(first);     // 1        // destructure
        console.log(second);    // 2        // destructure
        console.log(rest);      // [4, 5, 6]        // rest

        const user = {
            name: 'sandesh',
            designation: "developer",
            role: "admin"
        }

        const { name, ...remaining } = user;

        console.log(name);  // sandesh      // destructure

        console.log(remaining);   //{ designation: 'developer', role: 'admin' }         // rest

*/

// -----------------------------------------------------

/* 
const arr = [1, 2, 3];
const arr2 = [...arr, 4, 5]     // [1, 2, 3, ,4, 5]


// copy array.. to prevent mutation of original array
const copy = [...arr];          // copy using spread operator


const user = {
    name: 'sandesh',
    role: 'admin'
}

const copyUser = { ...user }        // copy
const copyUser1 = Object.assign({}, user);

const newUser = {
    ...user,        // copied all the properties of user object
    company: "Google"   // added new property
};
// console.log(newUser);     // { name: 'sandesh', role: 'admin', company: 'Google' }
 
*/
// -----------------------------------------------------

/* 
        shallow copy, deep copy

        using spread operator and Object.assign, we can make shallow copy only
        nested elements obj/array still share the same reference
*/

const user = {
  name: "Sandesh",
  address: {
    city: "Pune",
  },
};

const copy = { ...user }; // shallow copy
/* 
copy.address.city = "Mumbai";
console.log(user.address.city); // ❗ Mumbai (original changed)
 */

const deepCopy = structuredClone(user);
deepCopy.address.city = "Mumbai";

// console.log(user.address.city);  // // ✅ Pune (original safe)

// -----------------------------------------------------

/* 

    const [user, setUser] = useState({ name: "Sandesh", role: "admin" });

    user → current state

    setUser → function to update state 

    In React, state updates should be immutable, 
    meaning you never modify the original object/array directly. 
    Instead, you create a new object/array with updated values

    setUser(prevUser => ({
        ...prevUser,        // copy all previous properties
        role: 'superadmin'  // update/override only what you want
    }));

    
    prevUser → the previous state

    { ...prevUser } → spread operator: creates a new object with all previous properties

    role: 'superadmin' → overrides the role property in the new object

*/
