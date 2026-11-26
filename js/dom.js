/* BOM (Browser Object Model ):

    Browser provides set of objects which allow js to interact with browser window.


    window (global object).
    |
    ├── document (DOM)  -   to control html elements
    ├── navigator   -   browser info
    ├── location    -   page url
    ├── scroll      -   page scrolling
    ├── history     -   browser history
    ├── screen      -   user screen
    ├── localStorage    -   stores data permanantly. [ upto 5mb per domain ]
    ├── sessionStorage  -   stores data temporarily for single tab/session [ upto 5mb per domain ]
    ├── console
    ├── fetch           - to make http request.
    └── timers (setTimeout, setInterval).


    window

    It's a global object. Everything comes under window object.
        
    variables declare with var keyword and normal functions declaration, 
    also become properties of window object.
            
    var name = 'sandesh'
    window.name

            
    function hello() { }
    window.hello()

        
    Common Window Methods:

    - Alert, Prompt, Confirm

        
    Simple Analogy
        BOM = Outside the page (browser controls)
        DOM = Inside the page (HTML elements)

        window represents browser
        document represents webpage
            
            
 */

// ---------------------------------------------------------------------------------------------

/*  1. What is DOM? (Document Object Model)

        When a browser loads a webpage, 
        it converts the HTML into a tree-like structure called the DOM.

        - where Each HTML element becomes a node (object)
        - JavaScript can read, modify, add, or delete these nodes.
                

            <!DOCTYPE html>
                <html>
                    <body>
                        <h1 id="title">Hello</h1>
                        <button>Click Me</button>
                    </body>
                </html>

            
        DOM Tree Representation

            Document
                └── html
                    └── body
                        ├── h1 (id="title")
                        └── button

    */

// ---------------------------------------------------------------------------------------------

/*  2. Node?

        A node is any object in the DOM tree.

        Types of nodes:

        - Document Node -  Represents the whole HTML document

        - element node  -  Represent any html element. element means open tag content close tag.

        - text node    -   text inside tag

        - comment node -   comments we write also one of node.

*/

// ---------------------------------------------------------------------------------------------

/*  3. Access HTML Elements

    on document object we have different methods to find and access html elements.

    
    <h1 id="heading">Hello</h1>

    <p class="text">First paragraph</p>
    <p class="text">Second paragraph</p>

    <button>Click me</button> 

*/

// 1. getElementById(): select element by Id attribute.

const heading = document.getElementById("heading");


// 2. getElementsByClassName(): selects all matching class, it return HTMLCollection( array-like ) but not real array, cant use forEach to iterate over

const paragraphs = document.getElementsByClassName("text");
console.log(paragraphs[0]);     // can access on index
console.log(paragraphs[1]);


// 3. getElementsByTagName(): select all matching tags, it returns HTMLCollections

const buttons = document.getElementsByTagName("button");


// 4. querySelector():  select first matching CSS selector

const heading = document.querySelector("#heading");
const paragraph = document.querySelector(".text");
const button = document.querySelector("button");


// 5. querySelectorAll():   select all matching CSS selector, return NodeList, can use forEach to iterate over
const paragraphs = document.querySelectorAll(".text");
paragraphs.forEach((paragraph) => {
    console.log(paragraph);
});

/*  HTMLCollection vs NodeList (Interview )

    | Feature         | HTMLCollection              | NodeList            |
    | --------------- | --------------------------  | ----------------    |
    | Returned by     | getElementsByClassName()    | querySelectorAll()  |
    | forEach support | No                          | Yes                 |

*/

// ---------------------------------------------------------------------------------------------

