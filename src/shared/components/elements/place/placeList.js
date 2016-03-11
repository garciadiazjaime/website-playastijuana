import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import slugUtil from '../../../utils/slug';

export default class PlaceList extends React.Component {

  renderItems(data) {
    if (_.isArray(data)) {
      return data.map((item, index) => {
        const categorySlug = slugUtil(item.name);
        const placeSlug = slugUtil(item.name);
        return (<div key={index}>
          <Link to={'/directorio/' + categorySlug + '/' + placeSlug} title={item.name}>
            {item.name}
          </Link>
        </div>);
      });
    }
    return null;
  }

  render() {
    const { data } = this.props;
    return (<div>
      {this.renderItems(data)}
    </div>);
  }
}

PlaceList.propTypes = {
  data: React.PropTypes.array.isRequired,
  place: React.PropTypes.string,
};
