import React from 'react';
import { Link } from 'react-router';

const style = require('./style.scss');


export default class Brand extends React.Component {

  render() {
    return (<div className={'row ' + style.brand}>
      <Link className={style.logo} to="/inicio">
        <img src="/images/logo_mint.png" alt="Mint IT Media" />
      </Link>
      <p>
        El equipo de Mint IT Media se enorgullese en poner el
        <span className={style.yellow}> Directorio</span>
        <span className={style.white}>Playami </span>
        a disposición de la comunidad de Playas de Tijuana.
      </p>
    </div>);
  }
}
