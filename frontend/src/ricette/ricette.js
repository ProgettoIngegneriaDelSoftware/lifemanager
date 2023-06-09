import React, { useEffect, useState } from "react";

function Ricette() {
  const url = "https://lifemanagersprint2-backend.onrender.com/api/v1/ricette/";
  const token = localStorage.getItem("token");
  const [ricette, setRicette] = useState([]);

  const handleElimina = (event) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${token}`,
      },
    };
    fetch(url + event.target.value, requestOptions)
      .then((response) => {
        if (response.ok) {
          console.log("Ricetta eliminata");
          setRicette((prevRicette) =>
            prevRicette.filter((ricetta) => ricetta.nome !== event.target.value)
          );
          return;
        } else {
          throw new Error("Error: " + response.status);
        }
      })
      .then(() => { })
      .catch((error) => {
        console.error(error); // Gestisci gli errori
      });
  };

  useEffect(() => {
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
        setRicette(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [url, token]);

  return (
    <>
      <div className="divheader">
        <div className="intestazione">
          <h2>Ricette</h2>
        </div>
      </div>

      <div class="buttonContainer">
        <div class="ricette"><center>
          <div class="btn-group" role="group">
            {ricette.map((element, index) => (
              <p>
                <a href={`/ricette/${element.nome}`} key={index}>
                  <button class="btn btn-outline-dark" style={{ width: '400px' }}>{element.nome}</button>
                </a>
                <button value={element.nome} onClick={handleElimina} class="btn btn-outline-danger">
                  Elimina
                </button>
              </p>
            ))}
          </div>
          <hr></hr>
          <a href="/nuovaricetta">
            <button class="btn btn-outline-success">Nuova Ricetta</button>
          </a>

        </center></div></div>
    </>
  );
}

export default Ricette;
