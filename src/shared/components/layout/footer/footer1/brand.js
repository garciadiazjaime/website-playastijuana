/* eslint max-len: [2, 500, 4] */
import React from 'react';
import { Link } from 'react-router';

const style = require('./style.scss');


export default class Brand extends React.Component {

  render() {
    return (<div className={'row ' + style.brand}>
      <a className={style.logo} href="http://mintitmedia.com" title="Diseño y Desarrollo Web en Tijuana" target="_blank">
        <img src="/images/logo-mint.png" alt="Diseño y Desarrollo Web en Tijuana" />
      </a>
      <p>
        <Link to="/directorio/playas-tijuana" title="Directorio de Playas de Tijuana">
          <span className={style.yellow}>Directorio</span>
          <span className={style.white}> Playas de Tijuana</span>
        </Link> es un producto desarrollado por&nbsp;
        <a href="http://mintitmedia.com" title="Diseño y desarrollo web en Tijuana" target="_blank">
          Mint IT Media
        </a>, para la comunidad de Playas de Tijuana y el público en general.&nbsp;
      </p>
    </div>);
  }
}
