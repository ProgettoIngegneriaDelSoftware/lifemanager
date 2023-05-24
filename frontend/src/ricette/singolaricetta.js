/*import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SingolaRicetta() {
  const { nomericetta } = useParams();
  const [itemRicetta, setItems] = useState([]);

  useEffect(() => {
    const url = "/api/v1/ricette/" + nomericetta;
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
        setItems(data); // Imposta lo stato `items` con i dati ottenuti dalla richiesta
      })
      .catch((error) => {
        console.error(error); // Gestisci gli errori
      });
  }, [nomericetta]);

  return (
    <>
      <h2>{nomericetta}</h2>
      <div id="result">
        <h4>Ingredienti:</h4>
        {itemRicetta.ingredienti &&
          itemRicetta.ingredienti.map((element, index) => (
            <p key={index}>
              {element.quantita} di {element.nome}
            </p>
          ))}
        <hr></hr>
        <h4>Procedimento:</h4>
        {itemRicetta.procedimento}
      </div>
    </>
  );
}

export default SingolaRicetta;
*/

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SingolaRicetta() {
  const { nomericetta } = useParams();
  const [itemRicetta, setItemRicetta] = useState(null);
  const [formValues, setFormValues] = useState({
    nome: "",
    procedimento: "",
    ingredienti: [],
  });

  useEffect(() => {
    // Funzione per ottenere i dettagli della ricetta esistente
    const getRicettaDetails = () => {
      const url = "/api/v1/ricette/" + nomericetta;
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
          setItemRicetta(data);
          setFormValues({
            nome: data.nome,
            procedimento: data.procedimento,
            ingredienti: data.ingredienti,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getRicettaDetails(); // Richiama la funzione per ottenere i dettagli della ricetta
  }, [nomericetta]);

  const handleInputChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const handleModifica = () => {
    const url = "/api/v1/ricette/" + nomericetta;
    const token = localStorage.getItem("token");

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${token}`,
      },
      body: JSON.stringify(formValues),
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (response.ok) {
          console.log("Ricetta modificata");
          // Puoi eseguire un'azione aggiuntiva dopo la modifica, come il reindirizzamento a un'altra pagina
        } else {
          throw new Error("Error: " + response.status);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (!itemRicetta) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div id="result">
        <textarea
          name="nomeRicetta"
          value={nomericetta}
          onChange={handleInputChange}
        ></textarea>
        <input
          name="nomeRicetta"
          value={nomericetta}
          onChange={handleInputChange}
        ></input>
        <h4>Ingredienti:</h4>
        {itemRicetta.ingredienti &&
          itemRicetta.ingredienti.map((element, index) => (
            <p key={index}>
              {element.quantita} di {element.nome}
            </p>
          ))}
        <hr></hr>
        <h4>Procedimento:</h4>
        <textarea
          name="procedimento"
          value={formValues.procedimento}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <button onClick={handleModifica}>Modifica</button>
    </>
  );
}

export default SingolaRicetta;
