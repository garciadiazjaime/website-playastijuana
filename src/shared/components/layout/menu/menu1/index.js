import React from 'react';
import { Link } from 'react-router';
const style = require('./style.scss');
import SVG from '../../../svg';

export default class MainMenu extends React.Component {

  render() {
    /*eslint-disable */
    return (<div className="container-fluid">
      <div className={'row ' + style.header}>
        <div className="col-xs-12 col-sm-9">
          <h1><Link to="/directorio/playas-tijuana" title="Directorio Playas de Tijuana">Directorio<span className={style.playami}> Playas de Tijuana</span></Link></h1>
        </div>
        <div className={'hidden-xs col-sm3 ' + style.sm}>
          <a href="https://plus.google.com/102083249909313249138" title="Directorio Playas de Tijuana - Google Plus" target="_blank"><SVG network="googleplus" className={style.gmaps}/></a>&nbsp;
          <a href="https://www.facebook.com/directorioplayastijuana/" title="Directorio Playas de Tijuana - Facebook" target="_blank"><SVG network="facebook" className={style.facebook}/></a>
        </div>
      </div>
    </div>);
    /*eslint-enable */
  }
}

MainMenu.propTypes = {
  items: React.PropTypes.array.isRequired,
  icons: React.PropTypes.array,
  location: React.PropTypes.any,
  onClick: React.PropTypes.func.isRequired,
};
