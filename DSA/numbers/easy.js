// print 1 to 20 odd numbers
for (let i = 1; i <= 20; i++) {
  if (i % 2 != 0) {
    // console.log(i);
  }
}

// --------------------------------------------------

// reverse number
let num = 1234;
let reverse = 0;

while (num > 0) {
  let last_digit = num % 10;
  reverse = reverse * 10 + last_digit;
  num = parseInt(num / 10); //removes decimal part of devision, removes last number.
}
// console.log(reverse);

// --------------------------------------------------

// find sum of digits of num
// 1234 = 1 + 2 + 3 + 4

let nmb = 1234;
let summ = 0;

while (nmb > 0) {
  let last_digit = nmb % 10;
  summ = summ + last_digit;
  nmb = parseInt(nmb / 10);
}
// console.log(summ);

// --------------------------------------------------

// check if num is palindrome
// palindrom num reads same forward and backward eg. 121 - 121, 1221 - 1221

let numberrr = 121;
let original = numberrr; // we need to store original number, to compare with reverse one.
let reversee = 0;

while (numberrr > 0) {
  let last_digit = numberrr % 10;
  reversee = reversee * 10 + last_digit;
  numberrr = parseInt(numberrr / 10);
}

if (original === reversee) {
  // console.log(original + " is palindrome");
} else {
  console.log("not a prime number");
}

// --------------------------------------------------

// check if num is armstrong number
// sum of each digit raised to power of total digits equals to original number
/* 
  153 - total 3 digits - \(1^3 + 5^3 + 3^3 = 153\)  armstrong num
  12  - total 2 digits - \(1^2 + 2^2 = 1 + 4 = 5\)  not a armstrong number

*/

let isArmNum = 153;
let original_num = isArmNum;
let sum = 0;
let digits = isArmNum.toString().length;

while (isArmNum > 0) {
  let last_digit = isArmNum % 10;
  sum = sum + last_digit ** digits;
  isArmNum = parseInt(isArmNum / 10);
}

if (sum === original_num) {
  // console.log(original_num + " is armstrong number");
} else {
  console.log("not a armstrong number");
}

// --------------------------------------------------

// check if num is prime.
// prime num is greater than 1, divisible by 1 and number itself.

let number = 7;
let isPrime = true;

if (number <= 1) {
  isPrime = false;
} else {
  for (let i = 2; i < number; i++) {
    if (number % i === 0) {
      isPrime = false;
      break;
    }
  }
}

if (isPrime) {
  // console.log(number + " is" + " prime number");
} else {
  console.log("not a prime number");
}

// -----

// print all prime between 1 to 50
for (let num = 1; num <= 50; num++) {
  let isPrime = true;

  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      isPrime = false;
      break;
    }
  }

  if (isPrime) {
    // console.log(num);
  }
}

// --------------------------------------------------

// factorial of num
// factorial of 0 and 1 is = 1.

let numberr = 5;
let factorial = 1;
for (let i = 1; i <= 5; i++) {
  factorial = factorial * i;
}
// console.log(factorial);

// --------------------------------------------------

// fibonacci series
/* 
  first = 0 and second = 1 are the first two numbers.
  next = first + second calculates the next number. 
*/

let n = 10;
let first = 0;
let second = 1;

for(let i = 1; i <= n; i++){
  console.log(first);

  let next = first + second;
  first = second;
  second = next;
}