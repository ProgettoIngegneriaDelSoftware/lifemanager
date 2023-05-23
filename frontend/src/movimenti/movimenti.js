import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function MovimentoLink({ id }) {
    return (
        id,
        < Link to={{ pathname: `/visualizzamovimento/${id}` }}>
            <button type="button">Visualizza</button>
        </Link >
    );
}

function Movimenti() {
    const [movimenti, setMovimenti] = useState([]);

    useEffect(() => {
        const url = '/api/v1/movimenti';
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
                setMovimenti(data);
            })
            .catch((error) => {
                console.error(error); // Handle errors
            });
    }, []);

    return (
        <>
            <h2>Movimenti</h2>
            <div>
                {movimenti.map((movimento) => (
                    <div key={movimento.id}>
                        {movimento.titolo}
                        <MovimentoLink id={movimento.id} />
                        <br />
                    </div>
                ))}
            </div>
            <a href="/NuovoMovimento">
                <button>Nuovo movimento</button>
            </a>
        </>
    );
}

export default Movimenti;
