import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CartaLink({ nome }) {
    return (
        nome,
        < Link to={{ pathname: `/visualizzacarta/${nome}` }}>
            <button type="button" className="btn btn-outline-dark">{nome}</button>
        </Link >
    );
}





function ListaCarte() {
    const [carte, setCarte] = useState([]);

    useEffect(() => {
        const url = 'https://lifemanagersprint2-backend.onrender.com/api/v1/carte';
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

            <div className="intestazione">
                <h2>Carte Fedeltà</h2>
            </div>

            <div class="buttonContainer">
                <center>
                    <div class="cartefed">

                        <br />
                        {carte.map((carta) => (
                            <div key={carta.nome}>
                                <CartaLink nome={carta.nome} />
                                <br />
                            </div>
                        ))}

                        <br /><hr></hr>
                        <div><a href="/NuovaCarta">
                            <button type="button" className="btn btn-outline-success">Nuova carta</button>
                        </a></div>
                    </div>
                </center>
            </div>
        </>
    );
}

export default ListaCarte;
