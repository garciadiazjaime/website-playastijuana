import React from 'react';
import sinon from 'sinon';
import _ from 'lodash';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import Comments from '../../../../src/shared/components/placeCard/comments';
import GaUtil from '../../../../src/shared/utils/gaUtil';


describe('<Comments />', () => {

  describe('valid case', () => {
    const baseProps = {
      placeId: 'placeId',
      google: {
        name: 'name',
        international_phone_number: 'international_phone_number',
        website: 'website',
        formatted_address: 'formatted_address',
        url: "url",
        reviews: [],
      },
      foursquare: [{
        tips: {
          groups: [{
            items: [],
          }],
        },
      }],
    };
    let hasComments = null;
    let renderFoursquareTips = null;
    let renderGoogleReviews = null;

    beforeEach(() => {
      hasComments = sinon.spy(Comments.prototype, 'hasComments');
      renderFoursquareTips = sinon.spy(Comments.prototype, 'renderFoursquareTips');
      renderGoogleReviews = sinon.spy(Comments.prototype, 'renderGoogleReviews');
    });

    afterEach(() => {
      hasComments.restore();
      renderFoursquareTips.restore();
      renderGoogleReviews.restore();
    });

    it('renders propertely when there are comments', () => {
      const props = _.assign({}, baseProps, {
        google: {
          reviews: [{
            text: 'review1',
          }],
        },
      });

      const wrapper = mount(<Comments data={props} />);

      expect(hasComments.calledOnce).to.equal(true);
      expect(hasComments.returnValues[0]).to.equal(true);
      expect(renderFoursquareTips.calledOnce).to.equal(true);
      expect(renderGoogleReviews.calledOnce).to.equal(true);

      hasComments.restore();
    });

    it('renders propertely when there arent comments', () => {
      const wrapper = mount(<Comments data={baseProps} />);

      expect(hasComments.calledOnce).to.equal(true);
      expect(hasComments.returnValues[0]).to.equal(false);
      expect(renderFoursquareTips.calledOnce).to.equal(false);
      expect(renderGoogleReviews.calledOnce).to.equal(false);
    });
  });

  describe('clickCommentsHandler', () => {
    const baseProps = {
      placeId: 'placeId',
      google: {
        name: 'name',
        international_phone_number: 'international_phone_number',
        website: 'website',
        formatted_address: 'formatted_address',
        url: "url",
        reviews: [{
          text: 'review1',
        }],
      },
      foursquare: [{
        tips: {
          groups: [{
            items: [],
          }],
        },
      }],
    };

    let clickCommentsHandler = null;
    let sendEvent = null;
    let setState = null;

    beforeEach(() => {
      clickCommentsHandler = sinon.spy(Comments.prototype, 'clickCommentsHandler');
      sendEvent = sinon.spy(GaUtil, 'sendEvent');
      setState = sinon.spy(Comments.prototype, 'setState');
    });

    afterEach(() => {
      clickCommentsHandler.restore();
      sendEvent.restore();
      setState.restore();
    });

    it('clickCommentsHandler gets call when clicking the anchor', () => {
      const event = {
        preventDefault: sinon.spy(),
      };
      const updateHandler = sinon.spy();
      const wrapper = mount(<Comments data={baseProps} updateHandler={updateHandler} />);
      expect(wrapper.state().commentsDisplay).to.equal(false);

      wrapper.find('h5 a').simulate('click', event);

      expect(clickCommentsHandler.calledOnce).to.equal(true);
      expect(sendEvent.calledOnce).to.equal(true);
      expect(sendEvent.calledWith('place', 'show_comments', `show_comments::${baseProps.placeId}::${baseProps.google.name}`)).to.equal(true);
      expect(setState.calledOnce).to.equal(true);
      expect(setState.calledWith({ commentsDisplay: true }))
      expect(wrapper.state().commentsDisplay).to.equal(true);
      expect(event.preventDefault.calledOnce).to.equal(true);
      expect(updateHandler.calledOnce).to.equal(true);
    });
  });

  describe('hasComments', () => {
    const baseProps = {
      placeId: 'placeId',
      google: {
        name: 'name',
        international_phone_number: 'international_phone_number',
        website: 'website',
        formatted_address: 'formatted_address',
        url: "url",
        reviews: [],
      },
      foursquare: [{
        tips: {
          groups: [{
            items: [],
          }],
        },
      }],
    };
    let hasComments = null;

    beforeEach(() => {
      hasComments = sinon.spy(Comments.prototype, 'hasComments');
    });

    afterEach(() => {
      hasComments.restore();
    });

    it('return true when google has reviews', () => {
      const props = _.assign({}, baseProps, {
        google: {
          reviews: [{
            text: 'review1',
          }],
        },
      });
      const wrapper = mount(<Comments data={props} />);

      expect(hasComments.calledOnce).to.equal(true);
      expect(hasComments.returnValues[0]).to.equal(true);
    });

    it('return true when foursquare has reviews', () => {
      const props = _.assign({}, baseProps, {
        foursquare: [{
          tips: {
            groups: [{
              items: [{
                text: 'review1',
              }],
            }],
          },
        }],
      });
      const wrapper = mount(<Comments data={props} />);

      expect(hasComments.calledOnce).to.equal(true);
      expect(hasComments.returnValues[0]).to.equal(true);
    });

    it('return false when either google or foursquare havent reviews', () => {
      const wrapper = mount(<Comments data={baseProps} />);

      expect(hasComments.calledOnce).to.equal(true);
      expect(hasComments.returnValues[0]).to.equal(false);
    });
  });
});
