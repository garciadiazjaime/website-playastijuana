import React from 'react';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import sitemap from '../sitemap';

const { items } = sitemap;
const routes = items.children.map((item, index) =>
  <Route path={item.url} component={item.component} key={index} />
);


export default(
  <Router history={browserHistory}>
    <Route path="/" component={items.component}>
      <IndexRoute component={items.default} />
      {routes}
      <Route path="directorio" component={items.default} />
      <Route path="directorio/playas-tijuana" component={items.default} />
      <Route path="directorio/playas-tijuana/:category" component={items.default} />
      <Route path="directorio/playas-tijuana/:category/:place" component={items.default} />
    </Route>
  </Router>
);
