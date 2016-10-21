/* eslint max-len: [2, 500, 4] */
import React from 'react';

import sitemap from '../config/sitemap';
import MainMenu from './layout/menu/menu1';
import Footer from './layout/footer/footer1';


export default class AppHandler extends React.Component {

  static googleAnalytics() {
    /*eslint-disable */
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-75576478-1', 'auto');
    ga('send', 'pageview');
    /*eslint-enable */
  }


  constructor(props, context) {
    super(props, context);
    this.state = {
      data: context.data ? context.data : window.data,
    };
  }

  componentDidMount() {
    AppHandler.googleAnalytics();
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
