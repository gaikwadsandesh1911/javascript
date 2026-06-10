
/* Next.js

    Next.js is a React framework that provides production-ready features 
    such as: 
        routing, 
        server-side rendering, 
        static site generation, 
        API handling, and 
        performance optimization 
    allowing developers to build scalable full-stack web applications efficiently.
*/

// ---------------------------------------------------------

/* Core Features of Next.js

    1. File-Based Routing (App Router)
            Create routes using folders/files. ( no need of react router )

    2. Server-Side Rendering (SSR)
            Pages are rendered on the server.
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

    When user open  webpages, Browser needs HTML

    Where does HTML get created?

        Possible answers are:

            Browser creates it.        ->   CSR (Client Side Rendering)
            Server creates it.         ->   SSR (Server Side Rendering)
            Build time creates it      ->   SSG (Static Site Generation)
            Mix of all                 ->   Next.js allow us to do mix of all.

    These are rendering strategies.



1.CSR (Client Side Rendering):

        Browser creates pages after JavaScript loads.( typical react )

        Typical react flow:
            Browser -> empty HTML -> download js -> React runs -> render UI


        *** But in Next.js.

            - The Client Component is rendered on the server to generate the initial HTML.
            - The browser receives and displays the HTML.
            - Then Js download and Hydration Happens.


    2.SSR (Server Side Rendering):

        Server creates HTML on every request and sent to browser.
        Browser displays UI instantly. -> js bundle download and -> then Hydration (interacitvity) happens.

        typical flow: 
            Request -> Server creates HTML -> HTML sent -> Browser display UI -> js bundele is download -> hydration 

        Benefits:
            Faster first load, SEO friendly, Secure.


    3.SSG (Static Site Generation):

        pages are Generated once during build time ( next build / npm run build) and 
        stored on server file system as static file and serve instantly.
        so there is no server work at request time in production.
            

    4.ISR (Incremental Static Regeneration):

        Static pages build during build time become outdated so ISR solves this.

        export const revalidate = 60;   // at top of the page.

        build -> static page generated -> users use page -> 60sec passes -> background updates

*/

// ------------------------------------------------------

/* Drawbacks of Traditional SSR

SSR (Server-Side Rendering) generates HTML on the server and sent to browser.

1. Higher Server Load

    But server also has other tasks to perform like
    database queries or API calls 
    which increase response time; because HTML cannot be sent until all required data is available.

2. Hydration Waits for JavaScript.

   The browser can display HTML immediately, but the page is not interactive until:
   - JavaScript is downloaded and executed.
   - Hydration completes

This introduces : All-or-Nothing Waterfall problem.

   A slow component can delay the entire page because 
   SSR waits for all components to finish rendering before sending HTML.



React 18 introduced Suspense, Streaming, and Selective Hydration.

<Suspense fallback={<Spinner />}>
  <SlowComponent />
</Suspense>

Benefits:

- Ready content is streamed immediately.
- Slow components load later.
- Interactive parts can hydrate independently.
- Users see and interact with content sooner.

*/

// ------------------------------------------------------

/*  Modern Next.js further improves SSR with:

    - React Server Components (RSC)
    - Caching
    - Partial Rendering
    - Streaming
    - Suspense
    - Revalidation

*/

// ----------------------------------------------------------


/*  Modern Rule of Thumb

    1.  Use React Server Components(RSC) when:

            Fetching data
            Reading from DB
            Rendering UI


    2.  Use Server Actions when:

            Form submissions
            Create/Update/Delete UI for your own next.js app 

            <form action={createUser}>

    3.  Use Route Handlers when:

            Create API endpoints
            Fetch data in client componet.
            Mobile app access needs api, it cant use our server component
            Webhooks
            Third-party integrations

*/   

// ----------------------------------------------------------

