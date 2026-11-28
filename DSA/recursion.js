/* recursion

        Recursion is programming technique, 
        where function call itself until base condtion is met.
        
        It solve problem by breaking problem into smaller subproblems.

*/

function count(num) {
    
    if (num === 0) {
        return;
    }

    console.log(num);
    
    count(num - 1);
}

count(5);

// output.    5  4  3  2  1