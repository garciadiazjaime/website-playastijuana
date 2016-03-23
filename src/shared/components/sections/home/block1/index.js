/* eslint max-len: [2, 500, 4] */

import React from 'react';

const style = require('./style.scss');

export default class Block1 extends React.Component {

  render() {
    return (<div className={style.feature}>
      <div id="carousel-main" className="carousel slide container-fluid" data-ride="carousel" data-interval={8000}>
        <div className={'carousel-inner ' + style.inner} role="listbox">
          <div className={'item active ' + style.item}>
            <div className={style.imgContainer}>
              <img src="/images/demo.jpg" />
            </div>
          </div>
          <div className={'item ' + style.item}>
            <div className={style.imgContainer}>
              <img src="/images/demo.jpg" />
            </div>
          </div>
          <div className={'item ' + style.item}>
            <div className={style.imgContainer}>
              <img src="/images/demo.jpg" />
            </div>
          </div>
        </div>

        <a className={'left carousel-control ' + style.controls + ' ' + style.prev} href="#carousel-main" role="button" data-slide="prev">
          <span className="sr-only">Previous</span>
        </a>
        <a className={'right carousel-control ' + style.controls + ' ' + style.next} href="#carousel-main" role="button" data-slide="next">
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>);
  }
}
