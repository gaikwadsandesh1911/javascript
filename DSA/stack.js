/* stack

   A Stack is a linear data structure that follows the LIFO (Last In, First Out) principle.
   This means the element inserted last will be removed first.

   Real-world example: A stack of plates. 
   We place a new plate on top and also remove the top plate first.

*/


class Stack {
    
    constructor() {
        this.items = [];
    }

    // Add element
    push(element) {
        this.items.push(element);
    } 
    
    // Check empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Remove top element
    pop() {
        if (this.isEmpty()) {
            return "Stack is empty";
        }

        return this.items.pop();
    }

    // Get top element
    peek() {
        if (this.isEmpty()) {
            return "Stack is empty";
        }

        return this.items[this.items.length - 1];
    }

    // Get size
    size() {
        return this.items.length;
    }

    // Display stack
    display() {
        console.log(this.items);
    }
}

// Create stack
const stack = new Stack();

stack.push(10);
stack.push(20);
stack.push(30);

stack.display();         // [10, 20, 30]

console.log(stack.pop());  // 30
console.log(stack.peek()); // 20
console.log(stack.size()); // 2
console.log(stack.isEmpty()); // false
