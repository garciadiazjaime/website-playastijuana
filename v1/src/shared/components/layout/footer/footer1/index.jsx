/* eslint max-len: [2, 500, 4] */
import React from 'react';
import Brand from './brand';
import Projects from './projects';
import About from './about';
import SVG from '../../../svg';

const style = require('./style.scss');

export default function Footer1() {
  return (<div className={style.footerWrapper} id="footer_section">
    <div className={style.mintWrapper}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-sm-5">
            <Brand />
          </div>
          <div className="col-xs-12 col-sm-7">
            <Projects />
          </div>
        </div>
      </div>
    </div>
    <div className="container-fluid">
      <div className="row">
        <div className="col-xs-12">
          <About />
        </div>
        <div className="col-xs-12">
          <div className={`row ${style.smRow}`}>
            <a href="https://plus.google.com/102083249909313249138" title="Directorio Playas de Tijuana - Google Plus" target="_blank" rel="noopener noreferrer">
              <SVG network="googleplus" className={style.gmaps} /></a>&nbsp;
            <a href="https://www.facebook.com/directorioplayastijuana/" title="Directorio Playas de Tijuana - Facebook" target="_blank" rel="noopener noreferrer">
              <SVG network="facebook" className={style.facebook} /></a>
          </div>
        </div>
      </div>
    </div>
  </div>);
}
