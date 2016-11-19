import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Masonry from 'react-masonry-component';

import HomeSection from '../../../../../src/shared/components/sections/home';
import PlaceCard from '../../../../../src/shared/components/placeCard';
import GaUtil from '../../../../../src/shared/utils/gaUtil';
import PlaceController from '../../../../../src/client/controllers/placeController';


describe('<HomeSection />', () => {

  let event = null;
  let sendEvent = null;
  let setState = null;

  beforeEach(() => {
    event = {
      preventDefault: sinon.spy()
    };
    sendEvent = sinon.spy(GaUtil, 'sendEvent');
    setState = sinon.spy(HomeSection.prototype, 'setState');
  });

  afterEach(() => {
    sendEvent.restore();
    setState.restore();
  });

  it('uses Masonry', () => {
    const wrapper = shallow(<HomeSection />);
    expect(wrapper.find(Masonry)).to.have.length(1);
  });

  it('renders 12 PlaceCards', () => {
    const props = {
      data: [],
    };
    for(let i = 0, len = 20; i < len; i++) {
      props.data.push({
        placeId: i.toString(),
      });
    }
    const wrapper = mount(<HomeSection data={props} />);
    expect(wrapper.find(PlaceCard)).to.have.length(12);
  });

  it('init state case when theres more data than chunkSize', () => {
    const props = {
      data: [],
    };
    for(let i = 0, len = 20; i < len; i++) {
      props.data.push({
        placeId: i.toString(),
      });
    }
    const wrapper = mount(<HomeSection data={props} />);
    expect(wrapper.state().places.length).to.equal(12);
    expect(wrapper.state().hasMore).to.equal(true);
    expect(wrapper.state().showLoader).to.equal(false);
  });

  it('init state case when theres less data than chunkSize', () => {
    const props = {
      data: [],
    };
    for(let i = 0, len = 10; i < len; i++) {
      props.data.push({
        placeId: i.toString(),
      });
    }
    const wrapper = mount(<HomeSection data={props} />);
    expect(wrapper.state().places.length).to.equal(10);
    expect(wrapper.state().hasMore).to.equal(false);
    expect(wrapper.state().showLoader).to.equal(false);
  });

  it('init state case when theres no data', () => {
    const props = {
      data: [],
    };
    const wrapper = mount(<HomeSection data={props} />);
    expect(wrapper.state().places.length).to.equal(0);
    expect(wrapper.state().hasMore).to.equal(false);
    expect(wrapper.state().showLoader).to.equal(false);
  });

  it('init state case when theres data == chunkSize', () => {
    const props = {
      data: [],
    };
    for(let i = 0, len = 12; i < len; i++) {
      props.data.push({
        placeId: i.toString(),
      });
    }
    const wrapper = mount(<HomeSection data={props} />);
    expect(wrapper.state().places.length).to.equal(12);
    expect(wrapper.state().hasMore).to.equal(false);
    expect(wrapper.state().showLoader).to.equal(false);
  });

  it('doesnt show more button when there arent enough places', () => {
    const props = {
      data: [],
    };
    const wrapper = mount(<HomeSection data={props} />);
    expect(wrapper.find('.btn').length).to.equal(0);
  });

  it('calls clickHandler when click on show more', () => {
    const clickHandler = sinon.stub(HomeSection.prototype, 'clickHandler');
    const props = {
      data: [],
    };
    for(let i = 0, len = 20; i < len; i++) {
      props.data.push({
        placeId: i.toString(),
      });
    }

    const wrapper = mount(<HomeSection data={props} />);
    wrapper.find('.btn').simulate('click');
    expect(clickHandler.calledOnce).to.equal(true);

    clickHandler.restore();
  });

  it('calls clickHandler', () => {
    const props = {
      data: [],
    };
    for(let i = 0, len = 20; i < len; i++) {
      props.data.push({
        placeId: i.toString(),
      });
    }

    const wrapper = shallow(<HomeSection data={props} />);
    const loadMorePlaces = sinon.spy(wrapper.instance().placeController, 'loadMorePlaces');
    wrapper.instance().clickHandler(event);

    expect(setState.calledOnce).to.equal(true);
    expect(setState.calledWith({ showLoader: true })).to.equal(true);
    expect(event.preventDefault.calledOnce).to.equal(true);

    expect(sendEvent.calledOnce).to.equal(true);
    expect(sendEvent.calledWith('places', 'load_more', 'load_more true / 12')).to.equal(true);

    expect(loadMorePlaces.calledOnce);
    expect(loadMorePlaces.calledWith(12));

    loadMorePlaces.restore();
  });
});
