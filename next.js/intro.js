/* eslint-disable @typescript-eslint/no-unused-vars */


/* Next.js

    Next.js is a React framework that provides production-ready features 
    such as: 
    routing, server-side rendering, static site generation, API handling, and performance optimization 
    allowing developers to build scalable full-stack web applications efficiently.
*/

// ---------------------------------------------------------

/* Core Features of Next.js

    1. File-Based Routing (App Router)
            Create routes using folders/files. ( no need of react router )

    2. Server-Side Rendering (SSR)
            Pages are rendered on the server for every request.
                Benefits:
                    Better SEO
                    Faster first contentful paint (first paint in react is empty screen)
                
    3. Static Site Generation (SSG)
            Some Pages we can generate at build time.
                Benefits:
                    Extremely fast, 
                    great for static side where content is not chaged frequently like blog website.

    4. Incremental Static Regeneration (ISR)
            Benefits:
                Updates static pages without re-building the entire app.
                it Combines speed of SSG with dynamic updates

    5. API Routes / Full-Stack Support
            We can create backend endpoints inside the same project.

    6. Built-in Optimization

            Image Optimization Using <Image />
                Benefits:
                    Lazy loading
                    Responsive images
                    Smaller image sizes
            
            Font Optimization
                Automatic font loading optimization

    7. Automatic Code Splitting
            Only necessary JavaScript is loaded per page.
                Benefits:   
                    Faster performance
                    Reduced bundle size
*/

// ---------------------------------------------------------

/* Rendering...

    Rendering is process of converting component code into visible UI on the screen.

    Why rendering exists?

        When user opens:  /products,  Browser needs HTML

    Where does HTML get created?

        Possible answers:

            Browser creates it.        ->   CSR (Client Side Rendering)
            Server creates it.         ->   SSR (Server Side Rendering)
            Build time creates it      ->   SSG (Static Site Generation)
            Mix of all

    These is rendering strategy.
*/

// ---------------------------------------------------------

/* Hydration 

    Hydration is attaching functionality on client side by react,
    to already generated html pages on server.

    when server geneated html and send it to browser, 
    it also attach js refernce to it( js specific to that page.)
    UI display instantly, browser downlod js and interactivity happens.

*/


/*  Hydration needs for client component only

        "use client."

        Even client components HTML is also generated on server.

        Client components are pre-rendered on the server and then hydrated in the browser.

        Pre-rendered = HTML is generated on the server before the browser runs any JavaScript.

        Why Next.js does this

        Because it gives:

        Faster First Paint (server HTML)
        SEO support

*/

// -----------------------------------------------------------

/* 1.CSR (Client Side Rendering):

        Browser creates pages after JavaScript loads.( typical react )

        Typical react flow:

            Browser -> empty HTML -> download js -> React runs -> render UI

        Advantages:

            Interactive
            Good for dashboards
            Good for user-specific pages

        Disadvantages:

            SEO weaker.
            Initial load slower.

        Use CSR for highly interactive pages where SEO is not important. like
            Dashboard apps, Chat apps, Notifications, User profile


    2.SSR (Server Side Rendering):

        Server creates HTML on every request and sent to browser.
        Browser displays UI instantly. -> js bundle download and -> then Hydration (react's interacitvity) happens.

        typical flow: 
            Request -> Server creates HTML -> HTML sent -> Browser display UI -> js bundele is download -> hydration 

        Benefits:
            Faster first load, SEO friendly, Secure.

        Use SSR for Product pages, SEO pages.


    3.SSG (Static Site Generation):

        pages are Generated once during build time ( next build / npm run build) and 
        stored on server file system as static file and serve instantly.
        so there is no server work at request time in production.
            
        In production this file served by node.js server(next.js server) or cdn like(vercel, cloudflare)

        perfect for:
            Privacy policy, About page, Documentation.

        why SSG is fast?
            because HTML already exists before request.


    4.ISR (Incremental Static Regeneration):

        Static pages become outdated so ISR solves this.

        export const revalidate = 60;

        build -> static page generated -> users use page -> 60sec passes -> background updates

        Use for:    
            Frequently updated content.
*/

// ------------------------------------------------------

// SSG example

