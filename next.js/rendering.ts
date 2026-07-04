/* Rendering

    Rendering is the process of transforming React components (written in JSX) into something the browser can display.
    Browser does not understand jsx by default, it need to be transformed before browser runs it.

    The tricky part of building performant application is figuring out when and where
    this transformation should happen.

    In Next.js, rendering refers to where and when the HTML is generated.


    ➡ Different Rendering Strategies:


    1.CSR (Client side Rendering):

        Typical React application is an example of CSR:
        
        - As user request, server sends minimal HTML mostly empty root element and 
          js reference:
            
            <div id="root"></div>
            <script src="app.js"></script>

        - Browser initially renders empty root element.

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

| Rendering Type                        | Who generates the HTML? | When?                                                                |
| ------------------------------------- | ----------------------- | -------------------------------------------------------------------- |
| Client-Side Rendering (CSR)           | Browser (client)        | After JavaScript loads                                               |
| Server-Side Rendering (SSR)           | Server                  | On every request                                                     |
| Static Site Generation (SSG)          | Server (at build time)  | During the build process                                             |
| Incremental Static Regeneration (ISR) | Server                  | Initially at build time, then regenerated after deployment as needed |
 
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

*/

// React Server Component overcome all of this drawback.
