/* Set

    a Set is data structure. which store unique elements only.

    JS provides built-in Set object to implement it.
    
    available methods on Set object:

        add() → insert
        has() → search
        delete() → remove
        clear() → remove everything

        size.

*/

// const numbers = new Set();

const numbers = new Set([10, 20, 30, 30, 10]);

// add value
numbers.add(50);
console.log(numbers);       // Set(3) { 10, 20, 30, 50 }


// check wheather value exists.
numbers.has(10)         // true

// remove a value.
numbers.delete(10)


// remove all values
numbers.clear()         // Set(0) {}


// we convert set to array using spread or Array.from()
const set = new Set([10, 20, 30])
const arr = [...set];
const arr1 = Array.from(set);
console.log(arr)    // [10, 20, 30]
console.log(arr1)   // [10, 20, 30]


// we can convert array into set using Set constructor
const array = [10, 20, 30, 40];
const sett = new Set(array);
console.log(sett)   // Set(3) { 10, 20, 30 }

