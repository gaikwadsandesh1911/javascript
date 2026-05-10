/* ✅Controlled and Uncontrolled component.

        Controlled component
            value of form elements are handled by react. using useState().

        Un-Controlled component
            value of form elements are handled by DOM itself 
            and those values are accessed by using useRef().

            
        checkbox and radio buttons
            ✅checked attribute is required to make them controlled by react.    

*/



/*  useState

        “useState is a React Hook that allows functional components to store and manage state.
         and it automatically re-renders the component when the state value changes.”
        
         const [state, setState] = useState(initialValue);
        
        useState returns an array with two values
           1. current state value.
           2. and function to update state value.
        
        

*/

/*  Batching in React

        Batching means React groups multiple state updates together 
        and performs only one re-render of the component for better performance.

        const [count, setCount] = useState(0);

        const handleClick = () => {
        setCount(count + 1);
        setCount(count + 1);

    
        1st update → setCount(0 + 1) → 1
        2nd update → setCount(0 + 1) → 1

        👉 Both use SAME old value
        👉 Only ONE re-render



        ✅ Why functional update works

        setCount(prev => prev + 1);
        setCount(prev => prev + 1);

        Now React processes like:

        prev = 0 → 1
        prev = 1 → 2

        👉 Final = 2 ✅

*/

/*  👉 we should not mutate state directly.
    👉 we should create new copy first then update it.
        so react detect changes and trigger re-render effieciently.

        React checks changes using reference( memory address. ) that is called shallow comparison.
        👉if reference change react re-renders
        👉if same reference React skip update or re-render.

        ✅primitive data types are immutable by default. 
        There is no need of spread operator

        ✅for non-primitive data type we need spread operator, to make copy first.

        const num = 10;
        const newNum = num;

            ✅here for newNum new memory address is created by default.

            if we changes in
                num = 20.  will not reflect in newNum,
                newNum = 10  will remain as it is

        const obj = {
            name: 'sandesh'
        }

        const newObj = obj

            ✅here for newObj same memory addressed(reference) is assigned,

            so changes in 
                obj.name = 'gaikwad'  will also reflect in 
                newObj2 

        so react can'not make comarison.. because it has to compare old and new vDom.

        thats why we have to make new copy first using ... spread operator,
        so we have two memory address. and react now compare
        and then update it efficiently.


        ✅ at nested object we have to copy at each level.

            const [user, setUser] = useState({
                name: 'sandesh',
                address: {
                    city: 'mumbai',
                    state: 'mh'
                }
            })

            setUser((prev)=>{
                ...prev,
                name: 'sandesh gaikwad',
                address: {
                    ...prev.address,
                    city: 'pune'
                }
            })


        
        ✅ for array update

        const [user, setUser] = useState({
            name: 'sandesh',
            projects: [
                { id: 1, name: "portal"}
                { id: 2, name: "chat app"}
            ]
            skills: ["js", "React"]
        })

        setUser((prev)=>{
            ...prev,
            projects: prev.projects.map((p)=> p.id == 1 ? {...p, name: 'job Portal' } : p)
            skills: [...prev.skill, "node"]
        })

        
        ✅for filter or remove element from an array
        
        setUser((prev)=>{
            ...prev,
            skills: prev.skills.filter(skill => skill !== 'js')
        })

        setUser((prev)=>{
            ...prev,
            projects: prev.projects.filter(project => project.id !== 1)
        })

*/  


/* Keys in react.

    when we iterate over array, 
    key attribute is given to each array element for providing unique identity to each element.

    key helps react identify which element were added, updated or romoved,
    so it can efficiently update the UI

*/