
/* array

    - array is collection of simillar type data elements.
      but In js we store values of different types as well.

    - array stores elements in continous memory location.

    - we can access array by its index which is start from 0.

    - In js, built-in array methods help us add, remove, access, modify, search and process array elements.

*/


/* Modifies original array	        Does not modify original array

    push()	                    map()
    pop()	                    filter()
    shift()	                    slice()
    unshift()	                concat()
    splice()	                flat()
    sort()	                    flatMap()
    reverse()	                toSorted()
    fill()	                    toReversed()
    copyWithin()	            toSpliced()

    find(), includes(), some(), every(), indexOf(), and reduce() also leave the original array unchanged.

*/


/* 1. Adding and removing elements

    Method	        Description	

    push()	        Adds element at the end	
    pop()	        Removes the last element	
    unshift()	    Adds element at the beginning	
    shift()	        Removes the first element	
    splice()	    Adds, removes, or replaces elements	
    toSpliced()	    Returns a modified copy without changing the original

*/


let arr = [10, 20, 30];

arr.push(40);       // [10, 20, 30, 40]
arr.pop();          // [10, 20]
arr.unshift(5);     // [5, 10, 20, 30]
arr.shift();        // [20, 30]
arr.splice(1, 1);   // [10, 30]     //  at index 1 remove 1 item
arr.splice(1, 0, 15, 25);     //  [ 10, 15, 25, 20, 30 ]  // at index 1 do not remove anything add 15, 25
arr.splice(1, 2, 15, 25);     //  [10, 15, 25]    // at index 1 remove 2 items and add 15, 25


/* 2. Accessing and extracting elements

    Method	        Description

    at()	        Returns an element using its index; supports negative indexes
    slice()	        Returns a portion of an array without modifying the original
    concat()	    Combines arrays
    toString()	    Converts array elements into a string
    join()	        Joins elements into a string using a separator

*/

let arr = [10, 20, 30, 40];

arr.at(1);               // 20
arr.at(-1);              // 40
arr.slice(1, 3);         // [20, 30]
arr.concat([50, 60]);    // [10, 20, 30, 40, 50, 60]
arr.join("-");           // "10-20-30-40"
arr.toString();          // "10,20,30,40"


/* slice() vs splice()
    
    slice() extracts elements without changing the original array.

    splice() adds, removes, or replaces elements in the original array.

*/


/* 3. Searching methods

    Method	            Description

    indexOf()	        Returns the first matching element's index
    lastIndexOf()	    Returns the last matching element's index
    includes()	        Checks whether an element exists
    find()	            Returns the first element satisfying a condition
    findLast()	        Returns the last element satisfying a condition
    findIndex()	        Returns the index of the first matching element
    findLastIndex()	    Returns the index of the last matching element

*/

let arr = [10, 20, 30, 20, 40];

arr.indexOf(20);                  // 1
arr.lastIndexOf(20);              // 3
arr.includes(30);                 // true

arr.find(n => n > 20);            // 30
arr.findLast(n => n > 20);        // 40
arr.findIndex(n => n > 20);       // 2
arr.findLastIndex(n => n > 20);   // 4

/* 
    If no match is found, 
    -   find() return undefined and  
    -   findIndex() returns -1.
*/


/* 4. Iteration and transformation methods

    These are especially important for JavaScript and React interviews.

    Method	        Description

    forEach()	    Executes a function for each element
    map()	        Creates a new array by transforming elements
    filter()	    Creates a new array containing matching elements
    reduce()	    Reduces elements to a single accumulated result
    
    flatMap()	    Maps elements and flattens the result by one level

*/

let arr = [1, 2, 3, 4];

arr.forEach(n => console.log(n));
// Prints each number

arr.map(n => n * 2);
// [2, 4, 6, 8]

arr.filter(n => n > 2);
// [3, 4]

arr.reduce((sum, n) => sum + n, 0);
// 10


/* 5. Sorting and reversing methods

    Method	        Description

    sort()	        Sorts elements; modifies the original array.
    reverse()	    Reverses the original array
    toSorted()	    Returns a sorted copy
    toReversed()	Returns a reversed copy

*/

    let arr = [30, 10, 20];

    arr.sort((a, b) => a - b);
    // [10, 20, 30] — ascending

    arr.sort((a, b) => b - a);
    // [30, 20, 10] — descending

    arr.reverse();
    // Reverses the original array


/* 6. Checking conditions

    Method	        Description

    some()	        Returns true if at least one element matches
    every()	        Returns true if all elements match
    
*/

    let arr = [2, 4, 6, 8];

    arr.some(n => n > 5);   // true
    arr.every(n => n % 2 === 0); // true


