import React from 'react';
import _ from 'lodash';

const style = require('./style.scss');

export default function Ratings({ data }) {
  const { google, foursquare, facebook } = data;
  return (<div className={style.rating}>
    <div className="row">
      { google && google.rating ?
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

Ratings.propTypes = {
  data: React.PropTypes.shape({
    google: React.PropTypes.object,
    facebook: React.PropTypes.array,
    foursquare: React.PropTypes.array,
  }),
};
