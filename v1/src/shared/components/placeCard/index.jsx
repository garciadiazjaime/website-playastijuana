/* eslint max-len: [2, 500, 4] */
import React from 'react';
import StringUtil from '../../utils/stringUtil';

import ContactInfo from './contactInfo';
import Ratings from './ratings';
import Comments from './comments';
import SocialMediaIcons from './socialMediaIcons';

import PlaceController from '../../../client/controllers/placeController';

const style = require('./style.scss');

export default class PlaceCard extends React.Component {

  renderTypes() {
    const { types } = this.props.data;
    return types ? types.map((item, index) => <span className="label label-default" key={index}>{item}</span>) : null;
  }

  render() {
    const { data, updateHandler } = this.props;
    const imageUrl = PlaceController.getImage(data);
    return (<div className="col-xs-12 col-sm-4">
      <div className={style.card}>
        <img src={imageUrl} alt={data.google ? data.google.name : 'restaurante en Playas de Tijuana'} />
        <div className={style.info}>
          <h3>{StringUtil.toTitleCase(data.google ? data.google.name : '')}</h3>
          <ContactInfo data={this.props.data} />
          <div className={style.types}>
            {this.renderTypes()}
          </div>
          <Ratings data={this.props.data} />
          <Comments data={this.props.data} updateHandler={updateHandler} />
          <SocialMediaIcons data={data} />
        </div>
      </div>
    </div>);
  }
}

PlaceCard.propTypes = {
  data: React.PropTypes.shape({
    google: React.PropTypes.object,
    facebook: React.PropTypes.array,
    foursquare: React.PropTypes.array,
    placeId: React.PropTypes.string,
    types: React.PropTypes.array,
  }),
  updateHandler: React.PropTypes.func,
};
