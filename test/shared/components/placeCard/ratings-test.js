import React from 'react';
import sinon from 'sinon';
import _ from 'lodash';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import Ratings from '../../../../src/shared/components/placeCard/ratings';


describe('<Ratings />', () => {
  it('renders propertely', () => {
    const props = {
      placeId: 'placeId',
      google: {
        rating: 'rating',
      },
      facebook: [{
        fan_count: 'fan_count',
        checkins: 'checkins',
      }],
      foursquare: [{
        stats: {
          checkinsCount: 'checkinsCount',
        },
      }],
    };
    const wrapper = mount(<Ratings data={props} />);

    expect(wrapper.text()).to.contain(props.google.rating);
    expect(wrapper.text()).to.contain(props.facebook[0].fan_count);
    expect(wrapper.text()).to.contain(props.facebook[0].checkins);
    expect(wrapper.text()).to.contain(props.foursquare[0].stats.checkinsCount);
  });

  it('renders nothing when sending null values', () => {
    const props = {
      placeId: 'placeId',
      google: {},
      facebook: [],
      foursquare: [],
    };
    const wrapper = mount(<Ratings data={props} />);
    expect(wrapper.text()).to.equal('');
  });
});
