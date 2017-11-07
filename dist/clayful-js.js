(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function ClayfulError(modelName, methodName, status, headers, errorCode, message, validation) {

	this.stack = new Error().stack;

	this.model = modelName;
	this.method = methodName;
	this.status = status;
	this.headers = headers;
	this.code = errorCode;
	this.message = message;
	this.validation = validation;
}

ClayfulError.prototype = new Error();
ClayfulError.prototype.constructor = ClayfulError;
ClayfulError.prototype.name = 'ClayfulError';
ClayfulError.prototype.isClayful = true;

module.exports = ClayfulError;

},{}],2:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var ClayfulError = require('../clayful-error');
var assign = require('../util/assign');

var Clayful = {
	baseUrl: 'https://api.clayful.io', // base url for API request
	defaultHeaders: {}, // extra headers to extend default request headers
	plugins: {
		request: null // request middleware
	},
	listeners: {
		request: [],
		response: []
	}
};

Clayful.optionsToHeaders = function () {
	var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


	var headers = {};

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
		headers['Authorization'] = 'Bearer ' + o.client;
	}

	if (o.customer) {
		headers['X-Clayful-Customer'] = o.customer;
	}

	if (o.errorLanguage) {
		headers['X-Clayful-Error-Language'] = o.errorLanguage;
	}

	if (o.headers) {
		assign(headers, o.headers);
	}

	return headers;
};

Clayful.getEndpoint = function (path) {
	return '' + Clayful.baseUrl + path;
};

Clayful.normalizeQueryValues = function () {
	var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


	var cloned = {};

	// Stringify query values
	for (var key in query) {

		cloned[key] = encodeURIComponent(query[key]);
	}

	return cloned;
};

