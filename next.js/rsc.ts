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

/*  server rendering strategies

    1.  Static
    2.  Dynamic
    3.  Streaming

    Server Rendering Strategies...

1. Static Rendering
   - Rendered at build time.
   - Served from cache for every request.

2. Dynamic Rendering
   - Rendered on each request.
   - Generates fresh content in real time.
   - Next.js auto switch to dynamic rendering for entire route
     when detect "dynamic function" or features
        -cookie(), headers(), connection(), draftMode(), searchParams prop, after()

    to force dynamic we write at top of page
        export const dynamic = "force-dynamic"

3. Streaming
   - UI is rendered and sent in chunks.
   - Content appears progressively as it becomes available.

*/

// -------------------------------------------------------


/*  prefetching

Prefetching is the process of loading resources before the user actually requests them.

In Next.js, prefetching helps make navigation feel instant 
by fetching route data in the background while the user is viewing the current page.

How it works:

Prefetching for Static Routes

    1. In production, Next.js automatically prefetches static routes when a <Link> enters the viewport.
    2. Next.js begins fetching the target route in the background.
    3. The route's RSC Payload, JavaScript bundles, and other required assets are downloaded and stored in the Router Cache.
    4. When the user clicks the link, Next.js uses the prefetched resources instead of making a new request.
    5. As a result, navigation feels nearly instant.



Prefetching for Dynamic Routes

    Dynamic routes are handled differently because their content may change on every request.

    1. When a <Link> to a dynamic route enters the viewport, Next.js may prefetch only the shared layouts and loading states.
    2. The actual page content is not prefetched because it must be generated at request time.
    3. When the user navigates to the route, Next.js sends a request to the server.
    4. React renders the required Server Components and generates a fresh RSC Payload.
    5. The browser receives the payload and updates the UI through reconciliation.

    As a result, dynamic routes benefit from partial prefetching, while the page-specific data is fetched during navigation.
*/

// ---------------------------------------------------------


/* generateStaticParams()

    generateStaticParams() is a Next.js App Router function used to 
    statically generate dynamic routes at build time.

    for dynamic routes like.....        app/products/[id]/page.tsx

    Next.js doesn't know which id values should be pre-rendered. 
    generateStaticParams() provides that list.
*/

export async function generateStaticParams() {
  const products = await fetch("https://api.example.com/products")
    .then((res) => res.json());

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

/* 
    Build Time

        1. Next.js calls generateStaticParams().
        2. The function returns a list of route parameters.
        3. Next.js generates HTML and RSC Payloads for each route.
        4. The generated pages are stored and served statically.


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


        Streaming is a rendering strategy that allows the server to send parts of a page to the browser as soon as they are ready, 
        instead of waiting for the entire page to finish rendering.

        This improves perceived performance by showing available content immediately 
        while slower parts continue loading.

*/

import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <Header />

      <Suspense fallback={<PostsSkeleton />}>
        <Posts />
      </Suspense>
    </>
  );

}

// -----------------------------------------------------



