// ATTENTION: This file only supports Node's JavaScript syntax. Be sure to only use supported language features (i.e. no support for Flow, ES Modules, etc).
const proxy = require('http-proxy-middleware');


module.exports = function(app) {
  app.use(proxy('/api/', { target: 'http://localhost:3002/' }));
};
