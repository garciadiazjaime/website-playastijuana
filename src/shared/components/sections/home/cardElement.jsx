/* eslint max-len: [2, 500, 4] */

import React from 'react';
import _ from 'lodash';
import { truncate, toTitleCase } from '../../../utils/string';
import SocialMediaIcons from './socialMediaIcons';

const style = require('./style.scss');

export default class CardElement extends React.Component {

  static getImage(data) {
    if (data && _.isArray(data.photos) && data.photos.length) {
      return `//${data.photos[0]}`;
    } else if (data && _.isArray(data.facebook) && data.facebook.length && data.facebook[0].cover) {
      return data.facebook[0].cover.source;
    }
    return 'http://nemanjakovacevic.net/wp-content/uploads/2013/07/placeholder.png';
  }

  static getDescription(data) {
    if (_.isArray(data) && data.length) {
      return data[0].description;
    }
    return null;
  }

  static getSocialMediaData(data) {
    return data ? {
      name: data.name,
      gmaps: data.geometry ? data.geometry.location : null,
      facebook: data.facebook,
    } : {};
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
    const { titleLength, descriptionLength } = this.state;
    return (<div className="col-xs-12 col-sm-4">
      <div className={style.card}>
        <img src={imageUrl} alt={data.name} />
        <div className={style.card.info}>
          <h3>{truncate(toTitleCase(data.name), titleLength)}</h3>
          <p>
            {truncate(CardElement.getDescription(data.metaDescriptions), descriptionLength)}
          </p>
          <SocialMediaIcons data={CardElement.getSocialMediaData(data)} />
        </div>
      </div>
    </div>);
  }
}

CardElement.propTypes = {
  data: React.PropTypes.shape({
  }),
};
