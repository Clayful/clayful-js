const axios = require('axios');
const Clayful = require('../clayful');
const models = require('../models-node');
const axiosRequestMiddleware = require('../plugins/request-axios');

Clayful.defaultHeaders['Accept-Encoding'] = `gzip`; // set accept-encoding as gzip
Clayful.defaultHeaders['X-Clayful-SDK'] = `clayful-node`;

// default request middleware (based on axios)
Clayful.install('request', axiosRequestMiddleware(axios));

Clayful.setModels(models);

module.exports = Clayful;