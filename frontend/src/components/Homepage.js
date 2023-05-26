import { useEffect } from "react";
import { useState } from "react";

function Homepage() {
  let [usernameOrEmail, setResult] = useState("");

  useEffect(() => {
    const url = "/api/v1/users/me";
    const token = localStorage.getItem("token");

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${token}`,
      },
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error: " + response.status);
        }
      })
      .then((data) => {
        console.log(data);
        setResult(
          (usernameOrEmail = {
            value: data.email,
            access: true,
          })
        );
      })
      .catch((error) => {
        setResult(
          (usernameOrEmail = {
            value: "",
            access: false,
          })
        );
        console.error(error); // Gestisci gli errori
      });
  }, []);

  return (
    <>
      {usernameOrEmail.access && (
        <>
          <h2>Benvenuto {usernameOrEmail.value}</h2>
          <p>Organizza la tua vita, inizia qui!</p>

          <div>
            <a href="/movimenti">
              <button>Budget</button>
            </a>
            <a href="/liste">
              <button>Liste</button>
            </a>
            <a href="/ricette">
              <button>Ricette</button>
            </a>
            <a href="/listacarte">
              <button>Carte fedeltà</button>
            </a>
          </div>
        </>
      )}
      {!usernameOrEmail.access && (
        <>
          <p>Accesso negato, autenticati!</p>
          <a href="/">
            <button>Autenticati</button>
          </a>
        </>
      )}
    </>
  );
}

export default Homepage;
