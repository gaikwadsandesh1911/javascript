/* this keyword

    this keyword belongs to object.. that is executing or calling 
    current function.

    - in global context this belongs to window object
        eg. console.log(this)   .. window

    - in regular function
        - in strict mode:  this = undefined
        - normal mode: this = window object

    - arrow function do not have their own value for this,
      it takes from surrounding lexical scope.

    - in constructor function this belongs to newly created object.
      

*/

/* call(), apply(), bind()

    we can explicitly set the value of this keyword using these methods

*/

// call... invoke function immediatly and pass value one by one

const user = {
  name: "sandesh",
};

function greet(city, country) {
  console.log(`${this.name} from ${city}, ${country}.`);
  //  this belongs to user object.
}

greet.call(user, "mumbai", "india");

// apply... invoke function immediately but pass argument in form of array.
function greet(city, country) {
  console.log(`${this.name} from ${city}, ${country}.`);
}
greet.apply(user, ["mumbai", "india"]);

// bind... does not invoke function immediately it return new function.
function greet(city, country) {
  console.log(`${this.name} from ${city}, ${country}.`);
}

const newBound = greet.bind(user, "mumbai", "india");
newBound();

// real world eg.

// call... we can borrow method of object. to another object using call.
const person1 = {
  name: "sandesh",
  greet: function () {
    console.log(`hello, ${this.name}`);
  },
};

const person2 = {
  name: "brock",
};

person1.greet.call(person2); //person2 borrow method from person1

// apply... when arguments are already in array
function sum(a, b, c) {
  return a + b + c;
}

const nums = [10, 20, 30];

let ans = sum.apply(null, nums);

// apply... you may fix some arguments now and pass the rest letter
function add(a, b) {
  return a + b;
}

const rest = add.bind(null, 5);

const result = rest(10); // 15
