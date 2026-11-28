/*   Insertin sort

     It devides array into sorted and unsorted part.

     Repetedly pick element from unsorted part ( picked element is called temp or key ) and
     compare with elements in sorted part one by one starting from right to left.

     if sorted element larger than picked element
     it shift element to right in sorted part only to make space for picked element
     and place picked element into its correct position in sorted part.
     
     if sorted element smaller or equal to picked element it stops.
     if it reaches to begining of sorted part it place picked element at first position of sorted part.

    

consider first element is sorted, picked next element, start compare with sorted part
*/

function insertionSort(arr) {
    
    for (let i = 1; i < arr.length; i++) {
        
        let temp = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > temp) {
            
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = temp;
    }

    return arr;
}

let arr = [5, 3, 4, 1, 2];

console.log(insertionSort(arr));

// after first pass two elements are sorted