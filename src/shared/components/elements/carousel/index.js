/* eslint max-len: [2, 500, 4] */

import React from 'react';
import _ from 'lodash';

const style = process.env.TIER === 'FE' ? require('../../../theme/carousels/carousels.scss') : {};


export default class Carousel1 extends React.Component {

  renderIndicators(data, sliderID, className) {
    if (_.isArray(data) && data.length) {
      const bullets = data.map((slide, index) => {
        const itemClassName = index === 0 ? 'active' : null;
        return (
          <li data-target={'#' + sliderID} data-slide-to={index} key={index} className={itemClassName}></li>
        );
      }, this);
      return (<ol className={'carousel-indicators ' + style[className]}>
        { bullets }
      </ol>);
    }
    return null;
  }

  renderControls(data, sliderID, className) {
    return (<div className={style[className]}>
      <a className="left carousel-control" href={'#' + sliderID} role="button" data-slide="prev">
        <span className="sr-only">Previous</span>
      </a>
      <a className="right carousel-control" href={'#' + sliderID} role="button" data-slide="next">
        <span className="sr-only">Next</span>
      </a>
    </div>);
  }

  render() {
    const { sliderID, interval, indicators, controls } = this.props.data;
    const slides = this.props.children.props.data;
    return (
      <div id={sliderID} className="carousel slide" data-ride="carousel" data-interval={interval}>

        { indicators.status ? this.renderIndicators(slides, sliderID, indicators.className) : null }

        { this.props.children }

        { controls.status ? this.renderControls(slides, sliderID, controls.className) : null }
      </div>
    );
  }
}

Carousel1.propTypes = {
  data: React.PropTypes.shape({
    sliderID: React.PropTypes.string.isRequired,
    interval: React.PropTypes.number.isRequired,
    indicators: React.PropTypes.shape({
      status: React.PropTypes.bool.isRequired,
      className: React.PropTypes.string,
    }),
    controls: React.PropTypes.shape({
      status: React.PropTypes.bool.isRequired,
      className: React.PropTypes.string,
    }),
  }),
  children: React.PropTypes.any,
};
