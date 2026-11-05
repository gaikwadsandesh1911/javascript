/* useActionState()

     is react hook which is used to manage state and result of an action.

     It takes an action function and an initial state,
     then returns the current state, a function to execute the Action, and a pending status.
    
     useful for handling form submissions, displaying success or error messages, and managing loading states


*/

import { useActionState } from "react";

function RegistrationForm() {


    async function registerUser(prevState, formData) {

        const name = formData.get("name");
        const email = formData.get("email");

        // Simulate API request
        await new Promise(resolve =>
            setTimeout(resolve, 2000)
        );

        if (!name || !email) {
            return {
                message: "Please fill all fields",
                success: false
            };
        }

        return {
            message: "Registration successful!",
            success: true
        };
    }
    

    const initialState = {
        message: "",
        success: false
    };
    

    const [state, formAction, isPending] = useActionState(registerUser, initialState);


    return (
        <form action={formAction}>

            <input
                type="text"
                name="name"
                placeholder="Enter name"
            />

            <input
                type="email"
                name="email"
                placeholder="Enter email"
            />

            <button type="submit" disabled={isPending}>
                {isPending ? "Registering..." : "Register"}
            </button>

            <p>{state.message}</p>

        </form>
    );
}

export default RegistrationForm;