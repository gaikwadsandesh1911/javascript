/*  Data fetching 

  in React Server Components (RSC) :
    
    - we can fetch data directly without creating an API route.
    - as well we can Query the database directly

    - for loading and error state we use:
        loading.tsx and error.tsx file respectively.

    /products

    app/
    ├── products/
    │   ├── page.tsx          // Server Component (fetches data)
    │   ├── loading.tsx       // Loading UI
    │   ├── error.tsx         // Error UI (Client Component)
    

    
  in client component we use useState() and useEffect(), or React Query.

*/



// data fetching from public api. 

type User = {
  id: number;
  name: string;
  email: string;
};

const getUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) {
    throw new Error("Failed to fetch users.");
    // if we throw error, error.tsx file triggered when error occured.
  }
  return await res.json();
};


export default async function FetchUsers() {
  const users: User[] = await getUsers();

  return <>{users.map}</>;
};




/*  Data fetching pattern

  1.  Sequential Data Fetching. (slow)
        Sometimes one request depends on another.

  2.  Parallel Data Fetching (fast)
        independent requests start at the same time.
*/

  // sequential data fetching 
    const user = await getUser();
    const orders = await getOrders(user.id);

  // -----------------------------------

  // parallel data fetching
    const userPromise = getUser();
    const productsPromise = getProducts();

    // We avoid using await before each fetch because that would make the requests execute sequentially.

    const [user, products] = await Promise.all([
      userPromise,
      productsPromise,
    ]);

  // with Promise.all(), if any promise rejects, the entire Promise.all() rejects immediately.

// -----------------------------------------




// Query database directly.

export default async function Dashboard() {
  const users = await prisma.user.findMany();

  return (
    <>
      {users.map(user => (
        <p key={user.id}>{user.name}</p>
      ))}
    </>
  );
}


// ----------------------------------------------------------

/*  for data fetching from an api we use fetch() not axios();

    fetch() in RSC integrates with Next.js caching.

    *** see caching in details.

*/


// static data. 
await fetch(url, {
  cache: "force-cache",
});

// At build time, Next.js fetches the data, generates the HTML, and stores both the HTML and the fetched data in its cache. ✅

// -------------------------------------------------------------------------

// always fresh. 
await fetch(url, {
  cache: "no-store",
});

// request made at every navigate and generate fresh data.

// ------------------------------------------------------------------------

// Revalidate every 60 seconds. 
await fetch(url, {
  next: {
    revalidate: 60,
  },
});

/* 
    At build time, Next.js makes the initial request, caches the fetched data and the generated HTML, 
    and serves them until the revalidation interval expires. ✅

    Once the revalidation interval has expired, 
    the first incoming request triggers a background revalidation, 
    which fetches fresh data and updates the cache. ✅
*/
 
