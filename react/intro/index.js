/*  💡 React

        React is a JavaScript library for building user interfaces (UI), 
        especially for single-page applications (SPA's).

        React uses component based architecture, where your entire application
        is break into small reusable piece of UI.
        
        React also uses concept of virtual dom, means React keep lightweight copy of real dom in memory.
        its not full copy of real dom, its just lightweight object representation of real dom.
        whenever component re-render new virtual dom tree is created, react compare these two copies of virtual dom tree
        and update only changed part in ream dom,
        thats how it efficiently update the UI.
    
*/

/*  💡 Single page application(SPA) and Multi page application(MPA)

        In a SPA (Single Page Application), the browser loads one HTML page initially. 
        After that, as the user interacts with the application, 
        JavaScript dynamically updates the UI without reloading the entire page.

        It Provide a faster and smoother user experience.
        
        In an MPA (Multi Page Application), every navigation sends a request to the server, 
        and the server returns a new HTML page, causing a full page reload.

        
*/



/*  💡 Component      
        
            Component is basic building block of react application.
            Because of component we can break entire react app into small re-usable pieces of UI

        👉  Each component manage its own state and logic.


        👉  we combine multiple components together to build complx UI
            for eg.   Inside App  componet, we have Navbar, Main, Footer 

                App
                    Navbar
                    Main
                    Footer

        👉  we have two types of component :

                1.  Functional Components.
                
                2.  Class Components  [ it's not used now, Replaced by hooks ].

*/

/*  💡  JSX

        jsx stands for javascript xml.

        It is a syntax extension for JavaScript used in React.

        JSX allows us to write HTML-like code inside JavaScript files,
        making UI code easier to read and write.

        It helps React create elements without manually using methods
        like createElement() and appendChild().
        
        But JSX is not valid JavaScript. It must be converted into regular JavaScript before the browser can run it.

        In React, JSX is transformed into React.createElement() calls using tools like:

        * Babel
        * Vite
        * Webpack

    
*/


/*  💡 Virtual Dom ( VDOM ).

        👉  Virtual DOM is a light-weight copy of javascript object representation of the real DOM.
            React keep this copy in memory to efficiently update the UI.
            
            its not exact copy of real dom, its just lightweight javascript object representation of real dom.
                
*/

/*  💡 Diffing and Reconcillation, React Fiber

        Diffing and Reconcilliation
        
                when component re-render deu to change in state or prop or anything
                new copy of vdom tree is created.

                React compare this new copy of vdom with old copy that is called "Diffing". Diffing is algo.

                and update only changed part in real dom. 
            
                This whole process is called called "Re-conciliation".

                👉Re-concilliation = diffing + update real dom.

                        ** after comparison old copy of vdom 
                        automatecally set to garbage collection.

        
        React Fiber

                “React Fiber is the internal reconciliation engine introduced in React 16.

                 Before Fiber, React used a synchronous rendering process, 
                 meaning once rendering started, it could not stop until completed.
                 If a large component tree was rendering, the browser UI could freeze because React blocked the main thread.
                 
                 “Fiber made React rendering asynchronous and priority-based instead of fully synchronous.”

                 It improves rendering performance by breaking rendering work into small units called fibers.
                
                 This allows React to pause, prioritize, resume, and schedule updates efficiently,
                 making the UI smoother and enabling features like concurrent rendering and suspense.”

                 Each React component has its own Fiber node.

                 Fiber stores:

                  * component type
                  * props
                  * state
                  * parent-child relation
                  * update priority
                  * side effects

                  Together Fiber nodes form a Fiber Tree.

*/

/*  💡  State

        👉  state is data means any data ( string, number, object, array etc.) that change over time.
             state is managed inside component.

                we use useState() hook to in react to store state, 
                and state is updated via setter function of useState.

                state is immutable, we can not update state directly, we have to make copy first.

                const [count, setCount] = useState(0);
                        count is state which has initial value 0
                        and we update it via setCount which is setter function.
                
            when it changes → UI automatically updates

        ** In class component state is object..

*/

/*  💡  Props (short for properties)

        👉  Props are data passed from parent component to child component.
            Child component recieves it as an object.

            props are read-only and can not modified in child component.

            ** In react we can pass data from one way only
                from parent component to child component called 'unidirectional data flow'.

*/

/*  💡  Render and Re-Render

        👉  Rendering is process of :
                converting your component code into visible UI on the screen.

            process :
                1.  React call your component and return jsx,
                2.  virtul dom is created,
                3.  only changed part is updated in real dom => react stops here.
                4.  finally Browser Paint on screen.

                        ** useEffect runs after browser paint


        👉  Re-rendering            
                when component state or props or context value changes  component re-render 
                when parent re-renders child also re-renders'
                
                when re-render happens :
                    1   new  copy of virtual dom  created,
                    2   react compare it with old copy of virtual  dom
                    3   only changed part is updated in real dom. React work is done here.
                    4   and finally  browser paint ui on the screen.
*/


/*  💡  Lifecycle of component: 

        Mount, Update, Unmount.

        🔹 Mounting
                means component first time rendered on screen.
 
        🔹 Updating
                means component re-render deu to change in state, prop, etc..

        🔹 Unmounting
                means component removed from screen. deu to navigation or conditional rendering etc..

*/


/*   💡  hooks

        hooks are functions in react that let you use 
        state and lifecycle feature inside functional components.
*/