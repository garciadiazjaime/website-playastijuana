/* eslint max-len: [2, 500, 4] */
import React from 'react';
import _ from 'lodash';
import Masonry from 'react-masonry-component';
import CardElement from './cardElement';

const style = require('./style.scss');

const masonryOptions = {
  transitionDuration: 0,
};
let masonryEl = null;

export default class HomeSection extends React.Component {

  static masonryHanlder(c) {
    masonryEl = c.masonry;
  }

  static masronyupdate() {
    masonryEl.layout();
  }

  static renderCard(data) {
    return _.isArray(data) && data.length ? data.map((item, index) =>
      <CardElement data={item} key={index} updateHandler={HomeSection.masronyupdate} />
    ) : null;
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

  clickHandler(event) {
    const { data, allData, chunkSize } = this.state;
    const newData = [];
    if (data.length < allData.length) {
      newData.push.apply(data, allData.slice(data.length, data.length + chunkSize));
      const newState = _.assign({}, this.state, {
        data,
      });
      this.setState(newState);
    }
    event.preventDefault();
  }

  render() {
    const { data } = this.state;
    return (<div className="container-fluid">
      <div className="row">
        <Masonry elementType="div" options={masonryOptions} ref={HomeSection.masonryHanlder}>
          {HomeSection.renderCard(data)}
        </Masonry>
      </div>
      <div className={style.showMore}>
        <a href="/" title="mostrar más restaurantes" className="btn btn-default btn-lg" onClick={this.clickHandler}>
          Mostar más
        </a>
      </div>
    </div>);
  }
}

HomeSection.propTypes = {
  data: React.PropTypes.shape({}),
};
