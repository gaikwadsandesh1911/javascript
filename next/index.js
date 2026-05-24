/*
What is Next.js?

Next.js is a React framework used to build:

Frontend
Backend APIs
Full-stack apps
SEO-friendly applications
Production-ready applications

React itself mainly gives UI building capability.

Next.js adds:

Routing
Server rendering
APIs 
Optimization
Authentication support
Image optimization
Full-stack capabilities

*/

/*  
Why was Next.js created?

Problems in React:

Manual routing
Poor SEO with client-only rendering
Data fetching complexity

*/

/* 
Create a Next.js app

npx create-next-app@latest

√ TypeScript? Yes
√ ESLint? Yes
√ App Router? Yes
√ Turbopack? Yes

npm run dev

*/

/* 

Understand project structure

my-app/

app/
public/
node_modules/

next.config.ts
package.json



app/
   layout.tsx
   page.tsx

   This is App Router.
   app is most important folder


routes

app/
   about/page.tsx
   contact/page.tsx
   services/page.tsx

    /about
    /contact
    /services



Nested routes


app/

    products/
        page.tsx

    products/mobile/
        page.tsx

    products/laptop/
        page.tsx


    /products

    /products/mobile

    /products/laptop


Dynamic routes

app/

    product/
        [id]/
            page.tsx

export default async function Product({ params }) {

    return (
        <div>
            Product: {params.id}
        </div>
    )
}

*/


/* 
Rendering

Rendering is the process of transforming your component code  into UI That user can see it and interact with.

The tricky part in next.js to build performant application is figuring out when and where this transformation should happen.


When browser navigate to links

Browser needs HTML.

Question:

Where does HTML get created?

Possible answers:

	1.	Browser creates it
	2.	Server creates it
	3.	Build time creates it
	4.	Mix of all

That is rendering strategy.


2) CSR (Client Side Rendering)

Flow :

Browser
   ↓
empty HTML
   ↓
download JS
   ↓
React runs
   ↓
render UI

Browser creates page after JavaScript loads.


When would you prefer CSR?
Answer:

Highly interactive pages where SEO is not important.



3) SSR (Server Side Rendering)

Flow:

Request
   ↓
Server creates HTML
   ↓
HTML sent
   ↓
Browser displays page

Server creates Html first.

No need to use useEffect for data fetching directly call api endpoint on server component.



4) SSG (Static Site Generation)

Generated once during build. Best for where data is static. Like about page

npm run build
      ↓
HTML generated
      ↓
stored
      ↓
served instantly

No server work at request time.

Why is SSG fast?
Answer:
HTML already exists before request.



5) ISR (Incremental Static Regeneration)

Problem:

Static pages become outdated.

ISR solves this.

export const revalidate=60

Means : Rebuild page every 60 seconds

Flow :

build
 ↓
static page generated
 ↓
users use page
 ↓
60 sec passes
 ↓
background update

Use case :

News sites

Frequently updated content


6) Hydration

Server sends
<h1>Hello</h1>

Browser receives HTML.

Then React attaches events.

HTML
   +
JS behavior
   =
Interactive app

That process is called. Hydration.



7) React Server Components (Most Important)

This changed modern Next.js.

Everything in App Router is server component by default.  

Server components can:

✅ access database
✅ call backend directly
✅ fetch securely
✅ reduce bundle size

Advantages of Server Components?
Answer:
Smaller JS bundle, secure data fetching, improved performance.

Flow :

Request
   ↓
Server Components
   ↓
HTML generated
   ↓
Browser receives HTML
   ↓
Hydration
   ↓
Client Components become interactive


CSR renders in browser.
SSR renders on server

SSR per request.
SSG during build.

ISR updates static pages periodically.



Data fetching:

React:

Render page first then Fetch data

Next:

Fetch data.   Server component can be async as well. And then Render page


Next.js fetch() 
has caching behavior built in.

await fetch(url)

Next tracks:

	•	requests
	•	cache
	•	rendering strategy

4) Static rendering by default

same request.     Next.js may cache and optimize
    ↓
reuse results.      Good for performance.


6) Revalidation

Static data becomes stale.

export const revalidate=60            Refresh every 60 sec


 5) Dynamic rendering

Some pages should never cache. Like dashboard, notifications, live score

export const dynamic="force-dynamic".        // on top of the page.

Means : Render on every request


force-dynamic
Every request renders fresh.

revalidate
Uses cache and refreshes after interval.


7) Request-level fetch control

Instead of page-level:
You can control per request.

await fetch(url,{
   cache:"no-store"
}).               // always fresh


cache:"force-cache".   // use static 


Products → cache
Profile → no-store
Same page can mix strategies

const products=await fetch(
url,
{
 cache:"force-cache"
}
)

const profile=await fetch(
url,
{
 cache:"no-store"
}
)



8) Cache Tags
Very important in full-stack apps.

await fetch(url,{

next:{
 tags:["products"]
}

})


Later :

revalidateTag(
"products"
).    refresh only products data


Without tags clear everything, with cache tags clear specified only huge performance difference


9) revalidatePath()
Refresh route.


revalidatePath(
"/products"
)

Useful after:

	•	create
	•	update
	•	delete

"use server"
import { revalidatePath } from "next/cache"
export async function addProduct(){

      await db.insert()

      revalidatePath(
          "/products"
      )

}

revalidatePath()revalidateTag()
Path refreshes route.
Tag refreshes specific cached data.



10) Server Actions intro
This is where Next becomes full-stack. No separate backend required.

*/