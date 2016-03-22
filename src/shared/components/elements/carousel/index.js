/* eslint max-len: [2, 500, 4] */
import React from 'react';
import _ from 'lodash';

export default class Carousel extends React.Component {

  getIndicators(data, flag) {
    // todo: implement based on bootsrap syntax
    if (flag !== false && _.isArray(data) && data.length) {
      return data.map((item, index) => {
        return (<div key={index}>
          {item}
        </div>);
      });
    }
    return null;
  }

  getControls(flag, id) {
    if (flag !== false) {
      return (<div>
          <a className="left carousel-control" href={'#' + id} role="button" data-slide="prev">
          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="right carousel-control" href={'#' + id} role="button" data-slide="next">
          <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>);
    }
    return null;
  }

  render() {
    const { id, interval, children, indicators, controls } = this.props;
    return (<div id={id} className="carousel slide" data-ride="carousel" data-interval={interval || 5000}>
      <div className="carousel-inner" role="listbox">
        { this.getIndicators(children, indicators) }

        {children}

        { this.getControls(controls, id) }
      </div>
    </div>);
  }
}

Carousel.propTypes = {
  id: React.PropTypes.string.isRequired,
  interval: React.PropTypes.number.isRequired,
  children: React.PropTypes.any,
  indicators: React.PropTypes.bool,
  controls: React.PropTypes.bool,
};
