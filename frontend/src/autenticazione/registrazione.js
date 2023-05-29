import React, { useState } from "react";
//import axios from 'axios';

function Registrati() {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    username: "",
    email: "",
    password: "",
    confPassword: ""
  });

  const [result, setResult] = useState("");

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const url = "/api/v1/users/";

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: formData.nome,
        cognome: formData.cognome,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confermaPassword: formData.confPassword
      }),
    };
    fetch(url, requestOptions)
      .then((response) => {
        if (response.ok) {
          window.location.href = `/`;
          return response.json();
        } else {
          return response.text().then((errorMessage) => {
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data); // Stampa la risposta del backend nella console
        setResult("");
      })
      .catch((error) => {
        console.error(error); // Gestisci gli errori
        setResult(error.message.includes('error') ? JSON.parse(error.message).error : error.message);
      });
  };

  return (
    <>
      <div class='formregistrazione'>
        <h2>Registrati</h2><br /><br />

        <form onSubmit={handleSubmit}>

          <div className="mb-3" >
            <div className="input-group" style={{ display: 'flex' }}>
              <span
                className="input-group-text"
              >
                <img src={process.env.PUBLIC_URL + '/utente.png'} alt="" class="iconeform" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="nome"
                onChange={handleInputChange}
              />
            </div>

          </div>
          <div className="mb-3">
            <div className="input-group" style={{ display: 'flex' }}>
              <span
                className="input-group-text"
              >
                <img src={process.env.PUBLIC_URL + '/utente.png'} alt="" class="iconeform" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Surname"
                name="cognome"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="input-group" style={{ display: 'flex' }}>
              <span
                className="input-group-text"
              >
                <img src={process.env.PUBLIC_URL + '/utente.png'} alt="" class="iconeform" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                name="username"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="input-group" style={{ display: 'flex' }}>
              <span
                className="input-group-text"
              >
                @
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="input-group" style={{ display: 'flex' }}>
              <span
                className="input-group-text"
              >
                <img src={process.env.PUBLIC_URL + '/lucchetto.png'} alt="" class="iconeform" />
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="input-group" style={{ display: 'flex' }}>
              <span
                className="input-group-text"
              >
                <img src={process.env.PUBLIC_URL + '/lucchetto.png'} alt="" class="iconeform" />
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Conferma Password"
                name="confPassword"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <button className="btn btn-outline-success" type="submit">
            Registrati
          </button>
          <br /><br />
          <p style={{ color: 'red' }}>{result}</p>
        </form >

        <br />
        <p>Hai già un account?</p>
        <a href="/">
          <button className="btn btn-outline-success" type="button">
            Accedi
          </button>
        </a>
      </div >

    </>
  );
}

export default Registrati;
