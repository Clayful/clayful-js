const ClayfulError = require('../clayful-error');
const assign = require('../util/assign');

const Clayful = {
	baseUrl:        'https://api.clayful.io',  // base url for API request
	defaultHeaders: {},                        // extra headers to extend default request headers
	plugins: {
		request: null                          // request middleware
	},
	listeners: {
		request:  [],
		response: []
	},
	Promise: typeof Promise === 'function' ? Promise : null
};

Clayful.optionsToHeaders = (o = {}) => {

	const headers = {};

	if (o.language) {
		headers['Accept-Language'] = o.language;
	}

	if (o.currency) {
		headers['Accept-Currency'] = o.currency;
	}

	if (o.timeZone) {
		headers['Accept-Time-Zone'] = o.timeZone;
	}

	if (o.client) {
		headers['Authorization'] = `Bearer ${ o.client }`;
	}

	if (o.customer) {
		headers['Authorization-Customer'] = o.customer;
	}

	if (o.reCAPTCHA) {
		headers['reCAPTCHA-Response'] = o.reCAPTCHA;
	}

	if (o.debugLanguage) {
		headers['Accept-Debug-Language'] = o.debugLanguage;
	}

	if (o.headers) {
		assign(headers, o.headers);
	}

	return headers;

};

Clayful.getEndpoint = path => `${ Clayful.baseUrl }${ path }`;

Clayful.normalizeQueryValues = (query = {}) => {

	return query;

};

Clayful.wrapRequestCallback = extracted => (err, response = null) => {

	if (err) {
		if (err.isClayful) {
			// ClayfulError case
			extracted.error = err;
			Clayful.trigger('response', extracted);
		}
	} else {
		// Success case
		extracted.response = response;
		Clayful.trigger('response', extracted);
	}

	extracted.callback(err, response, extracted);
};

Clayful.extractRequestArguments = options => {

	const result = {
		httpMethod: options.httpMethod,
		payload:    null,
		meta:       {}
	};

	const rest = options.args.slice(options.params.length);

	result.requestUrl = options.params.reduce((requestUrl, param, i) => requestUrl.replace(`{${param}}`, options.args[i]), options.path);
	result.callback = rest.pop();

	if (typeof result.callback !== 'function') {

		rest.push(result.callback); // Restore rest array
		result.callback = () => {}; // Put an empty function as default if the last argument isn't a function,
		result.callback.Promise = Clayful.Promise;
	}

	if ((options.httpMethod === 'POST' ||
		options.httpMethod === 'PUT') &&
		!options.withoutPayload) {

		result.payload = rest.shift() || null;
	}

	const queryHeaders = rest.shift() || {};

	result.query = Clayful.normalizeQueryValues(queryHeaders.query || {});
	result.headers = Clayful.optionsToHeaders(queryHeaders || {});

	// Set request meta
	result.meta = queryHeaders.meta || {};

	return result;

};

Clayful.callAPI = options =>  {

	const request = Clayful.plugins.request;
	const extracted = Clayful.extractRequestArguments(options);

	assign(extracted, {
		requestUrl:   Clayful.getEndpoint(extracted.requestUrl),
		modelName:    options.modelName,
		methodName:   options.methodName,
		usesFormData: options.usesFormData,
		error:        null,
		response:     null,
	});

	// Extend & overide default headers before making a request
	const copied = assign({}, Clayful.defaultHeaders);

	extracted.headers = assign(copied, extracted.headers);

	Clayful.trigger('request', extracted);

	const wrappedCallback = Clayful.wrapRequestCallback(extracted);

	if (extracted.callback.Promise) {
		wrappedCallback.Promise = extracted.callback.Promise;
	}

	// ClayfulError should be used for generating API errors from Clayful API
	return request(extracted, ClayfulError, wrappedCallback);

};

