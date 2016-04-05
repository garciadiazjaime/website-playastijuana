/* eslint max-len: [2, 500, 4] */

import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

const style = require('./style.scss');
import slugUtil from '../../../utils/slug';


export default class PlaceList extends React.Component {
  getCategoryNames(categories) {
    return categories.map((item) => {
      return item.name;
    }).join(' ');
  }

  getTitle(data, categorySlug) {
    const placeSlug = slugUtil(data.name);
    return (<Link to={'/directorio/playas-tijuana/' + categorySlug + '/' + placeSlug} title={data.name + ' - ' + categorySlug}>
        {data.name}
      </Link>);
  }

  getImage(item, categoriesNames) {
    const imgUrl = _.isArray(item.image_set) && item.image_set.length ? item.image_set[0].url.replace('www.dropbox.com', 'dl.dropboxusercontent.com') : '/images/placeholder.png';
    return (<img src={imgUrl} alt={item.name + ' - ' + categoriesNames} itemProp="image" />);
  }

  renderItems(places) {
    if (_.isArray(places) && places.length) {
      return places.slice(0, 63).map((item, index) => {
        const categoriesNames = this.getCategoryNames(item.categories);
        const categorySlug = slugUtil(categoriesNames);
        const imageEl = this.getImage(item, categoriesNames);
        return (<div className={style.placeCard + ' ' + style[categoriesNames]} key={index} itemScope itemType="http://schema.org/LocalBusiness">
            {imageEl}
            <div className={style.legend}>
              <h2 key={index} itemProp="name">
                {this.getTitle(item, categorySlug)}
              </h2>
              <h3>
                <Link to={'/directorio/playas-tijuana/' + categorySlug} title={'Directorio Playas de Tijuana ' + categoriesNames} itemProp="description">
                  {categoriesNames}
                </Link>
              </h3>
            </div>
          </div>);
      });
    }
    return null;
  }

  render() {
    const { data } = this.props;
    return (<div className={'row ' + style.placeContainer}>
      {this.renderItems(data)}
    </div>);
  }
}

PlaceList.propTypes = {
  data: React.PropTypes.array.isRequired,
  categories: React.PropTypes.array.isRequired,
  place: React.PropTypes.string,
};
