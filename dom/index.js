/* 🔹   BOM (Browser Object Model ) : 
            is a set of objects provided by the browser that allows JavaScript 
            to interact with the browser window.

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


    ⚡window

        Is global object. Everything comes under window object.
        
        👉 Even global variables/functions are part of window object.
            
            var name = 'sandesh' 
            
            function hello() { }

            window.name   ...  window.hello()

        
        👉 Common Window Methods

                    🔔 Alert, Prompt, Confirm

        
        💡 Simple Analogy
            BOM = Outside the page (browser controls)
            DOM = Inside the page (HTML elements)

            window represents browser
            document represents webpage
            
            
 */

// ---------------------------------------------------------------------------------------------

/*  1. 🔹  What is DOM? (Document Object Model)

                When a browser loads a webpage, 
                it converts the HTML into a tree-like structure called the DOM.

                👉 Each HTML element becomes a node (object)  = html element =  <p> content </p> .  open tag - content - close tag
                👉 JavaScript can read, modify, add, or delete these nodes.
                

                <!DOCTYPE html>
                    <html>
                        <body>
                            <h1 id="title">Hello</h1>
                            <button>Click Me</button>
                        </body>
                    </html>

                👉DOM Tree Representation

                Document
                    └── html
                        └── body
                            ├── h1 (id="title")
                            └── button

    */

// ---------------------------------------------------------------------------------------------

/*  2. 🔹  What is a Node?

                A node is any object in the DOM tree.

                👉 Types of nodes:

                    ✅Document Node - 👉 Represents the whole HTML document
                    ✅<div> → element node
                    ✅Text inside element → text node
                    ✅Comment → comment node  [  document.createComment("write your comment")  ]

                        So basically: DOM = collection of nodes
     */

// ---------------------------------------------------------------------------------------------

/*  3. 🔹  Selecting Elements

            we use the document object to find elements and then manipulate them.

            
            1. document.getElementById('idName')
            
            2. document.getElementsByClassName("className");
                    
                    👉 Returns HTMLCollection (array-like) but not real array
                        can access elements items[0].style.color = "red";


            3. document.getElementsByTagName("div");

                    👉 Selects all <div> elements


            <div class='item'>A</div>
            <div class='item'>B</div>
            
            4. document.querySelector(".item");  (Most Used) ( css based selector )

                    👉Returns first matching element.  // A

    
            
            5.   const items =  document.querySelectorAll(".item");

                ✅ Returns NodeList     // A B
                ✅ Can use forEach

                items.forEach(item => {
                    item.style.color = "blue";
                });

            🔹 HTMLCollection vs NodeList (Interview 🔥)

            | Feature         | HTMLCollection      | NodeList         |
            | --------------- | ------------------- | ---------------- |
            | Returned by     | getElementsBy*      | querySelectorAll |
            | Live or Static  | Live (auto updates) | Static           |
            | forEach support | ❌ No              | ✅ Yes           |


    */

// ---------------------------------------------------------------------------------------------

/*  4. 🔹  Traversing element
                👉1. Child Traversal ( target child from parent. ) 👉( most used )
                👉2. Parent traversal (target parent from child.)
                👉3  Sibling Traversal (target previous and next child from childItself. )

                
                <div class="parent">
                    <p class="child1">A</p>
                    <p class="child2">B</p>
                    <p class="child3">C</p>
                </div>



            🔹1. Child Traversal ( target child from parent. )( most used )


                    const parent = document.querySelector('.parent');

                        👉parent.children (prefered)
                        ✅ Returns all element only.

                        👉parent.childNodes; (not prefered)
                        ✅ Returns nodes (spaces, line breaks), comments

                        👉parent.firstElementChild      
                        👉parent.lastElementChild       


            🔹2. Parent traversal (target parent from child.)

                    const child2 = document.querySelector('.child2');

                        👉child2.parentElement; // div


            🔹 3. Sibling Traversal

                    const child2 = document.querySelector('.child2');

                        👉child2.previousElementSibling; // child1
                        👉child2.nextElementSibling;     // child3

                        👉child2.nextSibling ( not prefered )


    */

// ---------------------------------------------------------------------------------------------

