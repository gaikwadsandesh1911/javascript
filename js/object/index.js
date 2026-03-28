/* Object

    object is a collection of key-value pairs. 
    It’s used to store related data and functions together in a structured way

    let user = { name: 'sandesh' };

    …under the hood, the JavaScript engine does something very similar to:
    
    let user = new Object();     

        👉create new empty object in memory { }
        👉Internally, this object is linked to Object.prototype.
            
        
        👉An object inherits properties and methods from Object.prototype

            👉console.log(user.__proto__);
            👉console.log(user.__proto__ == Object.prototype);    // true
            
*/


// --------------------------------------------------------------
