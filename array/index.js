/* 
    An array in JavaScript is a special type of object 
    that is used to store multiple values in a single variable. 
    Unlike regular variables that can hold only one value, arrays can hold lists of values, 
    and these values can be of any type: numbers, strings, objects, other arrays, functions, etc.
*/

/*  
    👉 const array = [1, 3, 5];            // array literal, is syntactic sugar of new Array(1, 3, 5)
    
        const array = new Array(1, 3, 5);   // behind the scene js engine


    
    👉All the standard array methods like 
        push, pop, map, filter, forEach, slice, etc., 
        live on Array.prototype.

    👉When you call a method on an array, 
        JavaScript looks up the prototype chain and finds the method in Array.prototype.

    👉console.log(arr.push === Array.prototype.push); // true



    🛑2. Prototype Chain for Array

    👉array --> Array.prototype --> Object.prototype --> null

            array → your array instance

            Array.prototype → shared methods (push, pop, map, etc.)

            Object.prototype → generic object methods (toString, hasOwnProperty)

            null → end of the chain

            console.log(arr.toString()); // Works, found in Object.prototype
            console.log(arr.push(4));    // Works, found in Array.prototype

    👉Bonus: You can add your own methods to Array.prototype, but it’s not recommended in production.
    
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

                some(fn) / every(fn) / includes(val) / findIndex(fn) / indexOf() - All read-only, do not change array

                flat() / flatMap(fn) – Returns a new flattened array.

        
        🛑3.  Other commonly used

            forEach(fn)   - Iterates array, no return, no mutation

            at(indx)  - return element at given index

            join()  -  Returns a string concatenation

            toString() - convert array tot string

*/