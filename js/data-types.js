/*  Different data types present in javascript.

    we have primitive and non-primitive data types.
    
    To store single value we use primitive data types.
    To store multiple and complex values we use non-primitive data types

    1. Primitive types:
        Sting, Number, Boolean, Undefined, Null, BigInt, Symbol

    2. Non-Primitive types:
        Object. Any data type that is not Primitive is Object type is js.
        
    
    To know data type we use "typeof" operator.

*/
    typeof "sandesh"  // string

    let x = undefined;
    typeof x  // undefined

    let y = null;
    typeof y  // object (kind of bug in js)
    
    let arr = [1, 2, 3];
    typeof arr    // object
    Array.isArray(arr)  // true
    

    let obj = {
        name: 'sandesh',
        age: 7
    };
    typeof obj  // object
    Array.isArray(obj)  //false


    function greet(){}
    typeof greet    // function


    let fun = ()=> {}
    typeof fun  // function

    // Function is an object, but typeof specifically returns "function" for callable function objects.

// ---------------------------------------------------------------------------




    