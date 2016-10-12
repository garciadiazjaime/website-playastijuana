import React from 'react';

export default class CategoryMenu extends React.Component {

  render() {
    return (<div className="container-fluid">
      <ul className="nav nav-tabs">
        <li role="presentation" className="active"><a href="#">Restaruantes</a></li>
        <li role="presentation"><a href="#">Cafés</a></li>
        <li role="presentation"><a href="#">Bares</a></li>
      </ul>
    </div>);
  }
}
