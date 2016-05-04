/* eslint max-len: [2, 500, 4] */
import React from 'react';

const style = require('./style.scss');
import Brand from './brand';
import Contact from './contact';
import Projects from './projects';
import About from './about';

export default class Footer1 extends React.Component {
  render() {
    return (<div className={style.footerWrapper} id="footer_section">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-sm-5">
            <Brand />
          </div>
          <div className="col-xs-12 col-sm-7">
            <Contact />
            <Projects />
          </div>
          <div className="col-xs-12">
            <About />
          </div>
          <div className="col-xs-12">
            <a href="https://plus.google.com/102083249909313249138" title="Directorio Playas de Tijuana - Google Plus" target="_blank">G</a>&nbsp;
            <a href="https://www.facebook.com/directorioplayastijuana/" title="Directorio Playas de Tijuana - Facebook" target="_blank">F</a>
          </div>
        </div>
      </div>
    </div>);
  }
}

Footer1.propTypes = {
  items: React.PropTypes.array.isRequired,
  addresses: React.PropTypes.array,
};
