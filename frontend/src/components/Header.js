import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header(showButton) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
    <div class="divheader">
      <br />
      <button onClick={handleGoBack} class='frecciaIndietro'>
        <img src={process.env.PUBLIC_URL + '/indietro.png' } alt="indietro" style={{ width: '25px', height: 'auto'}}/>
      </button>
      <div class='titoloHeader'><h1>Life Manager</h1></div>
    </div>
    <hr style={{ flex: '1', marginLeft: '25px', marginRight: '25px', borderTop: '1px solid black' }}/>
    </>
  );
}

export default Header;
