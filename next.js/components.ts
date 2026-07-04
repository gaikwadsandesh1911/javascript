  /* Components

    We have two types of compenents in Next.js

      1.  React Server Component (RSC) ( every component by default ).

      2.  Client Componet ( until we explicitly defined using "use client" ).

 */

// -----------------------------------------------------

/*  Client Component

      - The Client Component  is pre-rendered on the server to generate the initial HTML.
          
          Then server sends ready-to-display HTML and regarding JS to browser
              
              what server sent :
                  
                  <button>count: 0</button>

      - The browser receives it and displays the HTML immediately(but no interactive, button shows but no click nothing happens ).
      
      - Then Js download and then React Hydrate it(interactivity) Happens.

      - Client component runs in browser after hydration.
          - can fetch data via api or recieves as props
          - can use hooks and event handlers
 */

// -----------------------------------------------------

/*  React Server Component (RSC)

      - (RSC) represent a new architecture for building React applications.

      -   They introduce a dual-component model consisting of :

              Server Components.
              Client Components.

      - RSC runs on server

      - can fetch data, access databse, read file etc.

      - can not use browser-only features like hooks and event handlers.

      - In RSC  js not sent to browser. but rendered HTML + RSC payload is sent.
        There is no hydration for Server component.

        - RSC payload special data format (called the React Flight protocol) that tells the browser how to build the React component tree.
          React uses RSC payload to reconstruct the component tree

      - As we know RSC is dual component mode. client and server.
          if server render client component as well then renderd HTML + js for client component is sent to browser.


      - By separating server-side and client-side responsibilities, 
          RSC helps reduce JavaScript bundle sent to the browser, 
          improve performance, and create more efficient React applications.
  
*/

// Dual component model.

// Server Component.

export default async function Page() {
  const products = await getProducts();

    // return client component from server and send data as props
    //   only js regarding client component is sent to browser
  return <ProductList products={products} />;
}

// Client Component

"use client";
export default function ProductList({ products }) {
  const [filter, setFilter] = useState([]);
}


// -----------------------------------------------------

/*  RSC rendering strategies :

      1.  Static
      2.  Dynamic
      3.  Streaming
      4.  Partial Pre-rendering (PPR)

*/



// -----------------------------------------------------


/*  1. Static Rendering (SSG)

   - HTML is generated at build time.
    
      1. npm run build 
      2. npm start        // production server. 

   - Best for content that changes infrequently.
      
      Examples:
        Blog posts
        Documentation
        Marketing pages

*/

// app/about/page.tsx

    export default function AboutPage() {
      return(
        <>
          <h1>About page { new Date().toLocaleTimeString()}</h1>
        </h1>
      )
    }


  /* 
      Every time we navigate to.   /about

      we see the same content because the page is statically rendered.
      
      During the build (npm run build), Next.js pre-renders the page and generates:

          - HTML for the initial page load.
          - A React Server Component (RSC) payload

        - inside

                .next / server / app /  about

          we have

                about.html
                about.rsc     

  */


// -----------------------------------------------------


/*  2. Dynamic Rendering (SSR)

      - HTML is generated on every request.

    - Next.js auto switch to dynamic rendering for entire route
        when detect "dynamic function" or features like

          cookie(), 
          headers(), 
          connection(), 
          draftMode(), 
          after()
          searchParams prop, 

      Best for personalized or frequently changing content.
          Dashboard
          User profile

*/


// app/product/[id]/page.tsx.

// /product/123

export default async function ProductPage({params}: {params: Promise<{ id: string }>}) {
  const { id } = await params;

  const product = await getProduct(id);   // fetching from db.

  return <h1>{product.name}</h1>;
}

/* 
    Based on the route parameter, for each request renders fresh HTML and an RSC payload, 
    and sends them to the client
*/



// eg.2   we have cookies() function.

// app/dashboard/page.tsx

import { cookies } from "next/headers";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value ?? "light";

  return (
    <>
      <h1> Current theme: {theme} </h1>;
      <h1> About page:  { new Date().toLocaleTimeString() } </h1>
    </>
  ) 
};


// -----------------------------------------------------


/* generateStaticParams()

    generateStaticParams() is a function used with dynamic routes 
    to tell Next.js which route parameters should be statically generated at build time if we have dynamic route.

    for dynamic routes like.....        app/products/[id]/page.tsx

    Next.js doesn't know which id values should be pre-rendered. 
    generateStaticParams() provides that list.
*/

// app/products/[id]/page.tsx

export async function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
  ];
};


export default async function ProductPage({params,}: {params: Promise<{ id: string }>}) {
  const { id } = await params;
  return <h1>Product {id}</h1>;
}


/* At build Time ( npm run build )

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

      at build time.
*/

export const dynamicParams = true;      // default

/* dynamicParams

    dynamicParams controls what happens when a user requests a dynamic route parameter 
    that was not returned by generateStaticParams() function.

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


/* 3. Streaming

        Streaming means the server doesn't wait for the entire page to finish rendering. 
        Instead, it sends parts of the response to the browser as soon as they're ready..

        Streaming achive through Suspense boundery.

*/


export default function Page() {
  return (
    <>
      <Header />        // static rendering

      <Suspense fallback={<Loading />}>     // streaming
        <Products />   // dynamic rendering
      </Suspense>
    </>
  );
}

/* 
    Suppose:

      Header renders in 50 ms
      Products fetches data and takes 2 seconds

    Without streaming:

      - Wait 2 seconds and then Send entire HTML


    With streaming:

      - 50 ms Send Header HTML

      - 2 seconds later Stream Products HTML
*/


// --------------------------------------------------


/* Partial Pre-rendering ( PPR )

  PPR is a Next.js feature that combines:

      Static rendering
      Dynamic rendering
      Streaming

      - Static Rendering ( only the static parts of a page are pre-rendered at build time ). 
             
      - Streaming ( Dynamic content generated at request time with Suspense boundry ).

*/







