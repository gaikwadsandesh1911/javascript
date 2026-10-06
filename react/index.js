/* React

        React is a JavaScript library for building user interfaces (UI), 
        especially for single-page web applications.

        It provides features like:

        1. component based architecture:
                we combine multiple small re-usable components to build complete react application.

        2. virtual DOM:
                manipulating real dom is an expensive operation.
                vDOM efficiently update the UI, by updating only changed part of UI.

        3. JSX:
                JSX allow us to write HTML like syntax in js file.
                so we can create element and disply in UI without manually using methods
                like createElement() and appendChild().

        4. Hooks:
                built-in functions like useState and useEffect allow functional components
                to use state and other React features.             
    
*/

// ---------------------------------------------------------

/* some of the advantages of react:

        1. Reusable components:
                we create component once and can re-use anywhere in application.

        2. Better performance:
                because the concept of vDOM react efficiently update the UI
                by updating only changed part of UI.

        3. Flexible:
                React focus mainly on UI, so we choose other libraries
                according to application need.
        
*/

// ---------------------------------------------------------

/* Limitations of react:

        1. React is a library, not a complete framework – 
                we often need additional libraries for routing, state management, etc.

        2. SEO can require additional setup – 
                Traditional client-side React applications may have SEO challenges. 
                Frameworks like Next.js can help solve this.
*/

// ---------------------------------------------------------

/* Single page application(SPA) and Multi page application(MPA)

        In a SPA (Single Page Application):

        - The browser loads single HTML page initially. 
          as user interacts with the application, 
          it uses JavaScript to dynamically updates the UI without reloading the entire page.

        - It Provide a faster and smoother user experience.


        In an MPA (Multi Page Application):

        - Every navigation sends a request to the server, 
          and the server returns a new HTML page, causing a full page reload.

        
*/

// ---------------------------------------------------------

/* Components      
        
        Components are basic building block of react application.
        we combine multiple re-usable components together to build complx UI

        Component we manage its own state and logic.

*/

// ---------------------------------------------

/* JSX

        jsx stands for javascript xml.

        It is a syntax extension for JavaScript used in React.

        JSX allows us to write HTML-like code inside JavaScript files,
        
        It helps React create elements without manually using methods
        like createElement() and appendChild().
        so reading and writing component UI code becomes easier.
        
        But Browser does not understand jsx by default. It must be transformed into regular JavaScript before the browser run it.

        This transformation is done by 

        * Babel / Webpack
        * Vite - dev server
    
*/

// ---------------------------------------------

/*  Virtual Dom ( VDOM ).

        Virtual DOM is a light-weight copy of real dom.
        its just javascript object representation of the real DOM tree.
        
        React keep this copy in memory and
        whenever component is re-renders deu to change in state or prop or anything,
        new copy of vDOM is created.

        React compare these two copies and update only changed part in real DOM.

        That's how it update the UI.
                            
*/

// ---------------------------------------------

/* State

        state is any data like string, number, object, array etc that changed over the time.
        that is belongs to component and managed inside component,
        
        When state changes, React re-renders the component UI automatically. 

*/

// ---------------------------------------------

/* Props (short for properties)

        Props are data passed from parent component to child component.
        
        Parent component pass it as an attribute and
        Child component recieves it as an object.

        props are read-only and can not modified in child component.

        ** In react we can pass data from one way only
        from parent component to child component called 'unidirectional data flow'.

*/

// ---------------------------------------------

/*  Render and Re-Render

        Render:
        - Rendering is the process of converting your component code into visible UI on the screen.

        Re-rendering:           
        - when component state or props or context value changes  component re-render.
          when parent re-renders child also re-renders'

        ** useEffect runs afeter component renders(after browser paint)
                
*/

// ---------------------------------------------

/* Lifecycle of component: 

        There are three phases of component lifecycle.

        - Mounting
                means component first time rendered on screen.
 
        - Updating
                means component re-render deu to change in state, prop, etc..

        - Unmounting
                means component removed from screen. 
                deu to navigation or conditional rendering etc..
                
                
                
        In functional components, lifecycle behavior is usually handled using useEffect() 
        instead of class lifecycle methods like componentDidMount() or componentWillUnmount().
                

*/

// ---------------------------------------------

/*  Hooks

        Hooks are special built-in functions in React.
        introduced in React 16.8 version.

        Hooks allow functional components to use React features such as: 
        state, lifecycle methods, context, refs, and other capabilities
        without writing class components.
        
        Why were Hooks introduced?

        Before Hooks:

                - Functional components could only render UI.
                - To use state or lifecycle methods, we had to create class components.
                - Sharing stateful logic between components was difficult.

        Hooks solve these problems by allowing functional components to:

                - Manage state
                - Perform side effects
                - Access context
                - Store mutable values
                - Reuse stateful logic through custom hooks
*/

// ---------------------------------------------

/*  Diffing and Reconcillation, React Fiber

        Diffing and Reconcilliation:
        
                when component re-render deu to change in state or prop or anything
                new copy of vdom tree is created.

                React compare this new copy of vdom with old copy that is called "Diffing". 
                Diffing is algo.

                and update only changed part in real dom. 
            
                This whole process is called called "Re-conciliation".

                - Re-concilliation = diffing + update real dom.

                        ** after comparison old copy of vdom 
                        automatecally set to garbage collection.

        
        React Fiber:

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

// ---------------------------------------------