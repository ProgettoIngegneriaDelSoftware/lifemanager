import React, { useEffect, useState, } from 'react';
import { Link, useParams } from 'react-router-dom';

function ModificaCarta() {
    const { nome } = useParams();
    console.log(nome);
    const [carta, setCarta] = useState(null);

    const [formData, setFormData] = useState({
        nome: '',
        numerocarta: '',
    });

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const url = `/api/v1/carte/${nome}`;
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
                    alert("Carta modificata correttamente.");
                    window.location.href = '/listacarte'
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
            const url = `/api/v1/carte/${nome}`;
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
            <h2>Modifica carta</h2>
            {carta ? (
                <div>
                    <form onSubmit={handleSubmit}>

                        <label> Nomee:
                            <input id="nome" type="text" name="nome" value={formData.nome} onChange={handleInputChange} />
                        </label>
                        <br></br>
                        <label> Numero:
                            <input id="numerocarta" type="text" name="numerocarta" value={formData.numerocarta} onChange={handleInputChange} />
                        </label>

                        <br></br>
                        <button type="submit">Modifica</button>

                    </form>
                </div>
            ) : (
                <p>Nessuna carta selezionata</p>
            )}

            <Link to="/listacarte">
                <button>Torna a Carte Fedeltà</button>
            </Link>
        </>
    );
}

export default ModificaCarta;
