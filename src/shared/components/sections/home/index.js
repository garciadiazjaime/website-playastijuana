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
      title: 'Mint IT Media',
      description: 'Páginas Web, Sistemas y directorios como éste.',
      category: 'negocios',
      url: 'http://mintitmedia.com',
    }, {
      image: 'https://www.dropbox.com/s/mkl142df3lv9i6z/directorio-playas-tijuana-banner-2.png?dl=0',
      title: 'AR Pays',
      description: 'Pays de dátil y nuez <br />(664)163-1837',
      category: 'restaurantes',
      url: '/directorio/playas-tijuana/bar/ar-pays',
    }, {
      image: 'https://www.dropbox.com/s/sxuulx1lkqvrjio/directorio-playas-tijuana-banner-3.png?dl=0',
      title: 'Bazar Emma',
      description: 'Venta de Antigüedades/Muebles en general<br />Ave. Paseo Ensenada 1312 Playas de Tijuana Secc Jardines<br />11am - 7pm de Lunes a Sábado<br />(664)375-2373',
      category: 'negocios',
      url: '/directorio/playas-tijuana/negocios/bazar-emma',
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
