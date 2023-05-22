import React, { useState } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
require('dotenv').config()

function NuovoElemento() {
  const { nomelista } = useParams();
  const [formData, setFormData] = useState({
    nome: '',
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    const url = process.env.BackendURL+'/api/v1/liste/' + nomelista + '/elementi';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token' : `${token}`
      },
      body: JSON.stringify({
        items: [formData.nome]
      })
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (response.ok) {
          // Se la risposta è OK, reindirizza a un'altra pagina
          navigate('/liste/'+nomelista);
        } else {
          // Se la risposta non è OK, gestisci l'errore
          throw new Error('Error: ' + response.status);
        }
      })
      .catch((error) => {
        console.error(error); // Gestisci gli errori
      });
  };

  return (
    <>
      <h2>Nuovo Elemento</h2>
      
      <div>
        <form onSubmit={handleSubmit}>
          <label> Nome:
            <input id="nome" type="text" name="nome" value={formData.nome} onChange={handleInputChange}/>
          </label>
          <br></br>
          <button type="submit">Aggiungi Elemento</button>
        </form>
      </div>
    </>
  );
}

export default NuovoElemento;