export default async function Page() {
  const res = await fetch("https://api.com/posts");
  const posts = await res.json();

  return <div>{posts.length}</div>;
}

/*  fetch is cache by default in app router.
    so during build time

        1. api calls at build time
        2. generate html
        3. stored as static page.

    and user gets pre-built page.(SSG)
*/

// To make same code SSR

export default async function Page() {
  const res = await fetch("https://api.com/posts", {
    cache: 'no-store'
  });
  const posts = await res.json();

  return <div>{posts.length}</div>;
}

/*  Now:
        API called on every request
        page rendered every request
        becomes SSR
*/

export const dynamic = "force-dynamic";     // applied to whole page.


await fetch("https://api.com/posts", {
  cache: "no-store"
});                             // applied to specific fetch();


// ------------------------------------------------------

// ISR example
export const revalidate = 60;   // Rebuild page every 60 seconds

async function getProducts() {
  const res = await fetch("https://dummyjson.com/products");
  return res.json();
}

export default async function Page() {
  const data = await getProducts();
  return (
    <div>
      {data.products.map((p) => (
        <p key={p.id}>{p.title}</p>
      ))}
    </div>
  );
}

// 


const response = await fetch("https://api.example.com/users",
  {
    next: {
      revalidate: 60
    }
  }
)       // applied to specific route.

// ----------------------------------------------------------

/*  fetch()  -> Next.js understands caching
    axios()  -> Next.js treats as normal function

    There is no caching in development mode.
*/

// ----------------------------------------------------------


/*  drawback of ssr

        SSR means the server generates HTML for every request 
        before sending it to the browser.

        1.  Higher Server Load

                with thousands of users, the server does much more work compared to static pages.

                In Server-Side Rendering, the server must complete all required operations—such as 
                database queries, API calls, and data processing
                before generating the final HTML.

                The browser receives the HTML only after these operations finish. 

                As a result, 

                slow database queries or external API calls 
                can increase the server response time and delay the page being sent to the browser

        
        2.     we need to wait for js to load on browser before hydration begins.

        3.     After hydration UI become interactive.



        This is called 'all-or-nothing' waterfall effect,
        especially when some parts of our app is slower than others

        for tackle this issue  react 18 introduce <Suspense></Suspense> component.
        we wrap slow component in <Suspense fallback={Spinner}> <mainComponent/> </Suspense>
        and other component do not wait for that they start rendering.

        and rendered component gets hydreated as well they become interactive.

        lazy load MainComponent

        const MainComponent = React.lazy(()=>import ('./MainComponent.js'));

        This is called selective hydration..

        // ----------------------------------

        Browser Request
            ↓
        Server receives request
            ↓
        Fetch data from DB/API
            ↓
        Generate HTML
            ↓
        Send HTML to browser 

        if,
        
        DB Query = 3 seconds

        then the browser waits roughly: 3sec + rendering time before receiving html.


        Modern Next.js reduces this problem with:

            Streaming
            Suspense
            Caching
            Revalidation
            Partial rendering
   

*/
// -----------------------------------------------


/*  RSC => React Server Component.

        React Server Components executed entirely on the server, 
        and only their rendered output( RSC Payload ) is sent to the client. 

        RSC Payload (a serialized representation of the component tree).
        The browser receives it and
        React Runtime in browser uses it to reconcile/update the UI.
         
    Every component in next js is server component by default.

   
    Advantages:

        can directly access db, file, api's, 
        improves security, 
        zero-bundle size, 
        better seo.

    Disadvantages:

        can't interact with browser api or handle user interaction.
 

    RSC can be combination of server component and client component.

    server components needs no hydrations



*/

"use client"

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  )
}

export default function Page() {
  return (
    <>
      <h1>Dashboard</h1>
      <Counter />
    </>
  )
}




// ------------------------------


/*  Modern Rule of Thumb

    1.  Use Server Components when:

            Fetching data
            Reading from DB
            Rendering UI

            const users = await User.find();

    2.  Use Server Actions when:

            Form submissions
            Create/Update/Delete UI for your own next.js app 

            <form action={createUser}>

    3.  Use Route Handlers when:

            Fetch data in client componet
            Need a public API
            Mobile app access
            Webhooks
            Third-party integrations
            Custom HTTP endpoints

            /api/users

*/   
