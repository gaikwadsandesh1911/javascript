/* Fetch api

    Fetch api is built-in api in js which is used to 
    make http request to server or external api.

    it provides methods like GET, POST, PUT, PATCH, DELETE to perform operations.

    fetch returns an promise so we can handle it using then() and cath()
    or more commonly async/await
    
    fetch does not reject http errors, so need to check it manually and throws it.
*/

// by default GET Request.

fetch('url');

async function getUsers() {
  try {
    const response = await fetch("https://api.example.com/users");

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    };

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

// POST request
fetch("url", {});

async function createUser() {
  const user = {
    name: "Sandesh",
    email: "sandesh@example.com"
  };

  const response = await fetch("https://api.example.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json" ,   // tells server tha we're sending json
      "Authorization": `Bearer`
    },
    body: JSON.stringify(user)      // conver js object into json format, because server accept data in json fromat
  });

  const data = await response.json();

  console.log(data);
}

// 