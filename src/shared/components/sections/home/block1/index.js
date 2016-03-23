/* eslint max-len: [2, 500, 4] */
import React from 'react';
import _ from 'lodash';

import Carousel from '../../../elements/carousel';

const style = require('./style.scss');


export default class Block1 extends React.Component {

  renderItems(data) {
    if (_.isArray(data) && data.length) {
      return data.map((item, index) => {
        const className = index === 0 ? 'active' : '';
        return (<div className={'item ' + className + ' ' + (style.item || '')} key={index}>
          <div className={style.imgContainer}>
            <img src={item.image} alt={item.title} />
            <h3>item.title</h3>
            <h4>{item.description}</h4>
          </div>
        </div>);
      });
    }
    return null;
  }

  render() {
    const { data } = this.props;
    const carouselClasses = {
      inner: style.inner,
      controls: {
        base: style.controls,
        prev: style.prev,
        next: style.next,
      },
    };
    return (<div className={style.mainBanner2}>
      <Carousel id="main-carousel" interval={8000} indicators={false} classes={carouselClasses}>
        {this.renderItems(data)}
      </Carousel>
    </div>);
  }
}

Block1.propTypes = {
  data: React.PropTypes.array.isRequired,
};
