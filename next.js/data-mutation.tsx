/* Data Mutation 
    
    
    Data fetching means reading data.

    while data mutation means changing data (Create, Update, Delete).

      - After a mutation, cache invalidation (e.g., revalidatePath or revalidateTag) is often used 
        to ensure users see the latest data.

    The recommended way of data mutation is to use Server Actions.

    Server Actions:

        Server Actions are asynchronous function that are
        executed on server only.

        Server Action are defined with "use server" directive
            - at top of async function or
            - at top of file to mark all exports of that file as Server Actions

        we use Server Action as the action prop of a <form action={serverActionFunction}>

        when we submit form: 
          - sever action automatically recieves args (formData: FormData)


        Server Action can be called on:
          - Server as well on Client component 


        we use server actions: 
            - for secure database operations.
            - to reduce api boilerplate code.
            - optimize performance.  

*/


// app/actions.ts
"use server";       // 'use server' directive at top of file

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: FormData) {

  // store in DB
  await prisma.product.create({
    data: {
      title: formData.get("title") as string,
      price: Number(formData.get("price")),
    },
  });

  revalidatePath("/products");
  // This tells Next.js to invalidate the cached data for /products, so the next request gets fresh data.
}

// we can also use redirect("/products")


// app/create-product/page.tsx

import { createProduct } from "./actions";

export default function Page() {
  return (
    <form action={createProduct}>
      <input name="title" />
      <input name="price" />
      <button type="submit">Create</button>
    </form>
  );
}

// -----------------------------------------------------


/* useFormStatus()
    
        Is a React hook used with Server Action,
        which track the status of a form submission. 

        It is commonly used to show loading states, disable buttons, or display submission progress 
        while the form is being submitted.

     */    

// src/components/SubmitButton.tsx
"use client";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} type="submit">
      {pending ? "Submitting" : "Submit"}
    </button>
  );
}


// app/create-product/page.tsx
export default function Page() {
  return (
    <form action={createProduct}>
      <input name="title" />
      <input name="price" />
      <SubmitButton/>
    </form>
  );
}

// ----------------------------------------------------------




/* useActionState()

    Is react hook used with Server Action,
    which track the state returned by Server Action.

    It is particularly helpful for validation errors and success messages.

    - When we work with useActionState, the Server Action receives two arguments:
        1. prevState → State from the previous submission.
        2. formData → Submitted form data.

*/

// types.ts
export type FormState = {
  success: string;
  errors: {
    title?: string;
    price?: string;
    description?: string;
  };
};


// action.ts
"use server";

export async function createProduct(prevState: FormState,formData: FormData): Promise<FormState> {

  const title = formData.get("title") as string;
  const price = Number(formData.get("price"));
  const description = formData.get("description") as string;

  const errors: FormState["errors"] = {};

  if (!title.trim()) {
    errors.title = "Title is required";
  }

  if (price <= 0 || isNaN(price)) {
    errors.price = "Price must be greater than 0";
  }

  if (!description.trim()) {
    errors.description = "Description is required";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: "",
      errors: errors,
    };
  }

  await prisma.product.create({
    data: {
      title,
      price,
      description,
    },
  });

  revalidatePath("/products");

  return {
    success: "Product created successfully!",
    errors: {},
  };
}


// ProductForm.tsx
"use client";

import { useActionState } from "react";
import { createProduct } from "./actions";

const initialState = {
  success: "",
  errors: {},
};

export default function ProductForm() {

  const [state, formAction, pending] = useActionState(createProduct, initialState);

  return (
    <form action={formAction}>

      <div>
        <input
          name="title"
          placeholder="Title"
        />

        {state.errors.title && (
          <p>{state.errors.title}</p>
        )}
      </div>

      <div>
        <input
          name="price"
          type="number"
          placeholder="Price"
        />

        {state.errors.price && (
          <p>{state.errors.price}</p>
        )}
      </div>

      <div>
        <textarea
          name="description"
          placeholder="Description"
        />

        {state.errors.description && (
          <p>{state.errors.description}</p>
        )}
      </div>

      <button disabled={pending}>
        {pending ? "Creating..." : "Create Product"}
      </button>

      {state.success && (
        <p>{state.success}</p>
      )}

    </form>
  );
}


