import React, { useEffect, useState, } from 'react';
import { Link, useParams } from 'react-router-dom';

function EliminaMovimento() {
    const { id } = useParams();
    console.log(id);
    const [movimento, setMovimento] = useState(null);

    const handleDelete = () => {
        const url = `/api/v1/movimenti/${id}`;
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
                    alert("Movimento eliminato correttamente.");
                    window.location.href = '/Movimenti'
                } else {
                    throw new Error('Error: ' + response.status);
                }
            })
            .catch((error) => {
                console.error(error); // Gestisci gli errori
            });
    };

    useEffect(() => {
        if (id) {
            const url = `/api/v1/movimenti/${id}`;
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
                    setMovimento(data);
                })
                .catch((error) => {
                    console.error(error); // Handle errors
                });
        }
    }, [id]);

    return (
        <>
            <h2>Conferma eliminazione</h2>
            {movimento ? (
                <div>
                    <p>Titolo: {movimento.titolo}</p>
                    <p>Importo: {movimento.importo}</p>
                    <p>Tipologia: {movimento.tipologia}</p>
                    <p>Categoria: {movimento.categoria}</p>
                    <p>Note: {movimento.note}</p>
                </div>
            ) : (
                <p>Nessun movimento selezionato</p>
            )}
            <button onClick={handleDelete}>Elimina</button>
            <Link to="/Movimenti">
                <button>Torna a Movimenti</button>
            </Link>
        </>
    );
}

export default EliminaMovimento;
