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