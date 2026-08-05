// 1.   Reverse a String

/* 
    1.  Start from the last character of the string.
    2.  Append each character to a new string.
    3.  Continue until the first character.
    4.  Return the new string.
*/

function reverseString(str) {
    let reversed = "";

    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }

    return reversed;
}

console.log(reverseString("hello"));

/* 
    Time:   O(n)    =>   Traverse all char once
    Space:  O(n)    =>   Stores a new String
*/

// ------------------------------------------------------------------

// 1.1  Reverse String In-Place

/* 
    Since JavaScript strings are immutable, you can't swap characters directly in a string. 
    Need to convert it to an array first.
  
*/

function reverseString(str) {

    let arr = str.split("");    // converted into array

    let left = 0;
    let right = arr.length - 1;

    while (left < right) {

        let temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;

        left++;
        right--;
    }

    return arr.join("");    // converted back into string
}

console.log(reverseString("hello"));

/* 
    Time    : O(n)
    Space   : O(n) (because of the array created from the string)
*/

// ------------------------------------------------------------------


// 2.  count occurance of character in string

/* 
    1.  Create an empty map (or dictionary).
    2.  Traverse the string using a simple for loop.
    3.  For each character:
            - If it already exists in the map, increase its count by 1.
            - Otherwise, add it to the map with count 1.
    4.  After the loop, the map contains the frequency of every character.
*/

function countOccurance(str) {
    
    let map = new Map();

    for(let i = 0; i < str.length; i++){

        let ch = str[i]

        if(map.has(ch)){
            map.set(ch, map.get(ch) + 1)
        }
        else{
            map.set(ch, 1)
        }
    }

    return map;
}

let result = countOccurance("apple");
console.log(result);    // Map(4) { 'a' => 1, 'p' => 2, 'l' => 1, 'e' => 1 }


// ------------------------------------------------------------------



//  3.  Check if Two Strings are Anagrams

/* 
    Two strings are anagrams if they contain the same characters with the same frequency, 
    but the characters can be in a different order.

    1.  If the lengths of the two strings are different, return false.
    2.  Create an empty map (or dictionary).
    3.  Traverse the first string using a for loop.
            - If character exists in the map, Increase it's count.
            - else set character and its count to 1
    4.  Traverse the second string using another for loop.
            - If the character is not present in the map or its count is already 0, return false.
            - Otherwise, decrease its count by 1.
    5.  If all characters at the end becomes 0,  return true.

*/

function isAnagram(str1, str2) {

    if (str1.length !== str2.length) {
        return false;
    }

    let map = new Map();

    // Count frequency of first string
    for (let i = 0; i < str1.length; i++) {

        let ch = str1[i];

        if (map.has(ch)) {
            map.set(ch, map.get(ch) + 1);
        } else {
            map.set(ch, 1);
        }
    }

    // Reduce frequency using second string
    for (let i = 0; i < str2.length; i++) {

        let ch = str2[i];

        if (!map.has(ch) || map.get(ch) === 0) {
            return false;
        }

        map.set(ch, map.get(ch) - 1);
    }

    return true;
}

console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("aab", "abb"));   // false



// ------------------------------------------------------------------

// 4.   Check if string palindrom

/* 
        A palindrome is a string that reads the same forward and backward.

        1.  Set left = 0.
        2.  Set right = length - 1.
        3.  Compare characters at left and right.
        4.  If they are different, return false.
        5.  Move left forward and right backward.
        6.  Repeat until left >= right.
        7.  If all characters match, return true.
*/

function isPalindrome(str) {

    let left = 0;

    let right = str.length - 1;

    while(left < right) {

        if (str[left] != str[right]){

            return false
        }

        left ++;
        right --;
    }

    return true;
}

console.log(isPalindrome("madam")); // true
console.log(isPalindrome("hello")); // false


// ------------------------------------------------------------------


// 5.   Count Words( word is a sequence of characters separated by one or more spaces.) in a String.

/* 
    1.  Initialize count = 0.
    2.  Traverse the string using a for loop.
    3.  If the current character is not a space and:
            - it is the first character, or
            - the previous character is a space,
        then a new word starts, so increment count.
    4.  After the loop, return count.
*/

function countWords(str) {

    let count = 0;

    for (let i = 0; i < str.length; i++) {

        if (str[i] !== " " && (i === 0 || str[i - 1] === " ")) {
            count++;
        }
    }

    return count;
}

console.log(countWords("I love JavaScript")); // 3
console.log(countWords("Hello World"));       // 2
console.log(countWords("ChatGPT"));           // 1

/*  condition 1:

        i === 0;       
        This checks if the first character is the beginning of a word.

        At i = 0, there is no previous character to check, so we directly count it as the first word.

        If we removed i === 0, then trying to access str[i - 1] would mean:
        which is invalid (or undefined in JavaScript). More importantly, the first word would never be counted.

    
    condition 2:

        str[i - 1] === " "
        This checks whether the current character comes immediately after a space, which means a new word is starting.
*/


// ------------------------------------------------------------------


