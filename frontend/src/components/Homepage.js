import { useEffect } from "react";
import { useState } from "react";

function Homepage() {
  let [nome, setResult] = useState("");

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
          (nome = {
            value: data.nome,
            access: true,
          })
        );
      })
      .catch((error) => {
        setResult(
          (nome = {
            value: "",
            access: false,
          })
        );
        console.error(error); // Gestisci gli errori
      });
  }, []);

  return (
    <>
      {nome.access && (
        <>
          <div class="intestazione">
            <h5>Benvenuto {nome.value}</h5>
            <p>Organizza la tua vita, inizia qui!</p>
          </div>

          <div class="buttonContainer">
            <a href="/movimenti">
              <button className="bottoniHomePage">
                Budget<br /> <br />
                <img src={process.env.PUBLIC_URL + '/budget.png'} alt="" class="iconeHomePage" />
              </button>
            </a>
            <a href="/liste">
              <button className="bottoniHomePage">
                Liste<br /> <br />
                <img src={process.env.PUBLIC_URL + '/liste.png'} alt="" class="iconeHomePage" />
              </button>
            </a> <br />
            <a href="/ricette">
              <button className="bottoniHomePage">
                Ricette<br /> <br />
                <img src={process.env.PUBLIC_URL + '/ricetta.png'} alt="" class="iconeHomePage" />
              </button>
            </a>
            <a href="/carte">
              <button className="bottoniHomePage">
                Carte fedeltà<br /> <br />
                <img src={process.env.PUBLIC_URL + '/cartaFedelta.png'} alt="" class="iconeHomePage" />
              </button>
            </a>
            <br />
            <a href="/mappa">
              <button className="bottoniHomePage">
                Mappa<br /> <br />
                <img src={process.env.PUBLIC_URL + '/mappa.png'} alt="" class="iconeHomePage" />
              </button>
            </a>
            <a href="/eventi">
              <button className="bottoniHomePage">
                Eventi<br /> <br />
                <img src={process.env.PUBLIC_URL + '/calendario.png'} alt="" class="iconeHomePage" />
              </button>
            </a><br /> <br />
          </div>
        </>
      )}
      {!nome.access && (
        <>
          <div class="intestazione">
            <p style={{ color: 'red' }}>Accesso negato, autenticati!</p>
            <a href="/">
              <button className="btn btn-outline-success">Autenticati</button>
            </a>
          </div>
        </>
      )}
    </>
  );
}

export default Homepage;
