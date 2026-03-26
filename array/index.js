/* 
    An array in JavaScript is a special type of object 
    that is used to store multiple values in a single variable. 
    Unlike regular variables that can hold only one value, arrays can hold lists of values, 
    and these values can be of any type: numbers, strings, objects, other arrays, functions, etc.

    const arr = [1, 2, 3, 4, 5];

    👉console.log(typeof arr);        // object

    // to check if it is an actual array
    👉console.log(Array.isArray(arr));    // true

    👉array inherits properties and methods from Array.prototype
        thats why we have, 
            push(), pop()....  etc method on arr object

            👉console.log(arr.__proto__);
            👉console.log(arr.__proto__ == Array.prototype);    // true
            

*/

/* 
        🛑1. Methods that mutate the original array

            ✅Adding / Removing Elements.

                push(...items) – Adds items at the end of the array.

                pop() – Removes the last item and returns it.

                shift() – Removes the first item and returns it.

                unshift(...items) – Adds items at the beginning.

                splice(startIndex, deleteCount, ...items to add) – Add/remove items at any position.

            ✅Reordering / Sorting

                reverse() – Reverses the array in place.

                sort([compareFn]) – Sorts the array in place.

            ✅Filling / Copying

                fill(value, start?, end?) – Fills array with a value from start to end.

                copyWithin(target, start, end?) – Copies a sequence of elements within the same array.



        🛑2. Methods that return a new array (non-mutating) do not change the original array:

                concat(...) – Returns a new array combining arrays.

                join(separator)  -  convert array into a string, return string

                slice(start, end) – extract specified portion.

                map(fn) – Returns a new array.

                filter(fn) – Returns a new array.

                find(fn) - Return first element matching

                reduce(fn) - Retrun single val

                findIndex(fn) - Find index of first element that satisfies condition.

                indexOf(val) - return index of provided val

                at(index)  - return element at given index

                some(fn) / every(fn) / includes(val)  / - return boolean

                flat() / flatMap(fn) – Returns a new flattened array.

        
        🛑3.  Other commonly used

            forEach(fn)   - Iterates array, no return, no mutation 

            toString() - convert array tot string

*/

// --------------------------------------------------------

/* 

        🔹splice(startIndex, deleteCount, ...items to add) – Add/remove items at any position.
        
        let arr = [1, 2, 3, 4];

        arr.splice(1, 2);       
        👉op [ 1, 4 ]
        // remove 2 elements starting from index 1
        

        arr.splice(1, 0, 20, 30)   
        👉op[ 1, 20, 30, 2, 3, 4 ]     
        // start adding 20, 30 from index 1 and do not delete. 
        
        
        const removed = arr.splice(1, 2)    
        // we can also store removed elements console.log(removed)
        👉op[ 2, 3 ]
        
        arr.splice(2)       // if delete ommited, will delete everything from specified index
        👉op[ 1, 2 ]
*/



/* 
        🔹slice(start, end)   -  extract specified position. end index excluded. also works with string

        let arr = [1, 2, 3, 4];

        const result = arr.slice(1, 3)
        👉op [ 2, 3 ] 
        
        let copy = arr.slice();
        👉op [1, 2, 3, 4]

*/


/*      🔹map()

            👉  Iterate over each element. 
                Also can transforms each element.  

                * length will be same of original array
            
            let arr = [1, 2, 3];
            
            let result = arr.map(x => x * 2);
            console.log(result); // [2, 4, 6]


/*      🔹filter()

            👉  selects elements based on condition.

                * length based on condition met
            
            let result = arr.filter(x => x % 2 === 0);
            console.log(result); // [2, 4]


            🔹 Real-World Example

            let users = [
                { name: "A", active: true },
                { name: "B", active: false }
            ];
            
            
            let names = users.map(u => u.name);
            console.log(names); // ["A", "B"]
            
            let activeUsers = users.filter(u => u.active);
            console.log(names); // ["A"]
*/

/*      🔹reduce()
            used to reduce an array into a single value (number, object, array, etc.)

        🔹  array.reduce((accumulator, currentValue) => {
                return updatedAccumulator;
            },initialValue);

        🔹  accumulator (acc) → stores result
            currentValue (curr) → current element
            initialValue → starting value of accumulator

        ❗ If no initialValue, first element becomes acc

        let arr = [1, 2, 3, 4];

        let sum = arr.reduce((acc, curr) => acc + curr, 0);

*/

/*      🔹sort()

        let arr = [10, 2, 5];

            👉number is considered as string.. so we need compareFn for numeric val

            arr.sort((a, b)=> a - b)        //ascending

            arr.sort((a, b)=> b - a)        // descending



        let names = ["banana", "apple", "cherry"];

            👉for string val we do not need compareFn

            names.sort()


*/

let names = ["banana", "apple", "cherry"];

names.sort()

console.log(names);








