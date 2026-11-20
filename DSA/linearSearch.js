/* Linear Search 

    Linear Search checks each element one by one.
    
    if element found return its index.
    if not found return -1.

*/

function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }

  return -1;
}

const arr = [10, 25, 30, 45, 50];

console.log(linearSearch(arr, 30)); // 2
console.log(linearSearch(arr, 100)); // -1



/* Binary search
   
    Binary search needs sorted array.

    Binary Search finds a target element by repeatedly dividing a sorted array into two halves.
*/

function binarySearch(arr, target) {
    
  arr.sort((a, b) => a - b);

  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    
    let mid = Math.floor((start + end) / 2);

    if (arr[mid] === target) {
      return mid;
    }
    else if (target > arr[mid]) {
      start = mid + 1;
    }
    else {
      end = mid - 1;
    }
  }

  return -1;
}

const arr = [50, 10, 40, 20, 60, 30];

console.log(binarySearch(arr, 40)); // 3



/* Binary search first occurance
  
    In a sorted array, elements can appear multiple times. 
    We need to find the first occurrence (leftmost index) of the target element

*/

function firstOccurrence(arr, target) {
    
  arr.sort((a, b) => a - b);

  let start = 0;
  let end = arr.length - 1;
  let found = false;
  let i;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (arr[mid] === target) {
      found = true;
      i = mid;
      end = mid - 1;
    }
    else if (target > arr[mid]) {
      start = mid + 1;
    }
    else {
      end = mid - 1;
    }
  }

  if (found) {
    return i;
  }

  return -1;
}

const arr = [10, 20, 20, 20, 30, 40, 50];

console.log(firstOccurrence(arr, 20)); // 1



// Binary search last occurance

function lastOccurrence(arr, target) {
    
  arr.sort((a, b) => a - b);

  let start = 0;
  let end = arr.length - 1;
  let found = false;
  let i;

  while (start <= end) {
    
    let mid = Math.floor((start + end) / 2);

    if (arr[mid] === target) {
      found = true;
      i = mid;
      start = mid + 1;
    }
    else if (target > arr[mid]) {
      start = mid + 1;
    }
    else {
      end = mid - 1;
    }
  }

  if (found) {
    return i;
  }

  return -1;
}

const arr = [10, 20, 20, 20, 30, 40, 50];

console.log(lastOccurrence(arr, 20)); // 3



// find all occurance using both function
function findAllOccurrences(arr, target) {
    
  let first = firstOccurrence(arr, target);

  let last = lastOccurrence(arr, target);

  if (first === -1) {
    return [];
  }

  let result = [];

  for (let i = first; i <= last; i++) {
    result.push(i);
  }

  return result;
}

const arr = [10, 20, 20, 20, 30, 40, 50];

console.log(findAllOccurrences(arr, 20));
// [1, 2, 3]