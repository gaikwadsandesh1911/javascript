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

                splice(start, deleteCount, ...items) – Add/remove items at any position.

            ✅Reordering / Sorting

                reverse() – Reverses the array in place.

                sort([compareFn]) – Sorts the array in place.

            ✅Filling / Copying

                fill(value, start?, end?) – Fills array with a value from start to end.

                copyWithin(target, start, end?) – Copies a sequence of elements within the same array.



        🛑2. Methods that return a new array (non-mutating) do not change the original array:

                concat(...) – Returns a new array combining arrays.

                slice(start, end) – Returns a shallow copy.

                map(fn) – Returns a new array.

                filter(fn) – Returns a new array.

                find(fn) - Return first element matching

                reduce(fn) - Retrun single val

                findIndex(fn) - Find index of first element that satisfies condition.

                some(fn) / every(fn) / includes(val)  / indexOf() - All read-only, do not change array

                flat() / flatMap(fn) – Returns a new flattened array.

        
        🛑3.  Other commonly used

            forEach(fn)   - Iterates array, no return, no mutation

            at(indx)  - return element at given index

            join()  -  Returns a string concatenation

            toString() - convert array tot string

*/