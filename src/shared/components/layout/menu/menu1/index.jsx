/* eslint max-len: [2, 500, 4] */

import React from 'react';
import { Link } from 'react-router';
import SVG from '../../../svg';

const style = require('./style.scss');

export default function MainMenu() {
  return (<div className={style.header}>
    <div className="container-fluid">
      <div className="row">
        <div className="col-xs-12 col-sm-10">
          <h1><Link to="/" title="Directorio Playas de Tijuana"><span className={style.playami}>Restaurantes, Bares y Cafés en Playas de Tijuana</span></Link></h1>
        </div>
        <div className={`hidden-xs col-sm3 ${style.sm}`}>
          <a href="https://plus.google.com/102083249909313249138" title="Directorio Playas de Tijuana - Google Plus" target="_blank" rel="noopener noreferrer">
            <SVG network="googleplus" className={style.gmaps} />
          </a>&nbsp;
          <a href="https://www.facebook.com/directorioplayastijuana/" title="Directorio Playas de Tijuana - Facebook" target="_blank" rel="noopener noreferrer">
            <SVG network="facebook" className={style.facebook} />
          </a>
        </div>
      </div>
    </div>
  </div>);
}
