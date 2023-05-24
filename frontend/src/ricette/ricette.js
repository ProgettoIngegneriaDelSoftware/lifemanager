import React, { useEffect, useState } from "react";

function Ricette() {
  const url = "/api/v1/ricette/";
  const token = localStorage.getItem("token");
  const [ricette, setRicette] = useState([]);

  const handleElimina = (event) => {
    console.log(url + event.target.value);
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
      .then(() => {})
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
      <h2>Ricette</h2>
      <div>
        {ricette.map((element, index) => (
          <p>
            <a href={`/ricette/${element.nome}`} key={index}>
              {element.nome}
            </a>
            <button>Modifica</button>
            <button value={element.nome} onClick={handleElimina}>
              Elimina
            </button>
          </p>
        ))}
      </div>
      <a href="/nuovaricetta">
        <button>Nuova Ricetta</button>
      </a>
    </>
  );
}

export default Ricette;

/*
  const handleElimina = (event) => {
    console.log("ciao");
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
          return response.json();
        } else {
          throw new Error("Error: " + response.status);
        }
      })
      .then(() => {
        console.log("Ricetta eliminata");
      })
      .catch((error) => {
        console.error(error); // Gestisci gli errori
      });
  };*/
