/* 
    Data Mutation means changing data (create, update, delete) and then 
    making sure the UI shows the latest state.

    Server Actions:

        Server Actions are asynchronous function that are
        executed on server only.

        Server Action are defined with "use server" directive
            - at top of async function to mark function as Server Action. or
            - at top of separate file to mark all exports of that file as Server Actions

        We use a Server Action as the action prop of a <form>.

        They can be called in Server and Client component to handle
        form submission and data mutations in Next.js application
        without creating api endpoint.

        we use server actions: 
            - for secure database operations.
            - to reduce api boilerplate code.
            - optimize performance.  

        when we submit form, sever action automatically recieves args (formData: FormData)


    useFormStatus()
    
        Is a React hook used with Server Actions. That lets us track the status of a form submission. 
        It is commonly used to show loading states, disable buttons, or display submission progress 
        while the form is being submitted.
*/

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import SubmitButton from "./SubmitButton";


// db operation
export async function createUserInDB(name: string, email: string) {
  return prisma.user.create({
    data: {
      name,
      email,
    },
  });
}

// -----------------------------------------------



    // app/actions/user.ts

    // server actions
    const createUser = async (formData: FormData) => {
        "use server";

        const name = formData.get("name") as string;

        const email = formData.get("email") as string;

        const newUser = await createUserInDB(name, email);
        
        console.log("newUser", newUser);

        redirect("/users");
    };

// -----------------------------------------------

    // page.tsx
    function CreateUser() {
        return (
            <div>
            <form action={createUser} >
                <input type="text"  name="name" placeholder="Enter your name"/>
                <input type="email"  name="email" placeholder="enter email"/>
                {/* client component */}
                <SubmitButton />
            </form>
            </div>
        );
    }


// ----------------------------------------------

// SubmitButton.tsx
"use client";

import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} type="submit">
      {pending ? "Submitting" : "Submit"}
    </button>
  );
}

// ---------------------------------------------

/* useActionState()

    useActionState is a React hook that manages the state returned by a form action ( typically a Server Action ). 
    It is particularly helpful for handling form validation and error messages.

    When used with useActionState, the Server Action receives two arguments:

        async function action( prevState, formData) {
            "use server";
        }

    prevState → State from the previous submission.

    formData → Submitted form data.

*/

const [state, formAction, isPending] = useActionState(action, initialState);

/*  
    state → Current state returned by the action.

    formAction → Pass this to <form action={...}>.

    isPending → true while the action is executing.
*/

// page.tsx

"use client"

import { createUser, FormState } from "@/actions/userActions";

import { useActionState } from "react";

// -------------------------------------------------

const initialState: FormState = {
  errors: {}
};

function CreateUser() {

  const [state, formAction, isPending ] = useActionState(createUser, initialState);

  return (
    <div>
      <form action={formAction} >
      
        <div>
          <input type="text" id="name" name="name" placeholder="Enter your name"/>
        </div>
        {state?.errors?.name && (<p>{state?.errors?.name}</p>)}

        <div>
          <input type="email" id="email" name="email" placeholder="enter email"/>
        </div>
        {state?.errors?.email && (<p>{state?.errors?.email}</p>)}

        <button disabled={isPending} type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateUser;

// ---------------------------------------------

// action/userAction.ts

"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

// DB operation
export async function createUserInDB(name: string, email: string) {
  return prisma.user.create({
    data: {
      name,
      email,
    },
  });
};

export type Errors = {
  name?: string,
  email?: string
};

export type FormState = {
  errors: Errors
};

// server action
  export const createUser = async (prevState: FormState, formData: FormData) => {
    
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    const errors: Errors = {};

    if(!name) {
      errors.name = "name is required";
    };

    if(!email) {
      errors.email = "email is required";
    };

    if(Object.keys(errors).length > 0) {
      return { errors}
    };

    const newUser = await createUserInDB(name, email);
    console.log("newUser", newUser);

    redirect("/all-users");
  };







