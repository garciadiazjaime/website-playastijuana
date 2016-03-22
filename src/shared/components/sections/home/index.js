/* eslint max-len: [2, 500, 4] */
import React from 'react';
import _ from 'lodash';

import slugUtil from '../../../utils/slug';
import Block1 from './block1';
import Block2 from './block2';
import CategoriesData from '../../../data/categories';
import PlacesData from '../../../data/places';


export default class HomeSection extends React.Component {

  getCategoryId(categories, category) {
    if (_.isArray(categories) && categories.length && category) {
      for (let i = 0, len = categories.length; i < len; i++) {
        const slug = slugUtil(categories[i].name);
        if (slug === category) {
          return categories[i].id;
        }
      }
    }
    return null;
  }

  filterPlacesByCategoryId(places, categoryId) {
    if (categoryId) {
      return places.filter((item) => {
        return item.categories.indexOf(categoryId) !== -1;
      });
    }
    return places;
  }

  render() {
    const { category, place } = this.props.params;
    const categoryId = this.getCategoryId(CategoriesData, category);
    const places = this.filterPlacesByCategoryId(PlacesData, categoryId);

    return (<div className="container">
      <Block1 />
      <Block2 categories={CategoriesData} places={places} category={category} place={place} />
    </div>);
  }
}

HomeSection.propTypes = {
  params: React.PropTypes.any,
};
