/* eslint max-len: [2, 500, 4] */
import React from 'react';

import sitemap from '../config/sitemap';
import MainMenu from './layout/menu/menu1';
import Footer from './layout/footer/footer1';
import GaUtil from '../utils/gaUtil';


export default class AppHandler extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      data: context.data ? context.data : window.data,
    };
  }

  componentDidMount() {
    GaUtil.init();
  }

  render() {
    const children = React.Children.map(this.props.children, child =>
      React.cloneElement(child, { data: this.state.data })
    );
    return (<div>
      <MainMenu items={sitemap.items.children} icons={sitemap.icons} />
      {children}
      <Footer items={sitemap.items.children} addresses={sitemap.addresses} />
    </div>);
  }
}

AppHandler.propTypes = {
  children: React.PropTypes.shape({}),
  location: React.PropTypes.shape({}),
  context: React.PropTypes.shape({}),
  data: React.PropTypes.shape({}),
};

AppHandler.contextTypes = {
  data: React.PropTypes.object,
};
