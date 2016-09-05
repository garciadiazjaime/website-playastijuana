import React from 'react';
import _ from 'lodash';
import CardElement from './cardElement';

export default class HomeSection extends React.Component {

  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      data: data.places.slice(0, 10),
      allData: data.places,
      chunkSize: 10,
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    const { data, allData, chunkSize } = this.state;
    if (data.length < allData.length) {
      data.push.apply(data, allData.slice(data.length, data.length + chunkSize));
      const newState = _.assign({}, this.state, {
        data,
      });
      this.setState(newState);
    }
  }

  renderCard(data) {
    if (_.isArray(data) && data.length) {
      return data.map((item, index) => <CardElement data={item} key={index} />);
    }
    return null;
  }

  render() {
    const { data } = this.state;
    return (<div className="container-fluid">
      {this.renderCard(data)}
      <div>
        <a title="mostrar más restaurantes" className="btn btn-default" onClick={this.clickHandler}>
          Mostar más
        </a>
      </div>
    </div>);
  }
}

HomeSection.propTypes = {
  data: React.PropTypes.object,
};
