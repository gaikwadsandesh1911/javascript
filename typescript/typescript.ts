/* 
    npm install -g typescript;
    tsc --version;

    tsc index.ts        // compile
    node index.js       // run

*/

/* 
    Typescript 

      it's superset of javascript, It add static typing to javascript.
      so errors are detected at compile time rather than runtime.

      it makes development faster and safer.

*/

/* 
    different data types

    🔹 1. Basic (Primitive)
            number, string, boolean, null, undefined

    🔹 2. Special Types 
            - any ( Disables type checking (avoid when possible ). 
            - unknown ( Safer alternative to any ). we have to check type to perform further opertion
            - void ( for function that does not return anything )
            - never ( for functions that never return (e.g., throw errors). )
    
    🔹 3. Arrays

    🔹 4. Tuples ( fixed-length array with specific type )

    🔹 5. Enum ( Define set of named constants ) can hold only specifid value

    🔹 6. Objects

    🔹 7. Union Types ( allow multiple possible types )

    🔹 8. Intersection types ( combine multiple types into one )

    🔹 9. Type Aliases ( create custom types )

    🔹 10. Interfaces ( define object structure ) can extends other interfaces

    🔹 11. type assertion [as] keyword ( we tell compiler, type of variable than compiler infer )

    🔹 12. Generics ( we create reusable components[function, interfaces, types, classes]) that works with different types

*/

// ------------------------------------------------------------------------------

// implicit typing..... compiler guess types based on initialize value

let str = "sandesh";
// str = 10        // error

let width = 10;
// width = "10"     // error

let age: number = 20;
age = 18;

// ------------------------------------------------------------------------------

//  explicit typing.... we define type for variable

let nameStr: string;
nameStr = "sandesh";

let isAdmin: boolean;
isAdmin = false;

let strOrnum: string | number;
strOrnum = "sandesh";
strOrnum = 19;
// strOrnum = []    // error

let value: unknown;
value = "hello";
if (typeof value == "string") {
  console.log(value.toUpperCase());
}

// ------------------------------------------------------------------------------

// array

let names = ["sandesh", "subodh"];
names.push("tom");
// names.push(10)      // error

let strArray: string[];
strArray = ["hello", "hi"];
strArray.push("hi..");

let strOrNumArray: (string | number)[];
strOrNumArray = [1, "one", 2, "two"];

let numbers: number[] = [1, 3, 5];
let namesArry: Array<string> = ["sandesh", "subodh"];

let tupple: [number, string] = [19, "sandesh"];

// ------------------------------------------------------------------------------

// Object

let user = {
  username: "sandesh",
  age: 20,
  isAdmin: false,
};

user.isAdmin = true;
// user.age = "twenty";     // error

// user.phone = "+918805095488"   // error    property phone does not exists

let userObj: {
  username: string;
  age: number;
  isAdmin: boolean;
  phone?: string;
};
//  must have all properties above defined. phone is optional
userObj = {
  username: "sandesh",
  age: 20,
  isAdmin: true,
};

// ------------------------------------------------------------------------------

// any

let testAny; // implicit has any type

testAny = "sandesh";
testAny = 19;
testAny = false;

let testAnyArray: any[];

testAnyArray = [false, 19, "sandesh", { name: "sandesh", age: 20 }];

// ------------------------------------------------------------------------------

// enum
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
let move: Direction = Direction.Up; // 0

if (move == Direction.Up) {
  console.log("move up");
} else {
  console.log("move down");
}

// ------------------------------------------------------------------------------

// union types
let id: string | number;
id = 'A101';
id = 101;

// ------------------------------------------------------------------------------

// intersection type
type Person = {
  name: string
}
type Employee = {
  id: number
}
type Staff = Person & Employee;

const staff: Staff = {
  id: 101,
  name: 'sandesh'
}

// ------------------------------------------------------------------------------

// type assertion

let val: unknown = "hello world";
let upperCaseVal;
// let upperCaseVal = val.toUpperCase  // warning val type is unknown
if (typeof val == "string") {
  upperCaseVal = val.toUpperCase();
}

// type assertion method - 1  // recommended
upperCaseVal = (val as string).toUpperCase();

// type assertion method - 2
upperCaseVal = (<string>val).toUpperCase();
// ------------------------------------------------------------------------------

// function

let sayHi: () => void;

sayHi = () => {
  console.log("hi...");
};

// function return nothing
let greet = (): void => {
  console.log("welcome..");
};

// function return number
let calc = (): number => {
  return 20;
};

// num as parameter
let add = (num: number): number => {
  return num + 10;
};
add(100);

// object as parameter.
let func = (user: { username: string; date: number }) => {
  console.log(user.date);
};
func({ username: "sandesh", date: 20 });

