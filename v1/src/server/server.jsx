/* eslint max-len: [2, 500, 4] */
import compression from 'compression';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import bodyParser from 'body-parser';
import DataWrapper from './dataWrapper';
import config from '../../config';
import routes from '../shared/config/routes';
import LogUtil from '../shared/utils/logUtil';
import PlaceController from './controllers/placeController';

const placeController = new PlaceController({
  apiUrl: config.get('api.url'),
  minutesToWait: config.get('cacheExpiresMins'),
});
const app = express();

app.use(compression());
app.set('views', './views');
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(express.static('static'));

app.get('/health', (req, res) => {
  res.writeHead(200);
  res.end();
});

app.get('/*', (req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      placeController.getPlaces()
        .then((results) => {
          const props = {
            data: results,
          };
          const content = renderToString(<DataWrapper data={props}><RouterContext {...renderProps} /></DataWrapper>);
          res.render('index', { content, props });
        })
        .catch((err) => {
          LogUtil.log(`RequestUtil.get error: ${err}`);
          const props = {
            data: [],
          };
          const content = renderToString(<DataWrapper data={props}><RouterContext {...renderProps} /></DataWrapper>);
          res.render('index', { content, props });
        });
    } else {
      res.status(404).send('Not found');
    }
  });
});

app.set('ipaddress', config.get('ipaddress'));
app.set('port', config.get('port'));

const server = app.listen(app.get('port'), app.get('ipaddress'), (err) => {
  if (err) {
    LogUtil.log(`server listen error: ${err}`);
  }

  const host = server.address().address;
  const port = server.address().port;
  LogUtil.log(`App listening at http://${host}:${port}`);
});
