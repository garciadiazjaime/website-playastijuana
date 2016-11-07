/* eslint max-len: [2, 500, 4] */
import React from 'react';
import _ from 'lodash';
import GaUtil from '../../../utils/gaUtil';

const style = require('./style.scss');

export default class PlaceInfo extends React.Component {

  static cleanPhone(data) {
    return data ? data.replace(/^\+52 /, '').replace(/^1 /, '') : '';
  }

  static cleanAddress(data) {
    return data ? data.replace(', B.C., Mexico', '').replace(', BC, Mexico', '').replace(/, \d+ Tijuana$/i, '') : '';
  }

  static cleanWebsite(data) {
    return data ? data.replace('http://www.', '').replace(/\/$/, '').replace('http://', '').replace('https://', '') : '';
  }

  static openNewTab(url) {
    window.open(url);
  }

  constructor() {
    super();
    this.state = {
      commentsDisplay: false,
    };
    this.renderContact = this.renderContact.bind(this);
    this.renderComments = this.renderComments.bind(this);
    this.clickCommentsHandler = this.clickCommentsHandler.bind(this);
    this.clickTelHandler = this.clickTelHandler.bind(this);
    this.clickAddressHandler = this.clickAddressHandler.bind(this);
    this.clickWebsiteHandler = this.clickWebsiteHandler.bind(this);
  }

  componentDidUpdate() {
    this.props.updateHandler();
  }

  clickTelHandler() {
    GaUtil.sendEvent('place', 'click_telephone', `Click on telephone ${this.props.data.placeId}`);
  }

  clickAddressHandler(event) {
    const { google } = this.props.data;
    PlaceInfo.openNewTab(google.url);
    GaUtil.sendEvent('place', 'click_address', `Click on address ${this.props.data.placeId}`);
    event.preventDefault();
  }

  clickWebsiteHandler(event) {
    const { google } = this.props.data;
    PlaceInfo.openNewTab(google.website);
    GaUtil.sendEvent('place', 'click_website', `Click on website ${this.props.data.placeId}`);
    event.preventDefault();
  }

  clickCommentsHandler(event) {
    this.setState({
      commentsDisplay: !this.state.commentsDisplay,
    });
    if (this.state.commentsDisplay) {
      GaUtil.sendEvent('place', 'show_comments', `Click on show Comments ${this.props.data.placeId}`);
    } else {
      GaUtil.sendEvent('place', 'hide_comments', `Click on hide Comments ${this.props.data.placeId}`);
    }
    event.preventDefault();
  }

  hasComments() {
    const { google, foursquare } = this.props.data;
    if (_.isArray(google.reviews) && google.reviews.length) {
      return true;
    } else if (_.isArray(foursquare) && foursquare.length) {
      const { tips } = foursquare[0];
      if (tips && _.isArray(tips.groups) && tips.groups.length) {
        const { items } = tips.groups[0];
        if (_.isArray(items) && items.length) {
          return true;
        }
      }
    }
    return false;
  }

  renderContact() {
    const { google } = this.props.data;
    return (<div>
      { google.international_phone_number ? <div>
        <i className="glyphicon glyphicon-earphone" />
        <a href={`tel:${google.international_phone_number}`} title={google.name} onClick={this.clickTelHandler}>
          {PlaceInfo.cleanPhone(google.international_phone_number)}
        </a>
      </div> : null }
      { google.website ? <div>
        <i className="glyphicon glyphicon-home" />
        <a href={google.website} title={google.name} target="_blank" rel="noopener noreferrer" onClick={this.clickWebsiteHandler}>
          {PlaceInfo.cleanWebsite(google.website)}
        </a>
      </div> : null }
      { google.formatted_address ? <div>
        <i className="glyphicon glyphicon-globe" />
        <a href={google.url} title={google.name} target="_blank" rel="noopener noreferrer" onClick={this.clickAddressHandler}>
          {PlaceInfo.cleanAddress(google.formatted_address)}
        </a>
      </div> : null }
    </div>);
  }

  renderFoursquareTips() {
    const { foursquare } = this.props.data;
    if (_.isArray(foursquare) && foursquare.length) {
      const { tips } = foursquare[0];
      if (tips && _.isArray(tips.groups) && tips.groups.length) {
        const { items } = tips.groups[0];
        if (_.isArray(items) && items.length) {
          return items.slice(0, 3).map((item, index) => (<li key={index}>
            {item.text}
          </li>));
        }
      }
    }
    return null;
  }

  renderGoogleReviews() {
    const { google } = this.props.data;
    return _.isArray(google.reviews) && google.reviews.length ? google.reviews.slice(0, 3).map((item, index) => (<li key={index}>
      {item.text}
    </li>)) : null;
  }

  renderRatings() {
    const { google, foursquare, facebook } = this.props.data;
    return (<div className={style.rating}>
      <div className="row">
        { google.rating ?
          <div className="col-xs-3">
            <div className="row">
              Google Rating
              <br />
              <b>{google.rating}</b>
            </div>
          </div> : null }
        { _.isArray(facebook) && facebook.length && facebook[0].fan_count ?
          <div className="col-xs-3">
            <div className="row">
              Facebook Likes
              <br />
              <b>{facebook[0].fan_count}</b>
            </div>
          </div> : null }
        { _.isArray(facebook) && facebook.length && facebook[0].checkins ?
          <div className="col-xs-3">
            <div className="row">
              Facebook Check-Ins
              <br />
              <b>{facebook[0].checkins}</b>
            </div>
          </div> : null }
        { _.isArray(foursquare) && foursquare.length && foursquare[0].stats.checkinsCount ?
          <div className="col-xs-3">
            <div className="row">
              Foursqure Check-Ins
              <br />
              <b>{foursquare[0].stats.checkinsCount}</b>
            </div>
          </div> : null }
      </div>
    </div>);
  }

  renderComments() {
    return this.hasComments() ? (<div className={style.comments}>
      <h5>
        <a href="/comentarios" onClick={this.clickCommentsHandler}>
          <i className={`glyphicon ${this.state.commentsDisplay ? 'glyphicon-minus' : 'glyphicon-plus'}`} />
          Comentarios
        </a>
      </h5>
      <div className={`${this.state.commentsDisplay ? '' : 'hide'}`}>
        <ul>
          { this.renderFoursquareTips() }
          { this.renderGoogleReviews() }
        </ul>
      </div>
    </div>) : null;
  }

  render() {
    return (<div>
      {this.renderContact()}
      {this.renderRatings()}
      {this.renderComments()}
    </div>);
  }
}

PlaceInfo.propTypes = {
  data: React.PropTypes.shape({
    google: React.PropTypes.object,
    facebook: React.PropTypes.array,
    foursquare: React.PropTypes.array,
    placeId: React.PropTypes.string,
  }),
  updateHandler: React.PropTypes.func,
};
