
/*  Routing

      Next.js uses file-based routing,
      where folders  inside the app directory automatically become routes.
      but file name inside folder must be page.tsx or page.jsx


      app/
      ├─ page.tsx
      ├─ about/
      │   └─ page.tsx


      /  
      /about


      app/
      ├─ page.tsx
      ├─ components/
      │   └─ Navbar.tsx


      /components can not become route. it has no page.tsx


*/

// --------------------------------------

/*  Nested route

    app/
    └─ dashboard/
        ├─ page.tsx
        └─ settings/
            └─ page.tsx


    /dashboard
    /dashboard/settings

*/

// --------------------------------------

/* Dynamic route 

        created using [] square bracket folder

        app/
        └─ products/
            ├─ page.tsx
            └─ [id]/
                └─ page.tsx

        /products

        /products/1
        /products/2
        /products/3

*/

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <div>{id}</div>;
}

// -----------------------------------------

/* nested dynamic

  We can have multiple dynamic segments.

app/
 └─ products/
      └─ [category]/
           ├─ page.tsx
           └─ [id]/
                └─ page.tsx


          [category]/page.tsx

            /products/electronics
            /products/books
            /products/clothing


          [category]/[id]/page.tsx

              /products/electronics/123
              /products/books/456

*/

// app/products/[category]/page.tsx

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  return <div>Category: {category}</div>;
};

// --------------------------------------------

/*  params and searchParams

  params and searchParams 
  are two different ways of accessing URL data, in RSC.

  params and searchParams are special props 
  automatically injected by Next.js into Server Components 
  such as pages and layouts.

  params contains values extracted from dynamic route segments 
  (e.g. /users/123 → { id: "123" }).

  searchParams contains values from the URL query string 
  (e.g. ?page=2 → { page: "2" }).

  these props are asynchronous and need to be awaited.
*/

//    /products/001

// params
type Prop = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetails({ params }: Prop) {
  const { id } = await params;

  return <div>{id}</div>;
};

// -------------------------------

//  produts?sort=price&page=2

// searchParams
type SearchParamsProp = {
  searchParams: Promise<{
    sort?: string;
    page?: string;
  }>;
};

async function Products({ searchParams }: SearchParamsProp) {
  const { sort, page } = await searchParams;
  return (
    <div>
      Products
      <p>
        sort: {sort}, page: {page}
      </p>
    </div>
  );
};

// ----------------------------------------

// can also be used both , in same page

//    app/products/[category]/page.tsx
//    app/products/laptop?page=2&sort=price

type Params = Promise<{
  category: string;
}>;

type SearchParams = Promise<{
  page?: string;
  sort?: string;
}>;

type PageProps = {
  params: Params;
  searchParams: SearchParams;
};

export default async function Page({params,searchParams}: PageProps) {
  const { category } = await params;
  const { page, sort } = await searchParams;

  return (
    <div>
      <h1>{category}</h1>
      <p>{page}</p>
      <p>{sort}</p>
    </div>
  );
};


// params in client component.

"use client";

import { useParams } from "next/navigation";

export default function ProductDetails() {
  const {id} = useParams<{ id: string }>();

  return <div>{id}</div>;
}

// ----------------------------------------------------

// in client component

"use client";

import { useParams, useSearchParams } from "next/navigation";

export default function ProductPage() {

  const params = useParams();     // for dynamic value.

  const searchParams = useSearchParams();   // for query string.

  const category = params.category as string;
  const page = searchParams.get("page");
  const sort = searchParams.get("sort");

  return (
    <div>
      <h1>{category}</h1>
      <p>Page: {page}</p>
      <p>Sort: {sort}</p>
    </div>
  );
};

// -------------------------------------------

// app/products/[category]/[id]page.tsx

type Prop = {
  params: Promise<{
    category: string;
    id: string;
  }>;
};

async function ProductDetailsPage({ params }: Prop) {
  const { category, id } = await params;
  return (
    <div>
      ProdcutCategory - category: {category}, id: {id}
    </div>
  );
};


// --------------------------------------------------


/*  some other special files we creates when needed

    it can be created for specific route as well at root level for entire app.

    ├── layout.tsx
    ├── template.tsx
    ├── loading.tsx
    ├── not-found.tsx
    ├── error.tsx
    └── default.tsx

*/

// -------------------------------------------------

/*  layout.tsx

    layout.tsx is a special file used to create a shared UI 
    that persists(render once) across multiple pages in a route segment.

    It wraps pages using the children prop and is commonly used for navbars, sidebars, footers, and providers. 
    Layouts persist across client-side navigation, 
    so they are not remounted when moving between pages within the same segment, 
    which improves performance and preserves state.

app/
├── layout.tsx
└── dashboard/
    ├── layout.tsx
    ├── profile/page.tsx
    └── settings/page.tsx

*/

// -------------------------------------------------

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <aside>Sidebar</aside>
      {children}
    </div>
  );
}

/*  layout.tsx vs template.tsx

      layout.tsx	                        template.tsx

Persists across navigation	      Re-mounts on every navigation

Preserves state	                  Resets state

Better performance	              Useful when you need fresh state


*/

// app/dashboard/template.tsx

// by default template.tsx  is also server component, to use client side feature make it client component.

"use client";

import { motion } from "framer-motion";

export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}

// ------------------------------------------------


