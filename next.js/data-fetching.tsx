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


/*  two types

  1.  Sequential Data Fetching.
        one request waits for another to complete before starting.

  2.  Parallel Data Fetching
        independent requests start at the same time.
*/

  // sequential data fetching
    const user = await getUser();
    const posts = await getPosts(user.id);

  // -----------------------------------

  // parallel data fetching
    const userPromise = getUser();
    const productsPromise = getProducts();

    const [user, products] = await Promise.all([
      userPromise,
      productsPromise,
    ]);

  // with Promise.all(), if any promise rejects, the entire Promise.all() rejects immediately.

// -----------------------------------------

// fetching from db.

export const getUsers = () => {
    return prisma.user.findMany();
};

export default async function UsersPage() {
  const users = await getUsers();
  // .....
};