/* ✅Controlled and Uncontrolled component.

        👉Controlled component
            value of form elements are handled by react. using useState().

        👉Un-Controlled component
            value of form elements are handled by DOM itself using useRef().

            uncontrolled component work just like normal HTML form element.

        👉👉
            checkbox and radio buttons
                ✅checked attribute is required to make them controlled by react.

                ✅if no checked,  dom handles state.      

*/



/*  useState

    👉 “useState is a React Hook that allows functional components to manage state 
        and trigger re-renders when the state changes.”

*/

/*  Batching in React

    👉 Batching means React groups multiple state updates into a single render for performance.

        const [count, setCount] = useState(0);

        const handleClick = () => {
        setCount(count + 1);
        setCount(count + 1);

        👉// these are multiple state update
        };

        👉 You might expect 2
            👉 But result is 1

        ❓ Why?
        Because React batches both updates and uses the same count value.


        👉 What actually happens (Batching)

        count = 0

        React queues updates:
        1st update → setCount(0 + 1) → 1
        2nd update → setCount(0 + 1) → 1

        👉 Both use SAME old value (0)

        React processes queue → final value = 1
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