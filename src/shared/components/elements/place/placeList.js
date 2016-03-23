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

  getTitle(data, categoryName) {
    const categorySlug = slugUtil(categoryName);
    const placeSlug = slugUtil(data.name);
    return (<Link to={'/directorio/playas-tijuana/' + categorySlug + '/' + placeSlug} title={data.name + ' - ' + categoryName}>
        {data.name}
      </Link>);
  }

  renderItems(places, categories) {
    if (_.isArray(places) && places.length) {
      const catetoryMap = this.getCategoryMap(categories);
      return places.slice(0, 21).map((item, index) => {
        const categoriesNames = this.getCategoryNames(catetoryMap, item.categories);
        return (<div className={style.placeCard} key={index}>
            <img src="/images/placeholder.png" alt={item.name + ' - ' + categoriesNames} />
            <h3 key={index} className={style[categoriesNames]}>
              {this.getTitle(item, categoriesNames)}
            </h3>
            <h2>
              <Link to={'/directorio/playas-tijuana/' + categories} title={'Directorio Playas de Tijuana ' + categories}>
                <span className={style.subtitle}>{categoriesNames}</span>
              </Link>
            </h2>
          </div>);
      });
    }
    return null;
  }

  render() {
    const { data, categories } = this.props;
    return (<div className="row">
      {this.renderItems(data, categories)}
    </div>);
  }
}

PlaceList.propTypes = {
  data: React.PropTypes.array.isRequired,
  categories: React.PropTypes.array.isRequired,
  place: React.PropTypes.string,
};
