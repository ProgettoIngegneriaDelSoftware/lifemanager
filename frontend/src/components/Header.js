import React from 'react';
import { useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  const isLinkEnabled = () => {
    // Determina in quali pagine il link deve essere abilitato
    return location.pathname === '/' || location.pathname === '/registrati' || location.pathname === '/conferma-email' || location.pathname === '/homepage';
  };

  return (
    <>
      <div class="divheader">
        {isLinkEnabled() && (
          <div class='titoloHeader'><h1>Life Manager</h1></div>
        )}
        {!isLinkEnabled() && (
          <div class='titoloHeader'><a href="/homepage" className='linkNormale'><h1>Life Manager</h1></a></div>
        )}
      </div>
      <hr style={{ flex: '1', marginLeft: '25px', marginRight: '25px', borderTop: '1px solid black' }} />
    </>
  );
}

export default Header;
