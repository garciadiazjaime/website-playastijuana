import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import slugUtil from '../../../utils/slug';

export default class CategoryList extends React.Component {

  constructor(props) {
    super(props);
  }

  renderItems(data, category) {
    if (_.isArray(data)) {
      return data.map((item, index) => {
        const slug = slugUtil(item.name);
        const className = slug === category ? 'active' : '';
        return (<div key={index}>
          <Link to={'/directorio/' + slug} title={item.name} className={className}>
            {item.name}
          </Link>
        </div>);
      });
    }
    return null;
  }

  render() {
    const { data, category } = this.props;
    const className = category ? '' : 'active';
    return (<div>
      <div>
        <Link to={'/'} title="ver todos" className={className}>
          Ver todos
        </Link>
      </div>
      {this.renderItems(data, category)}
    </div>);
  }
}

CategoryList.propTypes = {
  data: React.PropTypes.array.isRequired,
  category: React.PropTypes.string,
};
