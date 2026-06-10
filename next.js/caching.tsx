/*  Caching...

    Caching is a technique for storing the result of data fetching and other computations, 
    so that future requests for the same data can be served faster, 
    without doing the work again.

    By default next.js cache as much as possible to improve performance and reduce cost.
    means routes are statically rendered and data request are caches.

    caching happens in production mode only.
    There is no caching in development mode.

    
    Different Layers of cache :

        Request may be satisfied before reaching our db or api, 
        depending on which cache layer hits.


            User Request
                │
                ▼
            ┌──────────────────┐
            │   Router Cache   |   used for Navigation Optimization
            |  ( client side ) │            
            └──────────────────┘
                │ MISS
                ▼
            ┌──────────────────┐
            │ Full Route Cache │   used for Rendering Optimization
            └──────────────────┘
                │ MISS
                ▼
            ┌──────────────────┐
            │ Data Cache       │    used for Fetch and DB query Optimization
            └──────────────────┘
                │ MISS
                ▼
            ┌──────────────────┐
            │ Request          │    prevent duplicate request in single rendering tree
            │ Memoization      │    
            └──────────────────┘
                │ MISS
                ▼
            ┌──────────────────┐
            │ DB / External API│ 
            └──────────────────┘

        #   "When a request comes in, Next.js 
                
                first tries the client-side Router Cache, 
                then the server-side Full Route Cache, 
                then the Data Cache. 
                During rendering, Request Memoization prevents duplicate fetches. 
                If all caches miss, the request reaches the actual database or external API."


        # Next.js Caching Layers (Interview Answer)

            Next.js uses multiple caching layers to reduce server work and improve performance. 
            Think of them in the following order:

            ### 1. Router Cache (Client-side)

                The Router Cache lives in the browser and stores previously visited route segments, 
                such as layouts, loading states, and React Server Component (RSC) payloads.

                When a user navigates to a route, Next.js first checks the Router Cache.

                If the required route segment is already cached:

                * No new server request is needed.
                * Navigation feels instant.
                * Cached layouts and loading states can be reused.

---

            ### 2. Full Route Cache (Server-side)

                The Full Route Cache stores the fully rendered route output:

                    * HTML +  React Server Component (RSC) Payload

                This cache is typically generated:

                    * At build time for static routes.
                    * After deployment through revalidation.
                
                These files are commonly found under: 
                    
                    .next/server/app

                When a Full Route Cache hit occurs:

                    * No React Server Rendering.
                    * No Database Query.
                    * No External API Call.

                    The server simply returns the cached rendered output.

                **Important:**

                    * Dynamic routes (`user/[id]`) are not cached here by default.
                    * Cache become ineligible if they use dynamic rendering features such as `cookies()`, `headers()`, or `cache: 'no-store'`.

---

            ### 3. Data Cache (Server-side)

                The Data Cache stores cached data-fetching results.

                Examples:

                    - fetch(url, { cache: 'force-cache' })
                    - fetch(url, { next: { revalidate: 3600 } })
                    - unstable_cache(...)
                    - 'use cache'

                These cache entries are commonly visible under:

                    .next/cache/fetch-cach 


                When a Data Cache hit occurs:

                    * No Database Query.
                    * No External API Call.
                    * No re-execution of the cached function.

                The page may still render, but it renders using cached data.

                **Important:**

                    Database queries are NOT cached automatically. 
                    They must be wrapped with caching mechanisms such as `unstable_cache()` or `'use cache'`.

---

            ### 4. Request Memoization

                Request Memoization is a React optimization that deduplicates identical requests during a single render pass.

                Example:

                    If three components call the same `fetch()` during one request, 
                    React executes it once and shares the result.

                Benefits:

                    * Prevents duplicate fetches.
                    * Works only during the current request.
                    * Is not a persistent cache.

---

            ### 5. Actual Data Source

                If all cache layers miss, the request finally reaches the real data source:

                * Database
                * External API
                * File System
                * Backend Service

                    This is the most expensive path.


    
*/

// ---------------------------------------------------------


type User = {
  id: number;
  name: string;
  email: string;
};

const getUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return await res.json();
};

export default async function FetchUsers() {
  const users: User[] = await getUsers();
  return ();
};

//  for entire route at the top, we write
export const dynamic = "force-static";

//  OR

// for perticular fetch.  fetch is Data Cache. it caches http response.
await fetch(url, {
  cache: "force-cache",
});

     
// ----------------------------------------------------------

// re-validation eg.

const getUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users",
    {
      next: {
        revalidate: 60, // Re-generate page every 60 seconds
      },
    }
  );
};

//              OR

export const revalidate = 60;

/*  1.  First request happened at build time and caches generated HTML + RSC Payload.
    2.  If next requests within 60 sec, cached output is served. No re-rendering occurs.
    3.  If next request after 60 sec, it triggers re-validation. new HTML + RSC payload is generated and cached.

    it is called,   
        Time-based re-validation.
*/

// ----------------------------------------------------------------


/*  # On-Demand Revalidation 
    
        On-Demand Revalidation allows developers to in-validate cached content immediately when data changes 
        instead of waiting for a time-based revalidation period. 
        
        Next.js provides: 

            - revalidatePath() 
            - revalidateTag() 

        Examples: 
        
            revalidatePath('/products') 
            revalidateTag('products') 
            
        Time-based Revalidation: 
            Automatically refreshes cache after a configured duration.

        On-Demand Revalidation: 
            Refreshes cache immediately when triggered by application logic.

        Common use case is for mutation of data. 
        
            - Create  
            - Update  
            - Delete

        After the mutation succeeds, invalidate the affected cache so users immediately see fresh data.

*/

// ---------------------------------------------------------------

/*  Router Cache (client side)

    It's is a in-memory cache on client-side that stores  RSC payloads.
    It helps avoid unnecessary requests and makes navigation faster.

    It only caches RSC Payload only and not caches HTML or DB result or Fetch response
   

    1. Navigation between pages

        When you visit a page and then navigate away, 
        Next.js stores that page's RSC payload in the router cache.

        /dashboard → /profile → back to /dashboard

        /dashboard is restored from the router cache, so no new server request is needed (unless the cache is invalidated).

    
    2. Browser Back and Forward buttons

        The cache preserves previously visited routes.

    3. Prefetching with <Link>

        By default, links in the viewport are prefetched.

        <Link href="/about">About</Link>

        When the user hovers or the link becomes visible, Next.js fetches the RSC payload and stores it in the router cache. Clicking the link feels instant

    
    4. Layout reuse and loading state(loading.tsx) also cached

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

    

    5. invalidation

        The router cache is cleared when:

            The page is fully reloaded (F5).
            router.refresh() is called.
            revalidatePath() or revalidateTag() invalidates cached data.
            Cookies are changed (login/logout scenarios).
            Cache lifetime expires. 
                (static page 5min), 
                ( dynamic page not cache by default )
 
*/

// --------------------------------------------------------

/* Full Route Cache and Data Cache are independent.

        Disabling the Full Route Cache means the page is rendered on every request.

        However, data may still comes from the Data Cache.

        Disable Full Route Cache:
            - export const dynamic = 'force-dynamic'

        To disable the Data Cache, use:
            - fetch(url, { cache: 'no-store' })
            - fetch(url, { next: { revalidate: 0 } })

    
        Disable database queries, avoid wrapping them with
            unstable_cache() or 'use cache'.

        When both caches are disabled, every request reaches
        the actual database or external API.

*/

// --------------------------------------------------------


/* use cache

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

// Then re-validate when mutation( Create, Update, Delete )

revalidateTag("users");