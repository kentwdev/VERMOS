var config = {
  managementPassword: 'keepThisSecret!',
  serverName: 'My QEWD Server',
  port: 8080,
  poolSize: 2,
  database: {
    type: 'gtm'
  },
  jwt: {
    secret: 'someSecret123'
  }
};

var routes = [
  {
    path: '/api',
    module: 'myJWTService'
  }
];

var qewd = require('qewd').master;
qewd.start(config, routes);
