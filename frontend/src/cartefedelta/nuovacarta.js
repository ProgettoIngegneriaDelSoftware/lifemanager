import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function NuovaCarta() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nome: '',
        numerocarta: '',
    });



    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const url = '/api/v1/carte/';
        const token = localStorage.getItem('token');

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `${token}`
            },
            body: JSON.stringify({
                nome: formData.nome,
                numerocarta: formData.numerocarta,

            })
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
                            appendAlert('Carta inserita correttamente', 'success')
                        })
                    }


                    //return response.json();
                } else {
                    throw new Error('Error: ' + response.status);
                }
            })
            .then((data) => {
                console.log(data); // Stampa la risposta del backend nella console


            })
            .catch((error) => {
                console.error(error); // Gestisci gli errori
            });
        navigate('/carte');
    };

    return (
        <>
            <div class="buttonContainer">
                <div id="liveAlertPlaceholder"></div>
                <h2>Nuova Carta</h2>

                <div>
                    <form onSubmit={handleSubmit}>
                        <div class="mb-3">

                            <label class="form-label"> Nome</label>
                            <input id="nome" type="text" name="nome" value={formData.nome} onChange={handleInputChange} class="form-control" placeholder="Nome" />

                        </div>
                        <br></br>
                        <div class="mb-3">
                            <label class="form-label"> Numero</label>
                            <input id="numerocarta" type="text" name="numerocarta" value={formData.numerocarta} onChange={handleInputChange} class="form-control" placeholder="Numero della carta" />

                        </div>
                        <br></br>
                        <button type="submit" class="btn btn-success" id="liveAlertBtn">Aggiungi</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default NuovaCarta;