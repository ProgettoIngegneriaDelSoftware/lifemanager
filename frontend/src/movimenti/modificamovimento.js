import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function ModificaMovimento() {
    const { id } = useParams();
    console.log(id);
    const [movimento, setMovimento] = useState(null);

    const appendAlert = (message, type) => {
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <div class="alert alert-${type} alert-dismissible" role="alert">
                <div>${message}</div>
            </div>
        `;
        alertPlaceholder.innerHTML = ''; // Rimuovi gli alert precedenti
        alertPlaceholder.appendChild(wrapper);
    };

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
                    appendAlert('Movimento modificato correttamente', 'primary');
                } else {
                    throw new Error('Error: ' + response.status);
                }
            })
            .catch((error) => {
                console.error(error); // Gestisci gli errori
            });
    };

    const [formData, setFormData] = useState({
        titolo: '',
        importo: '',
        tipologia: 'entrata',
        categoria: '',
        note: '',
    });

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
                    console.error(error); // Gestisci gli errori
                });
        }
    }, [id]);

    return (
        <div className="buttonContainer">
            <div className="movimenti">
                <center>
                    <div id="liveAlertPlaceholder"></div>

                    <h2>Modifica movimento</h2>
                    {movimento ? (
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-floating">
                                    <input
                                        id="titolo"
                                        type="text"
                                        name="titolo"
                                        value={formData.titolo}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="Titolo del movimento"
                                    />
                                    <label htmlFor="titolo"> Titolo</label>
                                </div>
                                <br />
                                <div className="input-group mb-3">
                                    <span className="input-group-text">€</span>
                                    <div className="form-floating">
                                        <input
                                            id="importo"
                                            type="number"
                                            name="importo"
                                            value={formData.importo}
                                            onChange={handleInputChange}
                                            className="form-control"
                                            placeholder="Importo"
                                        />
                                        <label htmlFor="importo"> Importo</label>
                                    </div>
                                </div>
                                <br />
                                <div className="form-floating">
                                    <select
                                        id="tipologia"
                                        name="tipologia"
                                        value={formData.tipologia}
                                        onChange={handleInputChange}
                                        className="form-select"
                                        aria-label="Default select example"
                                    >
                                        <option value="entrata">entrata</option>
                                        <option value="uscita">uscita</option>
                                    </select>
                                    <label htmlFor="tipologia">Tipologia</label>
                                </div>
                                <br />
                                <div className="form-floating">
                                    <input
                                        id="categoria"
                                        type="text"
                                        name="categoria"
                                        value={formData.categoria}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="Categoria"
                                    />
                                    <label htmlFor="categoria"> Categoria</label>
                                </div>
                                <br />
                                <div className="form-floating">
                                    <input
                                        id="note"
                                        type="text"
                                        name="note"
                                        value={formData.note}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="Note"
                                    />
                                    <label htmlFor="note">Note</label>
                                </div>
                                <br />
                                <button type="submit" className="btn btn-primary" id="liveAlertBtn">
                                    Modifica
                                </button>
                            </form>
                        </div>
                    ) : (
                        <p>Nessun movimento selezionato</p>
                    )}
                    <hr />
                    <Link to="/Movimenti">
                        <button type="button" className="btn btn-outline-secondary">
                            Torna a Movimenti
                        </button>
                    </Link>
                </center>
            </div>
        </div>
    );
}

export default ModificaMovimento;
