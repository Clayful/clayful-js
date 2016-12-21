const axios = require('axios');
const ClayfulFactory = require('../clayful');
const ClayfulError = require('../clayful-error');
const models = require('../models-node');
const assign = require('../util/assign');
const TokenMemoryStorage = require('../plugins/token-memory-storage');
const axiosRequestMiddleware = require('../plugins/request-axios');

const Clayful = function(options) {

	"use strict";

	const clayful = ClayfulFactory(models, options);

	clayful.config({
		extraHeaders: {
			'Accept-Encoding': `gzip`, // set accept-encoding as gzip
			'X-Clayful-SDK':   `clayful-node`,
		}
	});

	clayful.install('tokenStorage', new TokenMemoryStorage()); // default in-memory token storage
	clayful.install('request', axiosRequestMiddleware(axios)); // default request middleware (based on axios)

	// Authenticate with `client_credentials` strategy
	clayful.authenticate = callback => {

		const encoded = new Buffer(clayful.credentials.clientId + ':' + clayful.credentials.clientSecret).toString('base64');
		const authorization = 'Basic ' + encoded;

		const requestDetail = {
			modelName:  'Clayful',
			methodName: 'authenticate',
			httpMethod: 'POST',
			requestUrl: clayful.getEndpoint('/token'),
			payload:    {
				grant_type: 'client_credentials'
			},
			query:      {},
			headers:    assign(clayful.getDefaultHeaders(), {
				Authorization: authorization
			}),
			callback:   callback
		};

		return clayful.plugins.request(requestDetail, ClayfulError, clayful.wrapRequestCallback(requestDetail));

	};

	return clayful;

};

module.exports = Clayful;