import React from 'react';

const style = require('./style.scss');
import Brand from './brand';
import Powered from './powered';
import Addresses from './addresses';
import SiteMap from './sitemap';
import Services from './services';

export default class FooterAAA extends React.Component {

  render() {
    const { addresses } = this.props;

    return (<div className={style.footerWrapper}>
      <div className="container">
        <Brand />
        <div className="row">
          <div className="col-xs-12 col-sm-2">
            <SiteMap data={this.props.items} />
          </div>
          <div className={'col-xs-12 col-sm-10 ' + style.leftBorder}>
            <Services />
            <Addresses data={addresses} />
          </div>
        </div>
      </div>

      <Powered />
    </div>);
  }
}

FooterAAA.propTypes = {
  items: React.PropTypes.array.isRequired,
  addresses: React.PropTypes.array,
};
