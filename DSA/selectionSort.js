/*  selection sort

It devide the array into sorted and un-sorted part
It repetedly select smallest element from unsorted part and place it at begining of unsorted part.


Initially, the entire array is unsorted.

Consider the first element as the current smallest element (minIndex = i).

Start comparing from the second element (j = i + 1) until the end if array.

If you find a smaller element, update minIndex.

After completing the comparison, swap the smallest element with the element at the current position.


*/ 


function selectionSort(arr) {
    
  for (let i = 0; i < arr.length - 1; i++) {
    
    let minIndex = i;

    for (let j = i + 1; j < arr.length; j++) {
        
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    
    }

    // Swap
    let temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }

  return arr;
}

console.log(selectionSort([64, 25, 12, 22, 11]));


/* after first pass smallest element set at first position

*/
