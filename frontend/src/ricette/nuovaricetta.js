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
    //console.log(updatedIngredienti);
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
      <div class="buttonContainer">
        <div class="ricette"><center>
          <h2>Nuova Ricetta</h2>

          <form onSubmit={handleSubmit} class="form-floating">
            <div class="form-floating">

              <input
                id="nome"
                type="text"
                value={nome}
                onChange={handleNomeChange}

                class="form-control form-control-lg"
                required

              />
              <label htmlFor="nome" for="nome">Nome</label>
            </div>
            <br></br>
            <hr></hr>
            <div class="form-group">
              <h4 htmlFor="procedimento" for="procedimento">Procedimento</h4>
              <textarea
                id="procedimento"
                rows="11"
                cols="50"
                value={procedimento}
                onChange={handleProcedimentoChange}
                class="form-control"
                required
              ></textarea>

            </div>
            <br></br>
            <hr></hr>
            <div>
              <h4>Ingredienti</h4>
              {ingredienti.map((ingrediente, index) => (
                <div key={index} class="input-group">
                  <div class="form-floating col-5">
                    <input
                      type="text"
                      name="nome"
                      placeholder="Ingrediente"
                      value={ingrediente.nome}
                      onChange={(event) => handleIngredienteChange(index, event)}
                      class="form-control" id="floatingInput1"
                      required
                    />
                    <label for="floatingInput1">Ingrediente</label>
                  </div>
                  <div class="form-floating col-5">
                    <input
                      type="text"
                      name="quantita"
                      placeholder="Quantità"
                      value={ingrediente.quantita}
                      onChange={(event) => handleIngredienteChange(index, event)}
                      class="form-control" id="floatingInput1"
                      required
                    />
                    <label for="floatingInput1">Quantità</label>
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRimuoviIngrediente(index)}
                      class="btn btn-outline-danger"
                    >
                      Rimuovi
                    </button>
                  )}
                </div>
              ))}
              <br></br>
              <button type="button" onClick={handleAggiungiIngrediente}
                class="btn btn-outline-dark"
              >
                Aggiungi Ingrediente
              </button>
            </div>
            <br></br>

            <button type="submit" class="btn btn-outline-success">Aggiungi Ricetta</button>
          </form>
        </center></div></div>
    </>
  );
}

export default NuovaRicetta;
