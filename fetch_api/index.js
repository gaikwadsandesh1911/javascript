/* 🔹 Fetch API
    
    To make HTTP requests (GET, POST, PUT, DELETE) in JavaScript.
    fetch api is used

    👉 It returns a Promise
    👉 Works in browsers (no need for Axios)


            async function createUser() {
                try {
                    const res = await fetch('https://jsonplaceholder.typicode.com/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: 'Sandesh',
                            email: 'sandesh@gmail.com'
                        })
                    });

                    // ✅ Handle HTTP errors manually

                    if (!res.ok) {
                        throw new Error(`HTTP error! Status: ${res.status}`);
                    }

                    const data = await res.json();
                    console.log("User created:", data);

                } catch (error) {
                    console.error("Error creating user:", error.message);
                }
            }

        ✅ 1. Response is NOT actual data its Response object

                const res = await fetch(url);
                console.log(res);               // Response object

            👉 Convert it: into json() format
                const data = await res.json();

        ✅ 2. Check for Errors (Very Important 🚨)

                    👉Fetch does NOT throw error for HTTP errors (404, 500)

                    const res = await fetch(url);

                    if (!res.ok) {
                        throw new Error("Something went wrong");
                    }

        ✅ 3. Headers

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer token'
                }

// ----------------------------------------------------------
        
        🚀Pro Version (Cleaner + Reusable)

            if (!res.ok) throw new Error(`Failed: ${res.status}`);

            return await res.json();

        } catch (err) {
            console.error(err);
            return null;
        }

        👍  createUser().then(data => {
                if (data) console.log(data);
            });

*/

// ---------------------------------------------------

/*  🔹with axios

    import axios from 'axios';

    async function createUser() {
        try {
            const res = await axios.post(
                'https://jsonplaceholder.typicode.com/users',
            {
                name: 'Sandesh',
                email: 'sandesh@gmail.com'
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            );

            console.log("User created:", res.data);

        } catch (error) {
            console.error("Error:", error.message);
        }
    }


*/

/*  🔹fetch() vs axios()

    ✅ 1. No JSON.stringify

        fetch.post(url, {
            method: "",
            headers: {

            },
            body: JSON.stringify({
                data want to sent to server
            }) 
        })

        axios.post(url, { data want to sent }, { headers: { } })

    
    ✅ 2. No .json()

        in fetch we need to convert res object into json();

        axios directly sends data...

            // Fetch
                const data = await res.json();

            // Axios
                const data = res.data;


    ✅ 3. Better Error Handling

            Axios automatically throws errors for HTTP status (400, 500)  

            catch (error) {
                if (error.response) {
                    console.log(error.response.data);   // server error
                    console.log(error.response.status); // status code
                } else {
                    console.log(error.message); // network error
                }
            }
*/

/* 

🌐 What are HTTP Status Codes?

👉 When a client (browser / app) sends a request, the server responds with a status code

👉 It tells whether the request was successful, failed, or needs action

| Code | Meaning      | Use Case         |
| ---- | ------------ | ---------------- |
| 200  | OK           | GET success      |
| 201  | Created      | POST success     |
| 400  | Bad Request  | Validation error |
| 401  | Unauthorized | Login required   |
| 403  | Forbidden    | No permission    |
| 404  | Not Found    | Wrong URL        |
| 500  | Server Error | Backend crash    |

*/