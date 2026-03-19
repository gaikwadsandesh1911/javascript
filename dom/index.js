
// target parent from child.

const parentNode = document.querySelector(".txt").parentNode;
// console.log(parentNode);


// target child from parent.

const firstElChild = document.querySelector(".list").firstElementChild;   // li
const first = document.querySelector(".list").firstElementChild.textContent;   // hello
const last = document.querySelector(".list").lastElementChild.textContent;   // javascript
const allChildren = document.querySelector(".list").children;     // [li, li, li, li];     all childs.


// target previous and next child from childItself.

const prevEleSib =  document.querySelector(".secondChild").previousElementSibling;  // li
const nextEleSib =  document.querySelector(".secondChild").nextElementSibling.textContent; // welcome



const menu = document.querySelector(".menu");

// create element()

const li = document.createElement("li");
li.innerText = "cake";

menu.appendChild(li);       // appendChild() add only element at last child element.

// console.log(menu.innerText);     // if display: none... does not shows
// console.log(menu.textContent);     // if dispaly: none .. still shows



// append(), prepend(), before(), after()

const pizza = document.createElement("li");
pizza.innerText = "pizza";

const faluda = document.createElement("li");
faluda.innerText = "faluda";

menu.append(pizza, faluda);     // append method can add multile elements at last. can also add string.


const beer = document.createElement("li");
beer.innerText = "beer";
menu.prepend(beer);         // will be first child..

const rum = document.createElement("li");
rum.innerText = "rum";
menu.before(rum);           // before menu..

const wine = document.createElement("li");
wine.innerText = "wine";
menu.after(wine);          // after menu.. 



// beforeend, afterend, beforebegin, afterbegin
menu.insertAdjacentHTML("beforeend", "<li>puranpoli</li>");    // last element


const newNode = menu.cloneNode();   // copy menu.
const newNodeWithAllChilds = menu.cloneNode(true);   // copy menu. with all childs

menu.removeChild(menu.firstChild);      // remove child.


// attributes.... attributes gives additional info about tag. like claas, id, src, these are attributes

document.querySelector(".username").getAttribute("type");       // text
document.querySelector(".username").setAttribute("class", "user username");    //overwrites
document.querySelector(".username").hasAttribute("class");      // true false
document.querySelector(".username").removeAttribute("placeholder");    


// manipulation of inline css...

console.log(document.querySelector(".username").style.fontSize);    // if we set inline-css.
document.querySelector(".username").style.padding = "4px";
document.querySelector(".username").style.cssText = "width: 400px";  // overwrites all other inline css
document.querySelector(".username").style.cssText += "width: 400px; color: red"; // can also write multiple properties.

// console.log(window.getComputedStyle(document.querySelector(".username")).fontFamily);



// classList

console.log(document.getElementById("title").classList);     // ['title', 'headin']  show available classnames
document.getElementById("title").classList.add("new", "other");
document.getElementById("title").classList.remove("other");
document.getElementById("title").classList.replace("new", "newest");   // ("old", "new")
document.getElementById("title").classList.contains("newest");      // true, false
document.getElementById("title").classList.toggle("newer");         // if classList availabel it removes, if not available it adds


// ----------------------------------------------------------------------------------------------------------------------------------------

// Event Listner

function divEvent(event) {
    console.log("div-event", event);
    // event.stopPropagation();
}
document.querySelector(".event").addEventListener("click", divEvent);


// if we want to removeEventListner then we must have to define function outside
function btnEvent(event) {
    // console.log("this", this);
    // console.log("btn-event-type 🌈", event.type);
    console.log("btn-event 🌈", event);
    // event.stopPropagation();
}
document.querySelector(".btn").addEventListener("click", btnEvent);

// also chatgpt removeEventListner() examples and stopImmediatePropagation()



// ------------------------------------------------------------------------------------------------------------------------------------------


/* 
    Event Bubbling  => event starts from target element and then propagate upwards through its
    parent elements up to the document.

    child => parent => document.    =>  all must have same event type.

    by default its bubling, third paramaeter is false.
*/

/* 
    Event Capturing => Its phase where event travels from top ( document ) to target element.

    document => parent => child.
    
    to capture we have to pass third parameter that is ' true ' at all level of heirarchy.

    document.querySelector(".event").addEventListener("click", divEvent, true);
    document.querySelector(".btn").addEventListener("click", btnEvent, true);

    in event capturing phase even if we click on child element first, it first execute parent and then downward to the child.
*/

/* 
    event.stopPropagation() =>  does not allow event to bubble or capture

*/






