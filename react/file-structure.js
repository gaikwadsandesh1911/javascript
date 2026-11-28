/*.  How react application is run.

      we create app using vite and npm
    
      - npm create vite@latest

*/  

/*.  we have, 

 index.html
   
     It's entry point of html, 
     Its single html file, that's why it is called single page application. 
    
    which contain,
  
    - empty div element with id="root" attribute, and
    
    - link of js file

*/
<!doctype html>
<html>
  <head>
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>


/* we have,

   main.jsx

     It's entry point of React application
    
     which contains,
    
     - createRoot()  and  render() method.
     
     - createRoot() method access that single dom element from html file using document.getElementById() method and
     - render method renders App component into that root element.
     
     - App component organize all other component
    
*/

// main.jsx 

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);



// App.jsx

import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Header />
      <Home />
    </>
  );
}

export default App;



/*
    Browser load single html file and also loads React through its script.
    
    - we have two libraries React and React Dom both runs in browser.
    
    - React creates element from jsx and schedule component for rendering.
    
    - React DOM interacts with the browser's DOM APIs, and update actual browser Dom.

*/