/* Object

    Object in js is collection of key-value pair
    used to store related data together.

*/

const user = {
    name: 'sandesh',
    email: 'sandesh.gaikwad1911@gmail.com',
    address: {
        city: 'mumbai'
    }
}


/*  Object.freeze(user);

    it prevent object from mutation.
    can not add, delete or modify property at top level. we can mutate nested object.

    Object.freeze(user);

    user.email = "sandesh@gmail.com"        // not updated
    
    user.address.city = 'pune'              // updated

*/

// ----------------------------------------------

/* Object.seal(user);

    can not add or delete at top level.
    but can modify existing properties

    Object.seal(user);

    user.email = "sandesh@gmail.com";

    delete user.address.city;       //  city is deleted, it is nested property.

*/

// -----------------------------------------------

/* Object.preventExtensions(user);

    can not add new property at top level,
    but can modify or delete existing properties.

    bject.preventExtensions(user);

    user.email = 'sandesh@gmail.com'
    user.age = 20;                      // not work

    user.address.state = 'mh'           // will work

*/

// -------------------------------------------------

/*  shallow copy & deep copy

    shallow copy:

        It creates copy of top level properties. 
        but nested object still shared reference. so changes in property of nested object will also modified in other object.

        shallow copy is created with spread operator or Object.assign({}, objName) method.

        const shallowCopy = {...user};

        const shallowCopy = Object.assign({}, user);
    
    
    Deep copy:

        It creates completely independant copy, including nested object.

        const deepCopy = structuredClone(user);


        method is not copied in deep copy.
        method is copied in shallow copy so share reference.

*/

// -------------------------------------------------


// iterate over an object. for..in method is used. it return keys only.
for ( let key in user) {
    console.log(key, user[key]);
}

// --------------------------------------------------

// Object.keys(): return array of keys of an object.
console.log(Object.keys(user))      // [ 'name', 'email', 'address' ]

// --------------------------------------------------

// Object.values(): return array of values of an object.
console.log(Object.values(user))    // [ 'sandesh', 'sandesh.gaikwad1911@gmail.com', { city: 'mumbai' } ]

// ---------------------------------------------------------

// to check if property exists on object

Object.hasOwn(user, 'email')    // true

console.log('email' in user)    // true

// ----------------------------------------------