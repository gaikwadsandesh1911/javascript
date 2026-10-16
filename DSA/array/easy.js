// 1.   Find Largest

/*  1.  Assume first element is largest.
    2.  Traverse the array from second index.
    3.  If current element is greater than largest, update largest.
    4.  Return largest.

*/

function largest(arr) {
  let max = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }

  return max;
}

// console.log("Larget element: ", largest([4, 7, 2, 9, 5]));

// -------------------------------------------------------------------

// 1.1  Find Largest and Smallest in a Single Traversal

/*  1.  Assume the first element is both the largest and smallest.
    2.  Traverse the array from the second index.
    3.  For each element:
            - If it is greater than the current largest, update the largest.
            - If it is smaller than the current smallest, update the smallest.
    4.  Return both values.
*/

function findLargestSmallest(arr) {
  if (arr.length === 0) {
    return null;
  }

  let largest = arr[0];
  let smallest = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > largest) {
      largest = arr[i];
    }

    if (arr[i] < smallest) {
      smallest = arr[i];
    }
  }

  return { largest, smallest };
}

const result = findLargestSmallest([8, 2, 15, 6, 1, 10]);

// console.log("Largest:", result.largest);
// console.log("Smallest:", result.smallest);

// -------------------------------------------------------------------

// 2.   Find Second Largest Element

/*  1.  Assume the first element is the largest.
    2.  Assume there is no second largest yet.
    3.  Traverse the array from the second index.
    4.  If the current element is greater than the largest:
            - Move largest to secondLargest.
            - Update current element as largest.

    5.  Otherwise, if the current element is:

            - smaller than largest, and
            - greater than secondLargest (or secondLargest doesn't exist yet),

            then update secondLargest.

    6.  Return secondLargest.

*/

function secondLargest(arr) {
  if (arr.length < 2) return null;

  let largest = arr[0];
  let secondLargest = null;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > largest) {
      secondLargest = largest;
      largest = arr[i];
    } else if (
      arr[i] < largest &&
      (secondLargest === null || arr[i] > secondLargest)
    ) {
      secondLargest = arr[i];
    }
  }

  return secondLargest;
}

// console.log("secondLargest", secondLargest([4, 8, 1, 9, 6]));   // 8
// console.log("secondLargest", secondLargest([10, 20]));          // 10
// console.log("secondLargest", secondLargest([5, 5, 5]));         // null
// console.log("secondLargest", secondLargest([7]));               // null

// -------------------------------------------------------------------

// 3.   Check if Array is Sorted

/*  1.  Traverse from second element.
    2.  Compare current with previous.
    3.  If current element is smaller than previous, return false.
    4.  Otherwise continue.
    5.  at outside loop Return true.
 */

function isSorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      return false;
    }
  }

  return true;
}

// console.log("isSorted", isSorted([1, 2, 4, 3]))
// console.log("isSorted", isSorted([1, 2, 3, 4,]))

// -------------------------------------------------------------------

// 4.   Reverse an Array (In Place means no extra space.)

/* 
    1.  Use two pointers:
        - left at beginning
        - right at end

    2.  Swap elements.

    3.  Move left forward and right backward.

    4.  Continue until they meet. 
*/

function reverseArray(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    let temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;

    left++;
    right--;
  }

  return arr;
}

console.log("reverseArray", reverseArray([1, 2, 3, 4, 5]));

// type 2 reverse an array
function reverse(arr) {
  let reverse = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    reverse.push(arr[i]);
  }
  console.log("reverse", reverse);
}

reverse([40, 20, 50, 10]);

// -------------------------------------------------------------------

// find sum and avg.

function sumAvg(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum = arr[i] + sum;
  }
  let avg = sum / arr.length;

  //   console.log(sum, avg);
}

sumAvg([10, 20, 30, 50]);

// -------------------------------------------------------------------

// 5.   Find Duplicate Elements in an Array

function findDuplicates(arr) {
  let seen = new Set();

  let duplicate = new Set();

  for (let i = 0; i < arr.length; i++) {
    if (seen.has(arr[i])) {
      duplicate.add(arr[i]);
    } else {
      seen.add(arr[i]);
    }
  }

  //   console.log("duplicate", [...duplicate]);  // duplicate [ 2, 1 ]
}

findDuplicates([1, 2, 2, 2, 4, 5, 1]);

// -------------------------------------------------------------------

// remove duplicate
function removeDuplicate(arr) {
  let unique = new Set(arr);
  let result = [...unique]; // convert into array
  // console.log('after removing duplicate', result); // [ 10, 20, 30, 40 ]
}
removeDuplicate([10, 20, 20, 20, 30, 40]);

// -------------------------------------------------------------------

// find frequency
function frequency(arr) {
  let frequency = {};
  for (let i = 0; i < arr.length; i++) {
    let num = arr[i];
    if (frequency[num]) {
      frequency[num]++;
    } else {
      frequency[num] = 1;
    }
  }
  //   console.log("frequency", frequency); //frequency { '10': 2, '20': 1, '30': 2, '40': 1 }
}

frequency([10, 20, 30, 30, 40, 10]);

// -------------------------------------------------------------------

// find pair whose sum equal to target

function findPair(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] == target) {
        // console.log(arr[i], arr[j]);
      }
    }
  }
}
findPair([10, 20, 30, 40], 50);

// -------------------------------------------------------------------

// move all zeros to the end
function moveZeros(arr) {
  let result = [];
  let zeroCount = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      result.push(arr[i]);
    } else {
      zeroCount++;
    }
  }
  for (let i = 0; i < zeroCount; i++) {
    result.push(0);
  }

  console.log(result);
}
moveZeros([1, 0, 0, 2, 4]);

// in place

function movezrs(arr) {
  let j = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;

      j++;
    }
  }
  console.log('mvzrs', arr);
}
movezrs([1, 0, 0, 2, 4]);
