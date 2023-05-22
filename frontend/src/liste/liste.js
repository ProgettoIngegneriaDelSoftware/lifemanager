require('dotenv').config()
function Liste() {

    const url = process.env.BackendURL+'/api/v1/liste/';
    const token = localStorage.getItem('token');
  
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token' : `${token}`
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
        var resultList = '';

        data.forEach((item) => {
        var lista = {
            nome: item.nome
        };
        resultList += '<a href="/liste/' + lista.nome + '">Nome: ' + lista.nome + '</a><br /><hr />';
    });

  var resultDiv = document.getElementById('result');
  resultDiv.innerHTML = resultList;
      })
      .catch((error) => {
        console.error(error); // Gestisci gli errori
      });

  return (
    <>
      <h2>Liste</h2>
      <div id="result"></div>
      <a href="/nuovalista"><button>Nuova Lista</button></a>
    </>
  );
}

export default Liste;
