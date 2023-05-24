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
          name="nome"
          value={formValues.nome}
          onChange={handleInputChange}
        ></textarea>
        <h4>Ingredienti:</h4>
        {formValues.ingredienti.map((element, index) => (
          <div key={index}>
            <input
              name={`ingredienti[${index}].nome`}
              value={element.nome}
              onChange={(event) => handleIngredienteChange(index, event)}
            />
            <input
              name={`ingredienti[${index}].quantita`}
              value={element.quantita}
              onChange={(event) => handleIngredienteChange(index, event)}
            />
          </div>
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
