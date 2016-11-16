/* eslint max-len: [2, 500, 4] */
import React from 'react';
import { toTitleCase } from '../../utils/string';
import SocialMediaIcons from './socialMediaIcons';
import PlaceInfo from './placeInfo';
import PlaceController from '../../../client/controllers/placeController';

const style = require('./style.scss');

export default function PlaceCard({ data, updateHandler }) {
  const imageUrl = PlaceController.getImage(data);
  return (<div className="col-xs-12 col-sm-4">
    <div className={style.card}>
      <img src={imageUrl} alt={data.google ? data.google.name : 'restaurante en Playas de Tijuana'} />
      <div className={style.info}>
        <h3>{toTitleCase(data.google ? data.google.name : '')}</h3>
        <PlaceInfo data={data} updateHandler={updateHandler} />
        <SocialMediaIcons data={data} />
      </div>
    </div>
  </div>);
}

PlaceCard.propTypes = {
  data: React.PropTypes.shape({
  }),
  updateHandler: React.PropTypes.func,
};
