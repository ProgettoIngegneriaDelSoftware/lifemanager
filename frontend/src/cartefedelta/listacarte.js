import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CartaLink({ nome }) {
    return (
        nome,
        < Link to={{ pathname: `/visualizzacarta/${nome}` }}>
            <button type="button">{nome}</button>
        </Link >
    );
}





function ListaCarte() {
    const [carte, setCarte] = useState([]);

    useEffect(() => {
        const url = '/api/v1/carta';
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
                setCarte(data);
            })
            .catch((error) => {
                console.error(error); // Handle errors
            });






    }, []);

    return (
        <>
            <h2>Carte fedeltà</h2>

            <br />

            <h3>Tutte le carte</h3>

            <div><a href="/NuovaCarta">
                <button>Nuova carta</button>
            </a></div>
            <br />
            <div>
                {carte.map((carta) => (
                    <div key={carta.nome}>
                        <CartaLink id={carta.nome} />
                        <br />
                    </div>
                ))}
            </div>

        </>
    );
}

export default ListaCarte;
