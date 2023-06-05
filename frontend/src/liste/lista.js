import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Lista() {
  const { nomelista } = useParams();
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState("");
  const [newItemName, setNewItemName] = useState("");

  const handleCheckboxChange = (itemId, checked) => {
    const url = "/api/v1/liste/" + nomelista + "/elementi/" + itemId;
    const token = localStorage.getItem("token");

    let contrassegnoValue;
    if (checked) {
      contrassegnoValue = true; // Imposta a true se checked è true
    } else {
      contrassegnoValue = false; // Imposta a false se checked è false
    }

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${token}`,
      },
      body: JSON.stringify({
        contrassegno: contrassegnoValue,
      }),
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (response.ok) {
          // Aggiornamento del campo "contrassegno" nel database avvenuto con successo
          console.log("check modificato");
        } else {
          throw new Error("Error: " + response.status);
        }
      })
      .catch((error) => {
        console.error(error); // Gestisci gli errori
      });
  };

  const handleElimina = (item) => {
    const url = "/api/v1/liste/" + nomelista + "/elementi/" + item._id;
    const token = localStorage.getItem("token");

    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${token}`,
      },
    };
    fetch(url, requestOptions)
      .then((response) => {
        if (response.ok) {
          console.log("Elemento eliminato");
          setItems((prevItems) =>
            prevItems.filter((elem) => elem.nome !== item.nome)
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

  const handleSaveModifica = (itemId) => {
    console.log(editingItem);

    const url = "/api/v1/liste/" + nomelista + "/elementi/" + itemId;
    const token = localStorage.getItem("token");

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${token}`,
      },
      body: JSON.stringify({
        nome: newItemName,
      }),
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (response.ok) {
          console.log("Ing modificato");
          // Puoi eseguire un'azione aggiuntiva dopo la modifica, come il reindirizzamento a un'altra pagina
        } else {
          throw new Error("Error: " + response.status);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    // Aggiorna lo stato delle liste con il nuovo nome modificato
    setItems((prevItems) =>
      prevItems.map((elem) =>
        elem.nome === editingItem ? { ...elem, nome: newItemName } : elem
      )
    );

    // Resetta le variabili di editing
    setEditingItem("");
    setNewItemName("");
  };

  const handleModifica = (item) => {
    setEditingItem(item);
    setNewItemName(item);
  };

  const handleSvuota = () => {
    const url = "/api/v1/liste/" + nomelista + "/elementi";
    const token = localStorage.getItem("token");

    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${token}`,
      },
    };
    fetch(url, requestOptions)
      .then((response) => {
        if (response.ok) {
          console.log("Elemento/i eliminato/i");
          const updatedItems = items.filter((item) => !item.contrassegno);
          setItems(updatedItems); // Aggiorna l'array items con gli elementi rimanenti
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
    const url = "/api/v1/liste/" + nomelista + "/elementi";
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
        setItems(data.items); // Imposta lo stato `items` con i dati ottenuti dalla richiesta
      })
      .catch((error) => {
        console.error(error); // Gestisci gli errori
      });
  }, [nomelista]);

  const handleCheckboxChangeItem = (itemId, checked) => {
    const updatedItems = items.map((item) => {
      if (item._id === itemId) {
        return { ...item, contrassegno: checked };
      }
      return item;
    });

    setItems(updatedItems);

    const contrassegnoValue = checked ? true : false;

    handleCheckboxChange(itemId, contrassegnoValue); // Chiamata alla funzione handleCheckboxChange per salvare nel database
  };

  const renderedItems = items.map((item) => {
    return (
      <div key={item._id}>
        {editingItem === item.nome ? (
          <>
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              class="form-control" placeholder="Nome"
            /> <br />
            <button onClick={() => handleSaveModifica(item._id)} className="btn btn-outline-primary">Salva</button>
          </>
        ) : (
          <>
            <input
              type="checkbox"
              checked={item.contrassegno}
              onChange={(e) =>
                handleCheckboxChangeItem(item._id, e.target.checked)
              }
            />
            <span>Nome: {item.nome}</span>
            <span>
              <button value={item.nome} onClick={() => handleModifica(item.nome)} className="btn btn-outline-primary">Modifica</button>
              <button value={item.nome} onClick={() => handleElimina(item)} className="btn btn-outline-danger">
                Elimina
              </button>
            </span>
          </>
        )}
        <br />
        <hr />
      </div>
    );
  });

  return (
    <>
      <div className="intestazione">
        <h2>Liste</h2>
      </div>

      <div className='listeContainer'>

        <div className="liste">
          <h5>{nomelista}</h5> <br />
          <div id="result">{renderedItems}</div>
          <br />

          <div class="row justify-content-evenly">
            <div class="col-5">
              <a href={`/${nomelista}/nuovoelemento`}>
                <button className="btn btn-outline-success">Nuovo Elemento</button>
              </a>
            </div><div class="col-5">
              <button onClick={handleSvuota} class="btn btn-outline-danger">Svuota lista</button>
            </div>
          </div>

        </div>


      </div>


    </>
  );
}

export default Lista;
