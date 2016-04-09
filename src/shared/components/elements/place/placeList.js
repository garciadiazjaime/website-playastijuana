/* eslint max-len: [2, 500, 4] */

import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

const style = require('./style.scss');
import slugUtil from '../../../utils/slug';


export default class PlaceList extends React.Component {
  getCategoryNames(categories) {
    return categories.map((item) => {
      return item.name;
    }).join(' ');
  }

  getTitle(data, categorySlug) {
    const placeSlug = slugUtil(data.name);
    return (<Link to={'/directorio/playas-tijuana/' + categorySlug + '/' + placeSlug} title={data.name + ' - ' + categorySlug}>
        {data.name}
      </Link>);
  }

  getImage(item, category) {
    const imgUrl = _.isArray(item.image_set) && item.image_set.length ? item.image_set[0].url.replace('www.dropbox.com', 'dl.dropboxusercontent.com') : '/images/placeholder.png';
    return (<img src={imgUrl} alt={item.name + ' - ' + category} itemProp="image" />);
  }

  getLinks(data) {
    const response = {
      google: '',
      facebook: '',
      yelp: '',
      foursquare: '',
    };
    if (_.isArray(data.link_set) && data.link_set.length) {
      data.link_set.map((item) => {
        for (const prop in response) {
          if (item.url.indexOf(prop) !== -1) {
            response[prop] = item.url;
          }
        }
      });
    }
    return response;
  }

  renderLinks(data, name) {
    const response = [];
    let index = 0;
    for (const prop in data) {
      if (data.hasOwnProperty(prop) && data[prop]) {
        response.push(<a href={data[prop]} title={name + 'en ' + prop} target="_blank" className={prop} key={index}>
          {prop}&nbsp;
        </a>);
        index ++;
      }
    }
    return (<div>
      {response}
    </div>);
  }

  renderItems(places) {
    if (_.isArray(places) && places.length) {
      return places.slice(0, 63).map((item, index) => {
        const { category, categoryId } = item;
        const categorySlug = slugUtil(category);
        const imageEl = this.getImage(item, category);
        const links = this.getLinks(item);
        return (<div className={style.placeCard + ' category_' + categoryId} key={index} itemScope itemType="http://schema.org/LocalBusiness">
            {imageEl}
            <div className={style.legend}>
              <h2 key={index} itemProp="name">
                {this.getTitle(item, categorySlug)}
              </h2>
              <h3>
                <Link to={'/directorio/playas-tijuana/' + categorySlug} title={'Directorio Playas de Tijuana ' + category.plural} itemProp="description">
                  {category.name}
                </Link>
              </h3>
              {this.renderLinks(links, item.name)}
            </div>
          </div>);
      });
    }
    return null;
  }

  render() {
    const { data } = this.props;
    return (<div className={'row ' + style.placeContainer}>
      {this.renderItems(data)}
    </div>);
  }
}

PlaceList.propTypes = {
  data: React.PropTypes.array.isRequired,
  categories: React.PropTypes.array.isRequired,
  place: React.PropTypes.string,
};
