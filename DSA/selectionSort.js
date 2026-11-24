/*  selection sort

    Search for the smallest element in the unsorted portion and 
    swap it with the first element of that portion


Initially, the entire array is unsorted.

Consider the first element as the current smallest element (minIndex = i).

Start searching from the second element (j = i + 1) until the end.

If you find a smaller element, update minIndex.

After completing the search, swap the smallest element with the element at the current position.

Move to the next position and repeat.

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
