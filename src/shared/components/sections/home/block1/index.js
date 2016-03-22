/* eslint max-len: [2, 500, 4] */
import React from 'react';
import _ from 'lodash';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';

import Carousel from '../../../elements/carousel';

const style = require('./style.scss');


export default class Block1 extends React.Component {

  renderItems(data) {
    if (_.isArray(data) && data.length) {
      return data.map((item, index) => {
        const className = index === 0 ? 'active' : '';
        return (<div className={'item ' + className} key={index}>
          <Card>
            <CardMedia overlay={<CardTitle title={item.title} />}>
              <img src={item.image} alt={item.title} />
            </CardMedia>
            <CardText>
              {item.description}
            </CardText>
          </Card>
        </div>);
      });
    }
    return null;
  }

  render() {
    const { data } = this.props;
    return (<div className={style.mainBanner2}>
      <Carousel id="main-carousel" interval={8000} indicators={false}>
        {this.renderItems(data)}
      </Carousel>
    </div>);
  }
}

Block1.propTypes = {
  data: React.PropTypes.array.isRequired,
};
