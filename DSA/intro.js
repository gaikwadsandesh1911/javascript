/* different proble solving techniques...


    🧠 1. Brute Force

            👉 Idea: Try all possibilities

                check every combination
                Use nested loops / recursion

            👉 Use when:

                No better idea comes first

                Don’t stop here — always ask:
                “Can I reduce repeated work?”

            💡 Example:

                Find pair with given sum → check all pairs


    ⚡ 2. Two Pointers  → “Kill Nested Loops”

            👉 Idea: Use two indices instead of nested loops

                One from start, one from end 
                Both move forward

            👉 Works on:

                Sorted arrays
                Strings problems (No Sorting needed)

            💡 Example:

                Pair sum in sorted array
                Reverse array



    ⚡ 3. Sliding Window

            👉 Idea: Maintain a window (subarray/substring)

                Expand → include elements
                Shrink → remove elements

            👉 Use when:

                Subarray/substring problems
                Contiguous elements

            💡 Example:

                Longest substring without repeating characters

    
    🔍 4. Binary Search

            👉 Idea: Divide search space into halves

            👉 Use when:

                Array is sorted OR
                Answer is monotonic (can apply on answers)

            💡 Example:

                Find element in sorted array
                Minimum feasible value problems


    🧱 5. Divide and Conquer

        Idea: Divide → Solve → Combine

        👉 Example:

            Merge Sort
            Quick Sort


    🔁 6. Recursion

        Idea: Break problem into smaller same problems

        👉 Think:

            Base case for exit
            Recursive call

        💡 Example:

            Factorial
            Tree traversal


    🧠we have other techniques as well, will explore later....
                

*/

/*  🧠Handle edge cases?

        check for edge cases

            like 
                    size, repeated element, negative / zero,
                    firstIndex lastIndex,
*/



/*  🧠Algorithm   

        set of well defined instruction, to solve perticular problem.

    
    🧠why need algo.

        To achive performance one problem can be solved in different techniques

    
    🧠Analysis of algo.

        Absolute running time of algo can not predicted,
        since it depends on multiple factors like,

            programming language used,
            quality of os
            The system on wich program run. 

    
    so we evalute performance of algo in two types.

        1.  Time-complexity  - amount of time taken by an algo to run.

        2.  Space-complexity - amount of memory taken by algo to run.


        👉If our app need to be quick and has plenty of memory
        we need not to worry about space-complexity


        👉If we have less space, and if we ok with solution that is relatively slower
        we need not to worry about time-complexity

    
    🧠There is no single solution that works on every single time,
    it always good to know multiple way to solve the problem
    and use best solution on given constrain.


    🧠mathematics tools to represent time and space complexity

        1.  Big o notation    -     worst case complexity

        2.  Theta notation    -     Average complexity

        3.  omega notation    -     Best case complexity


            ** we primary concern with   Worst Case Complexity
    


        | Complexity | Name         | Example                     |
        | ---------- | ------------ | --------------------------- |
        | O(1)       | Constant     | Access array element        |
        | O(log n)   | Logarithmic  | Binary Search               |
        | O(n)       | Linear       | Linear Search               |
        | O(n log n) | Linearithmic | Merge Sort, Heap Sort       |
        | O(n²)      | Quadratic    | Bubble Sort                 |
        | O(n³)      | Cubic        | Triple nested loops         |
        | O(2ⁿ)      | Exponential  | Recursive Fibonacci (naive) |
        | O(n!)      | Factorial    | Generating all permutations |

        
        Best to Worst Time Complexity

        Best
        │
        ├── O(1)
        │
        ├── O(log n)
        │
        ├── O(n)
        │
        ├── O(n log n)
        │
        ├── O(n²)
        │
        ├── O(n³)
        │
        ├── O(2ⁿ)
        │
        └── O(n!)
        Worst

    
    🧠space-complexity

            👉Constant  — O(1)      

                when no extra memory needed.

            👉Linear  — O(n)

                extra space needed grows, as input size grows

            👉Logarithmic   — O(log n)

                extra space needed grows but not at same rate as input size grows.



*/