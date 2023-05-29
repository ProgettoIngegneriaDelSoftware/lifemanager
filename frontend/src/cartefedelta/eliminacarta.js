import React, { useEffect, useState, } from 'react';
import { Link, useParams } from 'react-router-dom';
import Barcode from 'react-barcode';


function EliminaCarta() {
    const { nome } = useParams();
    console.log(nome);
    const [carta, setCarta] = useState(null);

    const handleDelete = () => {
        const url = `/api/v1/carte/${nome}`;
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
                    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
                    const appendAlert = (message, type) => {
                        const wrapper = document.createElement('div')
                        wrapper.innerHTML = [
                            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
                            `   <div>${message}</div>`,

                            '</div>'
                        ].join('')

                        alertPlaceholder.append(wrapper)
                    }

                    const alertTrigger = document.getElementById('liveAlertBtn')
                    if (alertTrigger) {
                        alertTrigger.addEventListener('click', () => {
                            appendAlert('Carta eliminata correttamente', 'danger')
                        })
                    }
                } else {
                    throw new Error('Error: ' + response.status);
                }
            })
            .catch((error) => {
                console.error(error); // Gestisci gli errori
            });
    };

    useEffect(() => {
        if (nome) {
            const url = `/api/v1/carte/${nome}`;
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
                    setCarta(data);
                })
                .catch((error) => {
                    console.error(error); // Handle errors
                });
        }
    }, [nome]);

    return (
        <>
            <div class="buttonContainer">
                <div id="liveAlertPlaceholder"></div>
                <center>
                    <h2>Conferma eliminazione</h2>
                    {carta ? (
                        <div>
                            <h4>{carta.nome}</h4>

                            <Barcode value={carta.numerocarta} />

                        </div>
                    ) : (
                        <p>Nessuna carta selezionata</p>
                    )}
                    <div>
                        <button type="button" class="btn btn-danger" onClick={handleDelete} id="liveAlertBtn">Elimina</button>
                    </div>
                    <br></br>
                    <div>
                        <Link to="/carte">
                            <button type="button" class="btn btn-outline-secondary">Torna a Carte Fedeltà</button>
                        </Link>
                    </div>
                </center>
            </div>
        </>
    );
}

export default EliminaCarta;
