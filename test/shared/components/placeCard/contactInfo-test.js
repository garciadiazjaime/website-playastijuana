import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import ContactInfo from '../../../../src/shared/components/placeCard/contactInfo';
import PlaceController from '../../../../src/client/controllers/placeController';
import GaUtil from '../../../../src/shared/utils/gaUtil';


describe('<ContactInfo />', () => {

  const validProps = {
    placeId: 'placeId',
    google: {
      name: 'name',
      international_phone_number: 'international_phone_number',
      website: 'website',
      formatted_address: 'formatted_address',
      url: "url",
    },
  };

  let cleanPhone = null;
  let cleanWebsite = null;
  let cleanAddress = null;
  let clickTelHandler = null;
  let clickWebsiteHandler = null;
  let clickAddressHandler = null;
  let sendEvent = null;
  let open = null;
  let event = null;

  beforeEach(() => {
    cleanPhone = sinon.spy(PlaceController, 'cleanPhone');
    cleanWebsite = sinon.spy(PlaceController, 'cleanWebsite');
    cleanAddress = sinon.spy(PlaceController, 'cleanAddress');
    clickTelHandler = sinon.spy(ContactInfo.prototype, 'clickTelHandler');
    clickWebsiteHandler = sinon.spy(ContactInfo.prototype, 'clickWebsiteHandler');
    clickAddressHandler = sinon.spy(ContactInfo.prototype, 'clickAddressHandler');
    sendEvent = sinon.spy(GaUtil, 'sendEvent');
    open = sinon.spy(window, 'open');
    event = {
      preventDefault: sinon.spy(),
    };
  });

  afterEach(() => {
    cleanPhone.restore();
    cleanWebsite.restore();
    cleanAddress.restore();
    clickTelHandler.restore();
    clickWebsiteHandler.restore();
    clickAddressHandler.restore();
    sendEvent.restore();
    open.restore();
  });

  it('renders propertely', () => {
    const wrapper = mount(<ContactInfo data={validProps} />);

    expect(wrapper.text()).to.contain(validProps.google.international_phone_number);
    expect(wrapper.text()).to.contain(validProps.google.website);
    expect(wrapper.text()).to.contain(validProps.google.formatted_address);

    expect(cleanPhone.calledOnce).to.equal(true);
    expect(cleanPhone.calledWith(validProps.google.international_phone_number)).to.equal(true);

    expect(cleanWebsite.calledOnce).to.equal(true);
    expect(cleanWebsite.calledWith(validProps.google.website)).to.equal(true);

    expect(cleanAddress.calledOnce).to.equal(true);
    expect(cleanAddress.calledWith(validProps.google.formatted_address)).to.equal(true);
  });

  it('calls clickTelHandler when telephone is clicked', () => {
    const wrapper = mount(<ContactInfo data={validProps} />);

    wrapper.find(`a[href="tel:${validProps.google.international_phone_number}"]`).simulate('click');

    expect(clickTelHandler.called).to.equal(true);
    expect(sendEvent.called).to.equal(true);
    expect(sendEvent.calledWith('place', 'click_telephone', `Click on telephone ${validProps.placeId} | ${validProps.google.name}`)).to.equal(true);
  });

  it('calls clickWebsiteHandler when website is clicked', () => {
    const wrapper = mount(<ContactInfo data={validProps} />);

    wrapper.find(`a[href="${validProps.google.website}"]`).simulate('click', event);

    expect(clickWebsiteHandler.calledOnce).to.equal(true);
    expect(sendEvent.calledOnce).to.equal(true);
    expect(sendEvent.calledWith('place', 'click_website', `Click on website ${validProps.placeId} | ${validProps.google.name}`)).to.equal(true);
    expect(event.preventDefault.calledOnce).to.equal(true);
    expect(open.calledOnce).to.equal(true);
    expect(open.calledWith(validProps.google.website)).to.equal(true);
  });

  it('calls clickAddressHandler when address is clicked', () => {
    const wrapper = mount(<ContactInfo data={validProps} />);

    wrapper.find(`a[href="${validProps.google.url}"]`).simulate('click', event);

    expect(clickAddressHandler.calledOnce).to.equal(true);
    expect(sendEvent.calledOnce).to.equal(true);
    expect(sendEvent.calledWith('place', 'click_address', `Click on address ${validProps.placeId} | ${validProps.google.name}`)).to.equal(true);
    expect(event.preventDefault.calledOnce).to.equal(true);
    expect(open.calledOnce).to.equal(true);
    expect(open.calledWith(validProps.google.url)).to.equal(true);
  });
});
