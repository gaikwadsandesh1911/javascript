/* 🔹memoization

        Memoization is a form of caching. 
        where the return value of a function is cached based on its parameters. 
        If the parameter of that function is not changed, the cached version of the function is returned.

        // 👍 memoization is a classic example of closure 

        function memoize(){
            let  cache = {};
            return function(num){
                if(num in cache){
                    console.log('...from cache...');
                    return cache[num]
                }else{
                    cache[num] = num + 100;
                    return cache[num];
                }
            }
        }
        const memoFun = memoize();
        console.log(memoFun(20));
        console.log(memoFun(20));
        console.log(memoFun(40));

/* 
        op
            120
            ...from cache...
            120
            140

            first time 20 value provided.  120
            second time 20 value provided.      ...from cache  120


// ----------------------------------------------------------

        

    🔹In react we have,
    
            useMemo()              memoize value

            useCallback()          memoize function          

            React.memo()           memoize component

        These hook are used to optimize performance of an application.
*/

/*  When component re-renders

        when state, prop, context value change, component re-render
        when parent re-renders child re-renders
*/

/*  function creation and function execution are different thing.

        🔹 Function creation

                Function creation means a new function object is created in memory 
                with a unique reference (memory address).

                    const fn = () => {};
                        👉 This step:
                            allocates memory
                            assigns a reference

        🔹 Function execution

                Function execution means invoking (calling) the function, 
                which runs its code.

                    fn();
                        👉 This step:
                            runs the function body
                            executes logic inside it

        🧠 Key insight (very important)
                A function can be created many times but executed only when called.

*/


/*
        🔹 Re-render behavior.

            When a component re-renders, it's entire body executes again.

        🔹 What gets re-created on every render?

            Every render creates new instances (new memory references) of:

                👉Inline functions → const handleClick = () => {}
                👉Objects / arrays → {}, []
                👉Variables defined inside the component

            👉 This is normal behavior and not a problem.



        🔹 When does the problem start?

            1. Expensive calculations

                When a function performs heavy computation, it execute again on every render, 
                which can impact performance or freeze the UI.

                ✅ Solution: useMemo

                    Memoizes the computed value
                    Re-computes only when dependencies change


            2. Functions passed as props

                When a function is passed as a prop, a new reference is created on every render.
                This causes child components to re-render un-necessarily, 
                because child component get new memory reference each time.

                ✅ Solution: useCallback

                    Returns the same function reference and
                    Updates only when dependencies change

                🔹 Important condition (very important)

                    useCallback is only effective when the child component 
                    is wrapped with React.memo.

                        useCallback → stabilizes function reference

                        React.memo → skips re-render if props are unchanged (shallow comparison)

*/


/*  🔹 React.memo()

        React.memo is a Higher-Order Component (HOC) 
        that memoizes a component and prevents it from un-necessary-rendering 
        if its props have not changed.

*/


// -------------------------------------------------------------

/*  🔹 What is useMemo?

        useMemo is a React Hook used to memoize or (cache) value of expensive calculation, 
        so it does not get re-computed on every render.

        It recomputes the value only when its dependencies change; otherwise, it returns the cached result.

        👉 
            ** it cache value of any type.. like array, object, number

            ** expensive calculation means cpu heavy task, 
                    filtering large list of products, they slow down UI.


// -----  eg.1  -------------------------------------------------

        
    const [count, setCount] = useState(0);

    const [text, setText] = useState("");

    const expensiveValue = useMemo(() => {
        console.log("Calculating...");
        return count * 2;
    }, [count]);

    
    <h1>{expensiveValue}</h1>

    <button onClick={() => setCount(count + 1)}>Increment</button>

    <input onChange={(e) => setText(e.target.value)} />


        when we type each word in input box component re-renders.
        if we do not use useMemo() then this expensiveValue also re-computed on every re-renders
        but because of dependency we provided it only re-computed when it's dependency value changed.


    // ----- eg. 2  ---------------------------------------------------------

            const filteredList = useMemo(() => {
            return items.filter(item => item.price > 1000);
            }, [items]);

        
        ** arrow function inside useMemo is re-created on every renders
            but executed only when dependency change.


    
    // --------------------------------------------------------------

*/


/* 🔹 What is useCallback?

        useCallback is a React Hook used to memoize a function, 
        to prevent unnecessary re-creation of the function on every render.
        
        The same function reference is reused between renders 
        unless it's dependencies change.

        but it is effective only when child wrapped with React.memo()
        
 -----------------------------------------------------------------------

            import { memo, useCallback, useState } from "react";

            const UseCallback = () => {

                const [count, setCount] = useState(0);

                const [input, setInput] = useState("");

                const handleClick = useCallback(() => {
                    console.log("handleClick re-created...");
                    setCount((prev) => prev + 1);
                }, [count]);

                return (
                    <>
                        <p>count: {count}</p>
                        <p>input: {input}</p>
                        <input
                            type="text"
                            placeholder="write something.."
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <hr />
                        <Child onClick={handleClick} text="Inc.." />
                    </>
                );
            };
            export default UseCallback;


            const Child = memo(({ onClick, text }) => {
                console.log("child rendered....");
                return <button onClick={onClick}>{text}</button>;
            });


            // when we write in input box child component not re-rendered.


*/
