const ClayfulError = require('../clayful-error');
const assign = require('../util/assign');

const Clayful = {
	baseUrl:        'https://api.clayful.io',  // base url for API request
	defaultHeaders: {},                        // extra headers to extend default request headers
	plugins: {
		request: null                          // request middleware
	}
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
		headers['X-Clayful-Customer-Authorization'] = `Bearer ${ o.customer }`;
	}

	if (o.errorLanguage) {
		headers['X-Clayful-Error-Language'] = o.errorLanguage;
	}

	if (o.headers) {
		assign(headers, o.headers);
	}

	return headers;

};

Clayful.getEndpoint = path => `${ Clayful.baseUrl }${ path }`;

Clayful.wrapRequestCallback = requestDetail => (err, result) => requestDetail.callback(err, result, requestDetail);

Clayful.extractRequestArguments = options => {

	const result = {
		httpMethod: options.httpMethod,
		payload:    null
	};

	const rest = options.args.slice(options.params.length);

	result.requestUrl = options.params.reduce((requestUrl, param, i) => requestUrl.replace(`{${param}}`, options.args[i]), options.path);
	result.callback = rest.pop();

	if (typeof result.callback !== 'function') {

		rest.push(result.callback); // Restore rest array
		result.callback = () => {}; // Put an empty function as default if the last argument isn't a function,
	}

	if ((options.httpMethod === 'POST' ||
		options.httpMethod === 'PUT') &&
		!options.withoutPayload) {

		result.payload = rest.shift() || null;
	}

	const queryHeaders = rest.shift() || {};

	result.query = queryHeaders.query || {};
	result.headers = Clayful.optionsToHeaders(queryHeaders || {});

	// Stringify query values
	for (const key in result.query) {

		result.query[key] = String(result.query[key]);
	}

	return result;

};

Clayful.callAPI = options =>  {

	const request = Clayful.plugins.request;
	const extracted = Clayful.extractRequestArguments(options);

	assign(extracted, {
		requestUrl:   Clayful.getEndpoint(extracted.requestUrl),
		modelName:    options.modelName,
		methodName:   options.methodName,
		usesFormData: options.usesFormData
	});

	// Extend & overide default headers before making a request
	const copied = assign({}, Clayful.defaultHeaders);

	extracted.headers = assign(copied, extracted.headers);

	// ClayfulError should be used for generating API errors from Clayful API
	return request(extracted, ClayfulError, Clayful.wrapRequestCallback(extracted));

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

	let [a, b] = String(number).split('.');

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