import React from 'react';

const style = require('./style.scss');

export default function Loader() {
  return (<div className={style.wrapper}>
    <div className={style.loader} />
  </div>);
}
