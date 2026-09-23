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


/* Coercion

    conversion of value from one data type to another is called coercion.

    we have implicit and explicit type of coercion.

    1. explicit: we manually do that.

    2. implicit: 
            
        Javascript automatically convert value from one data type to another.
        It takes places when operands of the expressions are different data types.

        1. String coercion:

            It takes place while using " + " operator.
            
            when number added to string.
            number converted to string type first, then perform operation.
                
                let x = 3
                let y = "3"
                x + y = "33"

        2.  Number coercion:

            It takes places while using " - " operator.
        
            string converted to number first, then perform operaton.

                let x = 3
                let y = "3"
                x - y = 0


        3. Equality coercion:

            It takes places when using " ==" operator.
            
            The ‘ == ‘ operator compares values and not types.

            
            The ‘==’ operator, converts both the operands to the same type and then compares them.



        4. Boolean coercion:

            It takes places when using,
            logical operators, ternary operator, if statement, loop checks.

            To understand Boolean coercion we need to uderstand
            Truthy and Falsy values.

            Truthy values are those which will be converted into true.
            False values are those which will be converted into false.

            All values expect false, 0, "", null, undefined, NaN are truthy values.
    
*/

// if statement

    let a = 0;

    if(a){ 
        console.log(a);
    }
    // The code inside if will not run, since a has falsy value.

// ----------------------------------------------------------------------------------
    

/*  Logical operators:

    Logical operators in javascript, do not return true or false. 
    They always return one of the operands.

    OR ( | | ) operator - 
    
        If the first value is truthy, then the first value is returned. 
        Otherwise, always the second value gets returned.


    AND ( && ) operator - 
    
        If both the values are truthy, always the second value is returned. 
        If the first value is falsy then the first value is returned or 
        if the second value is falsy then the second value is returned

*/

    let p = 220
    let q = "hello"
    let r = undefined

    p || q    // 220 since first value is truth.

    p || r     // 220 since first value is truty

    p && q     // "hello" since both values are truthy.

    p && r   // undefined, since second value is falsy.

    if( p && q ){
        console.log('hi...')   // this block runs. because ( p and q return "hello") which is truthyy  value
    }

// -----------------------------------------------------------


/* Passed by value and Passed by reference

     primitive data types are passed by value and 

     non-primitive data types are passed by reference.
    
*/

let v1 = 20;
let v2 = v1;

console.log(v2)

v1 = 30;
console.log(v2)     // 20

/* 
    when primitive data types are passed to another variable.
    new memory address is created for that variable and pass the value.

    so change the value of variable one does not affect the other variable.

*/

let obj1 = {
    name: "sandesh"
}

let obj2 = obj1;

console.log(obj2);

obj1.name = "sandesh gaikwad"

console.log(obj2);  // { name: "sandesh gaikwad"}

/* 
    In non-primitive reference of an object is passed,
    so both are pointing to same memory address.

    now, changes in one object will affect the other.
*/

// ----------------------------------------------------------------