/* eslint max-len: [2, 500, 4] */

import React from 'react';
import _ from 'lodash';

import SVG from '../../svg';
const style = require('./style.scss');

export default class SocialMediaIcons extends React.Component {

  constructor() {
    super();
    this.clickGMapsHandler = this.clickGMapsHandler.bind(this);
    this.clickFacebookHandler = this.clickFacebookHandler.bind(this);
  }

  clickGMapsHandler() {
    const { gmaps } = this.props.data;
    const gmapsUrl = `https://www.google.com/maps/place//@${gmaps.lat},${gmaps.lng},18z`;
    this.openNewTab(gmapsUrl);
  }

  clickFacebookHandler() {
    const { facebook } = this.props.data;
    const data = facebook.filter(item => item.link).pop();
    this.openNewTab(data.link);
  }

  openNewTab(url) {
    window.open(url);
  }

  renderGMaps(data) {
    return data ? (<li><a title={data.name + ' en playas de tijuana'} target="_blank" onClick={this.clickGMapsHandler}>
      <SVG network="google" />
    </a></li>) : null;
  }

  renderFacebook(data) {
    return _.isArray(data) && data.length ? (<li><a title={data.name + ' en playas de tijuana'} target="_blank" onClick={this.clickFacebookHandler}>
      <SVG network="facebook" />
    </a></li>) : null;
  }

  render() {
    const { data } = this.props;
    return (<div className={style.socialMediaIcons}>
        <ul>
        {this.renderGMaps(data.gmaps)}
        {this.renderFacebook(data.facebook)}
      </ul>
    </div>);
  }
}

SocialMediaIcons.propTypes = {
  data: React.PropTypes.object.isRequired,
};
