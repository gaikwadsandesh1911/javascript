/* Map

    A Map is a data structure that stores data in the form of key-value pairs.
    where each key is unique and used to access corrosponding value.

    JS provides built-in Map Object to implement it.

    Object also store key: value pair but Map has advantages over object.

    - Keys can be any data type
    - Maintains insertion order
    - Has convenient methods like set(), get(), has(), delete()
    - Has a built-in size property

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