// ------------------------------------------------------------------------------

// Type Aliase ( define custom types )

type UserType = {
  username: string;
  age: number;
  phone?: string;
};

const betterFunc = (user: UserType): string => {
  return user.username;
};

betterFunc({ username: "sandesh", age: 20, phone: "+918805095488" });

// ----------------

type myFunc = (a: number, b: string) => void;

const write: myFunc = (num, str) => {};

// ------------------------------------------------------------------------------

type userType2 = {
  username: string;
  age: number;
  phone?: string;
  theme: "light" | "dark"; // accepts any one of them.
};

const userWithTheme: userType2 = {
  username: "sandesh",
  age: 20,
  theme: "dark",
};

// ------------------------------------------------------------------------------

// interfaces

interface IUser {
  username: string;
  email: string;
  age: number;
}

interface IEmployee extends IUser {
  empId: number;
}

const emp: IEmployee = {
  username: "sandesh",
  email: "sandesh.gaikwad1911@gmail.com",
  age: 20,
  empId: 7,
};

const client: IUser = {
  username: "sandesh",
  email: "sandesh.gaikwad1911@gmail.com",
  age: 20,
};

// ------------------------------------------------------------------------------

// Generics

interface IAuth {
  id: number;
  username: string;
}

interface ICategory {
  id: number;
  title: string;
}

interface IPost {
  id: number;
  title: string;
  desc: string;
  extra: IAuth[] | ICategory[];
}

const post: IPost = {
  id: 101,
  title: "samsung",
  desc: "Do not scroll on this phone...",
  extra: [
    {
      id: 1,
      title: "mobile phone",
    },
  ],
};

// -----------------------------------------------------

interface IPostBetter<T> {
  id: number;
  title: string;
  desc: string;
  extra: T[];
}

const testMe: IPostBetter<String> = {
  id: 2,
  title: "Blog",
  desc: "This is very nice blog..",
  extra: ["hello", "world", "welcome"],
};

interface IPostEvenBetter<T extends Object> {
  id: number;
  title: string;
  desc: string;
  extra: T[];
}

const testMe2: IPostEvenBetter<IAuth> = {
  id: 2,
  title: "Blog",
  desc: "This is very nice blog..",
  extra: [
    { id: 1, username: "sandesh" },
    { id: 2, username: "subodh" },
  ],
};

// -----------------------------------------------------

// 🔷 TypeScript Built-in Utility Types

/* 
    🔹 1️⃣ Partial<T> ( makes all properties optional )
          Useful for update functions:

    🔹 2️⃣ Required<T> ( makes all properties required )

    🔹 3️⃣ Readonly<T> ( makes properties immutable )

    🔹 4️⃣ Pick<T, K> ( select specific properties from a type. )

    🔹 5️⃣ Omit<T, K> ( remove specified properties of object ) works on object keys

    🔹 7️⃣ Exclude<T, U> (remove specified types from union) works on unioun types

    🔹 8️⃣ Extract<T, U> ( keeps only matching type in unioun )

    🔹 6️⃣ Record<K, T> Creates an object type with specific keys and value types.

*/

interface IiUser {
  id: number;
  name: string;
  email: string;
}

// ----------------------------------------------------------------

function updateUser(user: IiUser, updateUser: Partial<IiUser>) {
  return {
    ...user,
    ...updateUser,
  };
}
updateUser(
  { id: 101, name: "sandesh", email: "sandesh@gmail.com" },
  { email: "sandesh@rocketmail.com" },
);

// ------------------------------------------------------------------

type UserPreview = Pick<IiUser, "id" | "email">;
const userPre: UserPreview = {
  id: 101,
  email: "sanadesh@gmail.com",
};

// ------------------------------------------------------------------

type UserWithoutEmail = Omit<IiUser, "email">;
const userWithoutEmail: UserWithoutEmail = {
  id: 101,
  name: "sandesh",
};

// ------------------------------------------------------------------

type Status = "success" | "error" | "loading";

type WithoutLoading = Exclude<Status, "loading">;
let statas: WithoutLoading = "error";

type OnlySuccess = Extract<Status, "success">;
let scs: OnlySuccess = "success";

// ------------------------------------------------------------------

type ProductId = "p1" | "p2" | "p3";
type Stock = Record<ProductId, number>;
const inventory: Stock = {
  p1: 10,
  p2: 20,
  p3: 40,
};

// -----
type UserId = "u1" | "u2";
type UuserType = {
  name: string;
  date: number;
};
type UserMap = Record<UserId, UuserType>;
const users: UserMap = {
  u1: { name: "sandesh", date: 19 },
  u2: { name: "subodh", date: 19 },
};

// ------------------------------------------------------------------
