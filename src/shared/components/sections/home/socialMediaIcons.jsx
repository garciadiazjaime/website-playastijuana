/* eslint max-len: [2, 500, 4] */
import React from 'react';
import _ from 'lodash';
import SVG from '../../svg';
import GaUtil from '../../../utils/gaUtil';

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
    const { google } = this.props.data;
    SocialMediaIcons.openNewTab(google.url);
    GaUtil.sendEvent('place', 'click_gmaps', `Click on gMaps Icon ${this.props.data.placeId}`);
    event.preventDefault();
  }

  clickFacebookHandler(event) {
    const { facebook } = this.props.data;
    const data = facebook.filter(item => item.link).shift();
    SocialMediaIcons.openNewTab(data.link);
    GaUtil.sendEvent('place', 'click_facebook', `Click on Facbook Icon ${this.props.data.placeId}`);
    event.preventDefault();
  }

  clickYelpHandler(event) {
    const { yelp } = this.props.data;
    const data = yelp.filter(item => item.url).shift();
    SocialMediaIcons.openNewTab(data.url);
    GaUtil.sendEvent('place', 'click_yelp', `Click on Yelp Icon ${this.props.data.placeId}`);
    event.preventDefault();
  }

  clickFoursquareHandler(event) {
    const { foursquare } = this.props.data;
    const data = foursquare.filter(item => item.canonicalUrl).shift();
    SocialMediaIcons.openNewTab(data.canonicalUrl);
    GaUtil.sendEvent('place', 'click_foursquare', `Click on Foursqure Icon ${this.props.data.placeId}`);
    event.preventDefault();
  }

  renderGMaps(data) {
    return data ? (<li><a href="https://www.google.com/maps/" title={`${data.name} en playas de tijuan`} target="_blank" onClick={this.clickGMapsHandler} rel="noopener noreferrer">
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

  renderFoursquare(data) {
    return _.isArray(data) && data.length ? (<li><a href="https://foursquare.com/" title={`${data.name} en playas de tijuana`} target="_blank" onClick={this.clickFoursquareHandler} rel="noopener noreferrer">
      <SVG network="foursquare" />
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
