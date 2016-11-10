import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
// import sinon from 'sinon';

import AppHandler from '../../../src/shared/components/AppHandler';
import MainMenu from '../../../src/shared/components/layout/menu/menu1';
import Footer from '../../../src/shared/components/layout/footer/footer1';
import GaUtil from '../../../src/shared/utils/gaUtil';


describe('<AppHandler />', () => {
  beforeEach(() => {
    sinon.stub(GaUtil, 'init');
  });

  afterEach(() => {
    GaUtil.init.restore();
  })

  it('renders <MainMenu /> and <Footer /> components', () => {
    const wrapper = shallow(<AppHandler />);
    expect(wrapper.find(MainMenu)).to.have.length(1);
    expect(wrapper.find(Footer)).to.have.length(1);
  });

  it('calls GaUtil.init', () => {
    const wrapper = mount(<AppHandler />);
    expect(GaUtil.init).to.have.property('callCount', 1);
  });

  it('calls componentDidMount', () => {
    sinon.spy(AppHandler.prototype, 'componentDidMount');
    const wrapper = mount(<AppHandler />);
    expect(AppHandler.prototype.componentDidMount).to.have.property('callCount', 1);
    AppHandler.prototype.componentDidMount.restore();
  });
});
