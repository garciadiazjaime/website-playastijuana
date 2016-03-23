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
    return (<Link to={'/directorio/' + categorySlug + '/' + placeSlug} title={data.name}>
        {data.name}
      </Link>);
  }

  renderItems(places, categories) {
    if (_.isArray(places) && places.length) {
      const catetoryMap = this.getCategoryMap(categories);
      return places.slice(0, 21).map((item, index) => {
        const categoriesNames = this.getCategoryNames(catetoryMap, item.categories);
        return (<div className={style.placeCard}>
            <h1 key={index} className={style[categoriesNames]}>
              {this.getTitle(item, categoriesNames)}
              <span className={style.subtitle}>{categoriesNames}</span>
            </h1>
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
