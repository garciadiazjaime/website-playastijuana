import React from 'react';
import _ from 'lodash';

import CategoriesData from '../../../data/categories';
import PlacesData from '../../../data/places';
import { CategoryList } from '../../elements/category';
import { PlaceList } from '../../elements/place';
import slugUtil from '../../../utils/slug';


export default class HomeSection extends React.Component {

  getCategoryId(data, category) {
    if (category && _.isArray(data) && data.length) {
      for (let i = 0, len = data.length; i < len; i++) {
        const slug = slugUtil(data[i].name);
        if (slug === category) {
          return data[i].id;
        }
      }
    }
    return null;
  }

  filterPlaces(data, categoryId) {
    if (categoryId) {
      return data.filter((item) => {
        return item.categories.indexOf(categoryId) !== -1;
      });
    }
    return data;
  }

  render() {
    const { category, place } = this.props.params;
    const categoryId = this.getCategoryId(CategoriesData, category);
    const places = this.filterPlaces(PlacesData, categoryId);
    return (<div className="container-fluid">
      [ banner ] <br />
      <div className="row">
        <div className="col-sm-2 col-xs-12">
          <CategoryList data={CategoriesData} category={category} />
          <div>
            [ map ]
          </div>
        </div>
        <div className="col-sm-10 col-xs-12">
          <PlaceList data={places} categories={CategoriesData} place={place} />
        </div>
      </div>
    </div>);
  }
}

HomeSection.propTypes = {
  params: React.PropTypes.any,
};
