import React, { useEffect, useState, } from 'react';
import { Link, useParams } from 'react-router-dom';

function ModificaMovimento() {
    const { id } = useParams();
    console.log(id);
    const [movimento, setMovimento] = useState(null);

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
            appendAlert('Movimento modificato correttamente', 'primary')
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

        const url = `/api/v1/movimenti/${id}`;
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
                } else {
                    throw new Error('Error: ' + response.status);
                }
            })
            .catch((error) => {
                console.error(error); // Handle errors
            });
    };


    useEffect(() => {
        if (id) {
            const url = `/api/v1/movimenti/${id}`;
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
                    setMovimento(data);
                    setFormData({
                        titolo: data.titolo,
                        importo: data.importo,
                        tipologia: data.tipologia,
                        categoria: data.categoria,
                        note: data.note,
                    });
                })
                .catch((error) => {
                    console.error(error); // Handle errors
                });
        }
    }, [id]);
    return (
        <><div class="buttonContainer"><div class="movimenti"><center>
            <div id="liveAlertPlaceholder"></div>

            <h2>Modifica movimento</h2>
            {movimento ? (
                <div>
                    <form onSubmit={handleSubmit}>
                        <div class="form-floating">

                            <input id="titolo" type="text" name="titolo" value={formData.titolo} onChange={handleInputChange} class="form-control" placeholder="Titolo del movimento" />
                            <label for="titolo"> Titolo</label>

                        </div>
                        <br></br>


                        <div class="input-group mb-3">
                            <span class="input-group-text">€</span>
                            <div class="form-floating">
                                <input id="importo" type="number" name="importo" value={formData.importo} onChange={handleInputChange} class="form-control" placeholder="Importo" />
                                <label for="importo"> Importo</label></div>
                        </div>
                        <br></br><br></br>
                        <div class="form-floating">
                            <select id="tipologia" name="tipologia" value={formData.tipologia} onChange={handleInputChange} class="form-select" aria-label="Default select example">
                                <option value="entrata">entrata</option>
                                <option value="uscita">uscita</option>
                            </select>
                            <label for="tipologia">Tipologia</label>
                        </div>
                        <br></br><br></br>
                        <div class="form-floating">

                            <input id="categoria" type="text" name="categoria" value={formData.categoria} onChange={handleInputChange} class="form-control" placeholder="Categoria" />
                            <label for="categoria"> Categoria</label>
                        </div>
                        <br></br>
                        <div class="form-floating">

                            <input id="note" type="text" name="note" value={formData.note} onChange={handleInputChange} class="form-control" placeholder="Note" />
                            <label for="note">Note</label></div>
                        <br></br>
                        <br>
                        </br>
                        <button type="submit" class="btn btn-primary" id="liveAlertBtn">Modifica</button>

                    </form>
                </div>
            ) : (
                <p>Nessun movimento selezionato</p>
            )}
            <hr></hr>
            <Link to="/Movimenti">
                <button type="button" class="btn btn-outline-secondary">Torna a Movimenti</button>
            </Link>
        </center></div></div>
        </>
    );
}

export default ModificaMovimento;
