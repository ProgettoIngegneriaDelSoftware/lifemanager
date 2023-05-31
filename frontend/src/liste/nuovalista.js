import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NuovaLista() {
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

    const url = '/api/v1/liste/';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${token}`
      },
      body: JSON.stringify({
        nome: formData.nome,
      })
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (response.ok) {
          // Se la risposta è OK, reindirizza a un'altra pagina
          navigate('/liste');
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

      <div className="intestazione">
        <h2>Liste</h2>
      </div>



      <div className='listeContainer'>
        <h5>Nuova Lista</h5> <br /><br />

        <div className="liste">
          <div>
            <form onSubmit={handleSubmit}>
              <div class="form-floating">

                <input id="nome" type="text" name="nome" value={formData.nome} onChange={handleInputChange} class="form-control" placeholder="Nome" />
                <label for="nome"> Nome</label>
              </div>
              <br></br><br />
              <button type="submit" class="btn btn-success">Aggiungi Lista</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default NuovaLista;
