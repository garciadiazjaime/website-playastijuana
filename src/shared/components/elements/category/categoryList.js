/* eslint max-len: [2, 500, 4] */

import React from 'react';
import { Link } from 'react-router';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import _ from 'lodash';

const style = process.env.TIER === 'FE' ? require('./style.scss') : {};
import slugUtil from '../../../utils/slug';

export default class CategoryList extends React.Component {

  constructor(props) {
    super(props);
  }

  renderItems(data, category) {
    if (_.isArray(data)) {
      return data.map((item, index) => {
        const slug = slugUtil(item.name);
        const activeClassName = slug === category ? 'active' : '';
        return (<ListItem key={index}>
          <Link to={'/directorio/' + slug} title={item.name} className={style.item + ' ' + activeClassName}>
            {item.name}
          </Link>
        </ListItem>);
      });
    }
    return null;
  }

  render() {
    const { data, category } = this.props;
    const activeClassName = category ? '' : 'active';
    return (<div>
      <List>
        <ListItem>
          <Link to={'/'} title="ver todos" className={style.item + ' ' + activeClassName}>
            Ver todos
          </Link>
        </ListItem>
        {this.renderItems(data, category)}
      </List>
    </div>);
  }
}

CategoryList.propTypes = {
  data: React.PropTypes.array.isRequired,
  category: React.PropTypes.string,
};
