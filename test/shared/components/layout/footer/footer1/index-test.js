import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import Footer from '../../../../../../src/shared/components/layout/footer/footer1';
import Brand from '../../../../../../src/shared/components/layout/footer/footer1/brand';
import Projects from '../../../../../../src/shared/components/layout/footer/footer1/projects';
import About from '../../../../../../src/shared/components/layout/footer/footer1/about';
import SVG from '../../../../../../src/shared/components/svg';

describe('<Footer1 />', () => {

  it('renders <Brand />, <Projects /> and <About /> components', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find(Brand)).to.have.length(1);
    expect(wrapper.find(Projects)).to.have.length(1);
    expect(wrapper.find(About)).to.have.length(1);
    expect(wrapper.find(SVG)).to.have.length(2);
  });

  it('renders <Brand />', () => {
    const wrapper = render(<Brand />);
    expect(wrapper.html()).to.contain('mintitmedia.com');
  });

  it('renders <About />', () => {
    const wrapper = render(<About />);
    expect(wrapper.text().toLowerCase()).to.contain('Restaurantes, Bares y Cafés en Playas de Tijuana'.toLowerCase());
  });

  it('renders <Projects />', () => {
    const wrapper = render(<Projects />);
    expect(wrapper.html()).to.contain('garitacenter.com');
    expect(wrapper.html()).to.contain('misofertasdetrabajo.com');
  });

});
