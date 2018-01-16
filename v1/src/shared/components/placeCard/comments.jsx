/* eslint max-len: [2, 500, 4] */
import React from 'react';
import _ from 'lodash';
import GaUtil from '../../utils/gaUtil';

const style = require('./style.scss');

export default class Comments extends React.Component {

  constructor() {
    super();
    this.state = {
      commentsDisplay: false,
    };
    this.clickCommentsHandler = this.clickCommentsHandler.bind(this);
  }

  componentDidUpdate() {
    this.props.updateHandler();
  }

  clickCommentsHandler(event) {
    if (this.state.commentsDisplay) {
      GaUtil.sendEvent('place', 'hide_comments', `hide_comments::${this.props.data.placeId}::${this.props.data.google.name}`);
    } else {
      GaUtil.sendEvent('place', 'show_comments', `show_comments::${this.props.data.placeId}::${this.props.data.google.name}`);
    }
    this.setState({
      commentsDisplay: !this.state.commentsDisplay,
    });
    event.preventDefault();
  }

  hasComments() {
    const { google, foursquare } = this.props.data;
    if (google && _.isArray(google.reviews) && google.reviews.length) {
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

  render() {
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
}

Comments.propTypes = {
  data: React.PropTypes.shape({
    google: React.PropTypes.object,
    facebook: React.PropTypes.array,
    foursquare: React.PropTypes.array,
    placeId: React.PropTypes.string,
    types: React.PropTypes.array,
  }),
  updateHandler: React.PropTypes.func,
};
