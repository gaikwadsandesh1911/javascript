/* useFormStatus()

   its react hook mostly used in child component that provides information about
   submission status of parent component form.

   it is used to display pending state, and disable button while form is being submitted

*/

function RegistrationForm() {

    async function submitForm(formData) {
        const name = formData.get("name");

        await new Promise(resolve =>
            setTimeout(resolve, 2000)
        );

        console.log(name);
    }

    return (
        <form action={submitForm}>
            <input
                type="text"
                name="name"
                placeholder="Enter name"
            />

            <SubmitButton />
        </form>
    );
}

export default RegistrationForm;


// SubmitButton.jsx

import { useFormStatus } from "react-dom";

function SubmitButton() {

    const { pending, data, method, action } = useFormStatus();

    return (
        <button type="submit" disabled={pending}>
            {pending ? "Submitting..." : "Submit"}
        </button>
    );
}

export default SubmitButton;


/*


pending        Whether the parent form is currently submitting
data           FormData being submitted
method         Form submission method (get or post)
action         Function or URL associated with the form action

*/