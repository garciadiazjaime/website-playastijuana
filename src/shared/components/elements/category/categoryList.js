/* eslint max-len: [2, 500, 4] */

import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

const style = require('./style.scss');
import slugUtil from '../../../utils/slug';

export default class CategoryList extends React.Component {

  componentDidMount() {
    // this helps to close menu on mobile.
    $('#dropdown-categories').click(() => {
      if ($('#dropdown-categories-container .navbar-header button').is(':visible')) {
        $('#dropdown-categories-container .navbar-header button').click();
      }
    });
  }

  renderItems(data, category, clickHandler) {
    if (_.isArray(data) && data.length) {
      return data.map((item, index) => {
        const slug = slugUtil(item.plural);
        const activeClassName = slug === category ? 'active' : '';
        /*eslint-disable */
        return (<li key={index}>
          <h2 itemProp="description">
            <Link to={'/directorio/playas-tijuana/' + slug} title={'Directorio Playas de Tijuana ' + item.plural} className={style[activeClassName]} onClick={clickHandler.bind(this, slug)}>
              {item.plural}
            </Link>
          </h2>
        </li>);
        /*eslint-enable */
      });
    }
    return null;
  }

  render() {
    const { data, category, clickHandler } = this.props;
    const activeClassName = !category ? 'active' : '';
    /*eslint-disable */
    return (<nav className={'navbar ' + style.navbar}>
    <div className="row" id="dropdown-categories-container">
      <div className={'navbar-header ' + style.navbar_header}>
        <button type="button" className={'navbar-toggle collapsed ' + style.navbar_toggle} data-toggle="collapse" data-target="#dropdown-categories" aria-expanded="false">
          <span className="sr-only">Toggle navigation</span>
          <span className={'icon-bar ' + style.icon_bar}></span>
          <span className={'icon-bar ' + style.icon_bar}></span>
          <span className={'icon-bar ' + style.icon_bar}></span>
        </button>
        <h2>{category}</h2>
      </div>
      <div className={'collapse navbar-collapse ' + style.navbar_collapse} id="dropdown-categories">
        <ul className="nav navbar-nav" itemScope itemType="http://schema.org/LocalBusiness">
          <li>
            <h2 itemProp="description">
              <Link to={'/directorio/playas-tijuana'} title="Directorio Playas de Tijuana" className={style[activeClassName]} onClick={clickHandler.bind(this)}>
                Ver todos
              </Link>
            </h2>
          </li>
          {this.renderItems(data, category, clickHandler)}
        </ul>
      </div>
    </div>
    </nav>);
    /*eslint-enable */
  }
}

CategoryList.propTypes = {
  data: React.PropTypes.array.isRequired,
  category: React.PropTypes.string,
  clickHandler: React.PropTypes.func.isRequired,
};