/*      5 🔹  Manipulating HTML Elements

                🔥  <div class="menu" style="border: 1px solid red;">
                        <p class="item-1">item-1</p>
                        <p class="item-2">item-2</p>
                        <p class="item-3">item-3</p>
                    </div>

                🔥  <div class="demo">
                        Hello <span style="display:none;">hidden</span> World
                    </div>

                
                🔹const menu = document.querySelector('.menu'); 🔹

                🔹const demo = document.querySelector('.demo'); 🔹

// *********************************************************************************************************************


                    🔹innerHTML
                        👉get or set the HTML element.

                        ✅menu.innerHTML      // get existing elements including child

                        ✅menu.innerHTML = "<p>Hello world</p>"   //  replace entire existing element with specified element.


                    🔹innerText and textContent
                        👉both used to get and set text content of an element

                        ✅demo.innerText      // Hello World        
                        // .. shows only visible part . The content which hidden with css property [ display: none ] will not be shown

                        ✅demo.textContent    //  Hello hidden World    
                        // .. shows hidden part as well. The content which hidden with css property [ display: none ] will also be shown

                        ✅demo.innerText = "Hello\nWorld";
                        // .. \n  adds new line. world will be on new line,
                        // .. if used with template literal will take specified white spaces and line breaks as well

                        ✅demo.textContent = "Hello\nWorld";
                        // .. \n  not adds new line. world will be same line
                        // .. template literal does not affect

// *********************************************************************************************************************



                    👉Creating Elements            
                            🔹const p = document.createElement('p')

                    👉Add text to it
                            🔹p.textContent = "item-4"  (prefered)

                            🔹p.innerText = "item-4"    (not preferd)

                    👉display in dom ( here after last item [item-3])
                            🔹menu.appendChild(p)

// *********************************************************************************************************************


                🔹  we can insert node[element, text, comment] 
                    at specific position relative to target(.menu) element. using following methods.

                    👉append()      - last child
                    👉prepend()     - first child
                    👉before()      - before element itself
                    👉after()       - after element itself


                    const pizza = document.createElement('p')
                    pizza.innerText = "pizza"

                    const burger = document.createElement('p')
                    burger.innerText = "burger"

                        👉menu.append(pizza, burger)            // with append() multiple node can be added.
                        👉menu.append(pizza, burger, 'new message')   //can also add text..        
                                
                        👉menu.prepend('Hello World') 

                        👉menu.before(pizza)

                        👉const comment = document.createComment("This is comment..")
                            menu.after(comment)

// *********************************************************************************************************************


                🔹  insertAdjacentHTML(position, "html code")

                        👉  we can insert HTML at specific positions, relative to an target element(.menu)
                            without replacing existing content (unlike innerHTML) 🔥


                    | Position          | Meaning                |
                    | ---------------   | ---------------------- |
                    | "beforebegin"     | Before the element     |
                    | "afterbegin"      | Inside element (start) |
                    | "beforeend"       | Inside element (end)   |
                    | "afterend"        | After the element      |

                    🔹menu.insertAdjacentHTML('beforebegin', "<p>pizza</p>")

                
                   
                
                🔹insertAdjacentText('position', "text")
                        👉  it add text only.

                    🔹demo.insertAdjacentText('afterend', "sandesh")

                
                🔹insertAdjacentElement('position', element);
                        👉  it adds element.

                    
                    const newItem = document.createElement('p')
                    newItem.textContent= "new item"

                    🔹menu.insertAdjacentElement('beforeend',newItem)

// *********************************************************************************************************************


                🔹cloneNode() 
                        - make copy of html element without its children

                    const copyMenu = menu.cloneNode();

                
                🔹cloneNode(true)
                        - make copy of html element with all its children

                    const copyMenuWithChilds = menu.cloneNode(true);

// *********************************************************************************************************************

                🔹remove()
                        - remove html element

                    menu.remove()

                🔹removeChild()
                        - remove direct child only

                    const item_1 = document.querySelector(".item-1")
                    menu.removeChild(item_1)


// *********************************************************************************************************************

                🔹 we can access and manupulate  any attribute of any html element

                    👉demo.getAttribute('class')          // demo

                    👉demo.setAttribute("id", 'demo')     // ("attribute", "value") 
                    👉demo.setAttribute("class", 'demo new-demo')  // it overwrites existing values
                    
                    👉demo.hasAttribute("class")  // true false
                    
                    👉demo.removeAttribute("class")


// *********************************************************************************************************************

                🔹 .classList
                        provides an easy way to manipulate CSS classes on that element. 
                        It’s much more convenient than using getAttribute("class") or setAttribute("class", ...).

                    👉demo.classList        //show availabel classlists
                    
                    👉demo.classList.add('demo-1', "demo-2")    // add one or more, also keep existing

                    👉demo.classList.remove('demo-2')

                    👉demo.classList.replace('demo-1', 'new-demo')   // replace("oldVal", "newVal")

                    👉demo.classList.contains("demo")       // true / false

                    👉demo.classList.toggle("className") // if className exist it remove, if not then added

                        const btn = document.getElementById("btn");

                        btn.addEventListener("click", () => {
                            demo.classList.toggle("active");
                        });

*/

