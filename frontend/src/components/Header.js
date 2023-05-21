import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
    <br />
    <button onClick={handleGoBack} style={{backgroundColor: 'transparent', border: 0}}>
      <img src={process.env.PUBLIC_URL + '/indietro.png' } alt="indietro" style={{ width: '25px', height: 'auto'}}/>
      </button> 
      <h1>Life Manager</h1>
      <hr />
    </>
  );
}

export default Header;
