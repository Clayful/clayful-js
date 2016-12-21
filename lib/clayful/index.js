
const ClayfulError = require('../clayful-error');
const assign = require('../util/assign');

module.exports = (models, credentials) => {

	// Clayful API public instance
	const clayful = {
		options:     {
			baseUrl:         'https://api.clayful.io', // base url for API request
			errorLanguage:   'en',                     // error language to use (for API errors)
			renewTokenBefore: 60 * 5,                  // when to renew access token (in seconds, default = 5 minutes before existing token expires)
			extraHeaders:     {},                      // extra headers to extend default request headers
		},
		credentials: assign({
			customer:     null, // customer token (it will set 'X-Clayful-Customer-Token')
			clientId:     null,
			clientSecret: null
		}, credentials),
		plugins:     {
			tokenStorage: null,
			request:      null,
		}
	};

	// Configure clayful instance
	clayful.config = o => assign(clayful.options, o);

	// Uses plugins. e.g., Token storage, request middleware...
	clayful.install = (scope, plugin) => clayful.plugins[scope] = plugin;

	// Sets default customer token
	clayful.customer = token => clayful.credentials.customer = token;

	// Get API endpoint
	clayful.getEndpoint = path => `${ clayful.options.baseUrl }${ path }`;

	clayful.wrapRequestCallback = requestDetail => (err, result) => requestDetail.callback(err, result, requestDetail);

	// Default header factory
	clayful.getDefaultHeaders = withAuthorization => {

		const headers = assign({
			'X-Clayful-Error-Language': clayful.options.errorLanguage
		}, clayful.options.extraHeaders);

		if (clayful.credentials.customer && !clayful.shouldRenewToken()) {

			// Set customer token automatically
			headers['X-Clayful-Customer-Authorization'] = clayful.credentials.customer;
		}

		if (withAuthorization) {

			const { token } = clayful.plugins.tokenStorage.getToken();

			headers.Authorization = `Bearer ${ token }`;
		}

		return headers;

	};

	// Check whether cached token expires in milliseconds
	clayful.shouldRenewToken = () => {

		const tokenDetails = clayful.plugins.tokenStorage.getToken();

		if (!tokenDetails) {

			return true;
		}

		const { tokenExpiresAt } = tokenDetails;

		const renewTokenBefore = clayful.options.renewTokenBefore;

		return tokenExpiresAt - Date.now() <= renewTokenBefore * 1000;

	};

	clayful.extractRequestArguments = options => {

		const result = {
			httpMethod: options.httpMethod
		};

		const rest = options.args.slice(options.params.length);

		result.requestUrl = options.params.reduce((requestUrl, param, i) => requestUrl.replace(`{${param}}`, options.args[i]), options.path);
		result.callback = rest.pop();

		if (typeof result.callback !== 'function') {

			rest.push(result.callback); // restore rest array
			result.callback = () => {}; // Put an empty function as default if the last argument isn't a function,
		}

		let queryHeaders = {};

		/**
		 * (...params, { query, headers }, callback)
		 * where query, headers are optional (if the endpoint doesn't have any params, ...params are also optional)
		 */

		if (options.httpMethod === 'GET' ||
			options.httpMethod === 'DELETE') {

			queryHeaders = rest[0] || {};
		}

		/**
		 * (...params, payload, { query, headers }, callback)
		 * where payload, query, headers are optional (if the endpoint doesn't have any params, ...params are also optional)
		 */

		if (options.httpMethod === 'PUT' ||
			options.httpMethod === 'POST') {

			// do not use a default object for payload since it undefined and {} has different semantics
			result.payload = options.withoutPayload ? undefined : rest[0];

			queryHeaders = (options.withoutPayload ? rest[0] : rest[1]) || {};
		}

		result.query = queryHeaders.query || {};
		result.headers = queryHeaders.headers || {};

		// Set customer token
		if (queryHeaders.customer) {

			result.headers['X-Clayful-Customer-Authorization'] = queryHeaders.customer;
		}

		return result;

	};

	// Authorization request method (should be implemented by clients)
	clayful.authenticate = callback => {};

	clayful.callAPI = options => {

		const extracted = clayful.extractRequestArguments(options);

		assign(extracted, {
			requestUrl: clayful.getEndpoint(extracted.requestUrl),
			modelName:  options.modelName,
			methodName: options.methodName
		});

		const makeApiCall = () => {

			// Extend & overide headers before making a request
			extracted.headers = assign(clayful.getDefaultHeaders(true), extracted.headers);

			// ClayfulError should be used to generate API errors from Clayful API
			return clayful.plugins.request(extracted, ClayfulError, clayful.wrapRequestCallback(extracted));

		};

		if (!clayful.shouldRenewToken()) {

			return makeApiCall();
		}

		return clayful.authenticate((err, result) => {

			if (err) {
				return extracted.callback(err);
			}

			// Cache access token
			clayful.plugins.tokenStorage.setToken({
				token:          result.access_token,
				tokenExpiresAt: Date.now() + (result.expires_in * 1000) // Since expires_in is in seconds, convert to milliseconds to cache an expiration time.
			});

			return makeApiCall();
		});

	};

	const allModels = models(clayful.callAPI);

	// Get all models
	clayful.models = () => {

		const models = [];

		for (const modelName in allModels) {
			models.push(modelName);
		}

		return models;

	};

	// Extend clayful object with models and methods
	return assign(clayful, allModels);

};