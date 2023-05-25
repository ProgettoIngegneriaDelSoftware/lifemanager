import React, { useEffect, useState } from "react";
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';

function Liste() {
  const url = '/api/v1/liste/';
  const token = localStorage.getItem('token');
  const [liste, setListe] = useState([]);


  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${token}`
      }
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error: ' + response.status);
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
      <div class='listeContainer'>
        <h2>Liste</h2> <br />

        {liste.map((element, index) => (
          <p key={index}>
            <div className="input-group" style={{ display: 'flex' }}>
              <a href={`/liste/${element.nome}`} style={{ textDecoration: 'none' }}>
                <button className=" form-control " style={{ width: '500px' }}>{element.nome}</button> </a>
              <OverlayTrigger
                trigger="click"
                placement="top"
                overlay={
                  <Popover id="popover-menu">
                    <Popover.Body>
                      <Button variant="danger">Elimina</Button>{' '}
                      <Button variant="primary">Modifica</Button>
                    </Popover.Body>
                  </Popover>
                }
              >
                <span className="input-group-text">
                  <img src={process.env.PUBLIC_URL + '/trepunti.png'} alt="" className="trePunti" />
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
        <a href="/nuovalista"><button>Nuova Lista</button></a>
      </div >
    </>
  );
}

export default Liste;
