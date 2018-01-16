/* eslint max-len: [2, 500, 4] */
import React from 'react';
import _ from 'lodash';
import SVG from '../svg';
import GaUtil from '../../utils/gaUtil';

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
    this.clickFoursquareHandler = this.clickFoursquareHandler.bind(this);
  }

  clickGMapsHandler(event) {
    const { placeId, google } = this.props.data;
    SocialMediaIcons.openNewTab(google.url);
    GaUtil.sendEvent('place', 'click_gmaps', `click_gmaps::${placeId}::${google.name}`);
    event.preventDefault();
  }

  clickFacebookHandler(event) {
    const { placeId, google, facebook } = this.props.data;
    const data = facebook.filter(item => item.link).shift();
    SocialMediaIcons.openNewTab(data.link);
    GaUtil.sendEvent('place', 'click_facebook', `click_facebook::${placeId}::${google.name}`);
    event.preventDefault();
  }

  clickFoursquareHandler(event) {
    const { placeId, google, foursquare } = this.props.data;
    const data = foursquare.filter(item => item.canonicalUrl).shift();
    SocialMediaIcons.openNewTab(data.canonicalUrl);
    GaUtil.sendEvent('place', 'click_foursquare', `click_foursquare::${placeId}::${google.name}`);
    event.preventDefault();
  }

  clickYelpHandler(event) {
    const { placeId, google, yelp } = this.props.data;
    const data = yelp.filter(item => item.url).shift();
    SocialMediaIcons.openNewTab(data.url);
    GaUtil.sendEvent('place', 'click_yelp', `click_yelp::${placeId}::${google.name}`);
    event.preventDefault();
  }

  renderGMaps() {
    const { google } = this.props.data;
    return google ? (<li><a href="https://www.google.com/maps/" title={`${google.name} en playas de tijuan`} onClick={this.clickGMapsHandler}>
      <SVG network="google" />
    </a></li>) : null;
  }

  renderFacebook() {
    const { google, facebook } = this.props.data;
    return _.isArray(facebook) && facebook.length ? (<li><a href="https://www.facebook.com/" title={`${google.name} en playas de tijuana`} onClick={this.clickFacebookHandler}>
      <SVG network="facebook" />
    </a></li>) : null;
  }

  renderFoursquare() {
    const { google, foursquare } = this.props.data;
    return _.isArray(foursquare) && foursquare.length ? (<li><a href="https://foursquare.com/" title={`${google.name} en playas de tijuana`} onClick={this.clickFoursquareHandler}>
      <SVG network="foursquare" />
    </a></li>) : null;
  }

  renderYelp() {
    const { google, yelp } = this.props.data;
    return _.isArray(yelp) && yelp.length ? (<li><a href="https://www.yelp.com/" title={`${google.name} en playas de tijuana`} onClick={this.clickYelpHandler}>
      <SVG network="yelp" />
    </a></li>) : null;
  }

  render() {
    const { data } = this.props;
    return (<div className={style.socialMediaIcons}>
      <ul>
        {this.renderGMaps(data.google)}
        {this.renderFacebook(data.facebook)}
        {this.renderFoursquare(data.foursquare)}
        {this.renderYelp(data.yelp)}
      </ul>
    </div>);
  }
}

SocialMediaIcons.propTypes = {
  data: React.PropTypes.shape({
    facebook: React.array,
    google: React.object,
    yelp: React.array,
    foursquare: React.array,
    placeId: React.PropTypes.string,
  }),
};