/*  4. Dom Traversal:

    means moving between HTML elements using their relationships 
    instead of selecting elements directly using document methods.

        1. Child Traversal ( target child from parent. ) ( most used )
        2. Parent traversal (target parent from child.)
        3  Sibling Traversal (target previous and next child from childItself. )

                
        <div class="parent">
            <p class="child1">A</p>
            <p class="child2">B</p>
            <p class="child3">C</p>
        </div>

*/


    // 1. Child Traversal ( target child from parent. )( most used )

        const parent = document.querySelector('.parent');

        parent.children     //(prefered)
            // Returns all element only.

        parent.childNodes;      //(not prefered)
            // Returns nodes (spaces, line breaks), comments

        parent.firstElementChild      
        parent.lastElementChild       


    // 2. Parent traversal (target parent from child.)

        const child2 = document.querySelector('.child2');
        child2.parentElement; // div


    // 3. Sibling Traversal

        const child2 = document.querySelector('.child2');

        child2.previousElementSibling;  // child1
        child2.nextElementSibling;     // child3

        // child2.nextSibling          ( not prefered )


// ---------------------------------------------------------------------------------------------

/*  5. DOM Manipulation:

        means changing structure, content, attribute, or style using js.

            <div class="menu" style="border: 1px solid red;">
                <p class="item-1">item-1</p>
                <p class="item-2">item-2</p>
                <p class="item-3">item-3</p>
            </div>

            <div class="demo">
                Hello <span style="display:none;">hidden</span> World
            </div>
   
*/         

        const menu = document.querySelector('.menu'); 

        const demo = document.querySelector('.demo'); 


    // 1. innerHTML:  get or set the HTML element.
        
            menu.innerHTML      // get existing elements including child

            menu.innerHTML = "<p>Hello world</p>"   //  replace entire existing element with specified element.


    // 2. innerText and textContent:   get and set text content of an element.

            demo.innerText      // Hello World        
                // content which hidden with css property [ display: none ] will not be shown

            demo.textContent    //  Hello hidden World    
                // content which hidden with css property [ display: none ] will also be shown

            demo.innerText = "Hello\nWorld";
                // .. \n  adds new line. world will be on new line,
                // .. if used with template literal will take specified white spaces and line breaks as well

            demo.textContent = "Hello\nWorld";
                // .. \n  not adds new line. world will be same line
                // .. template literal does not affect


    // 3. Create HTML Elements, create text and add in DOM:         
        
            const p = document.createElement('p')

            p.textContent = "item-4"    // (prefered)

            p.innerText = "item-4"      // (not preferd)
     
            menu.appendChild(p)         // add in dom as lastChild ( here after last item [item-3])


        // we can insert node[element, text, comment] 
        // at specific position relative to target(.menu) element. using following methods.

            append()      // last child
            prepend()     // first child
            before()      // before element itself
            after()       // after element itself


            const pizza = document.createElement('p')
            pizza.innerText = "pizza"

            const burger = document.createElement('p')
            burger.innerText = "burger"

            menu.append(pizza, burger)            // can add one or more node.
            // menu.append(pizza, burger, 'new message')   //can also add text..        
                                
            menu.prepend(pizza, burger)     // can add one or more node.

            menu.before(pizza)

            const comment = document.createComment("This is comment..")
            menu.after(comment)


    // 4. insertAdjacentHTML(position, "html code")

            /*  we can insert HTML code directly at specific positions, relative to an target element(.menu)
                without replacing existing content (unlike innerHTML)


                | Position          | Meaning                |
                | ---------------   | ---------------------- |
                | "beforebegin"     | Before the element     |
                | "afterbegin"      | Inside element (start) |
                | "beforeend"       | Inside element (end)   |
                | "afterend"        | After the element      |
            */
            
            // insertAdjacentHTML(position, "html code"):   // add HTML code directly
            menu.insertAdjacentHTML('beforebegin', "<p>pizza</p>")

                
            // insertAdjacentElement('position', element):  add element.
            const newItem = document.createElement('p')
            newItem.textContent= "new item"

            menu.insertAdjacentElement('beforeend',newItem)

            
            // insertAdjacentText('position', "text"):  adds text only.
            demo.insertAdjacentText('afterend', "sandesh")



    // 5. access and manipulate attribute of html element 

            demo.getAttribute('class')          // demo

            demo.setAttribute("id", 'demo')     // ("attribute", "value") 
            demo.setAttribute("class", 'demo new-demo')  // it overwrites existing values
                    
            demo.hasAttribute("class")  // true false
                    
            demo.removeAttribute("class")


    // 6.  classList:   manipulate css classes
                       
            demo.classList        //show availabel classlists
                    
            demo.classList.add('demo-1', "demo-2")    // add one or more, also keep existing

            demo.classList.remove('demo-2')

            demo.classList.replace('demo-1', 'new-demo')   // replace("oldVal", "newVal")

            demo.classList.contains("demo")       // true / false

            demo.classList.toggle("className") // if className exist it remove, if not then added


            const btn = document.getElementById("btn");
            btn.addEventListener("click", () => {
                demo.classList.toggle("active");
            });


    // 7. cloneNode():  make copy of html element without its children.

            const copyMenu = menu.cloneNode();

            cloneNode(true)    // make copy of html element with all its children

            const copyMenuWithChilds = menu.cloneNode(true);



    // 8. Remove HTML Elements
        
            menu.remove()       // remove element itself.
           
            const item_1 = document.querySelector(".item-1")
            menu.removeChild(item_1)     // remove direct child only

    
    // 9. Replace HTML element

            // replaceWith():   Replaces an element

            // replaceChild()	Replaces a child through its parent

            const oldItem = document.querySelector(".item-1")

            const newItem = document.createElement("p")
            newItem.textContent = "new-item"

            oldItem.replaceWith(newItem)


