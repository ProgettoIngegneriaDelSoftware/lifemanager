import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function NuovoMovimento() {
    const navigate = useNavigate();

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
                    alert("Movimento inserito correttamente.");
                    return response.json();
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
        <>
            <h2>Nuovo Movimento</h2>

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
                    <button type="submit">Aggiungi</button>

                </form>
            </div>
        </>
    );
}

export default NuovoMovimento;