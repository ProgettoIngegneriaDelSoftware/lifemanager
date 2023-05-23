/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NuovaRicetta() {
  const [formData, setFormData] = useState({
    nome: "",
    procedimento: "",
    nomeIng: "",
    quantita: "",
  });

  const [formIng, setNewIngrediente] = useState({
    nomeIng: "",
    quantita: "",
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmitIngrediente = (event) => {
    //event.preventDefault();

    setNewIngrediente({ ...formIng, [event.target.name]: event.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    const url = "/api/v1/ricette/";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${token}`,
      },
      body: JSON.stringify({
        nome: formData.nome,
        procedimento: formData.procedimento,
        ingredienti: [
          { nome: formIng.nomeIng },
          { quantita: formIng.quantita },
        ],
      }),
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (response.ok) {
          // Se la risposta è OK, reindirizza a un'altra pagina
          navigate("/ricette");
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
      <h2>Nuova Ricetta</h2>

      <div>
        <form onSubmit={handleSubmit}>
          <label>
            {" "}
            Nome:
            <input
              id="nome"
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
            />
          </label>
          <hr></hr>
          <br></br>
          Procedimento:
          <br></br>
          <textarea
            id="procedimento"
            name="procedimento"
            value={formData.procedimento}
            rows="15"
            cols="70"
            onChange={handleInputChange}
          ></textarea>
          <hr></hr>
          <br></br>
          Ingredienti:
          <br></br>
          <div>
            nomeIngrediente:
            <input
              id="nomeIng"
              type="text"
              name="nomeIng"
              value={formIng.nomeIng}
              onChange={handleSubmitIngrediente}
            />
            quantita:
            <input
              id="quantitaIng"
              type="text"
              name="quantitaIng"
              value={formIng.quantita}
              onChange={handleSubmitIngrediente}
            />
            <button onClick={handleSubmitIngrediente}>
              Aggiungi Ingrediente
            </button>
          </div>
          <hr></hr>
          <br></br>
          <button type="submit">Aggiungi Ricetta</button>
        </form>
      </div>
    </>
  );
}

export default NuovaRicetta;
*/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NuovaRicetta() {
  const [nome, setNome] = useState("");
  const [procedimento, setProcedimento] = useState("");
  const [ingredienti, setIngredienti] = useState([{ nome: "", quantita: "" }]);
  const navigate = useNavigate();

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handleProcedimentoChange = (event) => {
    setProcedimento(event.target.value);
  };

  const handleIngredienteChange = (index, event) => {
    const { name, value } = event.target;
    const updatedIngredienti = [...ingredienti];
    updatedIngredienti[index][name] = value;
    console.log(updatedIngredienti);
    setIngredienti(updatedIngredienti);
  };

  const handleAggiungiIngrediente = () => {
    setIngredienti([...ingredienti, { nome: "", quantita: "" }]);
  };

  const handleRimuoviIngrediente = (index) => {
    const updatedIngredienti = [...ingredienti];
    updatedIngredienti.splice(index, 1);
    setIngredienti(updatedIngredienti);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const url = "/api/v1/ricette/";

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({
        nome: nome,
        procedimento: procedimento,
        ingredienti: ingredienti,
      }),
    };

    try {
      const response = await fetch(url, requestOptions);

      if (response.ok) {
        // Se la risposta è OK, reindirizza a un'altra pagina
        navigate("/ricette");
      } else {
        // Se la risposta non è OK, gestisci l'errore
        throw new Error("Error: " + response.status);
      }
    } catch (error) {
      console.error(error); // Gestisci gli errori
    }
  };

  return (
    <>
      <h2>Nuova Ricetta</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={handleNomeChange}
            required
          />
        </div>

        <div>
          <label htmlFor="procedimento">Procedimento:</label>
          <textarea
            id="procedimento"
            rows="5"
            value={procedimento}
            onChange={handleProcedimentoChange}
            required
          ></textarea>
        </div>

        <div>
          <h4>Ingredienti:</h4>
          {ingredienti.map((ingrediente, index) => (
            <div key={index}>
              <input
                type="text"
                name="nome"
                placeholder="Nome Ingrediente"
                value={ingrediente.nome}
                onChange={(event) => handleIngredienteChange(index, event)}
                required
              />
              <input
                type="text"
                name="quantita"
                placeholder="Quantità"
                value={ingrediente.quantita}
                onChange={(event) => handleIngredienteChange(index, event)}
                required
              />
              {index > 0 && (
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
        </div>

        <button type="submit">Aggiungi Ricetta</button>
      </form>
    </>
  );
}

export default NuovaRicetta;
