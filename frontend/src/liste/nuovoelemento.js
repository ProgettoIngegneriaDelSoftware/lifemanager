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

    const url = "https://lifemanagersprint2-backend.onrender.com/api/v1/liste/" + nomelista + "/elementi";
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
      <div className="intestazione">
        <h2>Liste</h2>
      </div>

      <div className='listeContainer'>
        <h5>Nuovo Elemento</h5> <br />

        <div className="liste">
          <div>
            <form onSubmit={handleSubmit}>
              <div className="form-floating">
                {formData.map((elem, index) => (
                  <div key={index}>
                    <br />
                    <div className="input-group">
                      <input
                        type="text"
                        name="nome"
                        placeholder="Nome"
                        onChange={(event) => handleInputChange(event, index)}
                        required
                        className="form-control"
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => handleRimuoviElem(index)}
                          className="btn btn-outline-danger"
                        >
                          Rimuovi
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <br />
              <button
                type="button"
                onClick={handleAggiungiElem}
                className="btn btn-outline-success"
              >
                Aggiungi un altro elemento
              </button>
              <br /><br /><hr />
              <button type="submit" className="btn btn-success">Aggiungi Elemento</button>
            </form>
          </div>
        </div>
      </div>
    </>

  );
}

export default NuovoElemento;
