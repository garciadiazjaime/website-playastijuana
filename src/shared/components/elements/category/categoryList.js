/* eslint max-len: [2, 500, 4] */

import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

const style = require('./style.scss');
import slugUtil from '../../../utils/slug';

export default class CategoryList extends React.Component {


  renderItems(data, category) {
    if (_.isArray(data)) {
      return data.map((item, index) => {
        const slug = slugUtil(item.name);
        const activeClassName = slug === category ? 'active' : '';
        return (<li key={index}>
          <h2>
            <Link to={'/directorio/playas-tijuana/' + slug} title={item.name} className={style[activeClassName]}>
              {item.name}
            </Link>
          </h2>
        </li>);
      });
    }
    return null;
  }

  render() {
    const { data, category } = this.props;
    const activeClassName = !category ? 'active' : '';
    return (<div className="row">
      <ul>
        <li>
          <Link to={'/'} title="ver todos" className={style[activeClassName]}>
            Ver todos
          </Link>
        </li>
        {this.renderItems(data, category)}
      </ul>
    </div>);
  }
}

CategoryList.propTypes = {
  data: React.PropTypes.array.isRequired,
  category: React.PropTypes.string,
};
