/* eslint max-len: [2, 500, 4] */
import React from 'react';
import _ from 'lodash';
import Masonry from 'react-masonry-component';
import PlaceCard from '../../placeCard';
import GaUtil from '../../../utils/gaUtil';
import PlaceController from '../../../../client/controllers/placeController';
import LoaderUtil from '../../../utils/loaderUtil';

const style = require('./style.scss');

const masonryOptions = {
  transitionDuration: 0,
};
let masonryEl = null;

export default class HomeSection extends React.Component {

  static masonryHanlder(c) {
    masonryEl = c.masonry;
  }

  static masronyupdate() {
    masonryEl.layout();
  }

  static renderCard(data) {
    return _.isArray(data) && data.length ? data.map((item, index) =>
      <PlaceCard data={item} key={index} updateHandler={HomeSection.masronyupdate} />,
    ) : null;
  }

  constructor(props) {
    super(props);
    const { data } = this.props;
    this.placeController = new PlaceController(data);
    this.state = {
      places: this.placeController.getPlaces(),
      hasMore: this.placeController.getHasMore(),
      showLoader: false,
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(event) {
    if (this.state.hasMore) {
      this.setState({
        showLoader: true,
      });
      this.placeController.loadMorePlaces(this.state.places.length).then(() => {
        const newState = _.assign({}, this.state, {
          places: _.concat(this.state.places, this.placeController.getPlaces()),
          hasMore: this.placeController.getHasMore(),
          showLoader: false,
        });
        this.setState(newState);
      });
    }
    GaUtil.sendEvent('places', 'load_more', `load_more ${this.state.hasMore} / ${this.state.places.length}`);
    event.preventDefault();
  }

  render() {
    const { places } = this.state;
    return (<div className="container-fluid">
      <div className="row">
        <Masonry elementType="div" options={masonryOptions} ref={HomeSection.masonryHanlder}>
          {HomeSection.renderCard(places)}
        </Masonry>
      </div>
      { this.state.showLoader ? <LoaderUtil /> : null }
      {
        this.state.hasMore ? <div className={style.showMore}>
          <a href="/" title="mostrar más restaurantes" className="btn btn-default btn-lg" onClick={this.clickHandler}>
            Más Restaurantes
          </a>
        </div> : null
      }
    </div>);
  }
}

HomeSection.propTypes = {
  data: React.PropTypes.shape({}),
};
