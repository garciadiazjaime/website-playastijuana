/* eslint max-len: [2, 500, 4] */
import React from 'react';
import _ from 'lodash';
import SVG from '../../svg';

const style = require('./style.scss');

export default class SocialMediaIcons extends React.Component {

  static openNewTab(url) {
    window.open(url);
  }

  constructor() {
    super();
    this.clickGMapsHandler = this.clickGMapsHandler.bind(this);
    this.clickFacebookHandler = this.clickFacebookHandler.bind(this);
    this.clickYelpHandler = this.clickYelpHandler.bind(this);
  }

  clickGMapsHandler(event) {
    const { gmaps } = this.props.data;
    const gmapsUrl = `https://www.google.com/maps/place//@${gmaps.lat},${gmaps.lng},18z`;
    SocialMediaIcons.openNewTab(gmapsUrl);
    event.preventDefault();
  }

  clickFacebookHandler(event) {
    const { facebook } = this.props.data;
    const data = facebook.filter(item => item.link).pop();
    SocialMediaIcons.openNewTab(data.link);
    event.preventDefault();
  }

  clickYelpHandler(event) {
    const { yelp } = this.props.data;
    const data = yelp.filter(item => item.url).pop();
    SocialMediaIcons.openNewTab(data.url);
    event.preventDefault();
  }

  renderGMaps(data) {
    return data ? (<li><a href="https://www.google.com/maps/" title={`${data} en playas de tijuan`} target="_blank" onClick={this.clickGMapsHandler} rel="noopener noreferrer">
      <SVG network="google" />
    </a></li>) : null;
  }

  renderFacebook(data) {
    return _.isArray(data) && data.length ? (<li><a href="https://www.facebook.com/" title={`${data.name} en playas de tijuana`} target="_blank" onClick={this.clickFacebookHandler} rel="noopener noreferrer">
      <SVG network="facebook" />
    </a></li>) : null;
  }

  renderYelp(data) {
    return _.isArray(data) && data.length ? (<li><a href="https://www.yelp.com/" title={`${data.name} en playas de tijuana`} target="_blank" onClick={this.clickYelpHandler} rel="noopener noreferrer">
      <SVG network="yelp" />
    </a></li>) : null;
  }

  render() {
    const { data } = this.props;
    return (<div className={style.socialMediaIcons}>
      <ul>
        {this.renderGMaps(data.name)}
        {this.renderFacebook(data.facebook)}
        {this.renderYelp(data.yelp)}
      </ul>
    </div>);
  }
}

SocialMediaIcons.propTypes = {
  data: React.PropTypes.shape({
    facebook: React.array,
    gmaps: React.object,
    yelp: React.object,
  }),
};
