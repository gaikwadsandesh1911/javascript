/* String

    String is sequence of characters.
    we create string using single quotes, double quotes, or backticks.

    String is immutable in js, 
    means once string is created we can not modify original it returns new string.
*/

let str = 'hello'

str[0] = 'i'            // immutable. can not change.

str.toUpperCase();      // returns new string not modifing original
console.log(str);       // hello.

str = str.toUpperCase();    // here, str refers to new string value. 
console.log(str);           // HELLO

// -------------------------------------------------------

/* 2. Searching methods

    Method	Description

    indexOf()	        Returns the first matching position
    lastIndexOf()	    Returns the last matching position
    includes()	        Checks whether a substring exists
    startsWith()	    Checks whether a string starts with a substring
    endsWith()	        Checks whether a string ends with a substring
    
    search()	        Searches using a regular expression
    match()	            Returns matches using a regular expression
    matchAll()	        Returns an iterator of all regex matches

*/

    let str = "JavaScript is awesome";

    str.indexOf("a");              // 1
    str.lastIndexOf("a");          // 3
    str.includes("Script");        // true
    str.startsWith("Java");        // true
    str.endsWith("awesome");       // true
    str.search(/is/);              // 11
    str.match(/a/g);               // ["a", "a"]

/* 
    indexOf() and search() return -1 when no match is found.
*/


/* 3. Extracting parts of a string

    Method	            Description

    slice()	            Extracts a portion of a string
    substring()	        Extracts characters between two indexes
    at()	            Returns the character at an index; supports negative indexes
    charAt()	        Returns the character at an index

*/

let str = "JavaScript";

str.slice(0, 4);       // "Java"
str.substring(4, 10);  // "Script"
str.at(-1);            // "t"
str.charAt(0);         // "J"


/* 4. Replacing text

    Method	        Description

    replace()	    Replaces the first match by default
    replaceAll()	Replaces all matches

*/

let str = "apple apple apple";

str.replace("apple", "orange");
// "orange apple apple"

str.replaceAll("apple", "orange");
// "orange orange orange"


/* 5. Removing spaces and padding

    Method	        Description

    trim()	        Removes whitespace from both ends
    

*/
let str = "  hello  ";

str.trim();       // "hello"


/* 6. Splitting and combining strings

    Method	        Description

    split()	        Splits a string into an array
    concat()	    Joins strings together

*/

let str = "apple,banana,mango";

str.split(",");
// ["apple", "banana", "mango"]

"Hello".concat(" ", "World");
// "Hello World"



/*  slice() vs substring()

*/
let str = "JavaScript";

// both used to extract portion of string, accepts start and endIndex. endIndex is excluded.
console.log(str.slice(0, 4));      // "Java"
console.log(str.substring(0, 4));  // "Java"


// slice() supports negative indexes, counting from the end of the string. substring() treats negative indexes as 0.
console.log(str.slice(-6));      // "Script"
console.log(str.substring(-6));  // "JavaScript"

// When the start index is greater than the end index
// slice() returns an empty string, whereas substring() swaps the two indexes.
console.log(str.slice(4, 1));      // ""
console.log(str.substring(4, 1));  // "ava"
