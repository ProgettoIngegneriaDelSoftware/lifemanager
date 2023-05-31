import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function MovimentoLink({ id, nome }) {
    return (
        id, nome,
        < Link to={{ pathname: `/visualizzamovimento/${id}` }}>
            <button type="button" className="btn btn-outline-dark">{nome}</button>
        </Link >
    );
}

function Uscite() {

    const [movimenti, setMovimenti] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const url = `/api/v1/movimenti/tipologia/uscita`;
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
            <div className="divheader">
                <div className="intestazione">
                    <h2>Budget</h2>
                </div>
            </div>
            <div class="buttonContainer"><div class="movimenti"><center>
                <h2> Uscite</h2>
                <hr></hr>
                <div> <br />
                    {movimenti.map((movimento) => (
                        <div key={movimento.id}>


                            <MovimentoLink id={movimento.id} nome={movimento.titolo} />
                            <br /><br />
                        </div>
                    ))}
                </div>

                <hr />
                <Link to="/Movimenti">
                    <button type="button" class="btn btn-outline-secondary">Torna a Movimenti</button>
                </Link>
            </center></div></div>
        </>
    );
}

export default Uscite;