/*  if we have both  layout.tsx and template.tsx

    the rending order.

    <Layout>
      <Template>
        <ProfilePage />
      </Template>
    </Layout>


    // most useCase of template.jsx is 

      1. if we want to show animation on route change
      2. if we dont want to persist state when route  change

      layout.tsx = shared UI.

      template.tsx = remount behavior.
    
*/


// -----------------------------------------------


/* loading.tsx
        
  loading.tsx is used to show instant loading UI while Server Component fetch data.

  loading.tsx will not run for client component.(we define loading state in client component using useState())

app/
├── products/
│   ├── loading.tsx
│   ├── page.tsx
|

here, loading.tsx only affects its product route segment and its childrens.

How it works internally.

Next.js automatically wraps the route segment in a React Suspense boundary.

So we don't need to manually create a Suspense boundary( <Suspense fallback={}></Suspense>) 
for route loading states.

*/


// ---------------------------------------------------

/*  not-found.tsx and notFound().

    not-found.tsx is a special file used to render a custom 404 page.
    
    not-found.tsx is used in two situations:

      1.  Unmatched route — 
            when the requested URL doesn't match any route in the application.

      2.  Resource not found — 
            when the route exists, but the requested data/resource doesn't exist, 
            and we explicitly call notFound().

    When you create a new Next.js App Router project, you typically get:

    app/
    ├── page.tsx
    ├── layout.tsx
    └── globals.css

    even if there is no not-found.tsx

    by default next.js provides default 404 page on unmatched route.


    we can create not-found.tsx 
    1.  at root level(for override default UI. its global not-found.tsx file. )
    2.  and for specific route segment as well.

*/

// scenario 1:  RSC

//  src/lib/users.ts
import { prisma } from "@/lib/prisma";

export async function getUser(id: number) {
  try {
    return await prisma.user.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user");
    // if throws error, Next.js automatically render error.tsx file.
  }
}


// app/user/[id]/page.tsx
import { getUser } from "@/lib/user";
import { notFound } from "next/navigation";

type Prop = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Prop) {
    
  const { id } = await params;

  const user = await getUser(id);

  if (!user) {
    notFound();
  }

  return <div>hello: {user?.name}</div>;
}

/* 
      Database access in lib/user.ts

      Route logic (notFound()) and UI rendering in page.tsx

*/


// ----------------------------------------------


/* error.tsx

    error.tsx is a special file in the Next.js App Router 
    that acts as a route-level Error Boundary.

    It catches runtime errors that occur during rendering, data fetching.
    and displays a fallback UI instead of crashing the entire application.

    "error.tsx must be a Client Component."

    It receives:

      1.  error → the error object that was thrown.

      2.  reset() → a function that retries rendering route segment that failed.

      The primary purpose of reset() is to recover from transient (temporary) failures,
      such as temporary network error, temporary db not connected.

      When the user clicks Retry, 
      Next.js re-runs the Server Component and data fetching logic.

      If the error is caused by a coding bug, reset() will simply reproduce the same error until the code is fixed.


      *** In Next.js App Router, 
      errors bubble up to the nearest error.tsx in the route hierarchy,
      if no error.tsx file in any route segment we can have at => app/error.tsx

      
      app/
      ├── error.tsx
      ├── layout.tsx
      ├── global-error.tsx
      └── user/
          ├── layout.tsx
          ├── error.tsx
          └── [id]/
              └── page.tsx


        if error is in user/layout.tsx
        ❌ app/user/error.tsx will NOT catch this.
        ✅ app/error.tsx will catch it.

        if error is in app/layout.tsx
        ❌ app/error.tsx will NOT catch this.
        ✅ app/global-error.tsx will catch it.

*/

"use client"

import { useEffect } from "react";

type ErrorProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {

  useEffect(() => {
    console.error('error.tsx =>',error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Something went wrong</h2>

      {/* <p className="text-muted-foreground">Unable to load the user.</p> */}
      <p className="text-muted-foreground">{error?.message}</p>

      <button
        onClick={() => reset()}
        className="rounded bg-black px-4 py-2 text-white cursor-pointer"
      >
        Try Again
      </button>
    </div>
  );
}


/*  Difference Between error.tsx and not-found.tsx

      error.tsx handles runtime unexpected errors (e.g., database failure, API failure, coding bugs).

      not-found.tsx handles missing resources via notFound().

*/

// ----------------------------------------------

/* Link component

    for navigation <Link> component is used instead of <a>

    import Link from "next/link";

    <Link href="/dashboard"> dashboard </Link>

  

  // to make active link style, we have to make it client component.
    
  'use client'
  import Link from "next/link";
  import { usePathname } from "next/navigation";

  const pathName = usePathname();   // detect url

  <Link
        href="/dashboard"
        className={
          pathName == "/"
            ? "font-bold text-blue-500"
            : "text-gray-5000"
        }
      >
        dashboard
    </Link>

*/

// ------------------------------------------------

/* private folder

  folders prefixed with an underscore (_) are treated as private folders 
  and are ignored by the routing system.

app/
├── page.tsx
├── _components/
│   ├── Navbar.tsx
│   └── Footer.tsx
├── _lib/
│   └── db.ts
└── _utils/
    └── helpers.ts


*/

// -----------------------------------

/* route group ...

  A Route Group is a folder wrapped in parentheses () 
  that helps organize routes without affecting url.

    app/
    └── (auth)/
        ├── login/
        │   └── page.tsx
        └── register/
            └── page.tsx


      The (auth) folder does not appear in the URL.

      /login.

      /register.
      

*/

// -------------------------------

