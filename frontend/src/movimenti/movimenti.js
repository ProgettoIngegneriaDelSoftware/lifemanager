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

function CategoriaLink({ id, nome }) {
    return (
        id, nome,
        < Link to={{ pathname: `/visualizzapercategorie/${nome}` }}>
            <button type="button">{nome}</button>
        </Link >
    );
}



function Movimenti() {
    const [movimenti, setMovimenti] = useState([]);
    const [categorie, setCategorie] = useState([]);

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




        //--

        const url_cat = '/api/v1/movimenti/categorie';

        const requestOptions_cat = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `${token}`
            }
        };

        fetch(url_cat, requestOptions_cat)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error: ' + response.status);
                }
            })
            .then((data) => {
                setCategorie(data);
            })
            .catch((error) => {
                console.error(error); // Handle errors
            });


    }, []);

    return (
        <>
            <h2>Movimenti</h2>

            <br />

            <h3>Categorie</h3>

            <div>
                {categorie.map((categoria) => (
                    <div key={categoria.id}>
                        <CategoriaLink id={categoria.id} nome={categoria.nome} />
                        <br />
                    </div>
                ))}
            </div>

            <br />
            <div>
                <a href="/Entrate">
                    <button>Entrate</button>
                </a>
                <a href="/Uscite">
                    <button>Uscite</button>
                </a>
            </div>


            <br />
            <h3>Tutti i movimenti</h3>

            <div><a href="/NuovoMovimento">
                <button>Nuovo movimento</button>
            </a></div>
            <br />
            <div>
                {movimenti.map((movimento) => (
                    <div key={movimento.id}>
                        {movimento.titolo}
                        <MovimentoLink id={movimento.id} />
                        <br />
                    </div>
                ))}
            </div>

        </>
    );
}

export default Movimenti;
