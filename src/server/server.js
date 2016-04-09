import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import bodyParser from 'body-parser';

import config from '../../config';
import apiRoutes from './helpers/api';
import routes from '../shared/config/routes';

const app = express();

app.set('views', './views');
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(express.static('static'));

app.use('/api/', apiRoutes);

app.get('/sitemap.xml', (req, res) => {
  res.status(200).send('sitemap');
});

app.get('/*', function (req, res) {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const content = renderToString(<RoutingContext {...renderProps} />);
      res.render('index', { content });
    } else {
      res.status(404).send('Not found');
    }
  });
});

app.set('ipaddress', config.get('ipaddress'));
app.set('port', config.get('port'));

const server = app.listen(app.get('port'), app.get('ipaddress'), (err) => {
  if (err) {
    console.log(err);
  }

  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
