/* useRef

     1. useRef is react hook which is commonly used to directly access and manipulate DOM elements like:
              input focus
              scroll position
     
     2. it returns only one value that is current object.
             const ref = useRef(0);
              ref.current

     3. useRef stores mutable value inside .current property that persists across component re-renders
        and also updating value .current++ does not cause component to be re-render.

// -------------------------------------------------------------------------

    const countRef = useRef(0);

    const increment = () => {
        countRef.current++;
        console.log("ref", countRef.current);
    };

    return (
        <>
            <p>UseRef..</p>
            <p>{countRef?.current}</p>
            <button onClick={increment}>Inc</button>
        </>
    )

        🔹  on  click of button value get updated in console.
            but it not reflected in UI. Because react does not track it so does not re-renders.

            useRef is used for storing value, not displaying UI.

// -------------------------------------------------------------------------


        🔹 When to Use useRef
            ✅ Accessing DOM (focus, scroll, etc.)
            ✅ Storing previous values
            ✅ Avoiding re-renders
            ✅ Storing timers / IDs
    

// -------------------------------------------------------------------------

    🔹 storing previous value...


    const prevCount = useRef();

    const [count, setCount] = useState(0);

    useEffect(() => {
        prevCount.current = count;
    }, [count]);

    return (
        <>
            <p>current count: {count}</p>
            <p>prevCount: {prevCount.current}</p>
            <button onClick={() => setCount((prev) => prev + 1)}>Inc</button>
        </>
    )

    ✅ useEffect is run after component render means after browser prints on screen
     So prevCount.current is always one render behind

        First render:
            count = 0
            prevCount.current = undefined

        Click button:
            count = 1 → component re-renders
            useEffect runs AFTER render(means after browser pent)
            prevCount.current = 1 (stored for next render)

        Next render:
            count = 2
            prevCount.current = 1 ✅ (previous value)

// -------------------------------------------------------------------------

    🔹 timers

        we store timers in useRef, because timers need to persist across the renders
        and should not cause re-rendes.


    export default function UseRef() {
    
        const [count, setCount] = useState(0);
        const timerRef = useRef();

        const startTimer = () => {
            if (timerRef.current) return;
            timerRef.current = setInterval(() => {
            setCount((prev) => prev + 1);
            }, 1000);
        };

        const pauseTimer = () => {
            clearInterval(timerRef.current);
            timerRef.current = null;
        };

        const stop = () => {
            clearInterval(timerRef.current);
            timerRef.current = null;
            setCount(0);
        };

        useEffect(() => {
            clearInterval(timerRef.current);
        }, []);

        return (
            <>
                <p>useRef</p>
                <h1>Time: {count}</h1>
                <button onClick={startTimer}>Start</button>
                <button onClick={pauseTimer}>Pause</button>
                <button onClick={stop}>Stop</button>
            </>
        );
    }

// ---------------------------------------------------------------

    🔹   access dom element

        const inputRef = useRef(null);
            useEffect(() => {
                inputRef.current.focus();
            }, []);

            return (
                <>
                <input type="text" placeholder="write something..." ref={inputRef} />
                </>
            )
            
            
            
            
            
            search in chatgpt
            different property and methods available on .current property
            to manipulate dom 
            give me categorywise result.


*/