// ---------------------------------------------------------------------------------------------


/*  JavaScript Event?

    event is an any action that happens in the browser and javaScript respond to it.

    Events can be triggered by:
        1. User interactions (clicks, typing, mouse movement)
        2. Browser actions (page load, resizing, scrolling)
        3. Custom js

        
    Common Types of JavaScript Events:

        1. Mouse Events:

            click – when a user clicks an element
            dblclick – double-click
            contextmenu - right-click
            mouseenter / mouseleave – mouse enter / leave element        ... does not bubble
            mouseover / mouseout – mouse enter / leave  element or its descendant  ... does bubble
            mousemove – moving the mouse
            mousedown/mouseup - mouse button is pressed/released

        2. Keyboard Events:

            keydown – key is pressed
            keyup – key is released
            keypress – key is pressed and held (deprecated in modern use)
        
        3. Form Events

            submit – when a form is submitted
            focus / blur – when an input gains/loses focus
            change – when input value changes
            reset - form is reset
        
        4. Window Events

            load – page finishes loading
            resize – window is resized
            scroll – page is scrolled
            online / offline - browser comes online / offline

    
    When an event occurs: 
        JavaScript passes an event object to the handler function, 
        which contains all useful information.

    How to Listen for Events

        1. Inline HTML

            <button onclick="alert('Button clicked!')">Click Me</button>

                
        2. Using JavaScript addEventListener() method   (recommended)...

            recommended. because.. 
            We can attach:

                1. Multiple listner can attach to same event.
                2. Can remove listner           
                3. Different events on the same element.
                        
*/         
        // <button>Click Me</button>

            const btn = document.querySelector("button");

            btn.addEventListener("click", function (e) {
                console.log(e) // event object
                alert("Button clicked! - 1...");
            });

            btn.addEventListener("click", function () {
                alert("Button clicked! - 2...");
            });

            // differnt event on same element
            btn.addEventListener("mouseenter", function () {
                console.log("...hello")
            });

        
        // 3. when we have a need, to use removeEventListner()  
        // we have to define handler functiion separately.

            const sayHi = function() {
                alert("hi..")    
            }

            btn.addEventListner('click', sayHi)

            setTimeout(()=>{
                btn.removeEventListener('click', sayHi)      // after 10s  listner will not work..
            },10000);


// ---------------------------------------------------------------------------


