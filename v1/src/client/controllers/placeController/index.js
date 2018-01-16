/* eslint max-len: [2, 500, 4] */
import _ from 'lodash';

export default class PlaceController {

  static getImage(data) {
    if (data && data.google && _.isArray(data.google.photos) && data.google.photos.length) {
      return `//${data.google.photos[0]}`;
    } else if (data && _.isArray(data.facebook) && data.facebook.length && data.facebook[0].cover) {
      return data.facebook[0].cover.source;
    } else if (data && _.isArray(data.foursquare) && data.foursquare.length && data.foursquare[0].bestPhoto) {
      const imageSize = '400x250';
      return `${data.foursquare[0].bestPhoto.prefix}${imageSize}${data.foursquare[0].bestPhoto.suffix}`;
    } else if (data && _.isArray(data.yelp) && data.yelp.length && data.yelp[0].image_url) {
      return data.yelp[0].image_url;
    }
    return 'http://nemanjakovacevic.net/wp-content/uploads/2013/07/placeholder.png';
  }

  static cleanPhone(data) {
    return data ? data.replace(/^\+52 /, '').replace(/^1 /, '') : '';
  }

  static cleanAddress(data) {
    return data ? data.replace(', B.C., Mexico', '').replace(', BC, Mexico', '').replace(/, \d+ Tijuana$/i, '') : '';
  }

  static cleanWebsite(data) {
    return data ? data.replace('http://www.', '').replace(/\/$/, '').replace('http://', '').replace('https://', '') : '';
  }

  constructor(data) {
    this.chunkSize = 12;
    this.places = data && data.data ? data.data.slice(0, this.chunkSize) : null;
    this.placesRef = data ? data.data : null;
    this.hasMore = data && data.data.length > this.chunkSize;
  }

  getPlaces() {
    return this.places;
  }

  getHasMore() {
    return this.hasMore;
  }

  loadMorePlaces(totalPlaces) {
    return new Promise((resolve) => {
      const start = totalPlaces;
      const end = start + this.chunkSize;
      this.places = this.placesRef.slice(start, end);
      this.hasMore = end < this.placesRef.length;
      resolve();
    });
  }
}
