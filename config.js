var convict = require('convict');

var config = convict({
    ipaddress: {
      doc: 'IP the application runs on',
      format: 'ipaddress',
      default: '127.0.0.1',
      env: 'OPENSHIFT_NODEJS_IP'
    },
    port: {
        doc: 'Port the application listens on',
        format: 'port',
        default: '3030',
        env: 'OPENSHIFT_NODEJS_PORT'
    },
    api: {
      url: {
          doc: 'API URL',
          format: String,
          default: 'http://127.0.0.1:3000/',
          env: 'PLACES_API_URL'
      },
    },
    cacheExpiresMins: {
      doc: 'Number of minutes before query API',
      format: 'int',
      default: 1
    }
});

config.validate();

module.exports = config;
