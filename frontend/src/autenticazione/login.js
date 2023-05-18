import React, { useState } from 'react';


function Login() {
    let userData={}

    const [formData, setFormData] = useState({
      usernameORemail: '',
      password: '',
    });

    const [result, setResult] = useState('')
  
  
    const handleInputChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
    
      const url = '/api/v1/authentications/';
    
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.usernameORemail,
          password: formData.password
        })
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
          console.log(data); // Stampa la risposta del backend nella console
          
          setResult(<p>{data.message}</p>) 
          userData = {
            id: data.id,
            email: data.email,
            token: data.token,
            message: data.message
          };
        })
        .catch((error) => {
          console.error(error); // Gestisci gli errori
        });
    };
  
    return (
      <>
      <h2>Login</h2>
      
      <div>
        <form onSubmit={handleSubmit}>
          
          <label> Username or Email:
            <input id="usernameORemail" type="email" name="usernameORemail" value={formData.usernameORemail} onChange={handleInputChange}/>
          </label>
          <br></br>
          <label> Password:
            <input id="password" type="password" name="password" value={formData.password} onChange={handleInputChange}/>
          </label>
          <br></br>
          <button type="submit">Login</button>

        </form>
        <a href="/registrati"><button>Registrazione</button></a>
        {result}
      </div>
      </>
    );
  }
  
  export default Login;