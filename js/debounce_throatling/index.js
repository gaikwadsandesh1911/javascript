
/*  
    debounce is technique where function is not invoked while events are happening...
    It get invoked only when event stops..

        Typing in search input 
          (when typing do not call function, when stop after specified delay it get invoked)
        
        Window resize

        Scroll events



    👉 Instead of running function many times, debounce ensures:
        ➡️ It runs only once after user stops


*/


/* function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

function handleInput(e) {
  console.log("API Call..", e);
}
const debounceHandler = debounce(handleInput, 1000);
debounceHandler("d")
debounceHandler("de")
debounceHandler("del")
debounceHandler("dell laptop...") */




// ------------------------------------------------

/* const handleSearch = (e) => {
  console.log('api call...', e.target.value);
};

function debounce(fn, delay) {
    let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const debounceHandler = debounce(handleSearch, 1000);

const input = document.getElementById("search");

input.addEventListener("input", debounceHandler) */
