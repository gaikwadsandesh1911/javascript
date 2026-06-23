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


// src/lib/db/products.ts
import {prisma} from "@/lib/prisma"

export async function addProduct(title: string, price: number, description?: string) {
    return prisma.product.create({
        data: {
            title,
            price,
            description
        }
    })
};

// -----------------------------------------------

  // app/actions/product.ts

  // server actions
import { addProduct } from "@/lib/db/product";

import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  "use server";

  const title = formData.get("title") as string;
  const price = formData.get("price") as string;
  const description = formData.get("description") as string;

  await addProduct(title, parseInt(price), description);

  redirect("/products");
};

// -----------------------------------------------

  // page.tsx
import { createProduct } from "@/actions/productActions"
import SubmitButton from "../create-user/SubmitButton"

function CreateProduct() {
  return (
    <form action={createProduct}>
        <input type="text" name="title" placeholder="title"/>
        <input type="number" name="price" placeholder="price" />
        <textarea name="description" id="" placeholder="description"></textarea>
        <SubmitButton/>
    </form>
  )
}

export default CreateProduct


// ----------------------------------------------

// src/components/SubmitButton.tsx
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

// src/lib/data/product.ts

import {prisma} from "@/lib/prisma"

export async function addProduct(title: string, price: number) {
    return prisma.product.create({
        data: {
            title,
            price,
        }
    })
};

// page.tsx

"use client";

import { createProduct, FormState } from "@/actions/productActions";

import { useActionState } from "react";

const initialState: FormState = {
  errors: {}
};

function CreateProduct() {

  const [state, formAction, isPending] = useActionState(createProduct, initialState);

  return (
    <form action={formAction}>
      <div>
        <input type="text" name="title" placeholder="title" className="border"/>
      </div>
      {state.errors.title && (
        <p className="text-red-500">{state.errors.title}</p>
      )}
      <div>
        <input type="number" name="price" placeholder="price" className="border"/>
      </div>
      {state.errors.price && (
        <p className="text-red-500">{state.errors.price}</p>
      )}
      <button disabled={isPending} className="border">Submit</button>
    </form>
  );
}
export default CreateProduct;


// ---------------------------------------------

// action/userAction.ts

"use server";

import { addProduct } from "@/lib/db/product";
import { redirect } from "next/navigation";

export type Errors = {
  title?: string;
  price?: string;
  description?: string;
};

export type FormState = {
  errors: Errors;
};

export async function createProduct(prevState: FormState, formData: FormData) {
  
  const title = formData.get("title") as string;
  const price = formData.get("price") as string;

  const errors: Errors = {};

  if (!title) {
    errors.title = "Title is required";
  }

  if (!price) {
    errors.price = "Price is required";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  await addProduct(title, parseInt(price));

  redirect("/products");
}








