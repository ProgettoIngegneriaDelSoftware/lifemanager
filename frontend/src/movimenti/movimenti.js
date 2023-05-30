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

function CategoriaLink({ id, nome }) {
    return (
        id, nome,
        < Link to={{ pathname: `/visualizzapercategorie/${nome}` }}>
            <button type="button" className="btn btn-outline-dark">{nome}</button>
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
            <div class="buttonContainer"><div class="movimenti"><center>
                <h2>Movimenti</h2>

                <br></br>
                <h4>Categorie</h4>

                <div class="col-8">
                    {categorie.map((categoria) => (
                        <div key={categoria.id}>
                            <CategoriaLink id={categoria.id} nome={categoria.nome} />
                            <br /> <br></br>
                        </div>
                    ))}
                </div>

                <br />
                <hr></hr>
                <div class="row justify-content-evenly">
                    <div class="col-5">
                        <a href="/Entrate">
                            <button type="button" className="btn btn-outline-success">Entrate</button>
                        </a>
                    </div><div class="col-5">
                        <a href="/Uscite">
                            <button type="button" className="btn btn-outline-danger">Uscite</button>
                        </a>
                    </div>
                </div>


                <hr></hr>
                <h4>Tutti i movimenti</h4>

                <div><a href="/NuovoMovimento">
                    <button type="button" className="btn btn-outline-primary">Nuovo movimento</button>
                </a></div>
                <br />
                <div class="col-8">
                    {movimenti.map((movimento) => (
                        <div key={movimento.id}>
                            <MovimentoLink id={movimento.id} nome={movimento.titolo} />
                            <br /> <br>
                            </br>
                        </div>
                    ))}
                </div>
            </center></div></div>

        </>
    );
}

export default Movimenti;
