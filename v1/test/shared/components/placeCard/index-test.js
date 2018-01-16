import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import PlaceCard from '../../../../src/shared/components/placeCard';
import StringUtil from '../../../../src/shared/utils/stringUtil';
import ContactInfo from '../../../../src/shared/components/placeCard/contactInfo';
import Ratings from '../../../../src/shared/components/placeCard/ratings';
import Comments from '../../../../src/shared/components/placeCard/comments';
import SocialMediaIcons from '../../../../src/shared/components/placeCard/socialMediaIcons';
import PlaceController from '../../../../src/client/controllers/placeController';

describe('<PlaceCard />', () => {
  const validProps = {
    data: {
      google: {
        name: 'name',
      },
    },
    updateHandler: null,
  };

  let toTitleCase = null;
  let getImage = null;
  let renderTypes = null;

  beforeEach(() => {
    toTitleCase = sinon.spy(StringUtil, 'toTitleCase');
    getImage = sinon.spy(PlaceController, 'getImage');
    renderTypes = sinon.spy(PlaceCard.prototype, 'renderTypes');
  });

  afterEach(() => {
    toTitleCase.restore();
    getImage.restore();
    renderTypes.restore();
  });

  it('renders propertely', () => {
    const wrapper = mount(<PlaceCard data={validProps.data} updateHandler={validProps.updateHandler} />);

    expect(getImage.calledOnce).to.equal(true);
    expect(getImage.calledWith(validProps.data)).to.equal(true);
    expect(wrapper.find('img')).to.have.length(1);
    expect(toTitleCase.calledOnce).to.equal(true);
    expect(toTitleCase.calledWith(validProps.data.google.name)).to.equal(true);
    expect(wrapper.find(ContactInfo)).to.have.length(1);
    expect(renderTypes.calledOnce).to.equal(true);
    expect(wrapper.find(Ratings)).to.have.length(1);
    expect(wrapper.find(Comments)).to.have.length(1);
    expect(wrapper.find(SocialMediaIcons)).to.have.length(1);
  });
});
