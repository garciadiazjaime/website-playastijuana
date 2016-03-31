import React from 'react';
import { Link } from 'react-router';

const style = require('./style.scss');


export default class Brand extends React.Component {

  render() {
    return (<div className={'row ' + style.brand}>
      <a className={style.logo} href="http://mintitmedia.com" title="Diseño y Desarrollo Web en Tijuana">
        <img src="/images/logo_mint.png" alt="Diseño y Desarrollo Web en Tijuana" />
      </a>
      <p>
        <Link to="/" title="Directorio de Playas de Tijuana">
          <span className={style.yellow}>Directorio</span>
          <span className={style.white}> Playas de Tijuana</span>
        </Link> es un producto desarrollado por
        <a href="http://mintitmedia.com" title="Diseño y desarrollo web en Tijuana"> Mint IT Media</a>,
        para la comunidad de Playas de Tijuana y el público en general.&nbsp;
        <strong>Directorio de Playas de Tijuana</strong> es un servicio que pone de manera
        sencilla la información referente a restaruantes, negocios, escuelas
        ubicados en Playas de Tijuana. Direcotrio Playas de Tijuana no se hace
        responsable de la información aquí publicada.
      </p>
    </div>);
  }
}
