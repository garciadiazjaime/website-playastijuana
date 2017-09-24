var convict = require('convict');

var config = convict({
    ipaddress: {
      doc: 'IP the application runs on',
      format: 'ipaddress',
      default: '0.0.0.0',
    },
    port: {
        doc: 'Port the application listens on',
        format: 'port',
        default: '3076',
    },
    api: {
      url: {
          doc: 'API URL',
          format: String,
          default: 'http://127.0.0.1:3000/',
          env: 'API_URL',
      },
    },
    cacheExpiresMins: {
      doc: 'Number of minutes before query API',
      format: 'int',
      default: 30,
    },
});

config.validate();

module.exports = config;
