import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function NuovoElemento() {
  const { nomelista } = useParams();
  const [formData, setFormData] = useState([{ nome: "" }]);

  const handleInputChange = (event, index) => {
    const value = event.target.value;
    const updatedData = [...formData];
    updatedData[index] = { nome: value };
    setFormData(updatedData);
  };

  const navigate = useNavigate();

  const handleAggiungiElem = () => {
    setFormData([...formData, { nome: "" }]);
  };

  const handleRimuoviElem = (index) => {
    const updatedData = [...formData];
    updatedData.splice(index, 1);
    setFormData(updatedData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    const url = "/api/v1/liste/" + nomelista + "/elementi";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${token}`,
      },
      body: JSON.stringify({
        items: formData.map((item) => item.nome),
      }),
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (response.ok) {
          // Se la risposta è OK, reindirizza a un'altra pagina
          navigate("/liste/" + nomelista);
        } else {
          // Se la risposta non è OK, gestisci l'errore
          throw new Error("Error: " + response.status);
        }
      })
      .catch((error) => {
        console.error(error); // Gestisci gli errori
      });
  };

  return (
    <>
      <h2>Nuovo Elemento</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <h4>Nome:</h4>
          {formData.map((elem, index) => (
            <div key={index}>
              <input
                type="text"
                name="nome"
                placeholder="Nome elemento"
                onChange={(event) => handleInputChange(event, index)}
                required
              />
              {index > 0 && (
                <button type="button" onClick={() => handleRimuoviElem(index)}>
                  Rimuovi
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAggiungiElem}>
            Aggiungi elemento da aggiungere
          </button>
        </div>
        <br></br>
        <button type="submit">Aggiungi Elemento</button>
      </form>
    </>
  );
}

export default NuovoElemento;
