import React, { useEffect, useState, } from 'react';
import { Link, useParams } from 'react-router-dom';
import Barcode from 'react-barcode';


function EliminaCarta() {
    const { nome } = useParams();
    console.log(nome);
    const [carta, setCarta] = useState(null);

    const handleDelete = () => {
        const url = `/api/v1/carte/${nome}`;
        const token = localStorage.getItem('token');

        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `${token}`
            }
        };

        fetch(url, requestOptions)
            .then((response) => {
                if (response.ok) {
                    alert("Carta eliminata correttamente.");
                    window.location.href = '/listacarte'
                } else {
                    throw new Error('Error: ' + response.status);
                }
            })
            .catch((error) => {
                console.error(error); // Gestisci gli errori
            });
    };

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
            <h2>Conferma eliminazione</h2>
            {carta ? (
                <div>
                    <p>{carta.nome}</p>

                    <Barcode value={carta.numerocarta} />

                </div>
            ) : (
                <p>Nessuna carta selezionata</p>
            )}
            <button onClick={handleDelete}>Elimina</button>
            <Link to="/listacarte">
                <button>Torna a Carte Fedeltà</button>
            </Link>
        </>
    );
}

export default EliminaCarta;
