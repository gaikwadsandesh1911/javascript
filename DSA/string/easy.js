// reverse a string

function reverseString() {
  let string = "hello";
  let reverse = "";

  for (let i = string.length - 1; i >= 0; i--) {
    reverse = reverse + string[i];
  }
  // console.log(reverse)
}
reverseString();

// ----------------------------------------------------------

// check if string palindrom.  palindrome that reads same forward and backward
// eg. madam, level, radar

function isPalindrom() {
  let string = "madam";
  let reverse = "";

  for (let i = string.length - 1; i >= 0; i--) {
    reverse = reverse + string[i];
  }

  if (reverse == string) {
    console.log("palindrome.");
  } else {
    console.log("not palindrome.");
  }
}
isPalindrom();

// -------------------------------------------

// count frequency of each char in string

function countFrequency() {
  let string = "hello";
  let frequency = {};
  for (let i = 0; i < string.length; i++) {
    let char = string[i];
    if (frequency[char]) {
      frequency[char]++;
    } else {
      frequency[char] = 1;
    }
  }
  console.log(frequency);
}
countFrequency();

// ---------------------------------------------------------

// check if string anagram
// Two strings are anagrams if they contain the same characters with the same frequency, but the characters may be in a different order

function isAnagram() {
  let str1 = "listen";
  let str2 = "silent";

  let arr1 = str1.split("");
  let arr2 = str2.split("");

  let ans1 = arr1.sort().join("");
  let ans2 = arr2.sort().join("");

  if (ans1 == ans2) {
    console.log("string is anagram");
  } else {
    console.log("string is not anagram");
  }
}
isAnagram();

// type 2
function isAnagramString() {
  let str1 = "silent";
  let str2 = "listee";

  if (str1.length != str2.length) {
    console.log("not a anagram");
  } else {

    let frequency = {};

    for (let i = 0; i < str1.length; i++) {
      let char = str1[i];
      if (frequency[char]) {
        frequency[char]++;
      } else {
        frequency[char] = 1;
      }
    }

    let isAnagram = true;

    for (let i = 0; i < str2.length; i++) {
      let char = str2[i];

      if (!frequency[char]) {
        isAnagram = false;
        break;
      }
      frequency[char]--;
    }

    if (isAnagram) {
      console.log("string is anagram");
    } else {
      console.log("not a anagram");
    }
  }
}
isAnagramString();

// ---------------------------------------------------------

// count vowels and consonants
function countVC() {
    let str = "hello world";
    let vowels = 0;
    let consonants = 0;

    for(let i = 0; i < str.length; i++) {
        let char = str[i].toLowerCase();

        if(char >= "a" && char <= "z"){
            if(char === "a" || char === "e" || char === "i" || char === "o" || char === "u") {
                vowels++;
            }
            else{
                consonants++;
            }
        }
    }
    console.log("vowels :", vowels + " " + "consonants :", consonants);
}
countVC();

/* 
    Why check char >= "a" && char <= "z"?

    It ensures that spaces, numbers, and special characters are not counted as vowels or consonants.
*/

// -----------------------------------------

function countWords () {
    let str = " i love ";
    let count = 0;
    for(let i = 0; i < str.length; i++) {
        if(str[i] !== " "){
            count++;
        }
    }
    console.log(count);
};
countWords();
