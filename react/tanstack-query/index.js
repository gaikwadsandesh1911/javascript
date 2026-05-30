/*  TanStack Query is a server-state management library that makes 
    data fetching, mutation, caching, and synchronization of client and server,
    simple and performant in React apps.”

    Instead of manually handling loading states, errors, caching, retries, refetching, 
    and stale data using useEffect and useState, 
    TanStack Query provides a powerful async state management layer optimized for server state.”

    “Redux or context manages client state, while TanStack Query specializes in async server state.”
*/

// --------------------------------------------------------------------------

// npm i @tanstack/react-query
// npm i @tanstack/react-query-devtools

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  // Create a client
  const queryClient = new QueryClient();
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

// ------------------------------------------

// traditional way of fetching data in react
function Products() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get("https://dummyjson.com/products");
        setData(response.data.products);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h1>Products</h1>
      {data.map((product) => (
        <p key={product.id}>{product.title}</p>
      ))}
    </div>
  );
}

// ----------------------------------------------

// now with Tanstack Query
const fetchProducts = async () => {
  const response = await axios.get("https://dummyjson.com/products");
  return response.data.products;
};

/*  no try-catch
    Because TanStack Query automatically handles rejected promises 
    and exposes the error through error and isError.

    When should you still use try-catch?
        Use it when:
            transforming custom errors
            throwing custom messages
            handling special cases

*/

const fetchProducts = async () => {
  try {
    const response = await axios.get("https://dummyjson.com/products");
    return response.data.products;
  } catch (error) {
    throw new Error("Unable to fetch products");
  }
};
// Now TanStack Query receives your custom error.

// --------------------------------------------------

function Products() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <div>
      {isPending && <h2>Loading...</h2>}

      {isError && <h2>error.message</h2>}

      {data?.map((product) => (
        <p key={product.id}>{product.title}</p>
      ))}
    </div>
  );
}

/*  useQuery 
        is a hook for fetching data and also manage cached server state.

    queryKey 
        is a unique identifier 
        to identify queries uniquely, cache data, refetch specific queries, invalidate queries, share cached data across components. 
        It helps determine whether data should be reused from cache or refetched from the server(stale data management).

    queryFn 
        must return a Promise.
        fetchProducts is the async function responsible for fetching data from the API and returning it to TanStack Query.
*/

// -------------------------------------------

const queryClient = new QueryClient();

/* QueryClient is like a central manager that controls all query-related operations in your app.

    Why called “Client”?
        Because it runs on the frontend/client side of your application.
        It manages server data inside the browser

    Internally It Maintains:

        1. Query Cache using queryKey
            queryKey: ["products"],
            queryKey: ["products", page, category]
            queryKey: ["user", id]
                

        2. Query States
            It tracks:
                loading, success, error, fetching, stale/fresh

        3. Mutation Cache
            It tracks:
                POST PUT DELETE requests

    Why only one QueryClient usually?
        Because we want to:
            shared cache, centralized state, same data accessible everywhere
        That’s why we wrap the app:

    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>

    Now every component uses the same client/cache.

    useQuery() does NOT directly fetch and store data itself.

    Instead:
        useQuery() talks to QueryClient
        QueryClient checks cache
        If data missing/stale → fetches
        Stores result in cache
        Shares data with all components

    and other hooks like useMutation() follow the same architecture pattern.

    That’s the architecture.

*/

// -------------------------------------------

useQuery({
  queryKey: ["products"],
  queryFn: fetchProducts,
  staleTime: 0, // by default is 0
  gcTime: 5 * 60 * 1000, // by default 5 min
  refetchOnWindowFocus: true, // default
  refetchOnReconnect: true, // default
  refetchOnMount: true, // default
  retry: 3, // default, before throwing error it makes three api call
});

staleTime: 0;
/*  
     
    staleTime decides how long data remain fresh, so it does not make new api call during that time.

    staleTime: 0 meand data becomes stale(old) immediately after fetching

    Even though data becomes stale instantly:

        TanStack Query still serves cached data immediately
        but considers it outdated
        and may refetch in background on certain triggers, like.

    Refetch (api call in background..) triggers on certain events like:
        component mount
        window focus
        reconnect
        manual refetch


    💥if we increase staleTime

    staleTime: 1000 * 60,  // 1 min  
    
    Meaning:
        data remains fresh for 1 minute
        no automatic refetch during that minute

    Benefits of Increasing staleTime:

        1. Fewer API Calls
            Reduces un-necessary network requests.

        2. Better Performance
            Uses cached data instead of refetching repeatedly.

        3. Faster UI
            Instant rendering from cache.

    High stale time is good for Static data / data that is not changed frequently

    Use low or default staleTime for frequently changing data like stockc prices, Live chats, Notification, Orders


    "Increasing staleTime keeps query data fresh for a longer period, 
    preventing unnecessary refetches 
    and improving performance by reusing cached data.”

*/

// --------------------------------

