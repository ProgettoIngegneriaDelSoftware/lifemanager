import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CartaLink({ nome }) {
    return (
        nome,
        < Link to={{ pathname: `/visualizzacarta/${nome}` }}>
            <button type="button" className="btn btn-outline-secondary">{nome}</button>
        </Link >
    );
}





function ListaCarte() {
    const [carte, setCarte] = useState([]);

    useEffect(() => {
        const url = '/api/v1/carte';
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
            <div class="buttonContainer">
                <h2>Carte fedeltà</h2>

                <br />

                <h3>Tutte le carte</h3>

                <div><a href="/NuovaCarta">
                    <button type="button" className="btn btn-outline-success">Nuova carta</button>
                </a></div>
                <br />
                <div className="col-8">
                    {carte.map((carta) => (
                        <div key={carta.nome}>
                            <CartaLink nome={carta.nome} />
                            <br />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ListaCarte;
