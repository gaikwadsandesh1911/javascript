/*  💡 React

        React is a JavaScript library for building user interfaces (UI), 
        especially for single-page applications (SPA's).

        React uses component based architecture, where your entire application.
        is break into small reusable piece of UI and
        it efficiently update the UI using concept called virtual Dom [ VDOM ].
    
*/

/*  💡 Single page application(SPA) and Multi page application(MPA)

        A Single Page Application loads a single HTML page 
        and dynamically updates the UI without reloading.
        It Provide a faster and smoother user experience.

        A Multi Page Application reloads the entire page for every request.

        👉  SPAs rely on client-side rendering, 
            while MPAs typically use server-side rendering.
*/



/*  💡 Component      

        👉 Simple definition.
        
            Component is just a function in react, which return UI called JSX.
            and we can re-use it across the application.

        👉  Each component manage its own state and logic.


        👉  we combine multiple components together to build complx UI
            for eg.   inside App  componet, we have Navbar, Main, Footer 

                App
                    Navbar
                    Main
                    Footer

        👉  we have two types of component :

                1.  Functional Components.
                2.  Class Components  [ not used now, Replaced by hooks ].

*/


/*  💡 Virtual Dom ( VDOM ).

        👉  Virtual DOM is a lightweight copy of the real DOM in memory, 
            that React uses to optimizely update the UI.

            when state or prop or context value is changed, component re-render
            and new copy of vdom is created.

            React compare this copy with previous copy is called "Diffing". Diffing is algo.

            and update only changed part in real dom is called "Re-conciliation".
*/

/*  💡  State

        👉  state is data means any data ( string, number, object, array etc.) that change over time.
            and we manage state inside component.

                we use useState() hook to in react to store state, 
                and state is updated via setter function of useState.

                const [count, setCount] = useState(0);
                        count is state which has initial value 0
                        and we update it via setCount which is setter function.
                
            when it changes → UI automatically updates

        ** In class component state is object..

*/

/*  💡  Props (short for properties)

        👉  Props is a data pass from parent component to child component.
            Child component recieves it in form of object.

            props are read-only and can not modified in child component.

            ** In react we can pass data from one way only
                from parent component to child component called 'unidirectional data flow'.

*/

/*  💡  Render and Re-Render

        👉  Rendering is process where React executes your component
            and generate JSX.

                ** Rendering does not mean directly update the real DOM; 
                    that happens later in the commit phase. ( diffing and re-concillation )


        👉  Re-rendering is the process where
                
                when its state or props or context value changes,
                React re-executes a component, return jsx and creates a new copy of Virtual DOM.

        👉  This newly created copy of vdom, react compares it with the previous copy, 
            and updates only the changed parts in the real DOM
*/