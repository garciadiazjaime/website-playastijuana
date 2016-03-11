import React from 'react';
import { Link } from 'react-router';

// const style = process.env.TIER === 'FE' ? require('./style.scss') : {};


export default class Services extends React.Component {

  renderServices(items) {
      // const className = items.length > 5 ? 'col-sm-6' : 'col-sm-12';
    return items.map((service, index) => {
      return (<div className={'col-sm-4'} key={index}>
        <Link to={service.href} title={service.title}>
        {service.title}
        </Link>
      </div>);
    });
  }

  render() {
    const { data } = this.props;

    return (<div className="col-sm-9">
      <div className="row">
        {this.renderServices(data.items)}
      </div>
    </div>);
  }
}

Services.propTypes = {
  data: React.PropTypes.array.isRequired,
};
