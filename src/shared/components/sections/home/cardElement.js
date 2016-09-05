import React from 'react';

import SVG from '../../svg';
const style = require('./style.scss');

export default class CardElement extends React.Component {

  render() {
    const { data } = this.props;
    return (<div className={style.card}>
      <h3>{data.name}</h3>
      <div className={'img-responsive ' + style.image}>
      </div>
      <div>
        <a title={data.name + ' en playas de tijuana'} target="_blank">
          <SVG network="google" />
        </a>
      </div>
    </div>);
  }
}

CardElement.propTypes = {
  data: React.PropTypes.object.isRequired,
};