// Abstracted API request method
Clayful.request = (request, callback) => {

	const api = request.module || '';
	const [model, method] = api.split('.');

	if (!api)                    throw new Error(`Request module name is required.`);
	if (!Clayful[model])         throw new Error(`Model '${ model }' doesn't exist.`);
	if (!Clayful[model][method]) throw new Error(`Method '${ method }' doesn't exist in ${ model }.`);

	const apiSpec = Clayful[model]['_' + method]();

	// Set default values
	request.params = request.params || {};
	request.payload = request.payload || null;
	// Copy `request.options` and set `query` and `headers`
	request.options = assign({
		query:   request.query || {},
		headers: request.headers || {}
	}, request.options || {});

	// Build arguments.
	// Start with URL params.
	const args = apiSpec.params.map(name => request.params[name] || '');

	// Set payload if it's needed
	if ((apiSpec.httpMethod === 'POST' ||
		apiSpec.httpMethod === 'PUT') &&
		!apiSpec.withoutPayload) {

		args.push(request.payload);
	}

	// Set query and headers
	args.push(request.options);

	// Set callback
	if (callback) {
		args.push(callback);
	}

	// Call API
	return Clayful.callAPI(assign(apiSpec, { args }));

};

// Set model APIs
Clayful.setModels = models => {

	const allModels = models(Clayful.callAPI);

	// Get all models - it can be useful to generate Promisified APIs
	Clayful.models = () => {

		const models = [];

		for (const modelName in allModels) {
			models.push(modelName);
		}

		return models;

	};

	// Extend clayful object with models and methods
	return assign(Clayful, allModels);

};

// Configures SDK options
Clayful.config = (o = {}) => assign(Clayful.defaultHeaders, Clayful.optionsToHeaders(o));

// Install plugins. e.g., request middleware
Clayful.install = (plugin, options) => {

	Clayful.plugins[plugin] = Clayful.plugins[plugin] ?
								Clayful.plugins[plugin](options) : // use plug-in as a factory function
								options;                           // or use options as a factory function or a function

};

// Add event listeners
Clayful.on = (eventName, callback) => {

	const listeners = Clayful.listeners[eventName];

	if (!listeners) return;

	listeners.push(callback);

};

// Removes event listeners
Clayful.off = (eventName, callback) => {

	const listeners = Clayful.listeners[eventName];

	const index = listeners.indexOf(callback);

	listeners.splice(index, 1);

};

// Triggers event listeners
Clayful.trigger = (eventName, data) => {

	const listeners = Clayful.listeners[eventName];

	for (let i = 0; i < listeners.length; i++) {

		listeners[i](data);
	}

};


// Utilities

Clayful.formatImageUrl = (baseUrl, options = {}) => {

	const query = [];

	for (const key in options) {
		query.push(`${ key }=${ options[key] }`);
	}

	const queryAsString = query.length ? '?' + query.join('&') : '';

	return baseUrl + queryAsString;

};

Clayful.formatNumber = (number, currency = {}) => {

	if (typeof number !== 'number') {

		return '';
	}

	const { precision, delimiter = {} } = currency;
	const { thousands = '', decimal = '.' } = delimiter;

	if (typeof precision === 'number') {

		const n = Math.pow(10, precision);

		number = Math.round(number * n) / n;

	}

	let [a, b = ''] = String(number).split('.');

	const reversedArray = a.split('').reverse();

	const segments = [];

	while (reversedArray.length) {

		segments.unshift(reversedArray.splice(0, 3).reverse().join(''));

	}

	if (precision) {

		const diff = precision - b.length;

		for (let i = 0; i < diff; i++) {
			b += '0';
		}

	}

	return [segments.join(thousands), b].join(b ? decimal : '');

};

Clayful.formatPrice = (number, currency = {}) => {

	const formattedNumber = Clayful.formatNumber(number, currency);

	if (!formattedNumber) {

		return '';
	}

	const { symbol = '', format = '{price}' } = currency;

	return format
			.replace('{symbol}', symbol)
			.replace('{price}', formattedNumber);

};

module.exports = Clayful;