/* ✅Controlled and Uncontrolled component.

        Controlled component
            value of form elements are handled by react. using useState().

        Un-Controlled component
            value of form elements are handled by DOM itself 
            and those values are accessed by using useRef().

            
        checkbox and radio buttons
            ✅checked attribute is required to make them controlled by react.    

*/
// controlled component
import { useState } from "react";

function Form() {
  const [name, setName] = useState("");

  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}

// uncontrolled component
import { useRef } from "react";

function Form() {
  const inputRef = useRef();

  function handleSubmit() {
    console.log(inputRef.current.value);
  }

  return (
    <>
      <input ref={inputRef} />

      <button onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
}

// -----------------------------------------------------------------


/*  useState:

        useState is a React Hook used to manage state in functional components.

        - It takes an initial state value and
        - returns an array containing the current state and a setter function to update the state.

        when we update the state:
            - react compare previous state with new state
                - for primitive (number, string, boolean, undefined, etc.), It compares by values. 
                - for non-primitive (objects, arrays, and functions), It compares by references( memory address ).
 
            - if React detect the change, It re-render component with new state.


    ***
        Because In js :
            - Primitive data types are immutable and compared by value.
            - Non-Primitive data types are mutable and compared by their reference.
                If same reference react do not detect the change, and component do not re-render.
            

    ***
        React state is considered as immutable, 
            - and we must not update the state direclty.
            - we must use setter function to update the state.
*/

        const [ state, setterFn] = useState(intialStateValue);

        // eg 1.  updating primitive value
        const [count, setCount] = useState(0);

        setCount((prevCount) => prevCount + 1);



        // eg 2.    how we update object
        const [user, setUser] = useState({
            name: 'sandesh',
            address: {
                city: 'mumbai',
                state: 'mh'
            }
        })

        setUser((prev) => ({
            ...prev,
            name: "sandesh gaikwad",
            address: {
                ...prev.address,
                city: "pune"
            }
        }));


        // eg 3.    how we update arrays
        const [user, setUser] = useState({
            name: 'sandesh',
            projects: [
                { id: 1, name: "portal"}
                { id: 2, name: "chat app"}
            ]
            skills: ["js", "React"]
        })

        setUser((prev) => ({
            ...prev,
            projects: prev.projects.map((p) =>
                p.id === 1 ? { ...p, name: "Job Portal" } : p
            ),
            skills: [...prev.skills, "Node"]
        }));


// -----------------------------------------------------------------

/*  functional update

        - whenever the new state depends on the previous state, such as:
               * Incrementing/decrementing counters
               * Toggling boolean values
               * Adding/removing items from an array
               * Updating objects based on their current values
            
            we use functional update.
        
        - functional update means passing a function to the setter function, instead of a value. 
            React provide previous state as an argument, and we return the new state.
*/
            // for eg. incrementing count
            const [count, setCount] = useState(0);
            setCount((prevCount) => prevCount + 1);

            // toggling boolean
            const [isOpen, setIsOpen] = useState(false);
            setIsOpen((prev) => !prev);


// -----------------------------------------------------------------

/*  Batching in React

         Batching means React groups multiple state updates together and 
         performs only one render instead of rendering after every update.  

         💁suppose we have function that updates count, name, age 
          if react does not batch these update it would render three times.


        function handleClick() {
            setCount(c => c + 1);
            setName("John");
            setAge(25);
        }

          with batching react group them together, and there would be only one re-rendering.
           which improves performence

          
          💁For a continuous event like mousemove, dozens of events can fire every second.

            function handleMouseMove() {
                setX(x);
                setY(y);
            }

          Instead of rendering after every tiny mouse movement, 
          React batches updates and can skip or delay some renders to keep the UI responsive.


          
    
        const [count, setCount] = useState(0);

        const handleClick = () => {
            setCount(count + 1);
            setCount(count + 1);
        }

        1st update → setCount(0 + 1) → 1
        2nd update → setCount(0 + 1) → 1

        👉 Only only re-render, Both use same old(stale) value


        ✅ Why functional update works

                setCount(prev => prev + 1);
                setCount(prev => prev + 1);

                Now React processes like:

                prev = 0 → 1
                prev = 1 → 2

                👉 Final = 2 ✅

*/


// -----------------------------------------------------------------


/* key in react.

    When we iterate over an array or list
        - key is a special prop used to uniquely identify elements in a list.
    
    key helps react identify which element were added, updated or romoved,
    so it can efficiently update the UI


    Without keys:  
    
        React may re-render more elements than necessary 
                or
        incorrectly preserve component state.

*/

        const fruits = [
            { id: 1, name: "Apple" },
            { id: 2, name: "Banana" },
            { id: 3, name: "Orange" }
        ];

        function FruitList() {
            return (
                <ul>
                {fruits.map((fruit) => (
                    <li key={fruit.id}>{fruit.name}</li>
                ))}
                </ul>
            );
        }