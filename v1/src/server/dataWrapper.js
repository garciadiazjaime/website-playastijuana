import React from 'react';

export default class DataWrapper extends React.Component {

  getChildContext() {
    return {
      data: this.props.data,
    };
  }

  render() {
    return this.props.children;
  }
}

DataWrapper.propTypes = {
  data: React.PropTypes.shape({}),
  children: React.PropTypes.shape({}),
};

DataWrapper.childContextTypes = {
  data: React.PropTypes.object.isRequired,
};
