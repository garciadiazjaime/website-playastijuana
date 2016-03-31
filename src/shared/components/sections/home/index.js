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

  getCarouselData() {
    return [{
      image: '/images/demo.jpg',
      title: '1O verlay title',
      description: '1 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      category: 'bar',
      url: '/directorio/playas-tijuana/bar/di-vino-bar',
    }, {
      image: '/images/demo.jpg',
      title: '2O verlay title',
      description: '2 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      category: 'bar',
      url: '/directorio/playas-tijuana/bar/bar-matt',
    }, {
      image: '/images/demo.jpg',
      title: '3O verlay title',
      description: '3 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      category: 'bar',
      url: '/directorio/playas-tijuana/bar/la-cerve',
    }];
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
    return (<div>
      <Block1 data={this.getCarouselData()} />
      <Block2 categories={CategoriesData} places={places} category={category} place={place} />
    </div>);
  }
}

HomeSection.propTypes = {
  params: React.PropTypes.any,
};
