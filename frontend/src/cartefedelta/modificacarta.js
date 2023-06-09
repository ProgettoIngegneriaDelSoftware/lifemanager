import React, { useEffect, useState, } from 'react';
import { Link, useParams } from 'react-router-dom';

function ModificaCarta() {
    const { nome } = useParams();
    console.log(nome);
    const [carta, setCarta] = useState(null);
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    const appendAlert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,

            '</div>'
        ].join('')

        alertPlaceholder.innerHTML = ''; // Rimuovi gli alert precedenti
        alertPlaceholder.appendChild(wrapper);
    }

    const alertTrigger = document.getElementById('liveAlertBtn')
    if (alertTrigger) {
        alertTrigger.addEventListener('click', () => {
            appendAlert('Carta modificata correttamente', 'primary')
        })
    }

    const [formData, setFormData] = useState({
        nome: '',
        numerocarta: '',
    });

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const url = `https://lifemanagersprint2-backend.onrender.com/api/v1/carte/${nome}`;
        const token = localStorage.getItem('token');

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token,
            },
            body: JSON.stringify(formData),
        };

        fetch(url, requestOptions)
            .then((response) => {
                if (response.ok) {



                    //window.location.href = '/carte'
                } else {
                    throw new Error('Error: ' + response.status);
                }
            })
            .catch((error) => {
                console.error(error); // Handle errors
            });
    };


    useEffect(() => {
        if (nome) {
            const url = `https://lifemanagersprint2-backend.onrender.com/api/v1/carte/${nome}`;
            const token = localStorage.getItem('token');

            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token,
                },
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
                    setFormData({
                        nome: data.nome,
                        numerocarta: data.numerocarta,
                    });
                })
                .catch((error) => {
                    console.error(error); // Handle errors
                });
        }
    }, [nome]);
    return (
        <>

            <div className="intestazione">
                <h2>Carte Fedeltà</h2>
            </div>
            <div class="buttonContainer"><div class="cartefed"><center>
                <div id="liveAlertPlaceholder"></div>
                <h5>Modifica carta</h5><br />
                {carta ? (
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div class="mb-3">
                                <label> Nome</label>
                                <input id="nome" type="text" name="nome" value={formData.nome} onChange={handleInputChange} class="form-control" placeholder="Nome" />

                            </div>
                            <br></br>
                            <div class="mb-3">
                                <label> Numero</label>
                                <input id="numerocarta" type="text" name="numerocarta" value={formData.numerocarta} onChange={handleInputChange} class="form-control" placeholder="Numero della carta" />
                            </div>
                            <br></br>
                            <div>
                                <button type="submit" class="btn btn-primary" id="liveAlertBtn">Modifica</button>
                            </div>
                            <br></br>
                        </form>
                    </div>
                ) : (
                    <p>Nessuna carta selezionata</p>
                )}
                <hr></hr>
                <div>
                    <Link to="/carte">
                        <button type="button" class="btn btn-outline-secondary">Torna a Carte Fedeltà</button>
                    </Link>
                </div>
            </center> </div></div>
        </>
    );
}

export default ModificaCarta;
