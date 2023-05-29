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
  const [ingredienti, setIngredienti] = useState([{ nome: "", quantita: "" }]);

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
          setIngredienti(data.ingredienti);
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

  const handleIngredienteChange = (index, event) => {
    const { name, value } = event.target;
    const updatedIngredienti = [...ingredienti];
    updatedIngredienti[index][name] = value;
    //console.log(updatedIngredienti);
    setIngredienti(updatedIngredienti);
  };

  const handleAggiungiaSpesa = (index, event) => {
    const url = "/api/v1/liste/Lista della Spesa/elementi";
    const token = localStorage.getItem("token");

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${token}`,
      },
      body: JSON.stringify({
        items: ingredienti.map((element) => element.nome),
      }),
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (response.ok) {
          console.log("Ingredienti aggiunti correttamente");
          // Puoi eseguire un'azione aggiuntiva dopo la modifica, come il reindirizzamento a un'altra pagina
        } else {
          throw new Error("Error: " + response.status);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAggiungiIngrediente = () => {
    setIngredienti([...ingredienti, { nome: "", quantita: "" }]);
  };

  const handleRimuoviIngrediente = (index) => {
    const updatedIngredienti = [...ingredienti];
    updatedIngredienti.splice(index, 1);
    setIngredienti(updatedIngredienti);
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
      body: JSON.stringify({
        nome: formValues.nome,
        procedimento: formValues.procedimento,
        ingredienti: ingredienti,
      }),
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
          name="nome"
          value={formValues.nome}
          onChange={handleInputChange}
        ></textarea>
        <h4>Ingredienti:</h4>
        {ingredienti.map((element, index) => (
          <div key={index}>
            <input
              name="nome"
              value={element.nome}
              onChange={(event) => handleIngredienteChange(index, event)}
            />
            <input
              name="quantita"
              value={element.quantita}
              onChange={(event) => handleIngredienteChange(index, event)}
            />
            {index >= 0 && (
              <button
                type="button"
                onClick={() => handleRimuoviIngrediente(index)}
              >
                Rimuovi
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAggiungiIngrediente}>
          Aggiungi Ingrediente
        </button>
        <br />
        <button type="button" onClick={handleAggiungiaSpesa}>
          Aggiungi ingredienti a lista della spesa
        </button>
        <hr></hr>
        <h4>Procedimento:</h4>
        <textarea
          name="procedimento"
          rows="11"
          cols="50"
          value={formValues.procedimento}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <button onClick={handleModifica}>Modifica</button>
    </>
  );
}

export default SingolaRicetta;
