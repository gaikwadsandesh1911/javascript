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
        
            Component is just a function in react, which return UI called JSX.
            and we can re-use it across the application.

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

        JSX is just syntax extension for javascript use in react,
        which allow us to write html like code inside javscript file.
*/


/*  💡 Virtual Dom ( VDOM ).

        👉  Virtual DOM is a light-weight copy of the real DOM in memory, 
            that React uses to optimizely update the UI.
                
*/

/*  💡 Diffing and Reconcillation, React Fiber

        Diffing and Reconcilliation
        
                when state or prop or context value is changed, component re-render
                and new copy of vdom is created.

                React compare this copy with previous copy is called "Diffing". Diffing is algo.

                and update only changed part in real dom. 
            
                This whole process is called called "Re-conciliation".

                👉Re-concilliation = diffing + update real dom.

        
        React Fiber

                React Fiber is internal architecture in react that controls how and when
                Reconcillation is performed.

                Each component in react is Fiber Node(object)

*/

/*  💡  State

        👉  state is data means any data ( string, number, object, array etc.) that change over time.
             state is managed inside component.

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
                    3   only changed part is updated in real dom
                    4   and finally  browser paint ui on screen.
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