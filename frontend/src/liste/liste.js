import React, { useEffect, useState } from "react";

function Liste() {
  const url = "https://lifemanagersprint2-backend.onrender.com/api/v1/liste/";
  const token = localStorage.getItem("token");
  const [liste, setListe] = useState([]);
  const [editingList, setEditingList] = useState("");
  const [newListName, setNewListName] = useState("");

  const handleElimina = (item) => {
    const deleteUrl = url + item;
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${token}`,
      },
    };
    fetch(deleteUrl, requestOptions)
      .then((response) => {
        if (response.ok) {
          console.log("Lista eliminata");
          setListe((prevListe) =>
            prevListe.filter((elem) => elem.nome !== item)
          );
        } else {
          throw new Error("Error: " + response.status);
        }
      })
      .catch((error) => {
        console.error(error); // Gestisci gli errori
      });
  };

  const handleModifica = (item) => {
    setEditingList(item);
    setNewListName(item);
  };

  const handleSaveModifica = () => {
    // Implementa la logica per salvare la modifica del nome della lista
    // Puoi utilizzare la variabile "newListName" per ottenere il nuovo nome
    const urlModifica = url + editingList;
    const token = localStorage.getItem("token");

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${token}`,
      },
      body: JSON.stringify({
        nome: newListName,
      }),
    };

    fetch(urlModifica, requestOptions)
      .then((response) => {
        if (response.ok) {
          console.log("Lista modificata");
          // Puoi eseguire un'azione aggiuntiva dopo la modifica, come il reindirizzamento a un'altra pagina
        } else {
          throw new Error("Error: " + response.status);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    console.log("Salva modifica lista: ", newListName);

    // Aggiorna lo stato delle liste con il nuovo nome modificato
    setListe((prevListe) =>
      prevListe.map((elem) =>
        elem.nome === editingList ? { ...elem, nome: newListName } : elem
      )
    );

    // Resetta le variabili di editing
    setEditingList("");
    setNewListName("");
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
        setListe(data);
      })
      .catch((error) => {
        console.error(error); // Gestisci gli errori
      });
  }, [url, token]);

  return (
    <>


      <div className="intestazione">
        <h2>Liste</h2>
      </div>


      <div class="listeContainer">
        <div className="liste">
          {liste.map((element, index) => (
            <p key={index}>
              {element.nome === "Lista della Spesa" || element.nome === "To-Do-List" ? (
                <a href={`/liste/${element.nome}`} style={{ textDecoration: "none" }}>
                  <button type="button" className="btn btn-outline-dark">
                    {element.nome}
                  </button>
                </a>
              ) : (

                editingList === element.nome ? (
                  <>
                    <div className="input-group">
                      <input
                        type="text"
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                        class="form-control" placeholder="Nome"
                      /> <br />
                      <button onClick={() => handleSaveModifica(element.nome)} className="btn btn-outline-primary">Salva</button>
                    </div>

                  </>
                ) : (
                  <p>

                    <a href={`/liste/${element.nome}`} style={{ textDecoration: "none" }}>
                      <button type="button" className="btn btn-outline-dark" style={{ width: '285px' }}>
                        {element.nome}
                      </button>
                    </a>
                    <button value={element.nome} onClick={() => handleModifica(element.nome)} class="btn btn-outline-primary">
                      Modifica
                    </button>
                    <button value={element.nome} onClick={() => handleElimina(element.nome)} class="btn btn-outline-danger">
                      Elimina
                    </button>
                  </p>
                )
              )}
            </p>
          ))}

        </div>
        <br /><hr />
        <a href="/nuovalista">
          <button type="button" class="btn btn-outline-primary">Nuova lista</button>
        </a> <br /><br />
      </div >
    </>
  );
}

export default Liste;
