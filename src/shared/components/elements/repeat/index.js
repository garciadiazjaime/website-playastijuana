import React from 'react';
import _ from 'lodash';


export default class Repeat extends React.Component {

  renderElement(data, Template) {
    if (_.isArray(data) && data.length) {
      return data.map((item, index) => {
        return (<Template data={item} key={index} index={index} />);
      });
    }
  }

  render() {
    const { data, Template, className } = this.props;
    return (<div className={className || null}>
      {this.renderElement(data, Template)}
    </div>);
  }
}

Repeat.propTypes = {
  data: React.PropTypes.array.isRequired,
  Template: React.PropTypes.any,
  className: React.PropTypes.string,
};
