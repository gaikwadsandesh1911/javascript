

// 1.   Find Largest

/* 
    1.  Assume first element is largest.
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

console.log("Larget element: ", largest([4, 7, 2, 9, 5]));


// -------------------------------------------------------------------


// 1.1  Find Largest and Smallest in a Single Traversal

/* 
    1.  Assume the first element is both the largest and smallest.
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

        for(let i = 1; i < arr.length; i++) {

            if(arr[i] > largest) {
                largest = arr[i]
            }

            if(arr[i] < smallest) {
                smallest = arr[i]
            }
        }

        return { largest, smallest }
    }

    const result = findLargestSmallest([8, 2, 15, 6, 1, 10]);

    console.log("Largest:", result.largest);
    console.log("Smallest:", result.smallest);


// -------------------------------------------------------------------


// 2.   Find Second Largest Element

/* 
    1.  Assume the first element is the largest.
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

        if(arr.length < 2) return null;

        let largest = arr[0];
        let secondLargest = null;

        for(let i = 1; i < arr.length; i++) {

            if(arr[i] > largest) {
                secondLargest = largest;
                largest = arr[i];
            }

            else if( arr[i] < largest && ( secondLargest === null || arr[i] > secondLargest)) {
                secondLargest = arr[i];
            }
        }

        return secondLargest;
    }

    console.log("secondLargest", secondLargest([4, 8, 1, 9, 6]));   // 8
    console.log("secondLargest", secondLargest([10, 20]));          // 10
    console.log("secondLargest", secondLargest([5, 5, 5]));         // null
    console.log("secondLargest", secondLargest([7]));               // null


// -------------------------------------------------------------------


// 3.   Check if Array is Sorted

/* 
    1.  Traverse from second element.
    2.  Compare current with previous.
    3.  If current element is smaller than previous, return false.
    4.  Otherwise continue.
    5.  at outside loop Return true.
 */

    function isSorted(arr) {
        
        for(let i = 1; i < arr.length; i++){
            if(arr[i] < arr[i - 1]){
                return false;
            }
        }

        return true;
    }

    console.log("isSorted", isSorted([1, 2, 4, 3]))
    console.log("isSorted", isSorted([1, 2, 3, 4,]))


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

        while(left < right) {

            let temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;

            left ++;
            right --;
        }

        return arr;
    }

    console.log("reverseArray", reverseArray([1, 2, 3, 4, 5]));


// -------------------------------------------------------------------


// 5.   Find Duplicate Elements in an Array

/* 
    1.  Create an empty hash map. and empty array to store duplicate values.
    2.  Traverse the array.
    3.  If the element is already in the hash map:
            - it is a duplicate, push it into array.
    4.  Otherwise, store it in the hash map.
    5.  Return all duplicate elements.

        Here space complexity is liner : O(n),
        because used extra space.
*/

    function findDuplicates(arr) {

        let map = new Map();
        let duplicate = []

        for(let i = 0; i < arr.length; i++) {

            if(map.has(arr[i])){
                duplicate.push(arr[i])
            }
            else {
                map.set(arr[i], true)
            }
        }

        return duplicate;
    }

    console.log("Duplicates: ", findDuplicates([1, 2, 2, 4, 5, 1]));


// -------------------------------------------------------------------


