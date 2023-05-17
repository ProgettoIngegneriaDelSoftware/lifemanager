import { useParams } from "react-router-dom";

function Homepage() {
    const params=useParams();
    return(
        <>
            <h2>Benvenuto {params.username}</h2>
            <p>Organizza la tua vita, inizia qui!</p>
        </>
    )
}

export default Homepage;