// ---------------------------------------------------------------------------------------------

/*      🔹What is a JavaScript Event?

               👉is an action that happens in the browser and javaScript can respond to.

               👉Events can be triggered by:

                    1. User interactions (clicks, typing, mouse movement)
                    2. Browser actions (page load, resizing, scrolling)
                    3. Custom js

                👉When an event occurs: 
                
                    JavaScript passes an event object to the handler function, which contains all useful information.

        
        🔹Common Types of JavaScript Events

            Mouse Events

                    👉click – when a user clicks an element
                    👉dblclick – double-click
                    👉contextmenu - right-click
                    👉mouseenter / mouseleave – hovering in/out  ... does not bubble
                    👉mouseover / mouseout – hovering in/out  ... does bubble
                    👉mousemove – moving the mouse

            Keyboard Events

                    👉keydown – key is pressed
                    👉keyup – key is released
                    👉keypress – key is pressed and held (deprecated in modern use)
            
            Form Events

                    👉submit – when a form is submitted
                    👉focus / blur – when an input gains/loses focus
                    👉change – when input value changes
            
            Window Events

                    👉load – page finishes loading
                    👉resize – window is resized
                    👉scroll – page is scrolled

        
        🔹How to Listen for Events

                1. Inline HTML

                        <button onclick="alert('Button clicked!')">Click Me</button>

                
                2. Using JavaScript addEventListener() method   (recommended)...

                        ** recommended. because.. 
                        👉 We can attach:

                            1.  Multiple handler function for the same event.
                            
                            2.  Different events on the same element.
                        
                        
                        👉const btn = document.querySelector("button");

                        
                        👉btn.addEventListener("click", function () {
                            alert("Button clicked! - 1...");
                        });

                        👉btn.addEventListener("click", function () {
                            alert("Button clicked! - 2...");
                        });

                        // differnt event
                        👉btn.addEventListener("mouseenter", function () {
                            console.log("...hello")
                        });

                        // event will occur in specified order...

        // ***********************************************************************************

                3. when we have a need, to use removeEventListner()  
                        
                        we have to define handler functiion separately.

                        const sayHi = function() {
                            alert("hi..")    
                        }

                        button.addEventListner('click', sayHi)

                        setTimeout(()=>{
                            button.removeEventListener('click', sayHi)      // after 10s  listner will not work..
                        },10000);

*/

