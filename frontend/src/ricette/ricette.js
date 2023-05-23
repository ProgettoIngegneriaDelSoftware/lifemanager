function Ricette() {
  const url = "/api/v1/ricette/";
  const token = localStorage.getItem("token");

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
      var resultList = "";

      data.forEach((item) => {
        var ricetta = {
          nome: item.nome,
        };
        resultList +=
          '<a href="/ricette/' +
          ricetta.nome +
          '">Nome: ' +
          ricetta.nome +
          "</a><br /><hr />";
      });

      var resultDiv = document.getElementById("result");
      resultDiv.innerHTML = resultList;
    })
    .catch((error) => {
      console.error(error); // Gestisci gli errori
    });

  return (
    <>
      <h2>Ricette</h2>
      <div id="result"></div>
      <a href="/nuovaricetta">
        <button>Nuova Ricetta</button>
      </a>
    </>
  );
}

export default Ricette;
