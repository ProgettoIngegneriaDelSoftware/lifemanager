import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Barcode from 'react-barcode';


function VisualizzaCarta() {
    const { nome } = useParams();
    console.log(nome);
    const [carta, setCarta] = useState(null);

    useEffect(() => {
        if (nome) {
            const url = `/api/v1/carte/${nome}`;
            console.log(url);
            const token = localStorage.getItem('token');

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
                    setCarta(data);
                })
                .catch((error) => {
                    console.error(error); // Handle errors
                });
        }
    }, [nome]);

    return (
        <>
            <div class="buttonContainer"><div class="cartefed"><center>
                {carta ? (
                    <div>
                        <center>
                            <h4>{carta.nome}</h4>
                            <Barcode value={carta.numerocarta} />
                        </center>
                    </div>
                ) : (
                    <p>Nessuna carta selezionata</p>
                )}
                <hr></hr>
                <div class="row justify-content-evenly">
                    <div class="col-5">
                        <Link to={{ pathname: `/eliminacarta/${nome}` }} >
                            <button type="button" class="btn btn-outline-danger">Elimina carta</button>
                        </Link>
                    </div><div class="col-5">
                        <Link to={{ pathname: `/modificacarta/${nome}` }}>
                            <button type="button" class="btn btn-outline-primary">Modifica carta</button>
                        </Link>
                    </div>
                </div>


                <br></br>
                <Link to="/carte">
                    <button type="button" class="btn btn-outline-secondary">Torna a Carte Fedeltà</button>
                </Link>
            </center></div></div>
        </>
    );
}

export default VisualizzaCarta;
