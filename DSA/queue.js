/* queue

   A Queue is a linear data structure that follows the FIFO (First In, First Out) principle.
   This means the element inserted first will be removed first.

   Real-world example: People standing in a line. 
   The person who joins first gets served first.

*/


class Queue {
    
    constructor() {
        this.items = [];
    }

    // Add element at rear
    enqueue(element) {
        this.items.push(element);
    }
    
    // Check empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Remove element from front
    dequeue() {
        if (this.isEmpty()) {
            return "Queue is empty";
        }

        return this.items.shift();
    }

    // Get front element
    peek() {
        if (this.isEmpty()) {
            return "Queue is empty";
        }

        return this.items[0];
    }

    // Get size
    size() {
        return this.items.length;
    }

    // Display queue
    display() {
        console.log(this.items);
    }
}

// Create queue
const queue = new Queue();

queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);

queue.display();          // [10, 20, 30]

console.log(queue.dequeue()); // 10
console.log(queue.peek());    // 20
console.log(queue.size());    // 2
console.log(queue.isEmpty()); // false
