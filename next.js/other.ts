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


/* "use cache" directive in Next.js. 16?

   "use cache" marks a page, component, or function as cacheable when Cache Components are enabled

*/

// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
};

export default nextConfig;


// app/lib/products.ts
import { cacheLife } from "next/cache";

export async function getProducts() {
  "use cache";

  cacheLife("hours");

  const response = await fetch(
    "https://api.example.com/products"
  );

  return response.json();
}



/* cacheLife() and cacheTag()?

cacheLife() controls how long cached content remains fresh and when it becomes stale.

cacheTag() associates cached content with a tag so it can be invalidated later.


*/

import { cacheLife, cacheTag } from "next/cache";

export async function getProducts() {
  "use cache";

  cacheLife("hours");
  cacheTag("products");

  return await db.query.products.findMany();
}


/* revalidatePath(),revalidateTag(), updateTag()   all use for cache invalidation.

revalidatePath() invalidates cached content associated with a particular route path.

revalidateTag() invalidates tagged cached data for revalidation.


updateTag() immediately expires tagged cache entries. so a subsequent read can obtain fresh data. It is intended for Server Actions, especially when a user expects their changes to appear immediately after saving.


*/

// app/products/page.tsx

async function getProducts() {
  const res = await fetch("https://api.example.com/products");

  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      {products.map((product: any) => (
        <p key={product.id}>{product.name}</p>
      ))}
    </div>
  );
}

// suppose admin add new product

// app/actions.ts

"use server";

import { revalidatePath } from "next/cache";

export async function addProduct(formData: FormData) {
  await db.product.create({
    data: {
      name: formData.get("name") as string,
    },
  });

  revalidatePath("/products");
}

//_______________________________


// lib/products.ts
// fetch data with tag

export async function getProducts() {
  const res = await fetch(
    "https://api.example.com/products",
    {
      next: {
        tags: ["products"],
      },
    }
  );

  return res.json();
}


// invalidate tag

"use server";

import { revalidateTag } from "next/cache";

export async function addProduct(formData: FormData) {
  await db.product.create({
    data: {
      name: formData.get("name") as string,
    },
  });

  revalidateTag("products", "max");
}

//_____________________________

// app/actions.ts

"use server";

import { updateTag } from "next/cache";

export async function updateProfile(formData: FormData) {
  await db.user.update({
    where: {
      id: "123",
    },
    data: {
      name: formData.get("name") as string,
    },
  });

  updateTag("profile");
}


// fetch with same tag

const res = await fetch("https://api.example.com/profile", {
  next: {
    tags: ["profile"],
  },
});