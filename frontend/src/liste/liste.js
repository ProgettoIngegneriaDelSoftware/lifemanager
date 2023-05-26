/*import React, { useEffect, useState } from "react";
import { OverlayTrigger, Popover, Button } from "react-bootstrap";

function Liste() {
  const url = "/api/v1/liste/";
  const token = localStorage.getItem("token");
  const [liste, setListe] = useState([]);

  const handleElimina = (item) => {
    const url = "/api/v1/liste/" + item;
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
          console.log("Lista eliminata");
          setListe((prevListe) =>
            prevListe.filter((elem) => elem.nome !== item)
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
        setListe(data);
      })
      .catch((error) => {
        console.error(error); // Gestisci gli errori
      });
  }, [url, token]);

  return (
    <>
      <div class="listeContainer">
        <h2>Liste</h2> <br />
        {liste.map((element, index) => (
          <p key={index}>
            <div className="input-group" style={{ display: "flex" }}>
              <a
                href={`/liste/${element.nome}`}
                style={{ textDecoration: "none" }}
              >
                <button className=" form-control " style={{ width: "500px" }}>
                  {element.nome}
                </button>{" "}
              </a>
              <OverlayTrigger
                trigger="click"
                placement="top"
                overlay={
                  <Popover id="popover-menu">
                    <Popover.Body>
                      <Button
                        variant="danger"
                        onClick={() => handleElimina(element.nome)}
                      >
                        Elimina
                      </Button>{" "}
                      <Button variant="primary">Modifica</Button>
                    </Popover.Body>
                  </Popover>
                }
              >
                <span className="input-group-text">
                  <img
                    src={process.env.PUBLIC_URL + "/trepunti.png"}
                    alt=""
                    className="trePunti"
                  />
                </span>
              </OverlayTrigger>

              <div id="menu" className="menu">
                <button>Modifica</button>
                <button>Elimina</button>
              </div>
            </div>
          </p>
        ))}
        <br />
        <a href="/nuovalista">
          <button>Nuova Lista</button>
        </a>
      </div>
    </>
  );
}

export default Liste;*/
import React, { useEffect, useState } from "react";
import { OverlayTrigger, Popover, Button } from "react-bootstrap";

function Liste() {
  const url = "/api/v1/liste/";
  const token = localStorage.getItem("token");
  const [liste, setListe] = useState([]);
  const [editingList, setEditingList] = useState("");
  const [newListName, setNewListName] = useState("");

  const handleElimina = (item) => {
    const deleteUrl = "/api/v1/liste/" + item;
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
    const url = "/api/v1/liste/" + editingList;
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

    fetch(url, requestOptions)
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
      <div className="listeContainer">
        <h2>Liste</h2> <br />
        {liste.map((element, index) => (
          <p key={index}>
            <div className="input-group" style={{ display: "flex" }}>
              {editingList === element.nome ? (
                <input
                  type="text"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                />
              ) : (
                <a
                  href={`/liste/${element.nome}`}
                  style={{ textDecoration: "none" }}
                >
                  <button className="form-control" style={{ width: "500px" }}>
                    {element.nome}
                  </button>{" "}
                </a>
              )}
              <OverlayTrigger
                trigger="click"
                placement="top"
                overlay={
                  <Popover id="popover-menu">
                    <Popover.Body>
                      <Button
                        variant="danger"
                        onClick={() => handleElimina(element.nome)}
                      >
                        Elimina
                      </Button>{" "}
                      {editingList === element.nome ? (
                        <Button variant="primary" onClick={handleSaveModifica}>
                          Salva
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          onClick={() => handleModifica(element.nome)}
                        >
                          Modifica
                        </Button>
                      )}
                    </Popover.Body>
                  </Popover>
                }
              >
                <span className="input-group-text">
                  <img
                    src={process.env.PUBLIC_URL + "/trepunti.png"}
                    alt=""
                    className="trePunti"
                  />
                </span>
              </OverlayTrigger>

              <div id="menu" className="menu">
                <button>Modifica</button>
                <button>Elimina</button>
              </div>
            </div>
          </p>
        ))}
        <br />
        <a href="/nuovalista">
          <button>Nuova Lista</button>
        </a>
      </div>
    </>
  );
}

export default Liste;
