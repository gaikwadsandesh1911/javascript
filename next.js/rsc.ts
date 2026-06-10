/* RSC ( React Server Component )

  React Server Components (RSC) represent a new architecture for building React applications.

  They introduce a dual-component model consisting of :

  1. Server Components.
  2. Client Components.

  Server Components run on the server and are optimized for data fetching, rendering, and accessing backend resources.

  Client Components run in the browser and are responsible for interactivity, state management, event handling, and browser APIs.

  By separating server-side and client-side responsibilities, 
  RSC helps reduce JavaScript bundle sent to the browser, 
  improve performance, and create more efficient React applications.


*/

// Dual component model.

// Server Component
export default async function Page() {
  const products = await getProducts();

  // return client component from server and send data as props
  return <ProductList products={products} />;
}

// Client Component

"use client";

export default function ProductList({ products }) {
  const [filter, setFilter] = useState("");
}

// ----------------------------------------------


/* Client Components Lifecycle in Next.js

      - The Client Component is rendered on the server to generate the initial HTML.
      - The browser receives and displays the HTML immediately.
      - The Client Component's JavaScript is downloaded.
      - React hydrates the component.
      - Event handlers become active.

*/

// -----------------------------------------------------

/* RSC Rendering Lifecycle

There are three main participants in the React Server Component rendering process:

1. Client (Browser)
2. Next.js (Framework)
3. React (Library)

Request Flow:

    Client → Next.js → React

1. The browser sends a request for a route.
   Next.js matches the requested URL using the App Router and initiates the rendering process.

2. React renders all Server Components on the server and produces:
   - An RSC Payload containing the component tree and rendered output.
   - References and instructions for Client Components.

3. Next.js uses the RSC Payload to generate the initial HTML response.
   The HTML, RSC Payload, and Client Component instructions are then streamed to the browser.

4. The browser displays the HTML immediately and later hydrates the Client Components, making the page fully interactive.


*/


/*  RSC Update Sequence (Reconciliation)

After the initial page load, updates follow a different flow than the first render.

1. A user interaction occurs.
   Examples:
   - Navigation using <Link>
   - Refreshing data
   - Server Action execution

2. The browser sends a request to Next.js.

3. Next.js asks React to re-render only the affected Server Components.

4. React generates a new RSC Payload containing the updated component tree.

5. Next.js streams the updated RSC Payload back to the browser.

6. React on the client compares (reconciles) the new RSC Payload with the current React tree.

7. React identifies what has changed and updates only the affected parts of the DOM.

8. Existing Client Component state is preserved whenever possible.
   Unchanged components are not re-rendered or recreated.


Initial Load:
    Server Components → RSC Payload → HTML → Browser

Subsequent Updates:
    Server Components → New RSC Payload → React Reconciliation → DOM Updates

    No full page reload occurs.
    No complete HTML regeneration in the browser.
    Only the changed Server Component output is sent and merged into the existing UI.

*/

// -----------------------------------------------------

/*  RSC rendering strategies

    1.  Static
    2.  Dynamic
    3.  Streaming


1. Static Rendering
   - pages are Rendered at build time and stored on server as static pages.
   - Served from cache for every request.

2. Dynamic Rendering
   - Rendered on each request.
   - Generates fresh content in real time.
   - Next.js auto switch to dynamic rendering for entire route
     when detect "dynamic function" or features like
        cookie(), headers(), connection(), draftMode(), searchParams prop, after()

3. Streaming
   - UI is rendered and sent in chunks.
   - Content appears progressively as it becomes available.

*/

// -------------------------------------------------------


/* generateStaticParams()

    generateStaticParams() is a Next.js App Router function used to 
    statically generate dynamic routes at build time.

    for dynamic routes like.....        app/products/[id]/page.tsx

    Next.js doesn't know which id values should be pre-rendered. 
    generateStaticParams() provides that list.
*/

export async function generateStaticParams() {
  const res = await fetch("https://api.example.com/products")
  const products = await res.json();

  return products.map((product) => ({
    id: product.id.toString(),
  }));
}


export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <h1>Product {id}</h1>;
}


/* At build Time ( npm run build ).

        1. Next.js calls generateStaticParams().
        2. The function returns a list of route parameters.
        3. Next.js generates HTML and RSC Payloads for each of these route parameters.
        4. The generated pages are stored as a part of server file system. and served statically.


        if generateStaticParams() returns

        [
            { id: "1" },
            { id: "2" }
        ]

        next will pre-render for

        /products/1
        /products/2
*/

export const dynamicParams = true;

/* dynamicParams

    dynamicParams controls what happens when a user requests a dynamic route parameter 
    that was not returned by generateStaticParams().

    export const dynamicParams = true;   // default

    /products/1
    /products/2     ... they are pre-rendered by generateStaticParams()

    but for .. /products/3

    Next.js will:

        Generate the page on demand.
        Serve it to the user.
        Cache it if eligible.


    export const dynamicParams = false;

        Now only the params returned by generateStaticParams() are valid.

        /products/3
        /products/4     ... result in 404 Not Found
*/


// -----------------------------------------------------------


/*  Streaming

        Streaming allows the server to send parts of a page to the browser as soon as they are ready, 
        instead of waiting for the entire page to finish rendering.

        This improves perceived performance by showing available content immediately 
        while slower parts continue loading.

        Streaming achive through Suspense boundery.

*/

/* Partial Pre-rendering ( PPR )

  static rendering + streaming.

    Static Rendering ( only the static parts of a page are prerendered at build time ). 
              +
    Streaming ( Dynamic content generated at requst time with Suspense boundry ).

*/

export default function Page() {
  return (
    <>
      <Header />  {/* Static */}

      <Suspense fallback={<Loading />}>
        <Analytics />
      </Suspense>
    </>
  );
}

/* 

*/

// -----------------------------------------------------





