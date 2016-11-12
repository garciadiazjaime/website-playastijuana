import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import MainMenu from '../../../../../../src/shared/components/layout/menu/menu1';
import SVG from '../../../../../../src/shared/components/svg';

describe('<MainMenu />', () => {

  it('renders <SVG /> components', () => {
    const wrapper = shallow(<MainMenu />);
    expect(wrapper.find(SVG)).to.have.length(2);
  });

  it('renders', () => {
    const wrapper = render(<MainMenu />);
    expect(wrapper.text().toLowerCase()).to.contain('Restaurantes, Bares y Cafés en Playas de Tijuana'.toLowerCase());
    expect(wrapper.html()).to.contain('google.com');
    expect(wrapper.html()).to.contain('facebook.com');
  });

});
