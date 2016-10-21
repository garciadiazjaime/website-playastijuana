/* eslint max-len: [2, 500, 4] */

import React from 'react';
import _ from 'lodash';
import CardElement from './cardElement';

const style = require('./style.scss');

export default class HomeSection extends React.Component {

  static renderCard(data) {
    if (_.isArray(data) && data.length) {
      return data.map((item, index) => <CardElement data={item} key={index} />);
    }
    return null;
  }

  constructor(props) {
    super(props);
    const { data } = this.props;
    const chunkSize = 12;
    this.state = {
      data: data.places.slice(0, chunkSize),
      allData: data.places,
      chunkSize,
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    const { data, allData, chunkSize } = this.state;
    const newData = [];
    if (data.length < allData.length) {
      newData.push.apply(data, allData.slice(data.length, data.length + chunkSize));
      const newState = _.assign({}, this.state, {
        data,
      });
      this.setState(newState);
    }
  }

  render() {
    const { data } = this.state;
    return (<div className="container-fluid">
      <div className="row">
        {HomeSection.renderCard(data)}
      </div>
      <div className={style.showMore}>
        <a href="" title="mostrar más restaurantes" className="btn btn-default btn-lg" onClick={this.clickHandler}>
          Mostar más
        </a>
      </div>
    </div>);
  }
}

HomeSection.propTypes = {
  data: React.PropTypes.shape({}),
};
