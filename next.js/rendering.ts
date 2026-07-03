/* Rendering

    Rendering is process of transforming component code you write,
    into UI, that user see and interact with.

    The tricky part of building performant application is figuring out when and where
    this transformation should happen.


    ➡ Different Rendering Strategies:


    1.CSR (Client side Rendering):

        Typical React application is an example of CSR:
        
        - As user request, server sends minimal HTML mostly empty root element and 
          js reference:
            
            <div id="root"></div>
            <script src="app.js"></script>

        - Browser initially renders empty element.

        - Then browser download js bundle and

        - Then react Render UI into root element.
    

    2.SSR (Server Side Rendering):

        - As user request, server fetches required data if any.
        
        - Then Server renders React component into HTML (jsx to html) and 
            and send ready-to-display HTML  and regarding JS to the browser
        
        - Browser displays UI instantly. ( button will be visible, clicking it would do nothing ).

        - Then browser download JS and React hydrate the html by attaching event handlers, 
            so it becomes interactive.

       

    3.SSG (Static Site Generation):

        - with SSG pages are rendered into HTML during build time 
            not when user request it. 

        - Flow

            1. you command,  npm run build / next build

            2. Next.js executes React Component and generate static HTML files and their associate assests.
                This files stored / deployed on server.

            3. When user request the page server or CDN simply serves these pre-generated HTML

            4. Browser display it immediately, download js, react hydrate the page
        
            

    4.ISR (Incremental Static Regeneration):


        - The pages are pre-rendered into HTML like SSG.

        - But those pages data become outdated.

        - Next.js can re-generate the HTML in the background
            after specified interval, without re-building entire application.

        - Once re-generation succeeds, user receives the updated HTML.
*/

/* 
    CSR     =>      Render in the browser.

    SSR     =>      Render on server per request.
    
    SSG     =>      Render on server at build time.

    ISR     =>      Render on Server at build time + background regeneration


            Rendering = where and when HTML is generated.
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
