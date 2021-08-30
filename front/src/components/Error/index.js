// == Import : npm
import React from 'react';

// == Import : local
import './error.scss';
import Picture from 'src/assets/carton_rouge.png';

// == Component
const Error = () => (
  <div className="error">
    <p className="error__text">Page non trouvée</p>
    <div className="error__picture">
      <img src={Picture} alt="Arbitre tenant un carton rouge" className="error__picture__img" />
    </div>
    <a href="#" className="error__home">Retour à l'accueil</a>
  </div>
);

export default Error;