gcTime: 5 * 60 * 1000;
/* gcTime: 5 * 60 * 1000

    previous version(cacheTime) define How long unused/inactive cache stays in memory 
    before garbage collection.

    query becomes unused/inactive means:
        1. component unmounted
        2. user navigated to another page
        3. tab/component no longer using that query

        cached data is survived for 5min, 
        after 5min it is garbage collected

        if component is mounted before 5min
        gcTime is started from start

        so, gcTime countdown starts ONLY when query becomes inactive.

*/

// --------------------------------

refetchOnWindowFocus: true; // switch tabs → refetch
refetchOnMount: true; // remount component → refetch
refetchOnReconnect: true; // reconnect internet → refetch

// other possible values...  false / 'always'
refetchOnWindowFocus: "always";
refetchOnMount: false;

/*  staleTime: 1000 * 60
        now data is considered fresh for 1 min 

    During that minute:

        window focus will NOT refetch
        remount will NOT refetch
        reconnect will NOT refetch

    Because query is still fresh. 

    true ≠ always

    true     =>    Refetch only when stale.”
    "always" =>    “Ignore freshness and refetch anyway.”


    “refetchOnWindowFocus, refetchOnReconnect, and refetchOnMount 
    accept three values: true, false, and 'always'.

    true refetches only stale queries,
    false disables refetching,
    'always' forces refetching regardless of query freshness.”
*/

retry: false; // only one api call
retryDelay: 1000; // wait for 1 sec before make another api call when api call failed and shows error

// ----------------------------------------------------

refetchInterval: false; // default
refetchInterval: 5000; // 5sec

/* polling means Automatically fetching data repeatedly after a fixed interval.
    
    Used for:
        live notifications
        stock prices
        admin dashboards

    Not ideal for:
        static data
        heavy APIs
*/

refetchIntervalInBackground: true;
// by default polling pauses in inactive browser tabs
// with true value even inactive tab make api call

useQuery({
  queryKey: ["orders"],
  queryFn: fetchOrders,
  refetchInterval: 5000,
  refetchIntervalInBackground: true,
});

// -----------------------------------------

enabled: false;
/* 
    Normally, useQuery runs automatically when component mounts.
    But if you want to fetch data only on button click, use:
    
    enabled: false;     // do not automatically execute query
    refetch()           // manually runs the query.
*/

const { refetch, data } = useQuery({
  queryKey: ["products"],
  queryFn: fetchProducts,
  enabled: false,
});

<button onClick={refetch}>Fetch Products</button>;

// ------------------------------------

// Query by ID in TanStack Query

const fetchProductById = async (id) => {
  const response = await axios.get(`https://dummyjson.com/products/${id}`);
  return response.data;
};

function ProductDetails() {
  const { id } = useParams();

  const { data, isPending, error, isError } = useQuery({
    queryKey: ["product", id], // dynamic key
    queryFn: () => fetchProductById(id), // dynamic queryFn
    enabled: !!id, // prevent query from runnig if id is... null, undefined, empty
    // !! is a operator in js
  });

  if (isPending) return <h2>Loading...</h2>;

  if (isError) return <h2>{error.message}</h2>;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
}

// --------------------------------------

// mutation
/* 
    useMutation()
        used for creating, updating, and deleting server data. 
        It executes mutations manually using mutate() function

    useQueryClient() 
        used to access the global QueryClient instance inside components.
        
        Now you can:
            invalidate queries, update cache, prefetch queries, remove cache, access cached data
            using different available methods.
*/

import { useMutation } from "@tanstack/react-query";

const addProduct = async (newProduct) => {
  const response = await axios.post("https://dummyjson.com/products/add", newProduct);
  return response.data;
};

function AddProduct() {

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addProduct,

    onSuccess: (data) => {
    //   console.log(data);
    // toast success messages
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      // Meaning: mutation succeeds products query becomes stale automatic refetch happens
    },

    onError: (error) => {
    //   console.log(error);
    // toast error message
    },

    onSettled: () => {
        console.log('will run always..')
    },
    // it runs after the mutation finishes — whether it succeeds or fails means it run always
  });

  const handleAdd = () => {
    mutate({
      title: "New Product",
    });
  };
// The argument passed to mutate() becomes the parameter of mutationFn.
// mutate() can pass id, object, formdata, anything.


  return <button onClick={handleAdd}>Add Product</button>;
}


// ---------------------------------

queryClient.invalidateQueries()
// Marks queries stale and refetches.

queryClient.setQueryData(
  ["products"],
  (oldData) => [...oldData, newProduct]
)
// manually update cache, used in optimistic update

queryClient.removeQueries({
  queryKey: ["products"],
});
// Delete queries from cache.

const products = queryClient.getQueryData(["products"]);
// Read cached data.

// -----------------------------------------


/* some other important topics

    Data transformation
    Custom Query hook
    Parallel queries
    Dynamic parallel queries
    Dependent queries
    initial Query data
    paginated Query
    infinite Query
    Optimistic update
*/