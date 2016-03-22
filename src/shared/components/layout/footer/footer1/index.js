import React from 'react';

const style = require('./style.scss');
import Brand from './brand';
import Contact from './contact';
import Projects from './projects';

export default class Footer1 extends React.Component {
  render() {
    return (<div className={style.footerWrapper}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-sm-5">
            <Brand />
          </div>
          <div className="col-xs-12 col-sm-7">
            <Contact />
            <Projects />
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
