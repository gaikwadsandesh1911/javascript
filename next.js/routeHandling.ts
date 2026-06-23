/* eslint-disable @typescript-eslint/no-unused-vars */

/*  Route Handlers.

    Route Handlers in Next.js allow developers to create server-side API endpoints.
    which enable full-stack development within a single Next.js application.
    
    Think of it like building Node + Express app.
    But There is no need to set up and configure separate server.

    It supports HTTP methods like GET, POST, PUT, DELETE, HEAD, and OPTIONS.
     
    route handlers are defined using route.ts

        app/
        ├── api/
        │    ├── user/
        │    │    └── route.ts

        /api/user



| Route Handler                      | Server Component                       |
| ---------------------------------- | -------------------------------------- |
| Creates API endpoints              | Renders UI                             |
| Returns Response/JSON              | Returns JSX                            |
| Accessed via URL like `/api/users` | Accessed via url route like `/users`   |
| Acts like backend                  | Acts like frontend rendering on server |

*/

/* when to use route handler

      Fetch data in client componet
      Need a public API
      Mobile app access
      Webhooks
      Third-party integrations
      Custom HTTP endpoints

            /api/users

    we do not call our own api in RSC component,
    RSC component can directly access db.

    we use Server Actions to 
    Create/Update/Delete UI for your own next.js app

*/

// ---------------------------------------------

export async function GET(request: Request) {}

export async function GET(request: NextRequest) {}

/*  Request and Response object 

    They are not specific to Next.js. it comes from Fetch/Web standard

    The Request object represents the incoming HTTP request sent by the client. 
    It contains information such as headers, cookies, query parameters, request body, URL, and HTTP method.
    

    The Request object contains:

Request
├── method
├── url
├── headers
├── body
├── bodyUsed
├── cache
├── credentials
├── destination
├── integrity
├── keepalive
├── mode
├── redirect
├── referrer
├── referrerPolicy
├── signal
├── clone()
├── arrayBuffer()
├── blob()
├── bytes()     (new)
├── formData()
├── json()
├── text()

  in next.js we have:  NextRequest, which extends native Request and also adds next specific properties.

      request.cookies
      request.nextUrl

*/

// ---------------------------------------------

// read req body as json
export async function POST(request: Request) {
  const body = await request.json();
  // request.json() parses the incoming JSON request body and returns a JavaScript object.
}

// ---------------------------------------------

// access header
export async function GET(request: Request) {
  const auth = request.headers.get("authorization");
}

// type: 2
import { headers } from "next/headers";

export async function GET() {
  const headerList = await headers();
  const authorization = headerList.get("authorization");
}

/*  In RSC, we can access headers using type: 2
    because in rsc we dont have request object.

    RSC executed on server, At the moment RSC executes
    it has full access to incoming HTTP request.

    so it can access:

      headers
      cookies
      database
      filesystem
      internal services
*/

// ------------------------------------------


// get cookies
import { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  const token = request.cookies.get("token");
}

// type: 2
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;
}

// -------------------------------------------

// get query parameter ->  /api/users?id=10&name=sandesh
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  /*  Q:  Why do we write new URL(request.url) to get query params?

      A:  The Request object only provides the full URL string. 
          JavaScript's URL class is used to parse that URL and 
          extract search parameters through searchParams.
*/
}

// ------------------------------------------


// NextRequest provides nextUrl, which is already a parsed URL object.

import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const id = searchParams.get("id");
  const name = searchParams.get("name");

  // search for other properties available on request.nextUrl
}

// ------------------------------------------

/* Response Object

    The Response object represents the HTTP response sent back to the client.
    route handle must return response to the client.

    NextResponse extends standard Response object and add next.js specific features.
*/

// josn
export async function GET() {
  return Response.json({ message: "User Created" }, { status: 201 });
}

// plain text
export async function GET() {
  return new Response("Hello World");
}

// setting cookie
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
  });

  response.cookies.set("token", "jwt-token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return response;
}

// to delete cookie
response.cookies.delete("token");

//  update cookie
response.cookies.set("token", "new-jwt-token");

// search for avialble properties and method on cookeis.

// ---------------------------------------------


/*   dynamic route handler 

      app/
      └── api/
          └── users/
              └── [id]/
                  └── route.ts
*/

type PageParams = {
  params: Promise<{
    id: string
  }>
}
export async function GET(request: Request, { params }: PageParams) {
  const { id } = await params;
}

// ---------------------------------------------

// redirect


// in route handler
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL("/login", request.url);

  return NextResponse.redirect(url);
}


// in rsc
import { redirect } from "next/navigation";

export default async function Page() {
  const user = null;

  if (!user) {
    redirect("/login");
  }

  return <div>Dashboard</div>;
}


// in client component
"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <button onClick={() => router.push("/login")}>
      Go to Login
    </button>
  );
}

// router.push("/home");    // adds history
// router.replace("/home"); // replaces history

// ------------------------------------------------------


/* caching in route handlers

    route handlers are not cache by default.
    but we have option to cache, when using GET method.

    if we re using dynamic functions like headers() cookies() or 
    working with request object in GET method caching not work.

    other HTTP methods like POST, PUT, DELETE can not be cached.

    There is no caching in development mode. 
    we need to run app in production

    npm run build
    npm run start
*/

export async function GET() {
    return Response.json({
        time: new Date().toLocaleTimeString()
    })
};

// can be cached using
export const dynamic = "force-static";

// Always render per request
export const dynamic = "force-dynamic";

// Cache and regenerate every 60 seconds
export const revalidate = 60;


// no caching because working with request object
export async function GET(req: Request) {
  const search = new URL(req.url).searchParams;
}



// ------------------------------------

/* middleware

    In Next.js 16, middleware.ts has been renamed to proxy.ts.

    proxy.ts is a special file in Next.js that runs before a request reaches your route handler or page. 
    It is used to intercept, inspect, modify, redirect, or block incoming requests at the edge of your application.

    Common Use Cases:

      Authentication / Authorization
      Redirect users
      Rewrite URLs
      Add or inspect headers
      Rate limiting


     

*/

// proxy.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};


// if we request to /dashboard  if no token available
// redirect to /login


/* 
      Browser Request
            ↓
      proxy.ts
            ↓
      Route Handler / Page / API
            ↓
      Response

    Q: Does proxy.ts run for every route?
    A: Only for routes matched by the matcher configuration.
*/


