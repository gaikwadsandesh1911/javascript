/*  Caching...

    Next.js improve performance of our application and reduce cost
    by caching rendering work and data request ( fetch () function )

    Routes are statically rendered and data request are Cached by default
    unless you opt out.

    caching happens in production mode only.
    There is no caching in development mode.


    **Important:**
        Cache become ineligible if they use dynamic rendering features such as `cookies()`, `headers()`.

    
*/

/*  as request travels from client to server we have four layers of caching.


        Browser
        │
        ▼
        1. Router Cache (Client)
        │
        ├── Cache Hit ✅ → Use cached RSC Payload (No server request)
        │
        └── Cache Miss ❌
                │
                ▼
                Request sent to server.

        Now on the server.

        2. Full Route Cache
        │
        ├── Cache Hit ✅
        │      │
        │      ▼
        │   Return HTML + RSC Payload
        │
        └── Cache Miss ❌
                │
                ▼
        3. Render the route
                │
                ▼
        4. During rendering:
            ├── Request Memoization
            │      (deduplicates identical fetch() calls in this render)
            │
            ├── Data Cache
            │      (checks cached fetch() responses)
            │
            └── If Data Cache misses,
                    fetches from API/Database
   
*/


/* 
    1. Router Cache ( client )  :

        The first cache checked is the Router Cache in the browser.

            - It stores the RSC payload of previously visited or prefetched routes.
            - If the route exists in the Router Cache, Next.js can render the page without contacting the server.
            - If it's a cache miss, the browser sends a request to the server.

            Browser
            │
            ▼
            Router Cache
            │
            ├── Hit → No server request
            └── Miss → Request sent to server


    2. Full Route Cache (Server) :

        Once the request reaches the server, Next.js checks the Full Route Cache.

            - Next.js stores the rendered HTML and RSC payload for statically rendered routes. (SSG) and ISR.
            - If the route is found here, Next.js returns the cached page immediately.
            - No rendering or data fetching occurs.

            Server
            │
            ▼
            Full Route Cache
            │
            ├── Hit → Return HTML + RSC Payload
            └── Miss → Render the route


    3. Data Cache (During Rendering) :

        If any fetch() calls on component, it first check the Data Cache.

            - It stores cached fetch() responses across requests.
            - If a cached response exists, Next.js uses it.
                Otherwise, it performs the network request and stores the response.

            fetch()
            │
            ▼
            Data Cache
            │
            ├── Hit → Return result of fetch()
            └── Miss → Fetch from API


    4. Request Memoization (During Rendering) :

        While rendering the route, React performs Request Memoization.

            - If the same fetch() is called multiple times during a single server render, only one network request is made.
            - The result is reused for the remainder of that render.
            - The memoization is cleared once the request finishes.

            Render Request
            │
            ▼
            fetch("/api/products")
            fetch("/api/products")
                    │
                    ▼
            Only one network request

*/

// ------------------------------------------------------------


//  by default Next.js decides whether the route to be static or dynamic.

        export const dynamic = "force-static";
        /*  
            -   Force this route to be statically rendered.
            -   The page is generated at build time and stores HTML + RSC Payoad
                    and served from the Full Route Cache.
        */

        export const dynamic = "force-dynamic";
        /* 
            -   Force this route to be dynamically rendered.
            -   The page is rendered on every request and bypasses the Full Route Cache.
        */

        export const revalidate = 60;
        /* 
            -   This enables Incremental Static Regeneration (ISR) for the entire route
            -   Initially Generate this page statically ( at build time ), 
                    but regenerate it in the background at most once every 60 seconds."
        */

// ---------------------------------------------------------

        await fetch(url, {
            cache: "force-cache",
        });
        // "Store this fetch() response in the Data Cache and reuse it for future requests."


        await fetch(url, {
            cache: "no-store",
        });
        // "Never cache this response. Always fetch fresh data."


        await fetch(url, {
            next: {
                revalidate: 60,
            },
        });
        /* 
            "Cache this fetch() response in the Data Cache, 
            but consider it stale after 60 seconds. 
            The next request after 60 seconds will trigger a background revalidation and make new fetch call."
        */

// ---------------------------------------------------------


/* use cache


    ***
        The Data Cache only caches fetch() responses.

        database queries are not cached by default, we use
        Next.js "use cache" to cache db queries

        "use cache" is a Next.js cache directive that tells Next.js 
        to cache the result of a Server Component or async function.

*/

//  cache whole server component
export default async function Page() {
  "use cache";

  const users = await prisma.user.findMany();

  return <UserList users={users} />;
}



// cache function result
async function getUsers() {
  "use cache";

  return prisma.user.findMany();
}

// ---------------------------------

// By default, cached entries are long-lived. You can control them:

import { cacheLife } from "next/cache";

async function getUsers() {
  "use cache";

  cacheLife("minutes");

  return prisma.user.findMany();
}

// OR

import { cacheTag } from "next/cache";

async function getUsers() {
  "use cache";

  cacheTag("users");

  return prisma.user.findMany();
}

// Then re-validate after mutation( Create, Update, Delete )

revalidateTag("users");



// ----------------------------------------------------------

/*  Router Cache (client side)

    It's a in-memory cache on client-side that stores RSC payloads.
    It helps avoid unnecessary requests and makes navigation faster.

    1. Navigation between pages.

        When you visit a page and then navigate away, 
        Next.js stores that page's RSC payload in the router cache.

        /dashboard → /profile → back to /dashboard

        /dashboard is restored from the router cache, so no new server request is needed (unless the cache is invalidated).

    
    2. Browser Back and Forward buttons.

        The cache preserves previously visited routes.

    3. Pre-fetching with <Link>

        By default, links in the viewport are prefetched.

        <Link href="/about">About</Link>

        When the user hovers or the link becomes visible, Next.js fetches the RSC payload and stores it in the router cache. Clicking the link feels instant

    
    4. Layout reuse and loading state(loading.tsx) also cached.

        Shared layouts remain cached across navigations.

        app
        ├── layout.js
        ├── dashboard
        │   ├── layout.js
        │   ├── analytics/page.js
        │   └── settings/page.js

        /dashboard/analytics → /dashboard/settings

        Root layout and dashboard/layout.js component stays cached and isn't re-rendered.
        only the page segment is fetched.( partial rendering )

    

    5. Invalidation

        The router cache is cleared when:

            The page is fully reloaded (F5).
            router.refresh() is called.
            revalidatePath() or revalidateTag() invalidates cached data.
            Cookies are changed (login/logout scenarios).
            Cache lifetime expires. 
                
 
*/

// --------------------------------------------------------


/* Full Route Cache and Data Cache are independent.

        Disabling the Full Route Cache means the page is rendered on every request.

        However, data may still comes from the Data Cache.

        To disable Full Route Cache:
            - export const dynamic = 'force-dynamic'

        To disable the Data Cache, use:
            - fetch(url, { cache: 'no-store' })
            - fetch(url, { next: { revalidate: 0 } })

    
        To disable database queries, avoid wrapping them with 'use cache'.

        When both caches are disabled, every request reaches
        the actual database or external API.

*/

// --------------------------------------------------------


