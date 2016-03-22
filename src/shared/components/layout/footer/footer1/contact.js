import React from 'react';
import { Link } from 'react-router';

const style = process.env.TIER === 'FE' ? require('./style.scss') : {};


export default class FooterTop extends React.Component {

  render() {
    return (<div className={'row ' + style.contact}>
      <div className="col-xs-10 col-xs-offset-1">
        <p>Si deseas salir en este directorio,
        crear tu propio directorio o tienes alguna página o app en mente: </p>
        <h2>No dudes en contactarnos</h2>
      </div>
      <div className="col-xs-12 col-xs-offset-1 col-sm-5">
        <Link to="http://mintitmedia.com" target="_blank">mintitmedia.com</Link>
        <Link className={style.facebook} target="_blank" to="http://facebook.com/mintitmedia">/mintitmedia</Link>
      </div>
      <div className="col-xs-12 col-sm-5">
        <Link to="mailto:mintitmedia.com">info@mintitmedia.com</Link>
        <Link to="phone:6643082240">(664)308-2240</Link>
      </div>
    </div>);
  }
}
