import React from 'react';

const style = require('./style.scss');


export default class MainMenu extends React.Component {

  render() {
    /*eslint-disable */
    return (<div className="container-fluid">
      <div className={'row ' + style.header}>
        <div className="col-xs-12">
          <h1>Directorio<span className={style.playami}>Playami</span></h1>
        </div>
      </div>
    </div>);
    /*eslint-enable */
  }
}

MainMenu.propTypes = {
  items: React.PropTypes.array.isRequired,
  icons: React.PropTypes.array,
  location: React.PropTypes.any,
  onClick: React.PropTypes.func.isRequired,
};
