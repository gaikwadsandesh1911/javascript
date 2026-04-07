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


    🧠we have other techniques as well, will explore later
                

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
    


    🧠Time-complexity

        👉Linear Time  - O(n)     -   single loop

            for (let i = 0; i < n; i++) {
                console.log(arr[i]);
            }


        👉Quadratic Time - O(n²)   -    Nested loop

            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    console.log(i, j);
                }
            }

        👉Constant Time — O(1)     

                execution time not depends on input size


            arr[0]  // access first element

            ✔ Always fast
            ✔ Best possible case


        👉Logarithmic Time — O(log n)

                Input size reduces in each step (divide & conquer)

                Binary Search
                ✔ Very efficient for large data

        👉Linearithmic Time — O(n log n)

                Combination of linear + logarithmic

                Merge Sort
                Quick Sort (average case)


    
    🧠space-complexity

            👉Constant  — O(1)      

                when no extra memory needed.

            👉Linear  — O(n)

                extra space needed grows, as input size grows

            👉Logarithmic   — O(log n)

                extra space needed grows but not at same rate as input size grows.



*/