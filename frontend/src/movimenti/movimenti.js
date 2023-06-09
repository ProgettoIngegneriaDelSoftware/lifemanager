import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function MovimentoLink({ id, nome, importo, tipologia }) {
    return (
        id, nome, importo,
        < Link to={{ pathname: `/visualizzamovimento/${id}` }}>
            <button type="button" className="btn btn-outline-dark">
                <div class="row align-items-center">
                    <div class="col">
                        {nome}
                    </div>
                    <div class="col">
                        € {tipologia === "entrata" ? (
                            < span >{importo}</span>
                        ) : (
                            <span>-{importo}</span>
                        )}
                    </div>
                </div>
            </button>
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



    var dataCorrente = new Date();
    var meseCorrente = dataCorrente.getMonth();
    var nomiMesi = [
        "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
        "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
    ];
    var annoCorrente = dataCorrente.getFullYear();
    var nomeMeseCorrente = nomiMesi[meseCorrente];

    useEffect(() => {
        const url = 'https://lifemanagersprint2-backend.onrender.com/api/v1/movimenti';
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

        const url_cat = 'https://lifemanagersprint2-backend.onrender.com/api/v1/movimenti/categorie';

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

            <div className="divheader">
                <div className="intestazione">
                    <h2>Budget</h2>
                </div>
            </div>

            <div class="buttonContainer">
                <div class="movimenti"><center>

                    <h5>Categorie</h5><br />

                    {categorie.map((categoria) => (
                        <div key={categoria.id}>
                            <CategoriaLink id={categoria.id} nome={categoria.nome} />
                            <br /> <br></br>
                        </div>
                    ))}

                    <br />
                    <hr></hr>
                    <div className='meseCorrente'><p style={{ color: 'grey' }}>{nomeMeseCorrente} {annoCorrente}</p></div>
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

                    <div className="movimentiContainer">
                        <br />
                        <div class="row align-items-center">
                            <div class="col">
                                <h5>Tutti i movimenti</h5>
                            </div>
                            <div class="col">
                                <a href="/nuovoMovimento">
                                    <button type="button" class="btn btn-outline-primary">Nuovo movimento</button>
                                </a>
                            </div>
                        </div>
                        <br />


                        <br />
                        <div style={{ height: '250px', overflowY: 'auto', marginBottom: '-20px' }}>
                            {[...movimenti].reverse().map((movimento) => (
                                <div key={movimento.id}>
                                    <MovimentoLink
                                        id={movimento.id}
                                        nome={movimento.titolo}
                                        importo={movimento.importo}
                                        tipologia={movimento.tipologia}
                                    />
                                    <br /><br />
                                </div>
                            ))}
                        </div>

                        <br />
                    </div>

                </center>
                </div>
            </div>

        </>
    );
}

export default Movimenti;
