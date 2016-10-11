import rest from 'rest';
import mime from 'rest/interceptor/mime';
import errorCode from 'rest/interceptor/errorCode';

const client = rest
  .wrap(mime, { mime: 'application/json' })
  .wrap(errorCode, { code: 300 });

export default class RequestUtil {

  static get(url) {
    return client({ path: url });
  }

  /*
    Request method post
    @param {string} string
    @param {data} data
    @returns {object}
  */
  static post(url, data) {
    return client({
      method: 'POST',
      path: url,
      entity: data,
    });
  }
}
