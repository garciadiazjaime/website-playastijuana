/* eslint max-len: [2, 500, 4] */
import React from 'react';
import _ from 'lodash';

import slugUtil from '../../../utils/slug';
import Block1 from './block1';
import Block2 from './block2';
import CategoriesData from '../../../data/categories';
import PlacesData from '../../../data/places';
const ITEMS_SHOWN = 10;


export default class HomeSection extends React.Component {

  constructor(props) {
    super(props);
    this.selectCategory = this.selectCategory.bind(this);
    this.showMorePlaces = this.showMorePlaces.bind(this);

    const placesByCategory = {};
    PlacesData.map((item) => {
      if (!placesByCategory[item.category.id]) {
        placesByCategory[item.category.id] = [];
      }
      placesByCategory[item.category.id].push(item);
    });

    const { category } = this.props.params;
    const categoryId = this.getCategoryId(CategoriesData, category);

    this.state = {
      placesRef: PlacesData,
      placesByCategory,
      categoryId,
      places: !categoryId ? PlacesData.slice(0, ITEMS_SHOWN) : placesByCategory[categoryId].slice(0, ITEMS_SHOWN),
    };
  }

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
      title: 'Bazar Emma',
      description: 'Venta de Antigüedades/Muebles en general<br />Ave. Paseo Ensenada 1312 Playas de Tijuana Secc Jardines<br />11am - 7pm de Lunes a Sábado<br />(664)375-2373',
      category: 'negocios',
      url: '/directorio/playas-tijuana/negocios/bazar-emma',
    }, {
      image: 'https://www.dropbox.com/s/mkl142df3lv9i6z/directorio-playas-tijuana-banner-2.png?dl=0',
      title: 'AR Pays',
      description: 'Pays de dátil y nuez <br />(664)163-1837',
      category: 'restaurantes',
      url: '/directorio/playas-tijuana/bar/ar-pays',
    }, {
      image: 'https://www.dropbox.com/s/sxuulx1lkqvrjio/directorio-playas-tijuana-banner-3.png?dl=0',
      title: 'Mint IT Media',
      description: 'Páginas Web, Sistemas y directorios como éste.',
      category: 'negocios',
      url: 'http://mintitmedia.com',
    }];
  }

  showMorePlaces() {
    const { places, placesRef, categoryId, placesByCategory } = this.state;
    if (places.length < placesRef.length) {
      const morePlaces = !categoryId ? placesRef.slice(places.length, places.length + ITEMS_SHOWN) : placesByCategory[categoryId].slice(places.length, places.length + ITEMS_SHOWN);
      places.push.apply(places, morePlaces);
      this.setState({
        places,
      });
    }
  }

  selectCategory(category) {
    const categoryId = this.getCategoryId(CategoriesData, category);
    const places = [];
    const { placesRef, placesByCategory } = this.state;
    const morePlaces = !categoryId ? placesRef.slice(places.length, places.length + ITEMS_SHOWN) : placesByCategory[categoryId].slice(places.length, places.length + ITEMS_SHOWN);
    places.push.apply(places, morePlaces);
    this.setState({
      places,
      categoryId,
    });
  }

  render() {
    const { category, place } = this.props.params;
    const { places } = this.state;
    return (<div>
      <Block1 data={this.getCarouselData()} />
      <Block2 categories={CategoriesData} places={places} category={category} place={place} clickHandler={this.selectCategory} scrollHandler={this.showMorePlaces} />
    </div>);
  }
}

HomeSection.propTypes = {
  params: React.PropTypes.any,
};