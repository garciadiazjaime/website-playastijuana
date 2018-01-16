/* eslint max-len: [2, 500, 4] */
import React from 'react';

const style = require('./style.scss');


export default function Projects() {
  return (<div className={`row ${style.projects}`}>
    <div className="col-xs-12">
      <p>
        Proyectos hermanos de&nbsp;
        <a href="/" title="Directorio de Playas de Tijuana">
          Directorio Playas de Tijuana
        </a>
      </p>
    </div>
    <div className="col-xs-4">
      <a href="http://www.garitacenter.com" title="Reporte de Garitas en Tijuana para San Ysidro y Otay" target="_blank" rel="noopener noreferrer">
        <img src="/images/gc-logo.png" alt="Reporte de Garitas en Tijuana para San Ysidro y Otay" />
        <p>Garita Center</p>
      </a>
    </div>
    <div className="col-xs-4">
      <a href="http://www.misofertasdetrabajo.com" title="Ofertas de Trabajo en Tijuana" target="_blank" rel="noopener noreferrer">
        <img src="/images/modt-logo.png" alt="Ofertas de Trabajo en Tijuana" />
        <p>Mis ofertas de trabajo</p>
      </a>
    </div>
    <div className="col-xs-4">
      <a href="http://www.tucambionline.com" title="Tipo de Cambio en Tijuana" target="_blank" rel="noopener noreferrer">
        <img src="/images/gp-logo.png" alt="Tipo de Cambio en Tijuana" />
        <p>Tu Cambio Online</p>
      </a>
    </div>
  </div>);
}
