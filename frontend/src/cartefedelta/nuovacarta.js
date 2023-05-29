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
                    alert("Carta inserita correttamente.");
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
        navigate('/carte');
    };

    return (
        <>
            <h2>Nuova Carta</h2>

            <div>
                <form onSubmit={handleSubmit}>

                    <label> Nome:
                        <input id="nome" type="text" name="nome" value={formData.nome} onChange={handleInputChange} />
                    </label>
                    <br></br>
                    <label> Numero:
                        <input id="numerocarta" type="text" name="numerocarta" value={formData.numerocarta} onChange={handleInputChange} />
                    </label>
                    <br></br>
                    <button type="submit">Aggiungi</button>
                </form>
            </div>
        </>
    );
}

export default NuovaCarta;