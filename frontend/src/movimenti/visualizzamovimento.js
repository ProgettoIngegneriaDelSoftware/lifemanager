import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function VisualizzaMovimento() {
    const { id } = useParams();
    console.log(id);
    const [movimento, setMovimento] = useState(null);
    const [categorie, setCategorie] = useState([]);


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

            //--

            const url_cat = '/api/v1/movimenti/categorie/';

            const requestOptions_cat = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            };

            fetch(url_cat, requestOptions_cat)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Error: ' + response.status);
                    }
                })
                .then((data) => {
                    setCategorie(data);
                })
                .catch((error) => {
                    console.error(error); // Handle errors
                });
        }
    }, [id]);

    return (
        <> <div class="buttonContainer"><div class="movimenti"><center>
            {movimento ? (
                <div>
                    <form>
                        <div class="form-floating">

                            <input id="titolo" type="text" name="titolo" value={formData.titolo} class="form-control" placeholder="Titolo del movimento" readonly />
                            <label for="titolo"> Titolo</label>

                        </div>
                        <br></br>


                        <div class="input-group mb-3">
                            <span class="input-group-text">€</span>
                            <div class="form-floating">
                                <input id="importo" type="number" name="importo" value={formData.importo} class="form-control" placeholder="Importo" readonly />
                                <label for="importo"> Importo</label></div>
                        </div>
                        <br></br>
                        <div class="form-floating">
                            <select id="tipologia" name="tipologia" value={formData.tipologia} class="form-select" aria-label="Default select example" readonly>
                                <option value="entrata">entrata</option>
                                <option value="uscita">uscita</option>
                            </select>
                            <label for="tipologia">Tipologia</label>
                        </div>
                        <br></br>
                        <div class="form-floating">

                            <input id="categoria" type="text" name="categoria" value={formData.categoria} class="form-control" placeholder="Categoria" readonly />
                            <label for="categoria"> Categoria</label>
                        </div>
                        <br></br>
                        <div class="form-floating">

                            <input id="note" type="text" name="note" value={formData.note} class="form-control" placeholder="Note" readonly />
                            <label for="note">Note</label></div>


                    </form>
                </div>
            ) : (
                <p>Nessun movimento selezionato</p>
            )}
            <br></br>

            <div class="row justify-content-evenly">
                <div class="col-5">
                    <Link to={{ pathname: `/eliminamovimento/${id}` }} >
                        <button type="button" class="btn btn-outline-danger">Elimina movimento</button>
                    </Link>
                </div><div class="col-5">
                    <Link to={{ pathname: `/modificamovimento/${id}` }}>
                        <button type="button" class="btn btn-outline-primary">Modifica movimento</button>
                    </Link>
                </div>
            </div>
            <hr />
            <Link to="/Movimenti">
                <button type="button" class="btn btn-outline-secondary">Torna a Movimenti</button>
            </Link>
        </center></div></div>
        </>
    );
}

export default VisualizzaMovimento;
