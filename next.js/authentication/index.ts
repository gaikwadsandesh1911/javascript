/* 
    most app resolve around users:

        when building for users, we need to consider three concepts:

            - Authentication:           verifying who is someone.
            - Session Management:       keep track of user's logged in state across request.
            - Authorization:            what root or data they are allow to access.
            
            In react we only dealing with client side code.

            With next.js we protect our app from client, server and api route.

*/

/* 
    setup cleark

*/


// conditional rendering.
import {
  Show,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="flex justify-end gap-2">

      <Show when="signed-out">
        <SignInButton />
      </Show>

      <Show when="signed-in">
        <SignOutButton/>
        <UserButton />
      </Show>

    </nav>
  );
}

// ---------------------------------------

// protecting route with clerk middleware

// proxy.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/profile(.*)",
  "/admin(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

/* 
    proxy.ts is where Clerk middleware runs before a request reaches a route.

    createRouteMatcher() defines which routes require authentication.

    auth.protect() checks whether the user is signed in.

    If the user is not authenticated, Clerk automatically redirects them to the Sign In page.

    If the user is authenticated, the request continues normally.

*/

// scenario 2: Protect every route except public ones

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});


/*  scenario: 3

    If you're not already protecting the route in proxy.ts with auth.protect()
    

    Clerk provides two main ways to read authentication data: session data and user data. 
    Session data represents the current authenticated session (such as userId, sessionId, and organization information), 
    while user data contains the user's profile (such as name, email, and profile image). 
    
        On the server, 
            we use auth() to read session data and 
            currentUser() to read the full user profile.

        On the client, 
            we use useAuth() for session data and 
            useUser() for the full user profile.


*/
import { auth } from "@clerk/nextjs/server";

export default async function Dashboard() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    return redirectToSignIn();
  }

  return <h1>Dashboard</h1>;
};

// ---------------------------

// rbac
