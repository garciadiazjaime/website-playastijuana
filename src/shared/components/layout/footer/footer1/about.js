/* eslint max-len: [2, 500, 4] */
import React from 'react';
import { Link } from 'react-router';

const style = require('./style.scss');


export default class Projects extends React.Component {

  render() {
    return (<div className={'row ' + style.about}>
    <h2>Acerca del proyecto</h2>
    <p>
      En&nbsp;<Link to="/directorio/playas-tijuana" title="Directorio de Playas de Tijuana">
        Directorio de Playas de Tijuana
      </Link>&nbsp; buscamos recopilar una guía comprensiva de los negocios que operan en la comunidad de Playas de Tijuana.
      es un servicio que publica de manera sencilla la información referente a restaurantes, negocios, escuelas
      ubicados en Playas de Tijuana. La creación de este Directorio de Playas de Tijuana tiene el objetivo de ofrecer a su público un acceso eficaz a lo que la comunidad tiene que ofrecer y, de esta manera, promover el desarrollo económico de la Delegación.
    </p>
    <p>
      <Link to="/directorio/playas-tijuana" title="Directorio de Playas de Tijuana">
        Direcotrio Playas de Tijuana
      </Link> es un servicio que opera con base en la recopilación de información que existe públicamente disponible en Interet. La veracidad de dicha información recae en los autores originales de tal. Directorio de Playas de Tijuana no se hace responsable de la veracidad de dicha información y, en caso de incongruencias invitamos al público a contactarnos para hacer las correcciones necesarias.
    </p>
    </div>);
  }
}
