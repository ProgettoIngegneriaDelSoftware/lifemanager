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

function Entrate() {

    const [movimenti, setMovimenti] = useState([]);

    useEffect(() => {
        const url = `/api/v1/movimenti/tipologia/entrata`;
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
            <h2>Visualizza Entrate</h2>
            <h3>Tutti i movimenti</h3>
            <div>
                {movimenti.map((movimento) => (
                    <div key={movimento.id}>
                        {movimento.titolo}
                        <MovimentoLink id={movimento.id} />
                        <br />
                    </div>
                ))}
            </div>

            <li />
            <Link to="/Movimenti">
                <button>Torna a Movimenti</button>
            </Link>
        </>
    );
}

export default Entrate;
