/* eslint max-len: [2, 500, 4] */
import React from 'react';

import sitemap from '../config/sitemap';
import MainMenu from './layout/menu/menu1';
import Footer from './layout/footer/footer1';
import scrollUtil from '../utils/scroll';
import menuUtil from '../utils/menu';


export default class AppHandler extends React.Component {

  componentDidMount() {
    this.scrollHandler(true);
    // window.addEventListener('scroll', this.onScroll, false);
  }

  componentDidUpdate() {
    this.scrollHandler();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll() {
    const offset = window.pageYOffset;
    if (offset > 186) {
      $('#menu_wrapper').addClass('navbar-fixed-top');
    } else {
      $('#menu_wrapper').removeClass('navbar-fixed-top');
    }
  }

  scrollHandler(isFirstTime) {
    const { location } = this.props;
    scrollUtil(location);
    if (!isFirstTime) {
      const bits = location.pathname.split('/');
      menuUtil(bits[1] || 'inicio');
    }
  }

  clickHandler() {
    if ($('.navbar-header button').is(':visible')) {
      $('.navbar-header button').click();
    }
  }

  render() {
    return (<div>
      <MainMenu items={sitemap.items.children} icons={sitemap.icons} onClick={this.clickHandler} />
      {this.props.children}
      <Footer items={sitemap.items.children} addresses={sitemap.addresses}/>
    </div>);
  }
}

AppHandler.propTypes = {
  children: React.PropTypes.object.isRequired,
  location: React.PropTypes.any,
};