/*      🔹Event propagation

            means how an event travels through the DOM tree.

            🔁 It happens in 3 phases.
                    1.  Capturing phase (top → down) also called "Trickling Down"
                    2.  Target phase (actual clicked element)
                    3.  Bubbling phase (bottom → up)

            🔵 Event Bubbling (Definition)

                where an event starts from the target element and then 
                propagates upward to its ancestors (target → parent → grandparent → document).
                It is default behaviour.

            🔵 Event Capturing (Definition)

                where an event starts from the topmost ancestor (document) and then 
                propagates downward to the target element.
                it is not by default, It is enabled by passing true in addEventListener.

                
                <div id="grandparent" style="padding:30px; background:lightblue;">
                    <p>Grandparent</p>
                    <div id="parent" style="padding:30px; background:lightgreen;">
                        <p>Parent</p>
                        <div id="child" style="padding:30px; background:lightcoral;">
                            <p>Child</p>
                        </div>
                    </div>
                </div>



            ⚡Bubbling - default behavior

                document.getElementById("grandparent").addEventListener("click", () => {
                    console.log("Grandparent clicked");
                });

                document.getElementById("parent").addEventListener("click", () => {
                    console.log("Parent clicked");
                });

                document.getElementById("child").addEventListener("click", () => {
                    console.log("Child clicked");
                });

                👉 When you click Child, output will be:

                    Child clicked
                    Parent clicked
                    Grandparent clicked

                        👉 Why?
                            Because event bubbles up:
                            Child → Parent → Grandparent
-

            ⚡ Capturing Phase:
                    To enable capturing, pass true as third argument:

                document.getElementById("grandparent").addEventListener("click", () => {
                    console.log("Grandparent clicked");
                }, true);

                document.getElementById("parent").addEventListener("click", () => {
                    console.log("Parent clicked");
                }, true);

                document.getElementById("child").addEventListener("click", () => {
                    console.log("Child clicked");
                }, true);

                👉 Now output will be: When we click on Child.

                    Grandparent clicked
                    Parent clicked
                    Child clicked

                👉 Now output will be: When we click on Parent.

                    Grandparent clicked
                    Parent clicked ( target level )

                        👉 Because capturing goes:
                            Grandparent → Parent → Child

        
        🧠event bubbling and capturing happen with same events only...

            🧠 Your Scenario (Capturing Phase)
                Grandparent → click
                Parent → mouseenter
                Child → click

                👉 You click on child
                
                👉 Output:
                    Child clicked
                    Grandparent clicked


// ------------------------------------------------------------------------------------------------
            
            🛑 e.stopPropagation()
                    We can stop the flow at target level. using event.stopPropagation():

                document.getElementById("child").addEventListener("click", (e) => {
                    console.log("Child clicked");
                    👉e.stopPropagation();
                });

                👉 Output:
                    Child clicked

            🛑 e.stopImmediatPropagation()
                        if target element has multiple event handlers, 
                        and same event()

                    it does two things...

                    1.  Stops event propogation

                    2.  Stops other handlers on the same element.


                    document.getElementById("child").addEventListener("click", (e) => {
                        console.log("Child clicked");
                        e.stopImmediatePropagation()
                    });

                    document.getElementById("child").addEventListener("click", () => {
                        console.log("Child clicked -2 ");
                    });

                    👉 Output:
                        Child clicked


// ------------------------------------------------------------------------------------------------
            
            🧠 Quick Summary
                    Bubbling (default) → Child → Parent → Grandparent   
                    Capturing → Grandparent → Parent → Child        
                    stopPropagation() → stops event flow ( stop at target level )
                    stopImmediatePropagation() → it stop other listner also.

*/


/*      🔹Event Delegation
            👉 instead of adding event listners on multiple child elements
                we add one listner on parent and event and handle event using event bubbling.

            👉core idea is that,
                when event happens on child, it bubble up to parent
                we can catch it at parent and decide what to  do.




            <ul class="list">
                <li>hi...</li>
                <li>hello...</li>
                <li>bye...</li>
                <li>tagName <span>closest</span></li>
                <li><span>Task 1</span> <button class="del-btn">X</button></li>
            </ul>

            const list = document.querySelector('.list');

            list.addEventListener('click', function(e) {
                // console.log(e)
                if(e.target.tagName == "LI"){
                    console.log(e.target.textContent);  
                }
            });


        🔹find def betn  tagName and closest()

            list.addEventListener('click', function(e) {
            console.log(e)
            const li = e.target.closest('li');
            if (li) {
                console.log(li.textContent);
            }               
        });

            
        🔹 What is closest()?
        👉 Finds the nearest ancestor (or itself) that matches a selector.

        list.addEventListener('click', function(e) {
            console.log(e)
            const del = btn = e.target.closest('.del-btn');
            if (del) {
                const li = btn.closest('li')        // Finds the nearest ancestor (or itself)
                li.remove();
            }               
        });




*/
    const list = document.querySelector('.list');

    list.addEventListener('click', function(e) {
        console.log(e)
        const del = btn = e.target.closest('.del-btn');
        if (del) {
            const li = btn.closest('li')
            li.remove();
        }               
    });


    
