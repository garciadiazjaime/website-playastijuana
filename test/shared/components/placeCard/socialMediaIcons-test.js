import React from 'react';
import sinon from 'sinon';
import _ from 'lodash';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import SocialMediaIcons from '../../../../src/shared/components/placeCard/socialMediaIcons';
import GaUtil from '../../../../src/shared/utils/gaUtil';
import SVG from '../../../../src/shared/components/svg';


describe('<SocialMediaIcons />', () => {
  const props = {
    placeId: 'placeId',
    google: {
      name: 'name',
    },
    facebook: [{
      link: 'link',
    }],
    foursquare: [{
      canonicalUrl: 'canonicalUrl',
    }],
    yelp: [{
      url: 'url',
    }],
  };
  let renderGMaps = null;
  let renderFacebook = null;
  let renderFoursquare = null;
  let renderYelp = null;

  let openNewTab = null;
  let event = null;
  let sendEvent = null;
  let clickGMapsHandler = null;
  let clickFacebookHandler = null;
  let clickFoursquareHandler = null;
  let clickYelpHandler = null;

  beforeEach(() => {
    renderGMaps = sinon.spy(SocialMediaIcons.prototype, 'renderGMaps');
    renderFacebook = sinon.spy(SocialMediaIcons.prototype, 'renderFacebook');
    renderFoursquare = sinon.spy(SocialMediaIcons.prototype, 'renderFoursquare');
    renderYelp = sinon.spy(SocialMediaIcons.prototype, 'renderYelp');

    event = {
      preventDefault: sinon.spy(),
    };
    openNewTab = sinon.spy(SocialMediaIcons, 'openNewTab');
    sendEvent = sinon.spy(GaUtil, 'sendEvent');

    clickGMapsHandler = sinon.spy(SocialMediaIcons.prototype, 'clickGMapsHandler');
    clickFacebookHandler = sinon.spy(SocialMediaIcons.prototype, 'clickFacebookHandler');
    clickFoursquareHandler = sinon.spy(SocialMediaIcons.prototype, 'clickFoursquareHandler');
    clickYelpHandler = sinon.spy(SocialMediaIcons.prototype, 'clickYelpHandler');
  });

  afterEach(() => {
    renderGMaps.restore();
    renderFacebook.restore();
    renderFoursquare.restore();
    renderYelp.restore();

    openNewTab.restore();
    sendEvent.restore();
    clickGMapsHandler.restore();
    clickFacebookHandler.restore();
    clickFoursquareHandler.restore();
    clickYelpHandler.restore();
  });

  describe('renderGMaps', () => {
    it('renders propertely', () => {

      const wrapper = mount(<SocialMediaIcons data={props} />);
      const anchorEl = shallow(renderGMaps.returnValues[0]);

      expect(renderGMaps.calledOnce).to.equal(true);
      expect(anchorEl.find('a').length).to.equal(1);
      expect(anchorEl.find(SVG)).to.have.length(1);
    });

    it('clicking link triggers clickGMapsHandler', () => {
      const wrapper = mount(<SocialMediaIcons data={props} />);
      wrapper.find('a').at(0).simulate('click', event);

      expect(clickGMapsHandler.calledOnce).to.equal(true);
      expect(openNewTab.calledOnce).to.equal(true);
      expect(sendEvent.calledOnce).to.equal(true);
      expect(sendEvent.calledWith('place', 'click_gmaps', `click_gmaps::${props.placeId}::${props.google.name}`))
      expect(event.preventDefault.calledOnce).to.equal(true);
    });
  });

  describe('renderFacebook', () => {
    it('renders propertely', () => {

      const wrapper = mount(<SocialMediaIcons data={props} />);
      const anchorEl = shallow(renderFacebook.returnValues[0]);

      expect(renderFacebook.calledOnce).to.equal(true);
      expect(anchorEl.find('a').length).to.equal(1);
      expect(anchorEl.find(SVG)).to.have.length(1);
    });

    it('clicking link triggers clickFacebookHandler', () => {
      const wrapper = mount(<SocialMediaIcons data={props} />);
      wrapper.find('a').at(1).simulate('click', event);

      expect(clickFacebookHandler.calledOnce).to.equal(true);
      expect(openNewTab.calledOnce).to.equal(true);
      expect(sendEvent.calledOnce).to.equal(true);
      expect(sendEvent.calledWith('place', 'click_facebook', `click_facebook::${props.placeId}::${props.google.name}`))
      expect(event.preventDefault.calledOnce).to.equal(true);
    });
  });

  describe('renderFoursquare', () => {
    it('renders propertely', () => {

      const wrapper = mount(<SocialMediaIcons data={props} />);
      const anchorEl = shallow(renderFoursquare.returnValues[0]);

      expect(renderFoursquare.calledOnce).to.equal(true);
      expect(anchorEl.find('a').length).to.equal(1);
      expect(anchorEl.find(SVG)).to.have.length(1);
    });

    it('clicking link triggers clickFoursquareHandler', () => {
      const wrapper = mount(<SocialMediaIcons data={props} />);
      wrapper.find('a').at(2).simulate('click', event);

      expect(clickFoursquareHandler.calledOnce).to.equal(true);
      expect(openNewTab.calledOnce).to.equal(true);
      expect(sendEvent.calledOnce).to.equal(true);
      expect(sendEvent.calledWith('place', 'click_foursquare', `click_foursquare::${props.placeId}::${props.google.name}`))
      expect(event.preventDefault.calledOnce).to.equal(true);
    });
  });

  describe('renderYelp', () => {
    it('renders propertely', () => {

      const wrapper = mount(<SocialMediaIcons data={props} />);
      const anchorEl = shallow(renderYelp.returnValues[0]);

      expect(renderYelp.calledOnce).to.equal(true);
      expect(anchorEl.find('a').length).to.equal(1);
      expect(anchorEl.find(SVG)).to.have.length(1);
    });

    it('clicking link triggers clickYelpHandler', () => {
      const wrapper = mount(<SocialMediaIcons data={props} />);
      wrapper.find('a').at(3).simulate('click', event);

      expect(clickYelpHandler.calledOnce).to.equal(true);
      expect(openNewTab.calledOnce).to.equal(true);
      expect(sendEvent.calledOnce).to.equal(true);
      expect(sendEvent.calledWith('place', 'click_yelp', `click_yelp::${props.placeId}::${props.google.name}`))
      expect(event.preventDefault.calledOnce).to.equal(true);
    });
  });

});
