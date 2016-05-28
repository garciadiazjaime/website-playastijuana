/* eslint max-len: [2, 500, 4] */
import React from 'react';
const style = require('./style.scss');
import Brand from './brand';
import Contact from './contact';
import Projects from './projects';
import About from './about';

export default class Footer1 extends React.Component {
  componentDidMount() {
    $('#footerReveal').click(function () {
      $('#footer_section').addClass(style.fixedFooter);
      const fHeight = $(window).height();
      $('#footer_section').height(fHeight);
      $(this).css('display', 'none');
    });
    $('#footer_closer').click(function () {
      $('#footer_section').removeClass(style.fixedFooter);
      $('#footer_section').height();
      $('#footerReveal').css('display', 'block');
      $('#footer_closer').css('display', 'none');
    });
  }
  render() {
    return (<div className={style.footerWrapper} id="footer_section">
      <div className={style.removeFixed} id="footer_closer">
        <span className="glyphicon glyphicon-remove"></span>
      </div>
      <div id="footerReveal" className={style.showFooterBtn}><span>i</span></div>
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
