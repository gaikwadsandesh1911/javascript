/* React Router

        React Router DOM is a library used to implement client-side routing in React applications. 
        Basically it displays the appropriate component based on the URL, without realoading entire page.

*/

npm install react-router-dom
        
import { BrowserRouter } from "react-router-dom";
import App from "./App";

function Main() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
export default Main;


import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}


/* BrowserRouter

    BrowserRouter is a router component that uses the browser's History API 
    to manage client-side navigation and keep the UI synchronized with the URL
    
    The components inside BrowserRouter can use React Router features such Link, and useNavigate.
    
    
    Routes:  its container to Route
    
    Route:   it defines the URL path and the component to render for that path.
*/


/* Link vs a

   Link is a React Router component that navigates between routes without performing a full page reload. 

   A normal anchor tag (a) usually requests the linked document from the server, causing a full page reload.

*/

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}

<a href="/about">About</a>



/* useNavigate()

    useNavigate is a React Router hook that allows us to navigate programmatically from JavaScript code, 
    such as after form submission, login, or another user action.
 

*/

import { useNavigate } from "react-router-dom";

function Login() {
    
  const navigate = useNavigate();

  function handleLogin() {
    // Login logic
    navigate("/dashboard");
  }

  return (
    <button onClick={handleLogin}>
      Login
    </button>
  );
}

navigate(-1); // Go back
navigate(1);  // Go forward

navigate("/dashboard", { replace: true });


/* Navigate

   Navigate is a React Router component that redirects the user to another route.
   
 
   Navigate — declarative redirect through JSX.

   useNavigate — programmatic navigation inside event handlers or other code.
   
   Link — navigation through a link.

*/

import { Navigate } from "react-router-dom";

function Profile() {
    
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <h1>Profile Page</h1>;
}

/* useParams()

   useParams is a hook used to access dynamic parameters from the current URL.

   URL :  /users/101

*/

<Route path="/users/:id" element={<User />} />


import { useParams } from "react-router-dom";

function User() {
  const { id } = useParams();

  return <h1>User ID: {id}</h1>;
}


/* useSearchParams()

   useSearchParams is a hook used to read and update query parameters in the URL.

   /products?category=mobile&page=2

  Query parameters are useful for search, filtering, sorting, and pagination.

*/

import { useSearchParams } from "react-router-dom";

function Products() {
    
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category");

  const page = searchParams.get("page");

  return (
    <div>
      <p>Category: {category}</p>
      <p>Page: {page}</p>

      <button
        onClick={() => setSearchParams({ page: "3" })}
      >
        Next Page
      </button>
    </div>
  );
}


/* nested route
  
   Nested routes allow us to define routes inside other routes. 
   They are useful when multiple pages share a common layout

  The Outlet component specifies where the matching child route should appear.

*/

import {
  Routes,
  Route,
  Outlet
} from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route
          path="profile"
          element={<h2>Profile</h2>}
        />
        <Route
          path="settings"
          element={<h2>Settings</h2>}
        />
      </Route>
    </Routes>
  );
}


// An index route is the default child route rendered at the parent route's URL. It does not have its own path.

<Route path="/dashboard" element={<Dashboard />}>
  <Route
    index
    element={<h2>Dashboard Home</h2>}
  />

  <Route
    path="profile"
    element={<h2>Profile</h2>}
  />
</Route>


/* protected route.

   A protected route checks whether the user is authenticated before rendering a component. 

*/

import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    
  const isLoggedIn = true; // Example only

  return isLoggedIn
    ? <Outlet />
    : <Navigate to="/login" replace />;
}



<Route element={<ProtectedRoute />}>
  <Route
    path="/dashboard"
    element={<Dashboard />}
  />
  <Route
    path="/profile"
    element={<Profile />}
  />
</Route>


/*


*/
