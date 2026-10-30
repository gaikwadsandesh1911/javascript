/* Rendering

    Rendering is the process of transforming React components (written in JSX) into something the browser can display.
    Browser does not understand jsx by default, it need to be transformed before browser runs it.

    The tricky part of building performant application is figuring out when and where
    this transformation should happen.

    
    In Next.js, rendering refers to where and when the HTML is generated.


    ➡ Different Rendering Strategies:
    

    1.CSR (Client side Rendering):

        CSR means rendering or updating UI in the browser using JavaScript. 
        React state, event handlers, and client-side data fetching are common examples.

        CSR is useful for interactive dashboards and components that depend on browser APIs. 
        
        However, relying entirely on client-side fetching can delay the appearance of meaningful content.
    

    2.SSR (Server Side Rendering):

        SSR means generating HTML on the server in response to a request. 
        
        It is useful when the page needs fresh, request-specific data.

    
    3.SSG (Static Site Generation):

        SSG means generating a page during the build time. 
        
        The resulting page can be served efficiently without rebuilding its HTML for every request.

        It is useful for documentation, blogs, and pages with mostly stable content.

        - Flow

            1. you command,  npm run build / next build

            2. Next.js executes React Component and generate static HTML files and RSC payload.
                This files stored / deployed on server.

            3. When user request the page server simply serves these pre-generated HTML + RSC payload


    4.ISR (Incremental Static Regeneration):

        - statically generated pages data become outdated.

        - ISR allow statically generated content to be re-freshed after initial build,
          either after configured time or throudh on-demand re-validation.

*/


// ------------------------------------------------------

/* Drawbacks of Traditional SSR

SSR (Server-Side Rendering) generates HTML on the server and sent to browser.

1. Higher Server Load

    But server also has other tasks to perform like
    database queries or API calls 
    which increase response time; because HTML cannot be sent until all required data is available.

2. Hydration Waits for JavaScript.

    for client component html is pre-rendered on server
    The browser can display HTML immediately, but the page is not interactive until:
   - JavaScript is downloaded and executed.
   - Hydration completes

This introduces : All-or-Nothing Waterfall problem.

   A slow component can delay the entire page because 
   SSR waits for all components to finish rendering before sending HTML.


To overcome all this we have React Server Component (RSC) in next.js

*/
