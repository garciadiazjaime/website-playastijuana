/* eslint max-len: [2, 500, 4] */

import React from 'react';

import { truncate, toTitleCase } from '../../../utils/string';
import SVG from '../../svg';
const style = require('./style.scss');

export default class CardElement extends React.Component {

  constructor() {
    super();
    this.clickGMapsHandler = this.clickGMapsHandler.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      titleLength: 23,
    };
  }

  componentDidMount() {
    if (window.innerWidth > 767 && window.innerWidth < 1024) {
      /*eslint-disable */
      this.setState({
        titleLength: 17,
      });
      /*eslint-enable */
    }
  }

  clickGMapsHandler() {
    const { data } = this.props;
    const gmapsUrl = `https://www.google.com/maps/place//@${data.location.lat},${data.location.lng},18z`;
    window.open(gmapsUrl);
  }

  render() {
    const { data } = this.props;
    const loadingImage = 'http://nemanjakovacevic.net/wp-content/uploads/2013/07/placeholder.png';
    const imageUrl = data && data.images && data.images.thumbnail && data.images.thumbnail.url ? data.images.thumbnail.url : loadingImage;
    const { titleLength } = this.state;
    return (<div className="col-xs-12 col-sm-4">
      <div className={style.card}>
        <img src={imageUrl} />
        <div className={style.card.info}>
          <h3>{truncate(toTitleCase(data.name), titleLength)}</h3>
          <a title={data.name + ' en playas de tijuana'} target="_blank" onClick={this.clickGMapsHandler}>
            <SVG network="google" />
          </a>
        </div>
      </div>
    </div>);
  }
}

CardElement.propTypes = {
  data: React.PropTypes.object.isRequired,
};
