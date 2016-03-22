/* eslint max-len: [2, 500, 4] */

import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';

const style = require('./style.scss');


export default class Block1 extends React.Component {

  render() {
    return (<div className={style.mainBanner2}>
      <div id="carousel-main" className="carousel slide" data-ride="carousel" data-interval={8000}>

        <div className="carousel-inner" role="listbox">
          <div className="item active">
            <Card>
              <CardMedia overlay={<CardTitle title="1Overlay title" />}>
                <img src="/images/demo.jpg" />
              </CardMedia>
              <CardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
              </CardText>
            </Card>
          </div>
          <div className="item">
            <Card>
              <CardMedia overlay={<CardTitle title="2Overlay title" />}>
                <img src="/images/demo.jpg" />
              </CardMedia>
              <CardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
              </CardText>
            </Card>
          </div>
          <div className="item">
            <Card className="item">
              <CardMedia overlay={<CardTitle title="3Overlay title" />}>
                <img src="/images/demo.jpg" />
              </CardMedia>
              <CardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
              </CardText>
            </Card>
          </div>
        </div>

        <a className={'left carousel-control ' + style.controls} href="#carousel-main" role="button" data-slide="prev">
          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className={'right carousel-control ' + style.controls} href="#carousel-main" role="button" data-slide="next">
          <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>);
  }
}