Clayful.wrapRequestCallback = function (extracted) {
	return function (err) {
		var response = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;


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
};

Clayful.extractRequestArguments = function (options) {

	var result = {
		httpMethod: options.httpMethod,
		payload: null,
		meta: {}
	};

	var rest = options.args.slice(options.params.length);

	result.requestUrl = options.params.reduce(function (requestUrl, param, i) {
		return requestUrl.replace('{' + param + '}', options.args[i]);
	}, options.path);
	result.callback = rest.pop();

	if (typeof result.callback !== 'function') {

		rest.push(result.callback); // Restore rest array
		result.callback = function () {}; // Put an empty function as default if the last argument isn't a function,
	}

	if ((options.httpMethod === 'POST' || options.httpMethod === 'PUT') && !options.withoutPayload) {

		result.payload = rest.shift() || null;
	}

	var queryHeaders = rest.shift() || {};

	result.query = Clayful.normalizeQueryValues(queryHeaders.query || {});
	result.headers = Clayful.optionsToHeaders(queryHeaders || {});

	// Set request meta
	result.meta = queryHeaders.meta || {};

	return result;
};

Clayful.callAPI = function (options) {

	var request = Clayful.plugins.request;
	var extracted = Clayful.extractRequestArguments(options);

	assign(extracted, {
		requestUrl: Clayful.getEndpoint(extracted.requestUrl),
		modelName: options.modelName,
		methodName: options.methodName,
		usesFormData: options.usesFormData,
		error: null,
		response: null
	});

	// Extend & overide default headers before making a request
	var copied = assign({}, Clayful.defaultHeaders);

	extracted.headers = assign(copied, extracted.headers);

	Clayful.trigger('request', extracted);

	// ClayfulError should be used for generating API errors from Clayful API
	return request(extracted, ClayfulError, Clayful.wrapRequestCallback(extracted));
};

// Abstracted API request method
Clayful.request = function (request, callback) {

	var api = request.module || '';

	var _api$split = api.split('.'),
	    _api$split2 = _slicedToArray(_api$split, 2),
	    model = _api$split2[0],
	    method = _api$split2[1];

	if (!api) throw new Error('Request module name is required.');
	if (!Clayful[model]) throw new Error('Model \'' + model + '\' doesn\'t exist.');
	if (!Clayful[model][method]) throw new Error('Method \'' + method + '\' doesn\'t exist in ' + model + '.');

	var apiSpec = Clayful[model]['_' + method]();

	// Set default values
	request.params = request.params || {};
	request.payload = request.payload || null;
	// Copy `request.options` and set `query` and `headers`
	request.options = assign({
		query: request.query || {},
		headers: request.headers || {}
	}, request.options || {});

	// Build arguments.
	// Start with URL params.
	var args = apiSpec.params.map(function (name) {
		return request.params[name] || '';
	});

	// Set payload if it's needed
	if ((apiSpec.httpMethod === 'POST' || apiSpec.httpMethod === 'PUT') && !apiSpec.withoutPayload) {

		args.push(request.payload);
	}

	// Set query and headers
	args.push(request.options);

	// Set callback
	if (callback) {
		args.push(callback);
	}

	// Call API
	return Clayful.callAPI(assign(apiSpec, { args: args }));
};

// Set model APIs
Clayful.setModels = function (models) {

	var allModels = models(Clayful.callAPI);

	// Get all models - it can be useful to generate Promisified APIs
	Clayful.models = function () {

		var models = [];

		for (var modelName in allModels) {
			models.push(modelName);
		}

		return models;
	};

	// Extend clayful object with models and methods
	return assign(Clayful, allModels);
};

// Configures SDK options
Clayful.config = function () {
	var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	return assign(Clayful.defaultHeaders, Clayful.optionsToHeaders(o));
};

// Install plugins. e.g., request middleware
Clayful.install = function (plugin, options) {

	Clayful.plugins[plugin] = Clayful.plugins[plugin] ? Clayful.plugins[plugin](options) : // use plug-in as a factory function
	options; // or use options as a factory function or a function
};

// Add event listeners
Clayful.on = function (eventName, callback) {

	var listeners = Clayful.listeners[eventName];

	if (!listeners) return;

	listeners.push(callback);
};

// Removes event listeners
Clayful.off = function (eventName, callback) {

	var listeners = Clayful.listeners[eventName];

	var index = listeners.indexOf(callback);

	listeners.splice(index, 1);
};

// Triggers event listeners
Clayful.trigger = function (eventName, data) {

	var listeners = Clayful.listeners[eventName];

	for (var i = 0; i < listeners.length; i++) {

		listeners[i](data);
	}
};

// Utilities

Clayful.formatImageUrl = function (baseUrl) {
	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


	var query = [];

	for (var key in options) {
		query.push(key + '=' + options[key]);
	}

	var queryAsString = query.length ? '?' + query.join('&') : '';

	return baseUrl + queryAsString;
};

Clayful.formatNumber = function (number) {
	var currency = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


	if (typeof number !== 'number') {

		return '';
	}

	var precision = currency.precision,
	    _currency$delimiter = currency.delimiter,
	    delimiter = _currency$delimiter === undefined ? {} : _currency$delimiter;
	var _delimiter$thousands = delimiter.thousands,
	    thousands = _delimiter$thousands === undefined ? '' : _delimiter$thousands,
	    _delimiter$decimal = delimiter.decimal,
	    decimal = _delimiter$decimal === undefined ? '.' : _delimiter$decimal;


	if (typeof precision === 'number') {

		var n = Math.pow(10, precision);

		number = Math.round(number * n) / n;
	}

	var _String$split = String(number).split('.'),
	    _String$split2 = _slicedToArray(_String$split, 2),
	    a = _String$split2[0],
	    _String$split2$ = _String$split2[1],
	    b = _String$split2$ === undefined ? '' : _String$split2$;

	var reversedArray = a.split('').reverse();

	var segments = [];

	while (reversedArray.length) {

		segments.unshift(reversedArray.splice(0, 3).reverse().join(''));
	}

	if (precision) {

		var diff = precision - b.length;

		for (var i = 0; i < diff; i++) {
			b += '0';
		}
	}

	return [segments.join(thousands), b].join(b ? decimal : '');
};

Clayful.formatPrice = function (number) {
	var currency = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


	var formattedNumber = Clayful.formatNumber(number, currency);

	if (!formattedNumber) {

		return '';
	}

	var _currency$symbol = currency.symbol,
	    symbol = _currency$symbol === undefined ? '' : _currency$symbol,
	    _currency$format = currency.format,
	    format = _currency$format === undefined ? '{price}' : _currency$format;


	return format.replace('{symbol}', symbol).replace('{price}', formattedNumber);
};

module.exports = Clayful;

},{"../clayful-error":1,"../util/assign":26}],3:[function(require,module,exports){
'use strict';

var Clayful = require('../clayful');
var models = require('../models-js');

Clayful.defaultHeaders['X-Clayful-SDK'] = 'clayful-js';

Clayful.setModels(models);

module.exports = window.Clayful = Clayful;

},{"../clayful":2,"../models-js":13}],4:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var Brand = {
		name: 'Brand',
		path: 'brands',
		query: function query() {
			return request(assign(Brand._query(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function list() {
			return request(assign(Brand._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function count() {
			return request(assign(Brand._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function get() {
			return request(assign(Brand._get(), { args: Array.prototype.slice.call(arguments) }));
		}
	};

	Brand._query = function () {

		return {
			modelName: Brand.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/brands',
			params: []
		};
	};

	Brand._list = function () {

		return {
			modelName: Brand.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/brands',
			params: []
		};
	};

	Brand._count = function () {

		return {
			modelName: Brand.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/brands/count',
			params: []
		};
	};

	Brand._get = function () {

		return {
			modelName: Brand.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/brands/{brandId}',
			params: ['brandId']
		};
	};

	return Brand;
};

},{"../util/assign":26}],5:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var Cart = {
		name: 'Cart',
		path: '',
		countItemsAsMe: function countItemsAsMe() {
			return request(assign(Cart._countItemsAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		getAsNonRegistered: function getAsNonRegistered() {
			return request(assign(Cart._getAsNonRegistered(), { args: Array.prototype.slice.call(arguments) }));
		},
		checkoutAsNonRegistered: function checkoutAsNonRegistered() {
			return request(assign(Cart._checkoutAsNonRegistered(), { args: Array.prototype.slice.call(arguments) }));
		},
		getAsMe: function getAsMe() {
			return request(assign(Cart._getAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		checkoutAsMe: function checkoutAsMe() {
			return request(assign(Cart._checkoutAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		addItemAsMe: function addItemAsMe() {
			return request(assign(Cart._addItemAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateItemAsMe: function updateItemAsMe() {
			return request(assign(Cart._updateItemAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		emptyAsMe: function emptyAsMe() {
			return request(assign(Cart._emptyAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteItemAsMe: function deleteItemAsMe() {
			return request(assign(Cart._deleteItemAsMe(), { args: Array.prototype.slice.call(arguments) }));
		}
	};

	Cart._countItemsAsMe = function () {

		return {
			modelName: Cart.name,
			methodName: 'countItemsAsMe',
			httpMethod: 'GET',
			path: '/v1/me/cart/items/count',
			params: []
		};
	};

	Cart._getAsNonRegistered = function () {

		return {
			modelName: Cart.name,
			methodName: 'getAsNonRegistered',
			httpMethod: 'POST',
			path: '/v1/cart',
			params: []
		};
	};

	Cart._checkoutAsNonRegistered = function () {

		return {
			modelName: Cart.name,
			methodName: 'checkoutAsNonRegistered',
			httpMethod: 'POST',
			path: '/v1/cart/checkout',
			params: []
		};
	};

	Cart._getAsMe = function () {

		return {
			modelName: Cart.name,
			methodName: 'getAsMe',
			httpMethod: 'POST',
			path: '/v1/me/cart',
			params: []
		};
	};

	Cart._checkoutAsMe = function () {

		return {
			modelName: Cart.name,
			methodName: 'checkoutAsMe',
			httpMethod: 'POST',
			path: '/v1/me/cart/checkout',
			params: []
		};
	};

	Cart._addItemAsMe = function () {

		return {
			modelName: Cart.name,
			methodName: 'addItemAsMe',
			httpMethod: 'POST',
			path: '/v1/me/cart/items',
			params: []
		};
	};

	Cart._updateItemAsMe = function () {

		return {
			modelName: Cart.name,
			methodName: 'updateItemAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/cart/items/{itemId}',
			params: ['itemId']
		};
	};

	Cart._emptyAsMe = function () {

		return {
			modelName: Cart.name,
			methodName: 'emptyAsMe',
			httpMethod: 'DELETE',
			path: '/v1/me/cart/items',
			params: []
		};
	};

	Cart._deleteItemAsMe = function () {

		return {
			modelName: Cart.name,
			methodName: 'deleteItemAsMe',
			httpMethod: 'DELETE',
			path: '/v1/me/cart/items/{itemId}',
			params: ['itemId']
		};
	};

	return Cart;
};

},{"../util/assign":26}],6:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var Collection = {
		name: 'Collection',
		path: 'collections',
		query: function query() {
			return request(assign(Collection._query(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function list() {
			return request(assign(Collection._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function count() {
			return request(assign(Collection._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function get() {
			return request(assign(Collection._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryByParent: function queryByParent() {
			return request(assign(Collection._queryByParent(), { args: Array.prototype.slice.call(arguments) }));
		},
		listByParent: function listByParent() {
			return request(assign(Collection._listByParent(), { args: Array.prototype.slice.call(arguments) }));
		}
	};

	Collection._query = function () {

		return {
			modelName: Collection.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/collections',
			params: []
		};
	};

	Collection._list = function () {

		return {
			modelName: Collection.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/collections',
			params: []
		};
	};

	Collection._count = function () {

		return {
			modelName: Collection.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/collections/count',
			params: []
		};
	};

	Collection._get = function () {

		return {
			modelName: Collection.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/collections/{collectionId}',
			params: ['collectionId']
		};
	};

	Collection._queryByParent = function () {

		return {
			modelName: Collection.name,
			methodName: 'queryByParent',
			httpMethod: 'GET',
			path: '/v1/collections/{collectionId}/collections',
			params: ['collectionId']
		};
	};

	Collection._listByParent = function () {

		return {
			modelName: Collection.name,
			methodName: 'listByParent',
			httpMethod: 'GET',
			path: '/v1/collections/{collectionId}/collections',
			params: ['collectionId']
		};
	};

	return Collection;
};

},{"../util/assign":26}],7:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var Country = {
		name: 'Country',
		path: 'countries',
		query: function query() {
			return request(assign(Country._query(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function list() {
			return request(assign(Country._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function count() {
			return request(assign(Country._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function get() {
			return request(assign(Country._get(), { args: Array.prototype.slice.call(arguments) }));
		}
	};

	Country._query = function () {

		return {
			modelName: Country.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/countries',
			params: []
		};
	};

	Country._list = function () {

		return {
			modelName: Country.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/countries',
			params: []
		};
	};

	Country._count = function () {

		return {
			modelName: Country.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/countries/count',
			params: []
		};
	};

	Country._get = function () {

		return {
			modelName: Country.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/countries/{countryId}',
			params: ['countryId']
		};
	};

	return Country;
};

},{"../util/assign":26}],8:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var Coupon = {
		name: 'Coupon',
		path: 'coupons',
		query: function query() {
			return request(assign(Coupon._query(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function list() {
			return request(assign(Coupon._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function count() {
			return request(assign(Coupon._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function get() {
			return request(assign(Coupon._get(), { args: Array.prototype.slice.call(arguments) }));
		}
	};

	Coupon._query = function () {

		return {
			modelName: Coupon.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/coupons',
			params: []
		};
	};

	Coupon._list = function () {

		return {
			modelName: Coupon.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/coupons',
			params: []
		};
	};

	Coupon._count = function () {

		return {
			modelName: Coupon.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/coupons/count',
			params: []
		};
	};

	Coupon._get = function () {

		return {
			modelName: Coupon.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/coupons/{couponId}',
			params: ['couponId']
		};
	};

	return Coupon;
};

},{"../util/assign":26}],9:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var Currency = {
		name: 'Currency',
		path: 'currencies',
		query: function query() {
			return request(assign(Currency._query(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function list() {
			return request(assign(Currency._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function count() {
			return request(assign(Currency._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function get() {
			return request(assign(Currency._get(), { args: Array.prototype.slice.call(arguments) }));
		}
	};

	Currency._query = function () {

		return {
			modelName: Currency.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/currencies',
			params: []
		};
	};

	Currency._list = function () {

		return {
			modelName: Currency.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/currencies',
			params: []
		};
	};

	Currency._count = function () {

		return {
			modelName: Currency.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/currencies/count',
			params: []
		};
	};

	Currency._get = function () {

		return {
			modelName: Currency.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/currencies/{currencyId}',
			params: ['currencyId']
		};
	};

	return Currency;
};

},{"../util/assign":26}],10:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var Customer = {
		name: 'Customer',
		path: 'customers',
		getMe: function getMe() {
			return request(assign(Customer._getMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryCouponsAsMe: function queryCouponsAsMe() {
			return request(assign(Customer._queryCouponsAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		listCouponsAsMe: function listCouponsAsMe() {
			return request(assign(Customer._listCouponsAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		countCouponsAsMe: function countCouponsAsMe() {
			return request(assign(Customer._countCouponsAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		signup: function signup() {
			return request(assign(Customer._signup(), { args: Array.prototype.slice.call(arguments) }));
		},
		auth: function auth() {
			return request(assign(Customer._auth(), { args: Array.prototype.slice.call(arguments) }));
		},
		requestVerificationEmail: function requestVerificationEmail() {
			return request(assign(Customer._requestVerificationEmail(), { args: Array.prototype.slice.call(arguments) }));
		},
		verify: function verify() {
			return request(assign(Customer._verify(), { args: Array.prototype.slice.call(arguments) }));
		},
		resetPassword: function resetPassword() {
			return request(assign(Customer._resetPassword(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateMe: function updateMe() {
			return request(assign(Customer._updateMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateCredentialsAsMe: function updateCredentialsAsMe() {
			return request(assign(Customer._updateCredentialsAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteMe: function deleteMe() {
			return request(assign(Customer._deleteMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteCouponAsMe: function deleteCouponAsMe() {
			return request(assign(Customer._deleteCouponAsMe(), { args: Array.prototype.slice.call(arguments) }));
		}
	};

	Customer._getMe = function () {

		return {
			modelName: Customer.name,
			methodName: 'getMe',
			httpMethod: 'GET',
			path: '/v1/me',
			params: []
		};
	};

	Customer._queryCouponsAsMe = function () {

		return {
			modelName: Customer.name,
			methodName: 'queryCouponsAsMe',
			httpMethod: 'GET',
			path: '/v1/me/coupons',
			params: []
		};
	};

	Customer._listCouponsAsMe = function () {

		return {
			modelName: Customer.name,
			methodName: 'listCouponsAsMe',
			httpMethod: 'GET',
			path: '/v1/me/coupons',
			params: []
		};
	};

	Customer._countCouponsAsMe = function () {

		return {
			modelName: Customer.name,
			methodName: 'countCouponsAsMe',
			httpMethod: 'GET',
			path: '/v1/me/coupons/count',
			params: []
		};
	};

	Customer._signup = function () {

		return {
			modelName: Customer.name,
			methodName: 'signup',
			httpMethod: 'POST',
			path: '/v1/me',
			params: []
		};
	};

	Customer._auth = function () {

		return {
			modelName: Customer.name,
			methodName: 'auth',
			httpMethod: 'POST',
			path: '/v1/customers/auth',
			params: []
		};
	};

	Customer._requestVerificationEmail = function () {

		return {
			modelName: Customer.name,
			methodName: 'requestVerificationEmail',
			httpMethod: 'POST',
			path: '/v1/customers/verifications/emails',
			params: []
		};
	};

	Customer._verify = function () {

		return {
			modelName: Customer.name,
			methodName: 'verify',
			httpMethod: 'POST',
			path: '/v1/customers/{customerId}/verify',
			params: ['customerId']
		};
	};

	Customer._resetPassword = function () {

		return {
			modelName: Customer.name,
			methodName: 'resetPassword',
			httpMethod: 'POST',
			path: '/v1/customers/{customerId}/password/reset',
			params: ['customerId']
		};
	};

	Customer._updateMe = function () {

		return {
			modelName: Customer.name,
			methodName: 'updateMe',
			httpMethod: 'PUT',
			path: '/v1/me',
			params: []
		};
	};

	Customer._updateCredentialsAsMe = function () {

		return {
			modelName: Customer.name,
			methodName: 'updateCredentialsAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/credentials',
			params: []
		};
	};

	Customer._deleteMe = function () {

		return {
			modelName: Customer.name,
			methodName: 'deleteMe',
			httpMethod: 'DELETE',
			path: '/v1/me',
			params: []
		};
	};

	Customer._deleteCouponAsMe = function () {

		return {
			modelName: Customer.name,
			methodName: 'deleteCouponAsMe',
			httpMethod: 'DELETE',
			path: '/v1/me/coupons/{couponId}',
			params: ['couponId']
		};
	};

	return Customer;
};

},{"../util/assign":26}],11:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var Group = {
		name: 'Group',
		path: 'groups',
		query: function query() {
			return request(assign(Group._query(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function list() {
			return request(assign(Group._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function count() {
			return request(assign(Group._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function get() {
			return request(assign(Group._get(), { args: Array.prototype.slice.call(arguments) }));
		}
	};

	Group._query = function () {

		return {
			modelName: Group.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/groups',
			params: []
		};
	};

	Group._list = function () {

		return {
			modelName: Group.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/groups',
			params: []
		};
	};

	Group._count = function () {

		return {
			modelName: Group.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/groups/count',
			params: []
		};
	};

	Group._get = function () {

		return {
			modelName: Group.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/groups/{groupId}',
			params: ['groupId']
		};
	};

	return Group;
};

},{"../util/assign":26}],12:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var Image = {
		name: 'Image',
		path: 'images',
		addToReviewAsMe: function addToReviewAsMe() {
			return request(assign(Image._addToReviewAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteFromReviewAsMe: function deleteFromReviewAsMe() {
			return request(assign(Image._deleteFromReviewAsMe(), { args: Array.prototype.slice.call(arguments) }));
		}
	};

	Image._addToReviewAsMe = function () {

		return {
			modelName: Image.name,
			methodName: 'addToReviewAsMe',
			httpMethod: 'POST',
			path: '/v1/me/products/reviews/{reviewId}/images',
			params: ['reviewId'],
			usesFormData: true
		};
	};

	Image._deleteFromReviewAsMe = function () {

		return {
			modelName: Image.name,
			methodName: 'deleteFromReviewAsMe',
			httpMethod: 'DELETE',
			path: '/v1/me/products/reviews/{reviewId}/images/{imageId}',
			params: ['reviewId', 'imageId']
		};
	};

	return Image;
};

},{"../util/assign":26}],13:[function(require,module,exports){
'use strict';

module.exports = function (request) {
	return {

		Brand: require('./brand.js')(request),
		Cart: require('./cart.js')(request),
		Collection: require('./collection.js')(request),
		Country: require('./country.js')(request),
		Coupon: require('./coupon.js')(request),
		Currency: require('./currency.js')(request),
		Customer: require('./customer.js')(request),
		Group: require('./group.js')(request),
		Image: require('./image.js')(request),
		Order: require('./order.js')(request),
		OrderTag: require('./orderTag.js')(request),
		PaymentMethod: require('./paymentMethod.js')(request),
		Product: require('./product.js')(request),
		Review: require('./review.js')(request),
		ReviewComment: require('./reviewComment.js')(request),
		ShippingMethod: require('./shippingMethod.js')(request),
		Store: require('./store.js')(request),
		Subscription: require('./subscription.js')(request),
		TaxCategory: require('./taxCategory.js')(request),
		Warehouse: require('./warehouse.js')(request),
		WishList: require('./wishList.js')(request)

	};
};

},{"./brand.js":4,"./cart.js":5,"./collection.js":6,"./country.js":7,"./coupon.js":8,"./currency.js":9,"./customer.js":10,"./group.js":11,"./image.js":12,"./order.js":14,"./orderTag.js":15,"./paymentMethod.js":16,"./product.js":17,"./review.js":18,"./reviewComment.js":19,"./shippingMethod.js":20,"./store.js":21,"./subscription.js":22,"./taxCategory.js":23,"./warehouse.js":24,"./wishList.js":25}],14:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var Order = {
		name: 'Order',
		path: 'orders',
		query: function query() {
			return request(assign(Order._query(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function list() {
			return request(assign(Order._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function count() {
			return request(assign(Order._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function get() {
			return request(assign(Order._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryByCustomer: function queryByCustomer() {
			return request(assign(Order._queryByCustomer(), { args: Array.prototype.slice.call(arguments) }));
		},
		listByCustomer: function listByCustomer() {
			return request(assign(Order._listByCustomer(), { args: Array.prototype.slice.call(arguments) }));
		},
		getTicketDetails: function getTicketDetails() {
			return request(assign(Order._getTicketDetails(), { args: Array.prototype.slice.call(arguments) }));
		},
		getSyncOperationErrors: function getSyncOperationErrors() {
			return request(assign(Order._getSyncOperationErrors(), { args: Array.prototype.slice.call(arguments) }));
		},
		createFulfillment: function createFulfillment() {
			return request(assign(Order._createFulfillment(), { args: Array.prototype.slice.call(arguments) }));
		},
		recover: function recover() {
			return request(assign(Order._recover(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancel: function cancel() {
			return request(assign(Order._cancel(), { args: Array.prototype.slice.call(arguments) }));
		},
		reject: function reject() {
			return request(assign(Order._reject(), { args: Array.prototype.slice.call(arguments) }));
		},
		undone: function undone() {
			return request(assign(Order._undone(), { args: Array.prototype.slice.call(arguments) }));
		},
		done: function done() {
			return request(assign(Order._done(), { args: Array.prototype.slice.call(arguments) }));
		},
		verifyTicket: function verifyTicket() {
			return request(assign(Order._verifyTicket(), { args: Array.prototype.slice.call(arguments) }));
		},
		useTicket: function useTicket() {
			return request(assign(Order._useTicket(), { args: Array.prototype.slice.call(arguments) }));
		},
		recoverTicket: function recoverTicket() {
			return request(assign(Order._recoverTicket(), { args: Array.prototype.slice.call(arguments) }));
		},
		createFullPaymentTransaction: function createFullPaymentTransaction() {
			return request(assign(Order._createFullPaymentTransaction(), { args: Array.prototype.slice.call(arguments) }));
		},
		createAllFulfillments: function createAllFulfillments() {
			return request(assign(Order._createAllFulfillments(), { args: Array.prototype.slice.call(arguments) }));
		},
		createFullRefund: function createFullRefund() {
			return request(assign(Order._createFullRefund(), { args: Array.prototype.slice.call(arguments) }));
		},
		createPartialPaymentTransaction: function createPartialPaymentTransaction() {
			return request(assign(Order._createPartialPaymentTransaction(), { args: Array.prototype.slice.call(arguments) }));
		},
		createPartialRefund: function createPartialRefund() {
			return request(assign(Order._createPartialRefund(), { args: Array.prototype.slice.call(arguments) }));
		},
		rejectRefund: function rejectRefund() {
			return request(assign(Order._rejectRefund(), { args: Array.prototype.slice.call(arguments) }));
		},
		syncPaymentTransaction: function syncPaymentTransaction() {
			return request(assign(Order._syncPaymentTransaction(), { args: Array.prototype.slice.call(arguments) }));
		},
		recoverDownload: function recoverDownload() {
			return request(assign(Order._recoverDownload(), { args: Array.prototype.slice.call(arguments) }));
		},
		partialRestock: function partialRestock() {
			return request(assign(Order._partialRestock(), { args: Array.prototype.slice.call(arguments) }));
		},
		createFullRefundTransaction: function createFullRefundTransaction() {
			return request(assign(Order._createFullRefundTransaction(), { args: Array.prototype.slice.call(arguments) }));
		},
		fullRestock: function fullRestock() {
			return request(assign(Order._fullRestock(), { args: Array.prototype.slice.call(arguments) }));
		},
		createDownloadableUrl: function createDownloadableUrl() {
			return request(assign(Order._createDownloadableUrl(), { args: Array.prototype.slice.call(arguments) }));
		},
		createPartialRefundTransaction: function createPartialRefundTransaction() {
			return request(assign(Order._createPartialRefundTransaction(), { args: Array.prototype.slice.call(arguments) }));
		},
		syncRefundTransaction: function syncRefundTransaction() {
			return request(assign(Order._syncRefundTransaction(), { args: Array.prototype.slice.call(arguments) }));
		},
		update: function update() {
			return request(assign(Order._update(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateFulfillment: function updateFulfillment() {
			return request(assign(Order._updateFulfillment(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateItem: function updateItem() {
			return request(assign(Order._updateItem(), { args: Array.prototype.slice.call(arguments) }));
		},
		updatePaymentTransaction: function updatePaymentTransaction() {
			return request(assign(Order._updatePaymentTransaction(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateRefund: function updateRefund() {
			return request(assign(Order._updateRefund(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateRefundTransaction: function updateRefundTransaction() {
			return request(assign(Order._updateRefundTransaction(), { args: Array.prototype.slice.call(arguments) }));
		},
		delete: function _delete() {
			return request(assign(Order._delete(), { args: Array.prototype.slice.call(arguments) }));
		},
		deletePaymentTransaction: function deletePaymentTransaction() {
			return request(assign(Order._deletePaymentTransaction(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteRefund: function deleteRefund() {
			return request(assign(Order._deleteRefund(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteFulfillment: function deleteFulfillment() {
			return request(assign(Order._deleteFulfillment(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteSyncOperation: function deleteSyncOperation() {
			return request(assign(Order._deleteSyncOperation(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteRefundTransaction: function deleteRefundTransaction() {
			return request(assign(Order._deleteRefundTransaction(), { args: Array.prototype.slice.call(arguments) }));
		}
	};

	Order._query = function () {

		return {
			modelName: Order.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/orders',
			params: []
		};
	};

	Order._list = function () {

		return {
			modelName: Order.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/orders',
			params: []
		};
	};

	Order._count = function () {

		return {
			modelName: Order.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/orders/count',
			params: []
		};
	};

	Order._get = function () {

		return {
			modelName: Order.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/orders/{orderId}',
			params: ['orderId']
		};
	};

	Order._queryByCustomer = function () {

		return {
			modelName: Order.name,
			methodName: 'queryByCustomer',
			httpMethod: 'GET',
			path: '/v1/customers/{customerId}/orders',
			params: ['customerId']
		};
	};

	Order._listByCustomer = function () {

		return {
			modelName: Order.name,
			methodName: 'listByCustomer',
			httpMethod: 'GET',
			path: '/v1/customers/{customerId}/orders',
			params: ['customerId']
		};
	};

	Order._getTicketDetails = function () {

		return {
			modelName: Order.name,
			methodName: 'getTicketDetails',
			httpMethod: 'GET',
			path: '/v1/orders/tickets/{code}/details',
			params: ['code']
		};
	};

	Order._getSyncOperationErrors = function () {

		return {
			modelName: Order.name,
			methodName: 'getSyncOperationErrors',
			httpMethod: 'GET',
			path: '/v1/orders/{orderId}/sync/operations/errors',
			params: ['orderId']
		};
	};

	Order._createFulfillment = function () {

		return {
			modelName: Order.name,
			methodName: 'createFulfillment',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/fulfillments',
			params: ['orderId']
		};
	};

	Order._recover = function () {

		return {
			modelName: Order.name,
			methodName: 'recover',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/recover',
			params: ['orderId'],
			withoutPayload: true
		};
	};

	Order._cancel = function () {

		return {
			modelName: Order.name,
			methodName: 'cancel',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/cancel',
			params: ['orderId']
		};
	};

	Order._reject = function () {

		return {
			modelName: Order.name,
			methodName: 'reject',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/reject',
			params: ['orderId']
		};
	};

	Order._undone = function () {

		return {
			modelName: Order.name,
			methodName: 'undone',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/undone',
			params: ['orderId'],
			withoutPayload: true
		};
	};

	Order._done = function () {

		return {
			modelName: Order.name,
			methodName: 'done',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/done',
			params: ['orderId'],
			withoutPayload: true
		};
	};

	Order._verifyTicket = function () {

		return {
			modelName: Order.name,
			methodName: 'verifyTicket',
			httpMethod: 'POST',
			path: '/v1/orders/tickets/{code}/verify',
			params: ['code']
		};
	};

	Order._useTicket = function () {

		return {
			modelName: Order.name,
			methodName: 'useTicket',
			httpMethod: 'POST',
			path: '/v1/orders/tickets/{code}/use',
			params: ['code'],
			withoutPayload: true
		};
	};

	Order._recoverTicket = function () {

		return {
			modelName: Order.name,
			methodName: 'recoverTicket',
			httpMethod: 'POST',
			path: '/v1/orders/tickets/{code}/recover',
			params: ['code']
		};
	};

	Order._createFullPaymentTransaction = function () {

		return {
			modelName: Order.name,
			methodName: 'createFullPaymentTransaction',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/transactions/full',
			params: ['orderId']
		};
	};

	Order._createAllFulfillments = function () {

		return {
			modelName: Order.name,
			methodName: 'createAllFulfillments',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/fulfillments/all',
			params: ['orderId']
		};
	};

	Order._createFullRefund = function () {

		return {
			modelName: Order.name,
			methodName: 'createFullRefund',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/refunds/full',
			params: ['orderId']
		};
	};

	Order._createPartialPaymentTransaction = function () {

		return {
			modelName: Order.name,
			methodName: 'createPartialPaymentTransaction',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/transactions/partial',
			params: ['orderId']
		};
	};

	Order._createPartialRefund = function () {

		return {
			modelName: Order.name,
			methodName: 'createPartialRefund',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/refunds/partial',
			params: ['orderId']
		};
	};

	Order._rejectRefund = function () {

		return {
			modelName: Order.name,
			methodName: 'rejectRefund',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/refunds/{refundId}/reject',
			params: ['orderId', 'refundId']
		};
	};

	Order._syncPaymentTransaction = function () {

		return {
			modelName: Order.name,
			methodName: 'syncPaymentTransaction',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/transactions/{transactionId}/sync',
			params: ['orderId', 'transactionId'],
			withoutPayload: true
		};
	};

	Order._recoverDownload = function () {

		return {
			modelName: Order.name,
			methodName: 'recoverDownload',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/items/{itemId}/download/recover',
			params: ['orderId', 'itemId']
		};
	};

	Order._partialRestock = function () {

		return {
			modelName: Order.name,
			methodName: 'partialRestock',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/refunds/{refundId}/restock/partial',
			params: ['orderId', 'refundId']
		};
	};

	Order._createFullRefundTransaction = function () {

		return {
			modelName: Order.name,
			methodName: 'createFullRefundTransaction',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/refunds/{refundId}/transactions/full',
			params: ['orderId', 'refundId']
		};
	};

	Order._fullRestock = function () {

		return {
			modelName: Order.name,
			methodName: 'fullRestock',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/refunds/{refundId}/restock/full',
			params: ['orderId', 'refundId'],
			withoutPayload: true
		};
	};

	Order._createDownloadableUrl = function () {

		return {
			modelName: Order.name,
			methodName: 'createDownloadableUrl',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/items/{itemId}/download/url',
			params: ['orderId', 'itemId']
		};
	};

	Order._createPartialRefundTransaction = function () {

		return {
			modelName: Order.name,
			methodName: 'createPartialRefundTransaction',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/refunds/{refundId}/transactions/partial',
			params: ['orderId', 'refundId']
		};
	};

	Order._syncRefundTransaction = function () {

		return {
			modelName: Order.name,
			methodName: 'syncRefundTransaction',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/refunds/{refundId}/transactions/{transactionId}/sync',
			params: ['orderId', 'refundId', 'transactionId'],
			withoutPayload: true
		};
	};

	Order._update = function () {

		return {
			modelName: Order.name,
			methodName: 'update',
			httpMethod: 'PUT',
			path: '/v1/orders/{orderId}',
			params: ['orderId']
		};
	};

	Order._updateFulfillment = function () {

		return {
			modelName: Order.name,
			methodName: 'updateFulfillment',
			httpMethod: 'PUT',
			path: '/v1/orders/{orderId}/fulfillments/{fulfillmentId}',
			params: ['orderId', 'fulfillmentId']
		};
	};

	Order._updateItem = function () {

		return {
			modelName: Order.name,
			methodName: 'updateItem',
			httpMethod: 'PUT',
			path: '/v1/orders/{orderId}/items/{itemId}',
			params: ['orderId', 'itemId']
		};
	};

	Order._updatePaymentTransaction = function () {

		return {
			modelName: Order.name,
			methodName: 'updatePaymentTransaction',
			httpMethod: 'PUT',
			path: '/v1/orders/{orderId}/transactions/{transactionId}',
			params: ['orderId', 'transactionId']
		};
	};

	Order._updateRefund = function () {

		return {
			modelName: Order.name,
			methodName: 'updateRefund',
			httpMethod: 'PUT',
			path: '/v1/orders/{orderId}/refunds/{refundId}',
			params: ['orderId', 'refundId']
		};
	};

	Order._updateRefundTransaction = function () {

		return {
			modelName: Order.name,
			methodName: 'updateRefundTransaction',
			httpMethod: 'PUT',
			path: '/v1/orders/{orderId}/refunds/{refundId}/transactions/{transactionId}',
			params: ['orderId', 'refundId', 'transactionId']
		};
	};

	Order._delete = function () {

		return {
			modelName: Order.name,
			methodName: 'delete',
			httpMethod: 'DELETE',
			path: '/v1/orders/{orderId}',
			params: ['orderId']
		};
	};

	Order._deletePaymentTransaction = function () {

		return {
			modelName: Order.name,
			methodName: 'deletePaymentTransaction',
			httpMethod: 'DELETE',
			path: '/v1/orders/{orderId}/transactions/{transactionId}',
			params: ['orderId', 'transactionId']
		};
	};

	Order._deleteRefund = function () {

		return {
			modelName: Order.name,
			methodName: 'deleteRefund',
			httpMethod: 'DELETE',
			path: '/v1/orders/{orderId}/refunds/{refundId}',
			params: ['orderId', 'refundId']
		};
	};

	Order._deleteFulfillment = function () {

		return {
			modelName: Order.name,
			methodName: 'deleteFulfillment',
			httpMethod: 'DELETE',
			path: '/v1/orders/{orderId}/fulfillments/{fulfillmentId}',
			params: ['orderId', 'fulfillmentId']
		};
	};

	Order._deleteSyncOperation = function () {

		return {
			modelName: Order.name,
			methodName: 'deleteSyncOperation',
			httpMethod: 'DELETE',
			path: '/v1/orders/{orderId}/sync/operations/{operationId}',
			params: ['orderId', 'operationId']
		};
	};

	Order._deleteRefundTransaction = function () {

		return {
			modelName: Order.name,
			methodName: 'deleteRefundTransaction',
			httpMethod: 'DELETE',
			path: '/v1/orders/{orderId}/refunds/{refundId}/transactions/{transactionId}',
			params: ['orderId', 'refundId', 'transactionId']
		};
	};

	return Order;
};

},{"../util/assign":26}],15:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var OrderTag = {
		name: 'OrderTag',
		path: 'orders/tags',
		query: function query() {
			return request(assign(OrderTag._query(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function list() {
			return request(assign(OrderTag._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function count() {
			return request(assign(OrderTag._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function get() {
			return request(assign(OrderTag._get(), { args: Array.prototype.slice.call(arguments) }));
		}
	};

	OrderTag._query = function () {

		return {
			modelName: OrderTag.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/orders/tags',
			params: []
		};
	};

	OrderTag._list = function () {

		return {
			modelName: OrderTag.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/orders/tags',
			params: []
		};
	};

	OrderTag._count = function () {

		return {
			modelName: OrderTag.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/orders/tags/count',
			params: []
		};
	};

	OrderTag._get = function () {

		return {
			modelName: OrderTag.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/orders/tags/{orderTagId}',
			params: ['orderTagId']
		};
	};

	return OrderTag;
};

},{"../util/assign":26}],16:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var PaymentMethod = {
		name: 'PaymentMethod',
		path: 'payments/methods',
		query: function query() {
			return request(assign(PaymentMethod._query(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function list() {
			return request(assign(PaymentMethod._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function count() {
			return request(assign(PaymentMethod._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function get() {
			return request(assign(PaymentMethod._get(), { args: Array.prototype.slice.call(arguments) }));
		}
	};

	PaymentMethod._query = function () {

		return {
			modelName: PaymentMethod.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/payments/methods',
			params: []
		};
	};

	PaymentMethod._list = function () {

		return {
			modelName: PaymentMethod.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/payments/methods',
			params: []
		};
	};

	PaymentMethod._count = function () {

		return {
			modelName: PaymentMethod.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/payments/methods/count',
			params: []
		};
	};

	PaymentMethod._get = function () {

		return {
			modelName: PaymentMethod.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/payments/methods/{paymentMethodId}',
			params: ['paymentMethodId']
		};
	};

	return PaymentMethod;
};

},{"../util/assign":26}],17:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var Product = {
		name: 'Product',
		path: 'products',
		query: function query() {
			return request(assign(Product._query(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function list() {
			return request(assign(Product._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function count() {
			return request(assign(Product._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function get() {
			return request(assign(Product._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryByBrand: function queryByBrand() {
			return request(assign(Product._queryByBrand(), { args: Array.prototype.slice.call(arguments) }));
		},
		listByBrand: function listByBrand() {
			return request(assign(Product._listByBrand(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryByCollection: function queryByCollection() {
			return request(assign(Product._queryByCollection(), { args: Array.prototype.slice.call(arguments) }));
		},
		listByCollection: function listByCollection() {
			return request(assign(Product._listByCollection(), { args: Array.prototype.slice.call(arguments) }));
		}
	};

	Product._query = function () {

		return {
			modelName: Product.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/products',
			params: []
		};
	};

	Product._list = function () {

		return {
			modelName: Product.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/products',
			params: []
		};
	};

	Product._count = function () {

		return {
			modelName: Product.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/products/count',
			params: []
		};
	};

	Product._get = function () {

		return {
			modelName: Product.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/products/{productId}',
			params: ['productId']
		};
	};

	Product._queryByBrand = function () {

		return {
			modelName: Product.name,
			methodName: 'queryByBrand',
			httpMethod: 'GET',
			path: '/v1/brands/{brandId}/products',
			params: ['brandId']
		};
	};

	Product._listByBrand = function () {

		return {
			modelName: Product.name,
			methodName: 'listByBrand',
			httpMethod: 'GET',
			path: '/v1/brands/{brandId}/products',
			params: ['brandId']
		};
	};

	Product._queryByCollection = function () {

		return {
			modelName: Product.name,
			methodName: 'queryByCollection',
			httpMethod: 'GET',
			path: '/v1/collections/{collectionId}/products',
			params: ['collectionId']
		};
	};

	Product._listByCollection = function () {

		return {
			modelName: Product.name,
			methodName: 'listByCollection',
			httpMethod: 'GET',
			path: '/v1/collections/{collectionId}/products',
			params: ['collectionId']
		};
	};

	return Product;
};

},{"../util/assign":26}],18:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var Review = {
		name: 'Review',
		path: 'products/reviews',
		query: function query() {
			return request(assign(Review._query(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function list() {
			return request(assign(Review._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function count() {
			return request(assign(Review._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function get() {
			return request(assign(Review._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryByProduct: function queryByProduct() {
			return request(assign(Review._queryByProduct(), { args: Array.prototype.slice.call(arguments) }));
		},
		listByProduct: function listByProduct() {
			return request(assign(Review._listByProduct(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryByCustomer: function queryByCustomer() {
			return request(assign(Review._queryByCustomer(), { args: Array.prototype.slice.call(arguments) }));
		},
		listByCustomer: function listByCustomer() {
			return request(assign(Review._listByCustomer(), { args: Array.prototype.slice.call(arguments) }));
		},
		createAsMe: function createAsMe() {
			return request(assign(Review._createAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		flagAsMe: function flagAsMe() {
			return request(assign(Review._flagAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelFlagAsMe: function cancelFlagAsMe() {
			return request(assign(Review._cancelFlagAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		helpedAsMe: function helpedAsMe() {
			return request(assign(Review._helpedAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelHelpedAsMe: function cancelHelpedAsMe() {
			return request(assign(Review._cancelHelpedAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateAsMe: function updateAsMe() {
			return request(assign(Review._updateAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteAsMe: function deleteAsMe() {
			return request(assign(Review._deleteAsMe(), { args: Array.prototype.slice.call(arguments) }));
		}
	};

	Review._query = function () {

		return {
			modelName: Review.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/products/reviews',
			params: []
		};
	};

	Review._list = function () {

		return {
			modelName: Review.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/products/reviews',
			params: []
		};
	};

	Review._count = function () {

		return {
			modelName: Review.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/products/reviews/count',
			params: []
		};
	};

	Review._get = function () {

		return {
			modelName: Review.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/products/reviews/{reviewId}',
			params: ['reviewId']
		};
	};

	Review._queryByProduct = function () {

		return {
			modelName: Review.name,
			methodName: 'queryByProduct',
			httpMethod: 'GET',
			path: '/v1/products/{productId}/reviews',
			params: ['productId']
		};
	};

	Review._listByProduct = function () {

		return {
			modelName: Review.name,
			methodName: 'listByProduct',
			httpMethod: 'GET',
			path: '/v1/products/{productId}/reviews',
			params: ['productId']
		};
	};

	Review._queryByCustomer = function () {

		return {
			modelName: Review.name,
			methodName: 'queryByCustomer',
			httpMethod: 'GET',
			path: '/v1/customers/{customerId}/products/reviews',
			params: ['customerId']
		};
	};

	Review._listByCustomer = function () {

		return {
			modelName: Review.name,
			methodName: 'listByCustomer',
			httpMethod: 'GET',
			path: '/v1/customers/{customerId}/products/reviews',
			params: ['customerId']
		};
	};

	Review._createAsMe = function () {

		return {
			modelName: Review.name,
			methodName: 'createAsMe',
			httpMethod: 'POST',
			path: '/v1/me/products/reviews',
			params: []
		};
	};

	Review._flagAsMe = function () {

		return {
			modelName: Review.name,
			methodName: 'flagAsMe',
			httpMethod: 'POST',
			path: '/v1/me/products/reviews/{reviewId}/flag',
			params: ['reviewId'],
			withoutPayload: true
		};
	};

	Review._cancelFlagAsMe = function () {

		return {
			modelName: Review.name,
			methodName: 'cancelFlagAsMe',
			httpMethod: 'POST',
			path: '/v1/me/products/reviews/{reviewId}/flag/cancel',
			params: ['reviewId'],
			withoutPayload: true
		};
	};

	Review._helpedAsMe = function () {

		return {
			modelName: Review.name,
			methodName: 'helpedAsMe',
			httpMethod: 'POST',
			path: '/v1/me/products/reviews/{reviewId}/helped/{upDown}',
			params: ['reviewId', 'upDown'],
			withoutPayload: true
		};
	};

	Review._cancelHelpedAsMe = function () {

		return {
			modelName: Review.name,
			methodName: 'cancelHelpedAsMe',
			httpMethod: 'POST',
			path: '/v1/me/products/reviews/{reviewId}/helped/{upDown}/cancel',
			params: ['reviewId', 'upDown'],
			withoutPayload: true
		};
	};

	Review._updateAsMe = function () {

		return {
			modelName: Review.name,
			methodName: 'updateAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/products/reviews/{reviewId}',
			params: ['reviewId']
		};
	};

	Review._deleteAsMe = function () {

		return {
			modelName: Review.name,
			methodName: 'deleteAsMe',
			httpMethod: 'DELETE',
			path: '/v1/me/products/reviews/{reviewId}',
			params: ['reviewId']
		};
	};

	return Review;
};

},{"../util/assign":26}],19:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var ReviewComment = {
		name: 'ReviewComment',
		path: 'products/reviews/comments',
		query: function query() {
			return request(assign(ReviewComment._query(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function list() {
			return request(assign(ReviewComment._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function count() {
			return request(assign(ReviewComment._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function get() {
			return request(assign(ReviewComment._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryByReview: function queryByReview() {
			return request(assign(ReviewComment._queryByReview(), { args: Array.prototype.slice.call(arguments) }));
		},
		listByReview: function listByReview() {
			return request(assign(ReviewComment._listByReview(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryByAuthor: function queryByAuthor() {
			return request(assign(ReviewComment._queryByAuthor(), { args: Array.prototype.slice.call(arguments) }));
		},
		listByAuthor: function listByAuthor() {
			return request(assign(ReviewComment._listByAuthor(), { args: Array.prototype.slice.call(arguments) }));
		},
		createAsMe: function createAsMe() {
			return request(assign(ReviewComment._createAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		flagAsMe: function flagAsMe() {
			return request(assign(ReviewComment._flagAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelFlagAsMe: function cancelFlagAsMe() {
			return request(assign(ReviewComment._cancelFlagAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateAsMe: function updateAsMe() {
			return request(assign(ReviewComment._updateAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteAsMe: function deleteAsMe() {
			return request(assign(ReviewComment._deleteAsMe(), { args: Array.prototype.slice.call(arguments) }));
		}
	};

	ReviewComment._query = function () {

		return {
			modelName: ReviewComment.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/products/reviews/comments',
			params: []
		};
	};

	ReviewComment._list = function () {

		return {
			modelName: ReviewComment.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/products/reviews/comments',
			params: []
		};
	};

	ReviewComment._count = function () {

		return {
			modelName: ReviewComment.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/products/reviews/comments/count',
			params: []
		};
	};

	ReviewComment._get = function () {

		return {
			modelName: ReviewComment.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/products/reviews/comments/{reviewCommentId}',
			params: ['reviewCommentId']
		};
	};

	ReviewComment._queryByReview = function () {

		return {
			modelName: ReviewComment.name,
			methodName: 'queryByReview',
			httpMethod: 'GET',
			path: '/v1/products/reviews/{reviewId}/comments',
			params: ['reviewId']
		};
	};

	ReviewComment._listByReview = function () {

		return {
			modelName: ReviewComment.name,
			methodName: 'listByReview',
			httpMethod: 'GET',
			path: '/v1/products/reviews/{reviewId}/comments',
			params: ['reviewId']
		};
	};

	ReviewComment._queryByAuthor = function () {

		return {
			modelName: ReviewComment.name,
			methodName: 'queryByAuthor',
			httpMethod: 'GET',
			path: '/v1/{authorModel}/{authorId}/products/reviews/comments',
			params: ['authorModel', 'authorId']
		};
	};

	ReviewComment._listByAuthor = function () {

		return {
			modelName: ReviewComment.name,
			methodName: 'listByAuthor',
			httpMethod: 'GET',
			path: '/v1/{authorModel}/{authorId}/products/reviews/comments',
			params: ['authorModel', 'authorId']
		};
	};

	ReviewComment._createAsMe = function () {

		return {
			modelName: ReviewComment.name,
			methodName: 'createAsMe',
			httpMethod: 'POST',
			path: '/v1/me/products/reviews/comments',
			params: []
		};
	};

	ReviewComment._flagAsMe = function () {

		return {
			modelName: ReviewComment.name,
			methodName: 'flagAsMe',
			httpMethod: 'POST',
			path: '/v1/me/products/reviews/comments/{reviewCommentId}/flag',
			params: ['reviewCommentId'],
			withoutPayload: true
		};
	};

	ReviewComment._cancelFlagAsMe = function () {

		return {
			modelName: ReviewComment.name,
			methodName: 'cancelFlagAsMe',
			httpMethod: 'POST',
			path: '/v1/me/products/reviews/comments/{reviewCommentId}/flag/cancel',
			params: ['reviewCommentId'],
			withoutPayload: true
		};
	};

	ReviewComment._updateAsMe = function () {

		return {
			modelName: ReviewComment.name,
			methodName: 'updateAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/products/reviews/comments/{reviewCommentId}',
			params: ['reviewCommentId']
		};
	};

	ReviewComment._deleteAsMe = function () {

		return {
			modelName: ReviewComment.name,
			methodName: 'deleteAsMe',
			httpMethod: 'DELETE',
			path: '/v1/me/products/reviews/comments/{reviewCommentId}',
			params: ['reviewCommentId']
		};
	};

	return ReviewComment;
};

},{"../util/assign":26}],20:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var ShippingMethod = {
		name: 'ShippingMethod',
		path: 'shipping/methods',
		query: function query() {
			return request(assign(ShippingMethod._query(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function list() {
			return request(assign(ShippingMethod._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function count() {
			return request(assign(ShippingMethod._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function get() {
			return request(assign(ShippingMethod._get(), { args: Array.prototype.slice.call(arguments) }));
		}
	};

	ShippingMethod._query = function () {

		return {
			modelName: ShippingMethod.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/shipping/methods',
			params: []
		};
	};

	ShippingMethod._list = function () {

		return {
			modelName: ShippingMethod.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/shipping/methods',
			params: []
		};
	};

	ShippingMethod._count = function () {

		return {
			modelName: ShippingMethod.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/shipping/methods/count',
			params: []
		};
	};

	ShippingMethod._get = function () {

		return {
			modelName: ShippingMethod.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/shipping/methods/{shippingMethodId}',
			params: ['shippingMethodId']
		};
	};

	return ShippingMethod;
};

},{"../util/assign":26}],21:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var Store = {
		name: 'Store',
		path: 'store',
		get: function get() {
			return request(assign(Store._get(), { args: Array.prototype.slice.call(arguments) }));
		}
	};

	Store._get = function () {

		return {
			modelName: Store.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/store',
			params: []
		};
	};

	return Store;
};

},{"../util/assign":26}],22:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var Subscription = {
		name: 'Subscription',
		path: '',
		query: function query() {
			return request(assign(Subscription._query(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function list() {
			return request(assign(Subscription._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function count() {
			return request(assign(Subscription._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function get() {
			return request(assign(Subscription._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryByCustomer: function queryByCustomer() {
			return request(assign(Subscription._queryByCustomer(), { args: Array.prototype.slice.call(arguments) }));
		},
		listByCustomer: function listByCustomer() {
			return request(assign(Subscription._listByCustomer(), { args: Array.prototype.slice.call(arguments) }));
		},
		reject: function reject() {
			return request(assign(Subscription._reject(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancel: function cancel() {
			return request(assign(Subscription._cancel(), { args: Array.prototype.slice.call(arguments) }));
		},
		start: function start() {
			return request(assign(Subscription._start(), { args: Array.prototype.slice.call(arguments) }));
		},
		delete: function _delete() {
			return request(assign(Subscription._delete(), { args: Array.prototype.slice.call(arguments) }));
		}
	};

	Subscription._query = function () {

		return {
			modelName: Subscription.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/subscriptions',
			params: []
		};
	};

	Subscription._list = function () {

		return {
			modelName: Subscription.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/subscriptions',
			params: []
		};
	};

	Subscription._count = function () {

		return {
			modelName: Subscription.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/subscriptions/count',
			params: []
		};
	};

	Subscription._get = function () {

		return {
			modelName: Subscription.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/subscriptions/{subscriptionId}',
			params: ['subscriptionId']
		};
	};

	Subscription._queryByCustomer = function () {

		return {
			modelName: Subscription.name,
			methodName: 'queryByCustomer',
			httpMethod: 'GET',
			path: '/v1/customers/{customerId}/subscriptions',
			params: ['customerId']
		};
	};

	Subscription._listByCustomer = function () {

		return {
			modelName: Subscription.name,
			methodName: 'listByCustomer',
			httpMethod: 'GET',
			path: '/v1/customers/{customerId}/subscriptions',
			params: ['customerId']
		};
	};

	Subscription._reject = function () {

		return {
			modelName: Subscription.name,
			methodName: 'reject',
			httpMethod: 'POST',
			path: '/v1/subscriptions/{subscriptionId}/reject',
			params: ['subscriptionId']
		};
	};

	Subscription._cancel = function () {

		return {
			modelName: Subscription.name,
			methodName: 'cancel',
			httpMethod: 'POST',
			path: '/v1/subscriptions/{subscriptionId}/cancel',
			params: ['subscriptionId']
		};
	};

	Subscription._start = function () {

		return {
			modelName: Subscription.name,
			methodName: 'start',
			httpMethod: 'POST',
			path: '/v1/subscriptions/{subscriptionId}/start',
			params: ['subscriptionId'],
			withoutPayload: true
		};
	};

	Subscription._delete = function () {

		return {
			modelName: Subscription.name,
			methodName: 'delete',
			httpMethod: 'DELETE',
			path: '/v1/subscriptions/{subscriptionId}',
			params: ['subscriptionId']
		};
	};

	return Subscription;
};

},{"../util/assign":26}],23:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var TaxCategory = {
		name: 'TaxCategory',
		path: 'taxes/categories',
		query: function query() {
			return request(assign(TaxCategory._query(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function list() {
			return request(assign(TaxCategory._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function count() {
			return request(assign(TaxCategory._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function get() {
			return request(assign(TaxCategory._get(), { args: Array.prototype.slice.call(arguments) }));
		}
	};

	TaxCategory._query = function () {

		return {
			modelName: TaxCategory.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/taxes/categories',
			params: []
		};
	};

	TaxCategory._list = function () {

		return {
			modelName: TaxCategory.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/taxes/categories',
			params: []
		};
	};

	TaxCategory._count = function () {

		return {
			modelName: TaxCategory.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/taxes/categories/count',
			params: []
		};
	};

	TaxCategory._get = function () {

		return {
			modelName: TaxCategory.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/taxes/categories/{taxCategoryId}',
			params: ['taxCategoryId']
		};
	};

	return TaxCategory;
};

},{"../util/assign":26}],24:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var Warehouse = {
		name: 'Warehouse',
		path: 'warehouses',
		query: function query() {
			return request(assign(Warehouse._query(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function list() {
			return request(assign(Warehouse._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function count() {
			return request(assign(Warehouse._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function get() {
			return request(assign(Warehouse._get(), { args: Array.prototype.slice.call(arguments) }));
		}
	};

	Warehouse._query = function () {

		return {
			modelName: Warehouse.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/warehouses',
			params: []
		};
	};

	Warehouse._list = function () {

		return {
			modelName: Warehouse.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/warehouses',
			params: []
		};
	};

	Warehouse._count = function () {

		return {
			modelName: Warehouse.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/warehouses/count',
			params: []
		};
	};

	Warehouse._get = function () {

		return {
			modelName: Warehouse.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/warehouses/{warehouseId}',
			params: ['warehouseId']
		};
	};

	return Warehouse;
};

},{"../util/assign":26}],25:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var WishList = {
		name: 'WishList',
		path: 'wishlists',
		queryAsMe: function queryAsMe() {
			return request(assign(WishList._queryAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		listAsMe: function listAsMe() {
			return request(assign(WishList._listAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		countAsMe: function countAsMe() {
			return request(assign(WishList._countAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		getAsMe: function getAsMe() {
			return request(assign(WishList._getAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryProductsAsMe: function queryProductsAsMe() {
			return request(assign(WishList._queryProductsAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		listProductsAsMe: function listProductsAsMe() {
			return request(assign(WishList._listProductsAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		countProductsAsMe: function countProductsAsMe() {
			return request(assign(WishList._countProductsAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		createAsMe: function createAsMe() {
			return request(assign(WishList._createAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		addItemAsMe: function addItemAsMe() {
			return request(assign(WishList._addItemAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateAsMe: function updateAsMe() {
			return request(assign(WishList._updateAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteAsMe: function deleteAsMe() {
			return request(assign(WishList._deleteAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		emptyAsMe: function emptyAsMe() {
			return request(assign(WishList._emptyAsMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteItemAsMe: function deleteItemAsMe() {
			return request(assign(WishList._deleteItemAsMe(), { args: Array.prototype.slice.call(arguments) }));
		}
	};

	WishList._queryAsMe = function () {

		return {
			modelName: WishList.name,
			methodName: 'queryAsMe',
			httpMethod: 'GET',
			path: '/v1/me/wishlists',
			params: []
		};
	};

	WishList._listAsMe = function () {

		return {
			modelName: WishList.name,
			methodName: 'listAsMe',
			httpMethod: 'GET',
			path: '/v1/me/wishlists',
			params: []
		};
	};

	WishList._countAsMe = function () {

		return {
			modelName: WishList.name,
			methodName: 'countAsMe',
			httpMethod: 'GET',
			path: '/v1/me/wishlists/count',
			params: []
		};
	};

	WishList._getAsMe = function () {

		return {
			modelName: WishList.name,
			methodName: 'getAsMe',
			httpMethod: 'GET',
			path: '/v1/me/wishlists/{wishListId}',
			params: ['wishListId']
		};
	};

	WishList._queryProductsAsMe = function () {

		return {
			modelName: WishList.name,
			methodName: 'queryProductsAsMe',
			httpMethod: 'GET',
			path: '/v1/me/wishlists/{wishListId}/products',
			params: ['wishListId']
		};
	};

	WishList._listProductsAsMe = function () {

		return {
			modelName: WishList.name,
			methodName: 'listProductsAsMe',
			httpMethod: 'GET',
			path: '/v1/me/wishlists/{wishListId}/products',
			params: ['wishListId']
		};
	};

	WishList._countProductsAsMe = function () {

		return {
			modelName: WishList.name,
			methodName: 'countProductsAsMe',
			httpMethod: 'GET',
			path: '/v1/me/wishlists/{wishListId}/products/count',
			params: ['wishListId']
		};
	};

	WishList._createAsMe = function () {

		return {
			modelName: WishList.name,
			methodName: 'createAsMe',
			httpMethod: 'POST',
			path: '/v1/me/wishlists',
			params: []
		};
	};

	WishList._addItemAsMe = function () {

		return {
			modelName: WishList.name,
			methodName: 'addItemAsMe',
			httpMethod: 'POST',
			path: '/v1/me/wishlists/{wishListId}/items',
			params: ['wishListId']
		};
	};

	WishList._updateAsMe = function () {

		return {
			modelName: WishList.name,
			methodName: 'updateAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/wishlists/{wishListId}',
			params: ['wishListId']
		};
	};

	WishList._deleteAsMe = function () {

		return {
			modelName: WishList.name,
			methodName: 'deleteAsMe',
			httpMethod: 'DELETE',
			path: '/v1/me/wishlists/{wishListId}',
			params: ['wishListId']
		};
	};

	WishList._emptyAsMe = function () {

		return {
			modelName: WishList.name,
			methodName: 'emptyAsMe',
			httpMethod: 'DELETE',
			path: '/v1/me/wishlists/{wishListId}/items',
			params: ['wishListId']
		};
	};

	WishList._deleteItemAsMe = function () {

		return {
			modelName: WishList.name,
			methodName: 'deleteItemAsMe',
			httpMethod: 'DELETE',
			path: '/v1/me/wishlists/{wishListId}/items/{productId}',
			params: ['wishListId', 'productId']
		};
	};

	return WishList;
};

},{"../util/assign":26}],26:[function(require,module,exports){
"use strict";

module.exports = function (dest, source) {

	for (var key in source) {

		dest[key] = source[key];
	}

	return dest;
};

},{}]},{},[3]);
