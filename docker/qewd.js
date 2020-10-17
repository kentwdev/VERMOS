var fs = require('fs');
var customModulePath = '/opt/vermos/mapped/custom.js';
var routesModulePath = '/opt/vermos/mapped/routes.js';
var moduleMapPath = '/opt/vermos/mapped/moduleMap.js';
var custom;
var routes;
if (fs.existsSync(customModulePath)) {
  custom = require(customModulePath);
}
if (fs.existsSync(routesModulePath)) {
  var routes = require(routesModulePath);
}
if (fs.existsSync(moduleMapPath)) {
  var moduleMap = require(moduleMapPath);
}
if (!routes) routes = [];
if (!moduleMap) moduleMap = {};

if (!custom) {
  custom = {
    config: {},
    run: function() {}
  };
}

if (custom && !custom.config) custom.config = {};
if (custom && !custom.run) custom.run = function() {};

var database = {
  type: 'redis',
  params: {
    host: process.env.REDIS_PORT_6379_TCP_ADDR,
    port: process.env.REDIS_PORT_6379_TCP_PORT
  }
};
if (custom.config.database) database = custom.config.database;

var config = {
  managementPassword: custom.config.managementPassword || 'keepThisSecret!',
  serverName: custom.config.serverName || 'vermos Docker Server',
  port: custom.config.port || 8080,
  poolSize: custom.config.poolSize || 1,
  database: database,
  moduleMap: moduleMap
};

var vermos = require('vermos').master;
var q = vermos.start(config, routes);
var intercept = vermos.intercept();

custom.run(config, q, intercept);
