/* Map

    Map is built-in data structure in js used to store key:value pair.

    like object map also store key: value pair but map has advantages.

    Keys can be any data type
    Maintains insertion order
    Has convenient methods like set(), get(), has(), delete()
    Has a built-in size property

*/

// const map = new Map();

const map = new Map([
    ["name", "Sandesh"],
    ["age", 30],
    ["city", "Mumbai"]
]);

// console.log(map);   // Map(3) { 'name' => 'Sandesh', 'age' => 30, 'city' => 'Mumbai' }


// set():   add or update
map.set("age", 20)  // if property already exist it updates

map.set(1, "one")   // key can be any type.



// get()    get a  value
map.get("name")     // sandesh
map.get("salary")   // undefined


// check if key exists
map.has("name")     // true

// remove entry
map.delete("name")


// remove everything
// map.clear()


map.size    // return length


const keys = [...map.keys()];
console.log(keys)               // [ 'age', 'city', 1 ]

const value = [...map.values()];
console.log(value)                  // [ 20, 'Mumbai', 'one' ]
