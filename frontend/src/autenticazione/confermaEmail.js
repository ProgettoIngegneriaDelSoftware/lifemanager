import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function ConfermaEmail() {
    const url = "/api/v1/users/email";
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("data");
    const [res, setRes] = useState(false);

    useEffect(() => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: token,
            }),
        };

        fetch(url, requestOptions)
            .then((response) => {
                if (response.ok) {
                    setRes(true);
                    return response.json();
                } else {
                    throw new Error("Error: " + response.status);
                }
            })
            .then((data) => {
                console.log(data); // Stampa la risposta del backend nella console
            })
            .catch((error) => {
                setRes(false); // Imposta res a false
                console.error(error); // Gestisci gli errori
            });
    }, [url, token]);


    return (
        <>
            {res && (
                <div className="divemail">
                    <br />
                    <h2>Email confermata correttamente</h2>
                    <br />
                    <br />
                    <a href="/">
                        <button className="btn btn-outline-success" type="button">
                            Login
                        </button>
                    </a>
                </div>
            )

            }
            {!res && (
                <div className="divemail">
                    <br />
                    <h2 style={{ color: 'red' }}>Non è stato possibile confermare la mail</h2>
                </div>
            )}
        </>


    );
}

export default ConfermaEmail;
