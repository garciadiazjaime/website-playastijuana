/* eslint max-len: [2, 500, 4] */
import _ from 'lodash';
import moment from 'moment';
import RequestUtil from '../../../shared/utils/requestUtil';
import LogUtil from '../../../shared/utils/logUtil';

export default class PlaceController {

  constructor(config) {
    this.proxy = null;
    this.requestsCached = 0;
    this.lastUpdate = null;
    this.apiUrl = config.apiUrl;
    this.minutesToWait = config.minutesToWait;
  }

  /*
   * Checks if it's time to do an update.
   * @return {boolean} true when minutesToWait have been passed
  */
  doUpdate() {
    return moment().diff(this.lastUpdate, 'minutes') > this.minutesToWait;
  }

  /*
   * Get places using proxy. Returns a promise which is resolved with the places data.
   * @return {promise} resolve(report)
  */
  getPlaces() {
    return new Promise((resolve, reject) => {
      if (!this.proxy || this.doUpdate()) {
        LogUtil.log(`Update, last update: ${this.lastUpdate}, new date: ${new Date()}, Request cached: ${this.requestsCached}`);
        this.requestsCached = 1;
        RequestUtil.get(`${this.apiUrl}places`)
          .then((results) => {
            if (results && _.isArray(results.entity) && results.entity.length) {
              this.proxy = results.entity;
              this.lastUpdate = new Date();
            }
            resolve(this.proxy);
          }, () => resolve(this.proxy))
          .catch(error => reject(error));
      } else {
        this.requestsCached += 1;
        resolve(this.proxy);
      }
    });
  }
}
