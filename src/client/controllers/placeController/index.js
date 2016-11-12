/* eslint max-len: [2, 500, 4] */

import { randomSort } from '../../../shared/utils/arrayUtil';

export default class PlaceController {

  constructor(data) {
    this.chunkSize = 12;
    this.places = data && data.data ? data.data.slice(0, this.chunkSize) : null;
    this.placesRef = data ? data.data : null;
    this.hasMore = this.places.length <= this.placesRef.length;
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
