import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
      {/* 
      <div>
        <form onSubmit={handleSubmit}>
          <label for="usernameORemail">{" "}Username or Email:</label>
          <input id="usernameORemail" type="text" name="usernameORemail" value={formData.usernameORemail} onChange={handleInputChange}/>

          <br></br>
          <label for="password">{" "}Password:</label>
          <input id="password" type="password" name="password" value={formData.password} onChange={handleInputChange}/>
          <br></br>
          <a href={`/homepage/${userData.email}`}>
            <button type="submit">Login</button>
          </a>
        </form>
        <a href="/registrati">
          <button>Registrazione</button>
        </a>
        {result}
  </div> */}


      <div class='formlogin'>
        <h2>Login</h2><br /><br />
        <form onSubmit={handleSubmit}>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">@</span>
            </div>
            <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
          </div>

          <div className="mb-3" >
            <div style={{ display: 'flex' }}>
              <span style={{ marginRight: '5px' }} id="basic-addon1">@</span>
              <input
                type="text"
                className="form-control"
                id="usernameORemail"
                placeholder="Enter email or username"
                name="usernameORemail"
                onChange={handleInputChange}
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
            />
          </div>
          <a href={`/homepage/${userData.email}`}>
            <button className="btn btn-outline-success" type="submit">
              Login
            </button>
          </a>
          <br /><br />
          <p style={{ color: 'red' }}>{result}</p>
        </form>

        <br />
        <a href="/registrati">
          <button className="btn btn-outline-success" type="button">
            Registrati
          </button>
        </a>
      </div>

    </>
  );
}

export default Login;
