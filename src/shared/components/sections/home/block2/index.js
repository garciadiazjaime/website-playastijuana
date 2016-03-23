/* eslint max-len: [2, 500, 4] */
import React from 'react';

import { CategoryList } from '../../../elements/category';
import { PlaceList } from '../../../elements/place';
const style = require('./style.scss');


export default class Block2 extends React.Component {

  render() {
    const { categories, places, category } = this.props;

    return (<div className="container-fluid">
      <div className="row">
        <div className={'col-sm-2 col-xs-12 ' + style.categories}>
          <CategoryList data={categories} category={category} />
        </div>
        <div className={'col-sm-10 col-xs-12 ' + style.results}>
          <PlaceList data={places} categories={categories} />
        </div>
      </div>
    </div>);
  }
}

Block2.propTypes = {
  categories: React.PropTypes.array.isRequired,
  places: React.PropTypes.array.isRequired,
  category: React.PropTypes.string,
  place: React.PropTypes.string,
};
