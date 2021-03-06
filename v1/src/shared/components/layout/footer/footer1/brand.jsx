/* eslint max-len: [2, 500, 4] */
import React from 'react';
import { Link } from 'react-router';

const style = require('./style.scss');


export default function Brand() {
  return (<div className={`row ${style.brand}`}>
    <a className={style.logo} href="http://mintitmedia.com" title="Diseño y Desarrollo Web en Tijuana" target="_blank" rel="noopener noreferrer">
      <img src="/images/logo-mint.png" alt="Diseño y Desarrollo Web en Tijuana" />
    </a>
    <p>
      <Link to="/" title="Directorio de Playas de Tijuana">
        Directorio Playas de Tijuana
      </Link> es un producto desarrollado por&nbsp;
      <a href="http://mintitmedia.com" title="Diseño y desarrollo web en Tijuana" target="_blank" rel="noopener noreferrer">
        Mint IT Media
      </a>, para la comunidad de Playas de Tijuana y el público en general.&nbsp;
    </p>
  </div>);
}
