/*  💡 React

        React is a JavaScript library for building user interfaces (UI), 
        especially for single-page applications (SPA's).

        To build UI react uses component based architecture, 
        where multiple small components are combined together
        to build complete react application.
        
        And to efficiently update those UI react uses another concept called virtual dom, 
        means React keep lightweight copy of real dom in memory.
        its not full copy of real dom, its just lightweight object representation of real dom.
        whenever component re-render new virtual dom tree is created, react compare these two copies of virtual dom tree
        copies of vdom and update only changed part in ream dom,
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

        👉  In each component we manage its own state and logic.


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
        

        It helps React create elements without manually using methods
        like createElement() and appendChild().
        so reading and writing component UI code becomes easier.
        
        But JSX is not valid JavaScript. It must be transformed into regular JavaScript before the browser run it.

        This transformation is done by 

        * Babel / Webpack
        * Vite - dev server
    

    
*/


/*  💡 Virtual Dom ( VDOM ).

        👉  Virtual DOM is a light-weight copy of real dom.
            Its not exact copy of real dom its just javascript object representation of the real DOM tree.
            React keep this copy in memory to efficiently update the UI.
            
                
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
                
                 Fiber allows React to:

                   1. pause low-priority rendering,
                   2. handle urgent work first,
                   3. continue remaining work later.

                  So user interactions stay smooth

                 Each React component is Fiber node. Fiber node is js object containing:

                  * component type
                  * props
                  * state
                  * parent-child relation
                  * update priority
                  * side effects

                  Together Fiber nodes form a Fiber Tree.

*/

/*  💡  State

             state is any data like string, number, object, array etc, 
             that is belongs to component and managed inside component,
             that data is changed over the time.

             When state changes, React re-renders the component UI automatically.
            

*/

/*  💡  Props (short for properties)

            Props are data passed from parent component to child component.
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
                2.  virtul dom tree is created,
                3.  only changed part is updated in real dom => react stops here.
                4.  finally Browser Paint on screen.

                        ** useEffect runs after browser paint


        👉  Re-rendering            
                when component state or props or context value changes  component re-render 
                when parent re-renders child also re-renders'
                
                when re-render happens :
                    1   new  copy of virtual dom tree is created,
                    2   react compare it with old copy of virtual dom tree
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
                
                
                
         In functional components, lifecycle behavior is usually handled using useEffect() 
         instead of class lifecycle methods like componentDidMount() or componentWillUnmount().
                

*/


/*   💡  hooks

        hooks are special functions in react that allow functional components to use 
        state, lifecycle features, context, ref, side effect without using class component.
*/