/* 
    In JavaScript, a string is a sequence of characters used to represent text

    Strings are immutable in JavaScript.

    No method actually changes the original string — they always return a new string or value.
    
    We can create strings in three main ways: 
            using single quotes, 
            double quotes, or 
            backticks (for template literals).
*/

/* 
    Once string is created we can not change individual val

    let s = "Hello";
    s[0] = "Y"; // ❌ Won't change the string
    console.log(s); // Hello
    s = "Hi"
    console.log(s); // Hi
*/

/* 
    string is primitive data type still we use property on it using . operator. How ?

    👉“Strings in JavaScript inherit properties and methods from String.prototype.”

    👉console.log(s.__proto__ == String.prototype);    // true

    When you try to access a property or method on a primitive, 
    JavaScript temporarily wraps it in a corresponding object type:

        String for string
        Number for number
        Boolean for boolean

        let s = new String("hello")   // behind the scene
*/

/* 
    all useful methods

        .charAt(index)  Returns character at position   "hello".charAt(1) // "e"

        [index]         Access character directly       "hello"[1] // "e"

                           |
| ------------------------- | ------------------------------------------ | ---------------------------------- |
| `.indexOf(substring)`     | First index of substring (-1 if not found) | `"hello".indexOf("l") // 2`        |
| `.lastIndexOf(substring)` | Last index of substring                    | `"hello".lastIndexOf("l") // 3`    |
| `.includes(substring)`    | Returns true if substring exists           | `"hello".includes("ll") // true`   |
| `.startsWith(substring)`  | Checks start                               | `"hello".startsWith("he") // true` |
| `.endsWith(substring)`    | Checks end                                 | `"hello".endsWith("lo") // true`   |
| `.search(regex)`          | Search with regex                          | `"hello123".search(/\d/) // 5`     |

| Method                   | Description                              | Example                           |
| ------------------------ | ---------------------------------------- | --------------------------------- |
| `.slice(start, end)`     | Extracts substring                       | `"hello".slice(1,4) // "ell"`     |
| `.substring(start, end)` | Similar to slice but no negative indexes | `"hello".substring(1,4) // "ell"` |
| `.substr(start, length)` | Extract with length                      | `"hello".substr(1,3) // "ell"`    |

| Method                     | Description              | Example                                        |
| -------------------------- | ------------------------ | ---------------------------------------------- |
| `.split(separator)`        | Converts string to array | `"a,b,c".split(",") // ["a","b","c"]`          |
| `.concat(str1, str2, ...)` | Join strings             | `"Hello".concat(" ","World") // "Hello World"` |

*/

let str = "sandesh gaikwad";


// Step 1: split into words
let words = str.split(" ");

// Step 2: capitalize first letter of each word
let capitalizedWords = words.map(word => {
  return word.charAt(0).toUpperCase() + word.slice(1);
});

// Step 3: join back into a string
let capitalizedStr = capitalizedWords.join(" ");

console.log(capitalizedStr); // "Sandesh Gaikwad"

// ----------------------------------------------------

let capitalizedStrr = str
  .split(" ")
  .map(word => word[0].toUpperCase() + word.slice(1))
  .join(" ");

console.log(capitalizedStrr); // "Sandesh Gaikwad"

// --------------------------------------------------







