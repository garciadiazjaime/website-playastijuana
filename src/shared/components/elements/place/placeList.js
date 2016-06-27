/* eslint max-len: [2, 500, 4] */

import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

const style = require('./style.scss');
import slugUtil from '../../../utils/slug';
import SVG from '../../svg';

export default class PlaceList extends React.Component {

  constructor(props) {
    super(props);
    // this.shareFacebook = this.shareFacebook.bind(this);
    this.displayImages = this.displayImages.bind(this);
    this.scrollHandler = this.props.scrollHandler;
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    this.loadImages();
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentDidUpdate() {
    this.loadImages();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll() {
    const pageHeight = document.body.offsetHeight;
    const footerHeight = $('#footer_section').height();
    const maxHeight = pageHeight - footerHeight;
    const scrollY = window.innerHeight + window.scrollY;

    if (scrollY >= maxHeight) {
      this.scrollHandler();
    }
  }

  getImage(url, index) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          url,
          index,
        });
      };
      img.onerror = () => {
        reject(url);
      };
      img.src = url;
    });
  }

  getTitle(data, categorySlug) {
    const placeSlug = slugUtil(data.name);
    return (<Link to={'/directorio/playas-tijuana/' + categorySlug + '/' + placeSlug} title={data.name + ' - ' + categorySlug}>
        {data.name.toUpperCase()}
      </Link>);
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

  loadImages() {
    const images = [];
    $('.place_list_pivote .place_image_pivote').each((index, item) => {
      const image = {
        url: item.dataset.imageUrl,
        index: item.dataset.index,
      };
      images.push(image);
    });
    this.displayImages(images);
  }

  displayImages(images) {
    const imageData = images.shift();
    const rescursive = this.displayImages;
    if (imageData) {
      this.getImage(imageData.url, imageData.index)
        .then((data) => {
          $('#image_' + data.index).attr('src', data.url);
          rescursive(images);
        })
        .catch((url) => {
          console.log('Error loading ' + url);
          rescursive(images);
        });
    }
  }

  renderImage(item, category, index) {
    if (item && _.isArray(item.image_set) && item.image_set.length) {
      const imgUrl = item.image_set[0].url.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
      return (<div key={index} className="col-xs-6">
          <img src="/images/landing.png" alt={item.name + ' - ' + category.name} className={'place_image_pivote ' + style.imagePlaceholder } data-image-url={imgUrl} data-index={index} id={'image_' + index} />
        </div>);
    }
    return (<div key={index} className="col-xs-6">
      <img src="/images/placeholder.png" alt={item.name + ' - ' + category.name} className={style.imagePlaceholder} />
    </div>);
  }

  renderLinks(data, name) {
    const response = [];
    let index = 0;
    for (const prop in data) {
      if (data.hasOwnProperty(prop) && data[prop]) {
        response.push(<a href={data[prop]} title={name + 'en ' + prop} target="_blank" className={prop} key={index}>
          <SVG network={prop} className={style.gmaps}/>
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
      return places.map((item, index) => {
        const { category } = item;
        const categorySlug = slugUtil(category.plural);
        const imageEl = this.renderImage(item, category, index);
        const links = this.getLinks(item);
        return (<div className={style.placeCard + ' category_' + category.name + ' row'} key={index} itemScope itemType="http://schema.org/LocalBusiness">
            {imageEl}
            <div className={style.legend + ' col-xs-6'}>
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
    return (<div className={'row place_list_pivote ' + style.placeContainer}>
      {this.renderItems(data)}
    </div>);
  }
}

PlaceList.propTypes = {
  data: React.PropTypes.array.isRequired,
  category: React.PropTypes.string,
  place: React.PropTypes.string,
  scrollHandler: React.PropTypes.func.isRequired,
};
