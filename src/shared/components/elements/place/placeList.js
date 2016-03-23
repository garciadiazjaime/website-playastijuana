/* eslint max-len: [2, 500, 4] */

import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import GridTile from 'material-ui/lib/grid-list/grid-tile';

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
    return (<h3><Link to={'/directorio/playas-tijuana/' + categorySlug + '/' + placeSlug} title={data.name + ' - ' + categoryName}>
        {data.name}
      </Link></h3>);
  }

  renderItems(places, categories) {
    if (_.isArray(places) && places.length) {
      const catetoryMap = this.getCategoryMap(categories);
      return places.slice(0, 21).map((item, index) => {
        const categoriesNames = this.getCategoryNames(catetoryMap, item.categories);
        return (<div className="col-sm-4 col-xs-12" key={index}>
          <div className="row">
            <GridTile key={index} title={this.getTitle(item, categoriesNames)} subtitle={<h2>{categoriesNames}</h2>} className={style.placeCard}>
              <img src="/images/placeholder.png" alt={item.name + ' - ' + categoriesNames} />
            </GridTile>
          </div>
        </div>);
      });
    }
    return null;
  }

  render() {
    const { data, categories } = this.props;
    return (<div >
      {this.renderItems(data, categories)}
    </div>);
  }
}

PlaceList.propTypes = {
  data: React.PropTypes.array.isRequired,
  categories: React.PropTypes.array.isRequired,
  place: React.PropTypes.string,
};
