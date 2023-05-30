import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function NuovoMovimento() {
    const navigate = useNavigate();

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
            appendAlert('Movimento inserito correttamente', 'success')
        })
    }

    const [formData, setFormData] = useState({
        titolo: '',
        importo: '',
        tipologia: 'entrata',
        categoria: '',
        note: '',
    });



    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const url = '/api/v1/movimenti/';
        const token = localStorage.getItem('token');

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `${token}`
            },
            body: JSON.stringify({
                titolo: formData.titolo,
                importo: formData.importo,
                tipologia: formData.tipologia,
                categoria: formData.categoria,
                note: formData.note,

            })
        };

        fetch(url, requestOptions)
            .then((response) => {
                if (response.ok) {
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
        navigate('/movimenti');
    };

    return (
        <><div class="buttonContainer"><div class="movimenti"><center>
            <div id="liveAlertPlaceholder"></div>
            <h2>Nuovo Movimento</h2>

            <div>
                <form onSubmit={handleSubmit}>
                    <div class="form-floating">

                        <input id="titolo" type="text" name="titolo" value={formData.titolo} onChange={handleInputChange} class="form-control" placeholder="Titolo" />
                        <label for="titolo"> Titolo</label>
                    </div>
                    <br></br>
                    <div class="input-group mb-3">
                        <span class="input-group-text">€</span>
                        <div class="form-floating">
                            <input id="importo" type="number" name="importo" value={formData.importo} onChange={handleInputChange} class="form-control" placeholder="Importo" pattern="\d{1,2}(\.\d{2})?" />
                            <label for="importo"> Importo</label></div>
                    </div>
                    <br></br>
                    <div class="form-floating">

                        <select id="tipologia" name="tipologia" value={formData.tipologia} onChange={handleInputChange} class="form-select" aria-label="Default select example">
                            <option value="entrata">entrata</option>
                            <option value="uscita">uscita</option>
                        </select>
                        <label for="tipologia"> Tipologia</label>
                    </div>
                    <br></br>
                    <div class="form-floating">


                        <input id="categoria" type="text" name="categoria" value={formData.categoria} onChange={handleInputChange} class="form-control" placeholder="categoria" />
                        <label for="categoria"> Categoria</label>
                    </div>
                    <br></br>
                    <div class="form-floating">


                        <input id="note" type="text" name="note" value={formData.note} onChange={handleInputChange} class="form-control" placeholder="categoria" />
                        <label for="note">Note</label>
                    </div>
                    <br></br>
                    <button type="submit" class="btn btn-success" id="liveAlertBtn">Aggiungi</button>

                </form>
            </div>
        </center></div></div>
        </>
    );
}

export default NuovoMovimento;