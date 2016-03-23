import React from 'react';
import { Link } from 'react-router';
const style = require('./style.scss');


export default class MainMenu extends React.Component {

  render() {
    /*eslint-disable */
    return (<div className="container-fluid">
      <div className={'row ' + style.header}>
        <div className="col-xs-12">
          <h1><Link to="/" title="Directorio Playas de Tijuana">Directorio<span className={style.playami}>Playami</span></Link></h1>
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
