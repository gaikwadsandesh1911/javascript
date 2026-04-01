/* useEffect

    useEffect is react hook used to perform side-effect.
        side-effect means anything that is outside React-Renddering process.
        like:
            API calls,
            Dom Update,
            Timers,
            EventListners,
            Subscription(socke.io etc.)

    
    👉    useEffect(() => {

                // side effect code

                return () => {
                // cleanup (optional)
                };

            }, [dependencies]);

    
    👉useEffct takes two argument 
        1. callback function
        2. dependency array



    👉useEffect runs in followin three situations :

        🔹    if no dependecy provided, useEffect runs after evey render of the component.
    
        🔹    if empty dependecy [] means empty array  provided useEffect runs once. ( on component mount )

        🔹   if [ value ] provided then will Run on when value change.

    
    👉 ** useEffect runs after browser paint


    👉It also has cleanup function which runs in two situation

        🔹 just before effect runs again.
                when state change component re-renders, and useEffect runs
                but before it runs again, cleanup runs before it.

        🔹  before component unmount. means component removed from UI 
            ( eg. conditional rendering, route change, parent unmount )

*/