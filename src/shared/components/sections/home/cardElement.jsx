/* eslint max-len: [2, 500, 4] */

import React from 'react';
import _ from 'lodash';
import { truncate, toTitleCase } from '../../../utils/string';
import SocialMediaIcons from './socialMediaIcons';
import PlaceInfo from './placeInfo';

const style = require('./style.scss');

export default class CardElement extends React.Component {

  static getImage(data) {
    if (data && _.isArray(data.google.photos) && data.google.photos.length) {
      return `//${data.google.photos[0]}`;
    } else if (data && _.isArray(data.facebook) && data.facebook.length && data.facebook[0].cover) {
      return data.facebook[0].cover.source;
    } else if (data && _.isArray(data.foursquare) && data.foursquare.length && data.foursquare[0].bestPhoto) {
      const imageSize = '400x250';
      return `${data.foursquare[0].bestPhoto.prefix}${imageSize}${data.foursquare[0].bestPhoto.suffix}`;
    } else if (data && _.isArray(data.yelp) && data.yelp.length && data.yelp[0].image_url) {
      return data.yelp[0].image_url;
    }
    return 'http://nemanjakovacevic.net/wp-content/uploads/2013/07/placeholder.png';
  }

  constructor() {
    super();
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      titleLength: 22,
      descriptionLength: 166,
    };
  }

  componentDidMount() {
    if (window.innerWidth > 767 && window.innerWidth < 1024) {
      /*eslint-disable */
      this.setState({
        titleLength: 17,
      });
      /*eslint-enable */
    } else if (window.innerWidth < 768) {
      /*eslint-disable */
      this.setState({
        titleLength: 500,
        descriptionLength: 500,
      });
      /*eslint-enable */
    }
  }

  render() {
    const { data } = this.props;
    const imageUrl = CardElement.getImage(data);
    const { titleLength } = this.state;
    // descriptionLength
    return (<div className="col-xs-12 col-sm-4">
      <div className={style.card}>
        <img src={imageUrl} alt={data.google.name} />
        <div className={style.info}>
          <h3>{truncate(toTitleCase(data.google.name), titleLength)}</h3>
          <PlaceInfo data={data} />
          <SocialMediaIcons data={data} />
        </div>
      </div>
    </div>);
  }
}

CardElement.propTypes = {
  data: React.PropTypes.shape({
  }),
};
