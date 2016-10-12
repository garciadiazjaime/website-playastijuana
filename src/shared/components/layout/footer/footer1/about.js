/* eslint max-len: [2, 500, 4] */
import React from 'react';
import { Link } from 'react-router';

const style = require('./style.scss');


export default class Projects extends React.Component {

  render() {
    return (<div className={'row ' + style.about}>
    <h2>Directorio Playas de Tijuana</h2>
    <p>
      En&nbsp;<Link to="/" title="Directorio Playas de Tijuana">
        Directorio Playas de Tijuana
      </Link>&nbsp; buscamos recopilar una guía comprensiva de los negocios que operan en la comunidad de <strong>Playas de Tijuana</strong>.&nbsp;
      <Link to="/" title="Directorio Playas de Tijuana">
        Directorio Playas de Tijuana
      </Link> es un servicio que publica de manera sencilla la información referente a&nbsp;
      <Link to="/restaurantes" title="Directorio Playas de Tijuana">restaurantes</Link>,&nbsp;
      <Link to="/bares" title="Directorio Playas de Tijuana">bares</Link>,&nbsp;
      <Link to="/cafes" title="Directorio Playas de Tijuana">cafés</Link>&nbsp;
      ubicados en <strong>Playas de Tijuana</strong>. La creación de este <Link to="/" title="Directorio Playas de Tijuana">
        Directorio Playas de Tijuana
      </Link> tiene el objetivo de ofrecer a su público un acceso eficaz a lo que <strong>Playas de Tijuana</strong> tiene que ofrecer y, de esta manera, promover el desarrollo económico de la Delegación <strong>Playas de Tijuana</strong>.
    </p>
    <p>
      <Link to="/" title="Directorio Playas de Tijuana">
        Directorio Playas de Tijuana
      </Link> es un servicio que opera con base en la recopilación de información que existe públicamente disponible en Internet. La veracidad de dicha información recae en los autores originales de tal. <Link to="/" title="Directorio de Playas de Tijuana">
        Directorio Playas de Tijuana
      </Link> no se hace responsable de la veracidad de dicha información y, en caso de incongruencias invitamos al público a contactarnos para hacer las correcciones necesarias.
    </p>
    </div>);
  }
}
