/*  Route Handlers.

    A Route Handler is a server-side API endpoint created with route.ts in the App Router.
    
    It handles incoming HTTP requests like GET, POST, PUT, PATCH, and DELETE using the standard Web Request API 
    and returns an HTTP response using the standard Web Response APIs. 
    
    It is used to build REST APIs, webhooks, authentication endpoints, Third party API integration.

    app/
    ├── api/
    │   ├── users/
    │   │   └── route.ts
    │   └── products/
│       └── route.ts

        /api/users
        /api/products

*/

// ---------------------------------------------

export async function GET() {
  return new Response("Hello World");   // return plain text
}

// return json with status code
export async function GET() {
  return Response.json(
    {
      success: true,
      users: []
    },
    {
      status: 200,
    }
  );
}

// reading query data    =>   /api/users?page=1&limit=10
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  return Response.json({
    page,
    limit,
  });
}

// dynamic route    =>    app/api/users/[id]/route.ts
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  
  const { id } = await params;

  return Response.json({
    id,
  });
}


// reading json body
export async function POST(request: Request) {
  const body = await request.json();
  return Response.json(body);
}


// reading form data
export async function POST(request: Request) {
  const formData = await request.formData();

  const name = formData.get("name");

  return Response.json({
    name,
  });
}

// Set Headers
return new Response("Hello", {
  headers: {
    "Content-Type": "text/plain",
    "Cache-Control": "no-store",
  },
});

// redirect
return Response.redirect("https://example.com", 302);

// ---------------------------------------------


/*  
    Request and Response object are not specific to Next.js. 
    It comes from Standard Web request / response.

    The Request object represents the incoming HTTP request sent by the client. 
    It contains information such as headers, cookies, query parameters, request body, URL, and HTTP method.

    ***
    Search for properties and methods availble on both objects and use accordingly. 
   
*/

// ----------------------------------------------

/*  NextRequest

    It extends standard web Request object and add next.js specific features
    such as:
      - easy access to cookies and parsed nextUrl object.
      - commenly used in middleware (proxy.ts) file when need next.js specific functionality.
*/

import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {

  const body = await request.json();

  const token = request.cookies.get("token");

  const page = request.nextUrl.searchParams.get("page");

  return Response.json({
    body,
    token: token?.value,
    page,
  });
}

/* 

  instead of writting...

      const { searchParams } = new URL(request.url);
      const page = searchParams.get("page");

  we write...

      const page = request.nextUrl.searchParams.get("page");

*/


/* 
    we can access cookies directly with NextRequest.
    commonely used in middleware(proxy.ts) file.

      const token = request.cookies.get("token");


    *** IN RSC reading cookies and headers we have 
      - cookies()  and headers() functions from next/headers.
*/


// reading cookies and headers in RSC.

import { cookies, headers } from "next/headers";

export async function GET() {

  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  const headersList = await headers();
  const authorization = headersList.get("authorization");
  
  return Response.json({});
}


// ------------------------------------------------------

/* NextResponse

    NextResponse extends the standard Web Response API by adding Next.js-specific functionality such as cookie management, setting headers, 
    and continuing request processing in Proxy/Middleware.

*/

// eg.1 setting headers
const response = NextResponse.json({
  success: true,
});

response.headers.set("Cache-Control", "no-store");

return response;


// eg 2. setting cookies
const response = NextResponse.json({
  success: true,
});

response.cookies.set("token", "abc123");
response.cookies.set("theme", "dark");

return response;

// ------------------------------------------------------

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


