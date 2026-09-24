/* String

    String is sequence of characters.
    we create string using single quotes, double quotes, or backticks.

    String is immutable in js, 
    means once string is created we can not modify its individual character.
*/

let str = 'hello'

str[0] = 'i'            // immutable. can not change.

str.toUpperCase();      // returns new string not modifing original
console.log(str);       // hello.

str = str.toUpperCase();    // here, str refers to new string value. 
console.log(str);           // HELLO

// -------------------------------------------------------