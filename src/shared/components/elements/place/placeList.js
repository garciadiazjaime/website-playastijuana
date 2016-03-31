/* eslint max-len: [2, 500, 4] */

import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

const style = require('./style.scss');
import slugUtil from '../../../utils/slug';


export default class PlaceList extends React.Component {
  getCategoryNames(catetoryMap, categories) {
    const response = [];
    if (!_.isEmpty(catetoryMap) && _.isArray(categories) && categories.length) {
      categories.map((item) => {
        if (catetoryMap[item]) {
          response.push(catetoryMap[item]);
        }
      });
    }
    return response.join(' ');
  }

  getCategoryMap(data) {
    const response = {};
    if (_.isArray(data) && data.length) {
      data.map((item) => {
        response[item.id] = item.name;
      });
    }
    return response;
  }

  getTitle(data, categorySlug) {
    const placeSlug = slugUtil(data.name);
    return (<Link to={'/directorio/playas-tijuana/' + categorySlug + '/' + placeSlug} title={data.name + ' - ' + categorySlug}>
        {data.name}
      </Link>);
  }

  renderItems(places, categories) {
    if (_.isArray(places) && places.length) {
      const catetoryMap = this.getCategoryMap(categories);
      return places.slice(0, 51).map((item, index) => {
        const categoriesNames = this.getCategoryNames(catetoryMap, item.categories);
        const categorySlug = slugUtil(categoriesNames);
        return (<div className={style.placeCard + ' ' + style[categoriesNames]} key={index} itemScope itemType="http://schema.org/LocalBusiness">
            <img src="/images/placeholder.png" alt={item.name + ' - ' + categoriesNames} itemProp="image" />
            <div className={style.legend + ' ' + style[categoriesNames]}>
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
    const { data, categories } = this.props;
    return (<div className={'row ' + style.placeContainer}>
      {this.renderItems(data, categories)}
    </div>);
  }
}

PlaceList.propTypes = {
  data: React.PropTypes.array.isRequired,
  categories: React.PropTypes.array.isRequired,
  place: React.PropTypes.string,
};
