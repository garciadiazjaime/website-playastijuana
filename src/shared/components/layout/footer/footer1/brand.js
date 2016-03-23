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
          <span className={style.white}>Playami </span>
        </Link> es un producto desarrollado por el equipo de
        diseño y desarrollo web: <a href="http://mintitmedia.com" title="Mint IT Media">Mint IT Media</a>,
        para la comunidad de Playas de Tijuana y el público en general.
      </p>
    </div>);
  }
}
