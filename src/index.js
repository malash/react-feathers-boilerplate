'use strict';

require('babel-register');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const path = require('path');
const feathers = require('feathers');
const configuration = require('feathers-configuration');
const serveStatic = require('feathers').static;
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');

const app = feathers();
app
  .configure(configuration(path.join(__dirname, '..')))
  .use(compress())
  .options('*', cors())
  .use(cors());

if (process.env.NODE_ENV === 'production') {
  app
    .use(favicon( path.join(app.get('public'), 'favicon.ico') ))
    .use('/', serveStatic( app.get('public') ))
    .use((req, res, next) => {
      if (!req.url.startsWith('/api')) {
        res.sendFile(path.join(app.get('public'), 'index.html'));
      } else {
        return next(null);
      }
    });
}

app.use('/api/v1', require('./app'));

const server = app.listen(app.get('port'));
server.on('listening', () => {
  console.log(`Feathers application started on ${app.get('host')}:${app.get('port')}`);
});