//  app/create-product/page.tsx
import ProductForm from "./ProductForm";

export default function Page() {
  return (
    <main>
      <h1>Create Product</h1>

      <ProductForm />
    </main>
  );
}



// -----------------------------------------------------------

const [state, formAction, isPending] = useActionState(serverAction, initialState);

/* 
    useActionState takes:

      - a Server Action and 
      - an initial state. 

    And It returns:

      - the current state, Initially, it is equal to initialState
      - a wrapped action function (formAction) that is passed to the form, and 
      - a boolean (isPending) indicating whether the Server Action is currently executing. 
      

    Every time the Server Action returns a new state,
    the state variable is updated and the component re-renders.

  */


// ------------------------------------------------------------
// ------------------------------------------------------------

      // Update / Edit 

      /* 
            When updating an existing record: 
              
            - The Server Component first fetches the product from the database and passes it to a Client Component. 
            
            - The Client Component pre-fills the form using defaultValue. 
            
            - The product ID is bound to the Server Action using bind(), 
              allowing useActionState to submit both the ID and the form data. 
              
            - The Server Action:
                  - validates the input, 
                  - updates the database using Prisma, 
                  - revalidates the cache with revalidatePath, 
              and returns a new state that updates the UI.
      
      */


    // app/products/[id]/page.tsx

    import { prisma } from "@/lib/prisma";

    import EditProductForm from "./EditProductForm";

    export default async function Page({params}: { params: Promise<{ id: string }> }) {
      
      const { id } = await params;

      const product = await prisma.product.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!product) {
        return <h1>Product not found</h1>;
      }

      return <EditProductForm product={product} />;
    }


    // Client Component
    
    "use client";

    import { useActionState } from "react";
    import { updateProduct } from "./actions";

    const initialState = {
      success: "",
      errors: {},
    };

    export default function EditProductForm({
      product,
    }: {
      product: {
        id: number;
        title: string;
        price: number;
        description: string;
      };
    }) {
      const updateProductWithId =
        updateProduct.bind(null, product.id);

      const [state, formAction, pending] =
        useActionState(updateProductWithId, initialState);

      return (
        <form action={formAction}>

          <input
            name="title"
            defaultValue={product.title}
          />

          {state.errors.title && (
            <p>{state.errors.title}</p>
          )}

          <input
            name="price"
            type="number"
            defaultValue={product.price}
          />

          {state.errors.price && (
            <p>{state.errors.price}</p>
          )}

          <textarea
            name="description"
            defaultValue={product.description}
          />

          {state.errors.description && (
            <p>{state.errors.description}</p>
          )}

          <button disabled={pending}>
            {pending
              ? "Updating..."
              : "Update Product"}
          </button>

          {state.success && (
            <p>{state.success}</p>
          )}
        </form>
      );
    }



    // server action

    "use server";

    import { prisma } from "@/lib/prisma";
    import { revalidatePath } from "next/cache";

    export type FormState = {
      success: string;
      errors: {
        title?: string;
        price?: string;
        description?: string;
      };
    };

    export async function updateProduct(
      id: number,
      prevState: FormState,
      formData: FormData
    ): Promise<FormState> {
      const title = formData.get("title") as string;
      const price = Number(formData.get("price"));
      const description = formData.get("description") as string;

      const errors: FormState["errors"] = {};

      if (!title.trim()) {
        errors.title = "Title is required";
      }

      if (price <= 0 || Number.isNaN(price)) {
        errors.price = "Price must be greater than 0";
      }

      if (!description.trim()) {
        errors.description = "Description is required";
      }

      if (Object.keys(errors).length > 0) {
        return {
          success: "",
          errors,
        };
      }

      await prisma.product.update({
        where: {
          id,
        },
        data: {
          title,
          price,
          description,
        },
      });

      revalidatePath("/products");

      return {
        success: "Product updated successfully!",
        errors: {},
      };
    }



    /* when we use useActionState(), Server Action expects  (prevState, formData)
    
      But we also need the product id, we bind it first:

        const updateProductWithId = updateProduct.bind(null, product.id);

      
      Now Server Action recieves:

        updateProduct(product.id, prevState, formData)

    */

// ------------------------------------------------------------




// useOptimistic()


// Form component










