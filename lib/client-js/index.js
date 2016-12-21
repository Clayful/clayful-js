const ClayfulFactory = require('../clayful');
const ClayfulError = require('../clayful-error');
const models = require('../models-js');
const LocalTokenStorage = require('../plugins/token-local-storage');

const Clayful = function(options) {

	"use strict";

	const clayful = ClayfulFactory(models, options);

	clayful.config({
		extraHeaders: {
			'X-Clayful-SDK': `clayful-js`,
		}
	});

	clayful.install('tokenStorage', new LocalTokenStorage('cfl-token')); // default to localStorage

	// Authenticate with `clayful/client_implicit` strategy
	clayful.authenticate = callback => {

		const requestDetail = {
			httpMethod: 'POST',
			requestUrl: clayful.getEndpoint('/token'),
			payload:    {
				grant_type: 'http://clayful.io/oauth/grant-type/client-implicit',
				client_id:  clayful.credentials.clientId
			},
			query:      {},
			headers:    clayful.getDefaultHeaders(),
			callback:   callback
		};

		return clayful.plugins.request(requestDetail, ClayfulError, clayful.wrapRequestCallback(requestDetail));

	};

	return clayful;

};

module.exports = window.Clayful = Clayful;