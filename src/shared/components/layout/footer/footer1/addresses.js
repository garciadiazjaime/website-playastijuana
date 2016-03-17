import React from 'react';
import { Link } from 'react-router';
const style = require('./style.scss');


export default class Addresses extends React.Component {

  renderAddress(item, index) {
    return (<div className={style.addresses + ' col-xs-12 col-sm-3'} key={index}>
      <div>
        <h4>
          {item.title}:
        </h4>
        <p>
          {item.tel}
        </p>
      </div>
    </div>);
  }

  render() {
    const itemsEl = this.props.data.map((item, index) => {
      return this.renderAddress(item, index);
    });

    return (<div>
      <div className="row">
        <div className="col-xs-12">
          <Link className={style.contactBlock} to="contacto" title="Contáctanos">
            Contáctanos
          </Link>
        </div>
      </div>
      <div className="row">
        {itemsEl}
      </div>
    </div>);
  }
}

Addresses.propTypes = {
  data: React.PropTypes.array,
};
