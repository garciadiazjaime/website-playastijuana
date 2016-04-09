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
        const slug = slugUtil(categories[i].plural);
        if (slug === category) {
          return categories[i].id;
        }
      }
    }
    return null;
  }

  getCarouselData() {
    return [{
      image: 'https://www.dropbox.com/s/15q8zymwsdzcoig/directorio-playas-tijuana-banner-1.png?dl=0',
      title: 'AKI Sushi De Playas',
      description: 'El mejor restaurante sushi en Playas de Tijuana',
      category: 'comida',
      url: '/directorio/playas-tijuana/comida/aki-sushi-de-playas',
    }, {
      image: 'https://www.dropbox.com/s/mkl142df3lv9i6z/directorio-playas-tijuana-banner-2.png?dl=0',
      title: 'Di Vino bar',
      description: 'El mejor bar y restaurante en Playas de Tijuana',
      category: 'bar',
      url: '/directorio/playas-tijuana/bar/di-vino-bar',
    }, {
      image: 'https://www.dropbox.com/s/sxuulx1lkqvrjio/directorio-playas-tijuana-banner-3.png?dl=0',
      title: 'Bar Matt',
      description: 'El mejor bar en Playas de Tijuana',
      category: 'bar',
      url: '/directorio/playas-tijuana/bar/bar-matt',
    }];
  }

  filterPlacesByCategoryId(places, categoryId) {
    if (categoryId) {
      return places.filter((item) => {
        return item.category && item.category.id === categoryId;
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
