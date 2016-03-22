import React from 'react';
import { Link } from 'react-router';

const style = require('./style.scss');


export default class Projects extends React.Component {

  render() {
    return (<div className={'row ' + style.projects}>
      <div className="col-xs-12">
        <p>Conoce otros proyectos de Mint IT Media</p>
      </div>
      <div className="col-xs-4">
        <Link to="http://garitacenter.com" target="_blank">
          <img src="/images/gc_logo.png" alt="Garita Center" />
          <p>Garita Center</p>
        </Link>
      </div>
      <div className="col-xs-4">
        <Link to="http://misofertasdetrabajo.com" target="_blank">
          <img src="/images/modt_logo.png" alt="Mis ofertas de trabajo" />
          <p>Mis ofertas de trabajo</p>
        </Link>
      </div>
      <div className="col-xs-4">
        <Link to="http://gigplaylist.com" target="_blank">
          <img src="/images/gp_logo.png" alt="Gig playlist" />
          <p>Gig playlist</p>
        </Link>
      </div>
    </div>);
  }
}
