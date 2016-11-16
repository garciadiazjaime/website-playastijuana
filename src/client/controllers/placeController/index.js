/* eslint max-len: [2, 500, 4] */
import _ from 'lodash';
import { randomSort } from '../../../shared/utils/arrayUtil';

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

  constructor(data) {
    this.chunkSize = 12;
    this.places = data && data.data ? data.data.slice(0, this.chunkSize) : null;
    this.placesRef = data ? data.data : null;
    this.hasMore = data && data.data.length > this.chunkSize;
  }

  getPlaces() {
    return randomSort(this.places);
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
