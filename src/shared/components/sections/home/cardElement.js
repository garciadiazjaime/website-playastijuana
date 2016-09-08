/* eslint max-len: [2, 500, 4] */

import React from 'react';

import SVG from '../../svg';
const style = require('./style.scss');

export default class CardElement extends React.Component {

  render() {
    const { data } = this.props;
    const loadingImage = 'http://nemanjakovacevic.net/wp-content/uploads/2013/07/placeholder.png';
    const imageUrl = data && data.images && data.images.thumbnail && data.images.thumbnail.url ? data.images.thumbnail.url : loadingImage;
    return (<div className={style.card}>
      <h3>{data.name}</h3>
      <div>
        <img src={imageUrl} className={'img-responsive ' + style.image} />
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
