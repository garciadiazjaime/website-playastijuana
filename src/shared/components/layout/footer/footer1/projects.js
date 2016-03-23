/* eslint max-len: [2, 500, 4] */
import React from 'react';
import { Link } from 'react-router';

const style = require('./style.scss');


export default class Projects extends React.Component {

  render() {
    return (<div className={'row ' + style.projects}>
      <div className="col-xs-12">
        <p>Conoce otros proyectos de Mint IT Media</p>
      </div>
      <div className="col-xs-4">
        <Link to="http://garitacenter.com" target="_blank" title="Reporte de Garitas en Tijuana para San Ysidro y Otay">
          <img src="/images/gc_logo.png" alt="Reporte de Garitas en Tijuana para San Ysidro y Otay" />
          <p>Garita Center</p>
        </Link>
      </div>
      <div className="col-xs-4">
        <Link to="http://misofertasdetrabajo.com" target="_blank" title="Ofertas de Trabajo en Tijuana">
          <img src="/images/modt_logo.png" alt="Ofertas de Trabajo en Tijuana" />
          <p>Mis ofertas de trabajo</p>
        </Link>
      </div>
      <div className="col-xs-4">
        <Link to="http://gigplaylist.com" target="_blank" title="Eventos, conciertos, tokadas, música, ruido en Tijuana">
          <img src="/images/gp_logo.png" alt="Eventos, conciertos, tokadas, música, ruido en Tijuana" />
          <p>Gig playlist</p>
        </Link>
      </div>
    </div>);
  }
}
