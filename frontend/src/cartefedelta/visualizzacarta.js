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
            <h2>Carta fedeltà</h2>
            {carta ? (
                <div>
                    <p>{carta.nome}</p>
                    <Barcode value={carta.numerocarta} />
                </div>
            ) : (
                <p>Nessuna carta selezionata</p>
            )}
            <Link to={{ pathname: `/eliminacarta/${nome}` }} >
                <button>Elimina carta</button>
            </Link>
            <Link to={{ pathname: `/modificacarta/${nome}` }}>
                <button>Modifica carta</button>
            </Link>


            <li />
            <Link to="/listacarte">
                <button>Torna a Carte Fedeltà</button>
            </Link>
        </>
    );
}

export default VisualizzaCarta;
