import React, { useState } from "react";
//import axios from 'axios';

function Registrati() {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    username: "",
    email: "",
    password: "",
  });

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
      }),
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
        console.log(data); // Stampa la risposta del backend nella console
      })
      .catch((error) => {
        console.error(error); // Gestisci gli errori
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          {" "}
          Nome:
          <input
            type="text"
            name="nome"
            value={formData.nome}
            required
            onChange={handleInputChange}
          />
        </label>
        <label>
          {" "}
          Cognome:
          <input
            id="cognome"
            type="text"
            name="cognome"
            value={formData.cognome}
            required
            onChange={handleInputChange}
          />
        </label>
        <label>
          {" "}
          Username:
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            required
            onChange={handleInputChange}
          />
        </label>
        <label>
          {" "}
          Email:
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            required
            onChange={handleInputChange}
          />
        </label>
        <label>
          {" "}
          Password:
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            required
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Registrati</button>
      </form>
    </>
  );
}

export default Registrati;