/*  Event propagation

        means how an event travels through the DOM tree.

        🔁 It happens in 3 phases.
            1.  Capturing phase (top → down) also called "Trickling Down"
            2.  Target phase (actual clicked element)
            3.  Bubbling phase (bottom → up)

        Event Bubbling (Definition)

            where an event starts from the target element and then 
            propagates upward to its ancestors (target → parent → grandparent → document).
            It is default behaviour.

        Event Capturing (Definition)

            where an event starts from the topmost ancestor (document) and then 
            propagates downward to the target element.
            It is enabled by adding third parameter as true in addEventListener() method.

                
            <div id="grandparent" style="padding:30px; background:lightblue;">
                <p>Grandparent</p>
                <div id="parent" style="padding:30px; background:lightgreen;">
                    <p>Parent</p>
                    <div id="child" style="padding:30px; background:lightcoral;">
                        <p>Child</p>
                    </div>
                </div>
            </div>

*/

        // Bubbling - default behavior

            document.getElementById("grandparent").addEventListener("click", (e) => {
                console.log("Grandparent clicked");
            });

            document.getElementById("parent").addEventListener("click", (e) => {
                console.log("Parent clicked");
            });

            document.getElementById("child").addEventListener("click", (e) => {
                console.log("Child clicked");
            });

        /* When you click Child, output will be:
                Child clicked
                Parent clicked
                Grandparent clicked
        
        */

        // Capturing Phase:    To enable capturing, pass true as third argument to addEventListner() method:

            document.getElementById("grandparent").addEventListener("click", () => {
                console.log("Grandparent clicked");
            }, true);

            document.getElementById("parent").addEventListener("click", () => {
                console.log("Parent clicked");
            }, true);

            document.getElementById("child").addEventListener("click", () => {
                console.log("Child clicked");
            }, true);

        /* Now output will be: When we click on Child.
                Grandparent clicked
                Parent clicked
                Child clicked

            Now output will be: When we click on Parent.
                Grandparent clicked
                Parent clicked ( target level )

         */

        
        /* event bubbling and capturing happen with same events only...

            if we have different events.
                Grandparent has click
                Parent has mouseenter
                Child has click

            If click on child, Output will be:
                Child clicked
                Grandparent clicked
        */


           
    // stopPropagation(): 
        //  stop the event from propogating to parent at target level.
        //  but does not stop other listners on same elements

            document.getElementById("child").addEventListener("click", (e) => {
                console.log("Child clicked");
                e.stopPropagation();
            });

            document.getElementById("child").addEventListener("click", () => {
                console.log("Child clicked - 2");
            });
            // Output: Child clicked, Child clicked - 2


    // stopImmediatPropagation(): 
            //   stops  propogation
            //   stops other listners also.
 

            document.getElementById("child").addEventListener("click", (e) => {
                console.log("Child clicked");
                e.stopImmediatePropagation()
            });

            document.getElementById("child").addEventListener("click", () => {
                console.log("Child clicked - 2 ");
            });
            // Output: Child clicked

// ------------------------------------------------------


/*    Event Delegation

        instead of adding event listners on multiple child elements
        we add one listner on parent element and handle event using event bubbling.


        <ul class="list">
            <li>hi...</li>
            <li>hello...</li>
            <li>bye...</li>
            <li>tagName <span>closest</span></li>
            <li><span>Task 1</span> <button class="del-btn">X</button></li>
        </ul>
*/
    const list = document.querySelector('.list');

    list.addEventListener('click', function(e) {
        // console.log(e)
        if(e.target.tagName == "LI"){
            console.log(e.target.textContent);  
        }
    });

/* 

When you click directly on an li:
- e.target is LI.
- Condition is true.
- Its text content gets printed.

But what happens when you click on the span inside the fourth li?
- e.target is SPAN, not LI.
- Condition is false.
- Nothing gets printed.

This is because event.target refers to the actual element where the event originated.


2. Solution: closest()

*/

const list = document.querySelector('.list');

list.addEventListener('click', function(e) {

    const li = e.target.closest("li");

    if (li && list.contains(li)) {
        console.log(li.textContent);
    }

});

/* 
    Click on li → Finds that li.
    Click on span → Finds its parent li.
    Click on button → Finds its parent li.

    list.contains(li) ensures that the matched li belongs to our list.

*/

const list = document.querySelector('.list');

list.addEventListener('click', function(e) {

    if (e.target.classList.contains("del-btn")) {
        e.target.closest("li").remove();
    }

});

/* Why use Event Delegation?
    1. Fewer event listeners.
    2. Better event management.
    3. Handles dynamically added elements without attaching new listeners.
    4. Useful when working with lists, tables, menus, and similar UI components.
*/