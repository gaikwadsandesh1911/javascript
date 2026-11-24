/* Bubble sort

  Bubble sort comparing two adjacent elements and 
  swapping them if they are in the wrong order.

in every pass largest element is bubble up at the end
  
  Outer loop: control passes:
     We need at most n - 1 passes because 
     the smallest remaining element automatically reaches the first position.

  Inner loop: control no. of comparison:
     After each pass, one largest unsorted element reaches the end, so we reduce the comparisons.

*/

function bubbleSort(arr) {
    
  for (let i = 1; i < arr.length; i++) {
    
    let swapped = false;

    for (let j = 0; j < arr.length - i; j++) {
        
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        swapped = true;
      }
    
    }
// If an entire pass finishes without a swap, break stops the outer loop.
    if (!swapped) {
      break;
    }
    
  }

  return arr;
}

console.log(bubbleSort([1, 2, 3, 4, 5]));


/* after first passs largest element set at end

*/