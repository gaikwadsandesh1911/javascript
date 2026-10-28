/* Link and useRouter

   
   Link is the standard way to navigate using a clickable link, with built-in prefetching behavior.

   useRouter() provides programmatic navigation in client component using methods such as push(), replace(), back(), and refresh().


*/

import Link from "next/link";

<Link href="/dashboard">Dashboard</Link>

//. ------------

"use client";

import { useRouter } from "next/navigation";

export default function LoginButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.push("/dashboard")}>
      Go to dashboard
    </button>
  );
}


/* redirect() and router.push()?

   redirect() is a server-side navigation utility commonly used in Server Components, Server Actions, and Route Handlers. 

   router.push() performs programmatic client-side navigation.

*/

import { redirect } from "next/navigation";

export default async function Page() {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    redirect("/login");
  }

  return <h1>Dashboard</h1>;
}


/* usePathname, useSearchParams, and useParams?

   usePathname() returns the current pathname.

   useSearchParams() reads query-string parameters.

   useParams() reads dynamic route parameters.

   For /products/123?category=electronics:

      Pathname: /products/123
      Product ID: 123
      Category query parameter: electronics

*/



