import React, { useEffect, useState, } from 'react';
import { Link, useParams } from 'react-router-dom';

function ModificaMovimento() {
    const { id } = useParams();
    console.log(id);
    const [movimento, setMovimento] = useState(null);

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
                    alert("Movimento modificato correttamente.");
                    window.location.href = '/Movimenti'
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
        <>
            <h2>Modifica movimento</h2>
            {movimento ? (
                <div>
                    <form onSubmit={handleSubmit}>

                        <label> Titolo movimento:
                            <input id="titolo" type="text" name="titolo" value={formData.titolo} onChange={handleInputChange} />
                        </label>
                        <br></br>
                        <label> Importo:
                            <input id="importo" type="number" name="importo" value={formData.importo} onChange={handleInputChange} />
                        </label>
                        <br></br>
                        <label> Tipologia:
                            <select id="tipologia" name="tipologia" value={formData.tipologia} onChange={handleInputChange}>
                                <option value="entrata">entrata</option>
                                <option value="uscita">uscita</option>
                            </select>
                        </label>
                        <br></br>
                        <label> Categoria:
                            <input id="categoria" type="text" name="categoria" value={formData.categoria} onChange={handleInputChange} />
                        </label>
                        <br></br>
                        <label>Note:
                            <input id="note" type="text" name="note" value={formData.note} onChange={handleInputChange} />
                        </label>
                        <br></br>
                        <button type="submit">Modifica</button>

                    </form>
                </div>
            ) : (
                <p>Nessun movimento selezionato</p>
            )}

            <Link to="/Movimenti">
                <button>Torna a Movimenti</button>
            </Link>
        </>
    );
}

export default ModificaMovimento;
