import React, { useState } from "react";

function Login() {
  let userData = {};

  const [formData, setFormData] = useState({
    usernameORemail: "",
    password: "",
  });

  const [result, setResult] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const url = "/api/v1/authentications/";

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.usernameORemail,
        username: formData.usernameORemail,
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

        setResult(<>{data.message}</>);
        userData = {
          id: data.id,
          email: data.email,
          token: data.token,
          message: data.message,
        };
        localStorage.setItem("token", userData.token);
        if (data.success) {
          window.location.href = `/homepage`;
        }
      })
      .catch((error) => {
        console.error(error); // Gestisci gli errori
      });
  };

  return (
    <>
      <div class='formlogin'>
        <h2>Login</h2><br /><br />

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
                id="usernameORemail"
                placeholder="Email or Username"
                name="usernameORemail"
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
                id="password"
                placeholder="Password"
                name="password"
                onChange={handleInputChange}
              />
            </div>
          </div>


          <a href={`/homepage/${userData.email}`}>
            <button className="btn btn-outline-success" type="submit">
              Login
            </button>
          </a>
          <br /><br />
          <p style={{ color: 'red' }}>{result}</p>
        </form >

        <br />
        <a href="/registrati">
          <button className="btn btn-outline-success" type="button">
            Registrati
          </button>
        </a>
      </div >

    </>
  );
}

export default Login;
