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

	result.query = queryHeaders.query || {};
	result.headers = Clayful.optionsToHeaders(queryHeaders || {});

	// Set request meta
	result.meta = queryHeaders.meta || {};

	// Stringify query values
	for (var key in result.query) {

		result.query[key] = encodeURIComponent(result.query[key]);
	}

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

module.exports = function (request) {

	var Brand = {
		name: 'Brand',
		path: 'brands'
	};

	Brand.query = function () {

		return request({
			modelName: Brand.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/brands',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Brand.list = function () {

		return request({
			modelName: Brand.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/brands',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Brand.count = function () {

		return request({
			modelName: Brand.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/brands/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Brand.get = function () {

		return request({
			modelName: Brand.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/brands/{brandId}',
			params: ['brandId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return Brand;
};

},{}],5:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var Cart = {
		name: 'Cart',
		path: ''
	};

	Cart.countItemsAsMe = function () {

		return request({
			modelName: Cart.name,
			methodName: 'countItemsAsMe',
			httpMethod: 'GET',
			path: '/v1/me/cart/items/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Cart.getAsNonRegistered = function () {

		return request({
			modelName: Cart.name,
			methodName: 'getAsNonRegistered',
			httpMethod: 'POST',
			path: '/v1/cart',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Cart.checkoutAsNonRegistered = function () {

		return request({
			modelName: Cart.name,
			methodName: 'checkoutAsNonRegistered',
			httpMethod: 'POST',
			path: '/v1/cart/checkout',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Cart.getAsMe = function () {

		return request({
			modelName: Cart.name,
			methodName: 'getAsMe',
			httpMethod: 'POST',
			path: '/v1/me/cart',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Cart.checkoutAsMe = function () {

		return request({
			modelName: Cart.name,
			methodName: 'checkoutAsMe',
			httpMethod: 'POST',
			path: '/v1/me/cart/checkout',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Cart.addItemAsMe = function () {

		return request({
			modelName: Cart.name,
			methodName: 'addItemAsMe',
			httpMethod: 'POST',
			path: '/v1/me/cart/items',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Cart.updateItemAsMe = function () {

		return request({
			modelName: Cart.name,
			methodName: 'updateItemAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/cart/items/{itemId}',
			params: ['itemId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Cart.emptyAsMe = function () {

		return request({
			modelName: Cart.name,
			methodName: 'emptyAsMe',
			httpMethod: 'DELETE',
			path: '/v1/me/cart/items',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Cart.deleteItemAsMe = function () {

		return request({
			modelName: Cart.name,
			methodName: 'deleteItemAsMe',
			httpMethod: 'DELETE',
			path: '/v1/me/cart/items/{itemId}',
			params: ['itemId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return Cart;
};

},{}],6:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var Collection = {
		name: 'Collection',
		path: 'collections'
	};

	Collection.query = function () {

		return request({
			modelName: Collection.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/collections',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Collection.list = function () {

		return request({
			modelName: Collection.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/collections',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Collection.count = function () {

		return request({
			modelName: Collection.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/collections/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Collection.get = function () {

		return request({
			modelName: Collection.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/collections/{collectionId}',
			params: ['collectionId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Collection.queryByParent = function () {

		return request({
			modelName: Collection.name,
			methodName: 'queryByParent',
			httpMethod: 'GET',
			path: '/v1/collections/{collectionId}/collections',
			params: ['collectionId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Collection.listByParent = function () {

		return request({
			modelName: Collection.name,
			methodName: 'listByParent',
			httpMethod: 'GET',
			path: '/v1/collections/{collectionId}/collections',
			params: ['collectionId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return Collection;
};

},{}],7:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var Country = {
		name: 'Country',
		path: 'countries'
	};

	Country.query = function () {

		return request({
			modelName: Country.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/countries',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Country.list = function () {

		return request({
			modelName: Country.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/countries',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Country.count = function () {

		return request({
			modelName: Country.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/countries/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Country.get = function () {

		return request({
			modelName: Country.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/countries/{countryId}',
			params: ['countryId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return Country;
};

},{}],8:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var Coupon = {
		name: 'Coupon',
		path: 'coupons'
	};

	Coupon.query = function () {

		return request({
			modelName: Coupon.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/coupons',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Coupon.list = function () {

		return request({
			modelName: Coupon.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/coupons',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Coupon.count = function () {

		return request({
			modelName: Coupon.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/coupons/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Coupon.get = function () {

		return request({
			modelName: Coupon.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/coupons/{couponId}',
			params: ['couponId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return Coupon;
};

},{}],9:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var Currency = {
		name: 'Currency',
		path: 'currencies'
	};

	Currency.query = function () {

		return request({
			modelName: Currency.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/currencies',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Currency.list = function () {

		return request({
			modelName: Currency.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/currencies',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Currency.count = function () {

		return request({
			modelName: Currency.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/currencies/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Currency.get = function () {

		return request({
			modelName: Currency.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/currencies/{currencyId}',
			params: ['currencyId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return Currency;
};

},{}],10:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var Customer = {
		name: 'Customer',
		path: 'customers'
	};

	Customer.getMe = function () {

		return request({
			modelName: Customer.name,
			methodName: 'getMe',
			httpMethod: 'GET',
			path: '/v1/me',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Customer.queryCouponsAsMe = function () {

		return request({
			modelName: Customer.name,
			methodName: 'queryCouponsAsMe',
			httpMethod: 'GET',
			path: '/v1/me/coupons',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Customer.listCouponsAsMe = function () {

		return request({
			modelName: Customer.name,
			methodName: 'listCouponsAsMe',
			httpMethod: 'GET',
			path: '/v1/me/coupons',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Customer.countCouponsAsMe = function () {

		return request({
			modelName: Customer.name,
			methodName: 'countCouponsAsMe',
			httpMethod: 'GET',
			path: '/v1/me/coupons/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Customer.signup = function () {

		return request({
			modelName: Customer.name,
			methodName: 'signup',
			httpMethod: 'POST',
			path: '/v1/me',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Customer.auth = function () {

		return request({
			modelName: Customer.name,
			methodName: 'auth',
			httpMethod: 'POST',
			path: '/v1/customers/auth',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Customer.requestVerificationEmail = function () {

		return request({
			modelName: Customer.name,
			methodName: 'requestVerificationEmail',
			httpMethod: 'POST',
			path: '/v1/customers/verifications/emails',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Customer.verify = function () {

		return request({
			modelName: Customer.name,
			methodName: 'verify',
			httpMethod: 'POST',
			path: '/v1/customers/{customerId}/verify',
			params: ['customerId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Customer.resetPassword = function () {

		return request({
			modelName: Customer.name,
			methodName: 'resetPassword',
			httpMethod: 'POST',
			path: '/v1/customers/{customerId}/password/reset',
			params: ['customerId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Customer.updateMe = function () {

		return request({
			modelName: Customer.name,
			methodName: 'updateMe',
			httpMethod: 'PUT',
			path: '/v1/me',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Customer.updateCredentialsAsMe = function () {

		return request({
			modelName: Customer.name,
			methodName: 'updateCredentialsAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/credentials',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Customer.deleteMe = function () {

		return request({
			modelName: Customer.name,
			methodName: 'deleteMe',
			httpMethod: 'DELETE',
			path: '/v1/me',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Customer.deleteCouponAsMe = function () {

		return request({
			modelName: Customer.name,
			methodName: 'deleteCouponAsMe',
			httpMethod: 'DELETE',
			path: '/v1/me/coupons/{couponId}',
			params: ['couponId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return Customer;
};

},{}],11:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var Group = {
		name: 'Group',
		path: 'groups'
	};

	Group.query = function () {

		return request({
			modelName: Group.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/groups',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Group.list = function () {

		return request({
			modelName: Group.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/groups',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Group.count = function () {

		return request({
			modelName: Group.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/groups/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Group.get = function () {

		return request({
			modelName: Group.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/groups/{groupId}',
			params: ['groupId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return Group;
};

},{}],12:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var Image = {
		name: 'Image',
		path: 'images'
	};

	Image.addToReviewAsMe = function () {

		return request({
			modelName: Image.name,
			methodName: 'addToReviewAsMe',
			httpMethod: 'POST',
			path: '/v1/me/products/reviews/{reviewId}/images',
			params: ['reviewId'],
			usesFormData: true,
			args: Array.prototype.slice.call(arguments)
		});
	};

	Image.deleteFromReviewAsMe = function () {

		return request({
			modelName: Image.name,
			methodName: 'deleteFromReviewAsMe',
			httpMethod: 'DELETE',
			path: '/v1/me/products/reviews/{reviewId}/images/{imageId}',
			params: ['reviewId', 'imageId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return Image;
};

},{}],13:[function(require,module,exports){
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

module.exports = function (request) {

	var Order = {
		name: 'Order',
		path: 'orders'
	};

	Order.query = function () {

		return request({
			modelName: Order.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/orders',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.list = function () {

		return request({
			modelName: Order.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/orders',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.count = function () {

		return request({
			modelName: Order.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/orders/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.get = function () {

		return request({
			modelName: Order.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/orders/{orderId}',
			params: ['orderId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.queryByCustomer = function () {

		return request({
			modelName: Order.name,
			methodName: 'queryByCustomer',
			httpMethod: 'GET',
			path: '/v1/customers/{customerId}/orders',
			params: ['customerId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.listByCustomer = function () {

		return request({
			modelName: Order.name,
			methodName: 'listByCustomer',
			httpMethod: 'GET',
			path: '/v1/customers/{customerId}/orders',
			params: ['customerId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.getTicketDetails = function () {

		return request({
			modelName: Order.name,
			methodName: 'getTicketDetails',
			httpMethod: 'GET',
			path: '/v1/orders/tickets/{code}/details',
			params: ['code'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.getSyncOperationErrors = function () {

		return request({
			modelName: Order.name,
			methodName: 'getSyncOperationErrors',
			httpMethod: 'GET',
			path: '/v1/orders/{orderId}/sync/operations/errors',
			params: ['orderId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.createFulfillment = function () {

		return request({
			modelName: Order.name,
			methodName: 'createFulfillment',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/fulfillments',
			params: ['orderId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.recover = function () {

		return request({
			modelName: Order.name,
			methodName: 'recover',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/recover',
			params: ['orderId'],
			withoutPayload: true,
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.cancel = function () {

		return request({
			modelName: Order.name,
			methodName: 'cancel',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/cancel',
			params: ['orderId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.reject = function () {

		return request({
			modelName: Order.name,
			methodName: 'reject',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/reject',
			params: ['orderId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.undone = function () {

		return request({
			modelName: Order.name,
			methodName: 'undone',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/undone',
			params: ['orderId'],
			withoutPayload: true,
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.done = function () {

		return request({
			modelName: Order.name,
			methodName: 'done',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/done',
			params: ['orderId'],
			withoutPayload: true,
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.verifyTicket = function () {

		return request({
			modelName: Order.name,
			methodName: 'verifyTicket',
			httpMethod: 'POST',
			path: '/v1/orders/tickets/{code}/verify',
			params: ['code'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.useTicket = function () {

		return request({
			modelName: Order.name,
			methodName: 'useTicket',
			httpMethod: 'POST',
			path: '/v1/orders/tickets/{code}/use',
			params: ['code'],
			withoutPayload: true,
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.recoverTicket = function () {

		return request({
			modelName: Order.name,
			methodName: 'recoverTicket',
			httpMethod: 'POST',
			path: '/v1/orders/tickets/{code}/recover',
			params: ['code'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.createFullPaymentTransaction = function () {

		return request({
			modelName: Order.name,
			methodName: 'createFullPaymentTransaction',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/transactions/full',
			params: ['orderId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.createAllFulfillments = function () {

		return request({
			modelName: Order.name,
			methodName: 'createAllFulfillments',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/fulfillments/all',
			params: ['orderId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.createFullRefund = function () {

		return request({
			modelName: Order.name,
			methodName: 'createFullRefund',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/refunds/full',
			params: ['orderId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.createPartialPaymentTransaction = function () {

		return request({
			modelName: Order.name,
			methodName: 'createPartialPaymentTransaction',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/transactions/partial',
			params: ['orderId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.createPartialRefund = function () {

		return request({
			modelName: Order.name,
			methodName: 'createPartialRefund',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/refunds/partial',
			params: ['orderId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.rejectRefund = function () {

		return request({
			modelName: Order.name,
			methodName: 'rejectRefund',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/refunds/{refundId}/reject',
			params: ['orderId', 'refundId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.syncPaymentTransaction = function () {

		return request({
			modelName: Order.name,
			methodName: 'syncPaymentTransaction',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/transactions/{transactionId}/sync',
			params: ['orderId', 'transactionId'],
			withoutPayload: true,
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.recoverDownload = function () {

		return request({
			modelName: Order.name,
			methodName: 'recoverDownload',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/items/{itemId}/download/recover',
			params: ['orderId', 'itemId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.partialRestock = function () {

		return request({
			modelName: Order.name,
			methodName: 'partialRestock',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/refunds/{refundId}/restock/partial',
			params: ['orderId', 'refundId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.createFullRefundTransaction = function () {

		return request({
			modelName: Order.name,
			methodName: 'createFullRefundTransaction',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/refunds/{refundId}/transactions/full',
			params: ['orderId', 'refundId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.fullRestock = function () {

		return request({
			modelName: Order.name,
			methodName: 'fullRestock',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/refunds/{refundId}/restock/full',
			params: ['orderId', 'refundId'],
			withoutPayload: true,
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.createDownloadableUrl = function () {

		return request({
			modelName: Order.name,
			methodName: 'createDownloadableUrl',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/items/{itemId}/download/url',
			params: ['orderId', 'itemId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.createPartialRefundTransaction = function () {

		return request({
			modelName: Order.name,
			methodName: 'createPartialRefundTransaction',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/refunds/{refundId}/transactions/partial',
			params: ['orderId', 'refundId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.syncRefundTransaction = function () {

		return request({
			modelName: Order.name,
			methodName: 'syncRefundTransaction',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/refunds/{refundId}/transactions/{transactionId}/sync',
			params: ['orderId', 'refundId', 'transactionId'],
			withoutPayload: true,
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.update = function () {

		return request({
			modelName: Order.name,
			methodName: 'update',
			httpMethod: 'PUT',
			path: '/v1/orders/{orderId}',
			params: ['orderId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.updateFulfillment = function () {

		return request({
			modelName: Order.name,
			methodName: 'updateFulfillment',
			httpMethod: 'PUT',
			path: '/v1/orders/{orderId}/fulfillments/{fulfillmentId}',
			params: ['orderId', 'fulfillmentId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.updateItem = function () {

		return request({
			modelName: Order.name,
			methodName: 'updateItem',
			httpMethod: 'PUT',
			path: '/v1/orders/{orderId}/items/{itemId}',
			params: ['orderId', 'itemId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.updatePaymentTransaction = function () {

		return request({
			modelName: Order.name,
			methodName: 'updatePaymentTransaction',
			httpMethod: 'PUT',
			path: '/v1/orders/{orderId}/transactions/{transactionId}',
			params: ['orderId', 'transactionId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.updateRefund = function () {

		return request({
			modelName: Order.name,
			methodName: 'updateRefund',
			httpMethod: 'PUT',
			path: '/v1/orders/{orderId}/refunds/{refundId}',
			params: ['orderId', 'refundId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.updateRefundTransaction = function () {

		return request({
			modelName: Order.name,
			methodName: 'updateRefundTransaction',
			httpMethod: 'PUT',
			path: '/v1/orders/{orderId}/refunds/{refundId}/transactions/{transactionId}',
			params: ['orderId', 'refundId', 'transactionId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.delete = function () {

		return request({
			modelName: Order.name,
			methodName: 'delete',
			httpMethod: 'DELETE',
			path: '/v1/orders/{orderId}',
			params: ['orderId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.deletePaymentTransaction = function () {

		return request({
			modelName: Order.name,
			methodName: 'deletePaymentTransaction',
			httpMethod: 'DELETE',
			path: '/v1/orders/{orderId}/transactions/{transactionId}',
			params: ['orderId', 'transactionId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.deleteRefund = function () {

		return request({
			modelName: Order.name,
			methodName: 'deleteRefund',
			httpMethod: 'DELETE',
			path: '/v1/orders/{orderId}/refunds/{refundId}',
			params: ['orderId', 'refundId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.deleteFulfillment = function () {

		return request({
			modelName: Order.name,
			methodName: 'deleteFulfillment',
			httpMethod: 'DELETE',
			path: '/v1/orders/{orderId}/fulfillments/{fulfillmentId}',
			params: ['orderId', 'fulfillmentId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.deleteSyncOperation = function () {

		return request({
			modelName: Order.name,
			methodName: 'deleteSyncOperation',
			httpMethod: 'DELETE',
			path: '/v1/orders/{orderId}/sync/operations/{operationId}',
			params: ['orderId', 'operationId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Order.deleteRefundTransaction = function () {

		return request({
			modelName: Order.name,
			methodName: 'deleteRefundTransaction',
			httpMethod: 'DELETE',
			path: '/v1/orders/{orderId}/refunds/{refundId}/transactions/{transactionId}',
			params: ['orderId', 'refundId', 'transactionId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return Order;
};

},{}],15:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var OrderTag = {
		name: 'OrderTag',
		path: 'orders/tags'
	};

	OrderTag.query = function () {

		return request({
			modelName: OrderTag.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/orders/tags',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	OrderTag.list = function () {

		return request({
			modelName: OrderTag.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/orders/tags',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	OrderTag.count = function () {

		return request({
			modelName: OrderTag.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/orders/tags/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	OrderTag.get = function () {

		return request({
			modelName: OrderTag.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/orders/tags/{orderTagId}',
			params: ['orderTagId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return OrderTag;
};

},{}],16:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var PaymentMethod = {
		name: 'PaymentMethod',
		path: 'payments/methods'
	};

	PaymentMethod.query = function () {

		return request({
			modelName: PaymentMethod.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/payments/methods',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	PaymentMethod.list = function () {

		return request({
			modelName: PaymentMethod.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/payments/methods',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	PaymentMethod.count = function () {

		return request({
			modelName: PaymentMethod.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/payments/methods/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	PaymentMethod.get = function () {

		return request({
			modelName: PaymentMethod.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/payments/methods/{paymentMethodId}',
			params: ['paymentMethodId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return PaymentMethod;
};

},{}],17:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var Product = {
		name: 'Product',
		path: 'products'
	};

	Product.query = function () {

		return request({
			modelName: Product.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/products',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Product.list = function () {

		return request({
			modelName: Product.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/products',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Product.count = function () {

		return request({
			modelName: Product.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/products/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Product.get = function () {

		return request({
			modelName: Product.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/products/{productId}',
			params: ['productId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Product.queryByBrand = function () {

		return request({
			modelName: Product.name,
			methodName: 'queryByBrand',
			httpMethod: 'GET',
			path: '/v1/brands/{brandId}/products',
			params: ['brandId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Product.listByBrand = function () {

		return request({
			modelName: Product.name,
			methodName: 'listByBrand',
			httpMethod: 'GET',
			path: '/v1/brands/{brandId}/products',
			params: ['brandId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Product.queryByCollection = function () {

		return request({
			modelName: Product.name,
			methodName: 'queryByCollection',
			httpMethod: 'GET',
			path: '/v1/collections/{collectionId}/products',
			params: ['collectionId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Product.listByCollection = function () {

		return request({
			modelName: Product.name,
			methodName: 'listByCollection',
			httpMethod: 'GET',
			path: '/v1/collections/{collectionId}/products',
			params: ['collectionId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return Product;
};

},{}],18:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var Review = {
		name: 'Review',
		path: 'products/reviews'
	};

	Review.query = function () {

		return request({
			modelName: Review.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/products/reviews',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Review.list = function () {

		return request({
			modelName: Review.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/products/reviews',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Review.count = function () {

		return request({
			modelName: Review.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/products/reviews/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Review.get = function () {

		return request({
			modelName: Review.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/products/reviews/{reviewId}',
			params: ['reviewId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Review.queryByProduct = function () {

		return request({
			modelName: Review.name,
			methodName: 'queryByProduct',
			httpMethod: 'GET',
			path: '/v1/products/{productId}/reviews',
			params: ['productId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Review.listByProduct = function () {

		return request({
			modelName: Review.name,
			methodName: 'listByProduct',
			httpMethod: 'GET',
			path: '/v1/products/{productId}/reviews',
			params: ['productId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Review.queryByCustomer = function () {

		return request({
			modelName: Review.name,
			methodName: 'queryByCustomer',
			httpMethod: 'GET',
			path: '/v1/customers/{customerId}/products/reviews',
			params: ['customerId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Review.listByCustomer = function () {

		return request({
			modelName: Review.name,
			methodName: 'listByCustomer',
			httpMethod: 'GET',
			path: '/v1/customers/{customerId}/products/reviews',
			params: ['customerId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Review.createAsMe = function () {

		return request({
			modelName: Review.name,
			methodName: 'createAsMe',
			httpMethod: 'POST',
			path: '/v1/me/products/reviews',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Review.flagAsMe = function () {

		return request({
			modelName: Review.name,
			methodName: 'flagAsMe',
			httpMethod: 'POST',
			path: '/v1/me/products/reviews/{reviewId}/flag',
			params: ['reviewId'],
			withoutPayload: true,
			args: Array.prototype.slice.call(arguments)
		});
	};

	Review.cancelFlagAsMe = function () {

		return request({
			modelName: Review.name,
			methodName: 'cancelFlagAsMe',
			httpMethod: 'POST',
			path: '/v1/me/products/reviews/{reviewId}/flag/cancel',
			params: ['reviewId'],
			withoutPayload: true,
			args: Array.prototype.slice.call(arguments)
		});
	};

	Review.helpedAsMe = function () {

		return request({
			modelName: Review.name,
			methodName: 'helpedAsMe',
			httpMethod: 'POST',
			path: '/v1/me/products/reviews/{reviewId}/helped/{upDown}',
			params: ['reviewId', 'upDown'],
			withoutPayload: true,
			args: Array.prototype.slice.call(arguments)
		});
	};

	Review.cancelHelpedAsMe = function () {

		return request({
			modelName: Review.name,
			methodName: 'cancelHelpedAsMe',
			httpMethod: 'POST',
			path: '/v1/me/products/reviews/{reviewId}/helped/{upDown}/cancel',
			params: ['reviewId', 'upDown'],
			withoutPayload: true,
			args: Array.prototype.slice.call(arguments)
		});
	};

	Review.updateAsMe = function () {

		return request({
			modelName: Review.name,
			methodName: 'updateAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/products/reviews/{reviewId}',
			params: ['reviewId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Review.deleteAsMe = function () {

		return request({
			modelName: Review.name,
			methodName: 'deleteAsMe',
			httpMethod: 'DELETE',
			path: '/v1/me/products/reviews/{reviewId}',
			params: ['reviewId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return Review;
};

},{}],19:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var ReviewComment = {
		name: 'ReviewComment',
		path: 'products/reviews/comments'
	};

	ReviewComment.query = function () {

		return request({
			modelName: ReviewComment.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/products/reviews/comments',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ReviewComment.list = function () {

		return request({
			modelName: ReviewComment.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/products/reviews/comments',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ReviewComment.count = function () {

		return request({
			modelName: ReviewComment.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/products/reviews/comments/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ReviewComment.get = function () {

		return request({
			modelName: ReviewComment.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/products/reviews/comments/{reviewCommentId}',
			params: ['reviewCommentId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ReviewComment.queryByReview = function () {

		return request({
			modelName: ReviewComment.name,
			methodName: 'queryByReview',
			httpMethod: 'GET',
			path: '/v1/products/reviews/{reviewId}/comments',
			params: ['reviewId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ReviewComment.listByReview = function () {

		return request({
			modelName: ReviewComment.name,
			methodName: 'listByReview',
			httpMethod: 'GET',
			path: '/v1/products/reviews/{reviewId}/comments',
			params: ['reviewId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ReviewComment.queryByAuthor = function () {

		return request({
			modelName: ReviewComment.name,
			methodName: 'queryByAuthor',
			httpMethod: 'GET',
			path: '/v1/{authorModel}/{authorId}/products/reviews/comments',
			params: ['authorModel', 'authorId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ReviewComment.listByAuthor = function () {

		return request({
			modelName: ReviewComment.name,
			methodName: 'listByAuthor',
			httpMethod: 'GET',
			path: '/v1/{authorModel}/{authorId}/products/reviews/comments',
			params: ['authorModel', 'authorId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ReviewComment.createAsMe = function () {

		return request({
			modelName: ReviewComment.name,
			methodName: 'createAsMe',
			httpMethod: 'POST',
			path: '/v1/me/products/reviews/comments',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ReviewComment.flagAsMe = function () {

		return request({
			modelName: ReviewComment.name,
			methodName: 'flagAsMe',
			httpMethod: 'POST',
			path: '/v1/me/products/reviews/comments/{reviewCommentId}/flag',
			params: ['reviewCommentId'],
			withoutPayload: true,
			args: Array.prototype.slice.call(arguments)
		});
	};

	ReviewComment.cancelFlagAsMe = function () {

		return request({
			modelName: ReviewComment.name,
			methodName: 'cancelFlagAsMe',
			httpMethod: 'POST',
			path: '/v1/me/products/reviews/comments/{reviewCommentId}/flag/cancel',
			params: ['reviewCommentId'],
			withoutPayload: true,
			args: Array.prototype.slice.call(arguments)
		});
	};

	ReviewComment.updateAsMe = function () {

		return request({
			modelName: ReviewComment.name,
			methodName: 'updateAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/products/reviews/comments/{reviewCommentId}',
			params: ['reviewCommentId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ReviewComment.deleteAsMe = function () {

		return request({
			modelName: ReviewComment.name,
			methodName: 'deleteAsMe',
			httpMethod: 'DELETE',
			path: '/v1/me/products/reviews/comments/{reviewCommentId}',
			params: ['reviewCommentId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return ReviewComment;
};

},{}],20:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var ShippingMethod = {
		name: 'ShippingMethod',
		path: 'shipping/methods'
	};

	ShippingMethod.query = function () {

		return request({
			modelName: ShippingMethod.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/shipping/methods',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ShippingMethod.list = function () {

		return request({
			modelName: ShippingMethod.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/shipping/methods',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ShippingMethod.count = function () {

		return request({
			modelName: ShippingMethod.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/shipping/methods/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ShippingMethod.get = function () {

		return request({
			modelName: ShippingMethod.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/shipping/methods/{shippingMethodId}',
			params: ['shippingMethodId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return ShippingMethod;
};

},{}],21:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var Store = {
		name: 'Store',
		path: 'store'
	};

	Store.get = function () {

		return request({
			modelName: Store.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/store',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return Store;
};

},{}],22:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var Subscription = {
		name: 'Subscription',
		path: ''
	};

	Subscription.query = function () {

		return request({
			modelName: Subscription.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/subscriptions',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Subscription.list = function () {

		return request({
			modelName: Subscription.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/subscriptions',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Subscription.count = function () {

		return request({
			modelName: Subscription.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/subscriptions/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Subscription.get = function () {

		return request({
			modelName: Subscription.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/subscriptions/{subscriptionId}',
			params: ['subscriptionId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Subscription.queryByCustomer = function () {

		return request({
			modelName: Subscription.name,
			methodName: 'queryByCustomer',
			httpMethod: 'GET',
			path: '/v1/customers/{customerId}/subscriptions',
			params: ['customerId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Subscription.listByCustomer = function () {

		return request({
			modelName: Subscription.name,
			methodName: 'listByCustomer',
			httpMethod: 'GET',
			path: '/v1/customers/{customerId}/subscriptions',
			params: ['customerId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Subscription.reject = function () {

		return request({
			modelName: Subscription.name,
			methodName: 'reject',
			httpMethod: 'POST',
			path: '/v1/subscriptions/{subscriptionId}/reject',
			params: ['subscriptionId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Subscription.cancel = function () {

		return request({
			modelName: Subscription.name,
			methodName: 'cancel',
			httpMethod: 'POST',
			path: '/v1/subscriptions/{subscriptionId}/cancel',
			params: ['subscriptionId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Subscription.start = function () {

		return request({
			modelName: Subscription.name,
			methodName: 'start',
			httpMethod: 'POST',
			path: '/v1/subscriptions/{subscriptionId}/start',
			params: ['subscriptionId'],
			withoutPayload: true,
			args: Array.prototype.slice.call(arguments)
		});
	};

	Subscription.delete = function () {

		return request({
			modelName: Subscription.name,
			methodName: 'delete',
			httpMethod: 'DELETE',
			path: '/v1/subscriptions/{subscriptionId}',
			params: ['subscriptionId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return Subscription;
};

},{}],23:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var TaxCategory = {
		name: 'TaxCategory',
		path: 'taxes/categories'
	};

	TaxCategory.query = function () {

		return request({
			modelName: TaxCategory.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/taxes/categories',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	TaxCategory.list = function () {

		return request({
			modelName: TaxCategory.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/taxes/categories',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	TaxCategory.count = function () {

		return request({
			modelName: TaxCategory.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/taxes/categories/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	TaxCategory.get = function () {

		return request({
			modelName: TaxCategory.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/taxes/categories/{taxCategoryId}',
			params: ['taxCategoryId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return TaxCategory;
};

},{}],24:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var Warehouse = {
		name: 'Warehouse',
		path: 'warehouses'
	};

	Warehouse.query = function () {

		return request({
			modelName: Warehouse.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/warehouses',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Warehouse.list = function () {

		return request({
			modelName: Warehouse.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/warehouses',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Warehouse.count = function () {

		return request({
			modelName: Warehouse.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/warehouses/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Warehouse.get = function () {

		return request({
			modelName: Warehouse.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/warehouses/{warehouseId}',
			params: ['warehouseId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return Warehouse;
};

},{}],25:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var WishList = {
		name: 'WishList',
		path: 'wishlists'
	};

	WishList.queryAsMe = function () {

		return request({
			modelName: WishList.name,
			methodName: 'queryAsMe',
			httpMethod: 'GET',
			path: '/v1/me/wishlists',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	WishList.listAsMe = function () {

		return request({
			modelName: WishList.name,
			methodName: 'listAsMe',
			httpMethod: 'GET',
			path: '/v1/me/wishlists',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	WishList.countAsMe = function () {

		return request({
			modelName: WishList.name,
			methodName: 'countAsMe',
			httpMethod: 'GET',
			path: '/v1/me/wishlists/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	WishList.getAsMe = function () {

		return request({
			modelName: WishList.name,
			methodName: 'getAsMe',
			httpMethod: 'GET',
			path: '/v1/me/wishlists/{wishListId}',
			params: ['wishListId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	WishList.queryProductsAsMe = function () {

		return request({
			modelName: WishList.name,
			methodName: 'queryProductsAsMe',
			httpMethod: 'GET',
			path: '/v1/me/wishlists/{wishListId}/products',
			params: ['wishListId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	WishList.listProductsAsMe = function () {

		return request({
			modelName: WishList.name,
			methodName: 'listProductsAsMe',
			httpMethod: 'GET',
			path: '/v1/me/wishlists/{wishListId}/products',
			params: ['wishListId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	WishList.countProductsAsMe = function () {

		return request({
			modelName: WishList.name,
			methodName: 'countProductsAsMe',
			httpMethod: 'GET',
			path: '/v1/me/wishlists/{wishListId}/products/count',
			params: ['wishListId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	WishList.createAsMe = function () {

		return request({
			modelName: WishList.name,
			methodName: 'createAsMe',
			httpMethod: 'POST',
			path: '/v1/me/wishlists',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	WishList.addItemAsMe = function () {

		return request({
			modelName: WishList.name,
			methodName: 'addItemAsMe',
			httpMethod: 'POST',
			path: '/v1/me/wishlists/{wishListId}/items',
			params: ['wishListId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	WishList.updateAsMe = function () {

		return request({
			modelName: WishList.name,
			methodName: 'updateAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/wishlists/{wishListId}',
			params: ['wishListId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	WishList.deleteAsMe = function () {

		return request({
			modelName: WishList.name,
			methodName: 'deleteAsMe',
			httpMethod: 'DELETE',
			path: '/v1/me/wishlists/{wishListId}',
			params: ['wishListId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	WishList.emptyAsMe = function () {

		return request({
			modelName: WishList.name,
			methodName: 'emptyAsMe',
			httpMethod: 'DELETE',
			path: '/v1/me/wishlists/{wishListId}/items',
			params: ['wishListId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	WishList.deleteItemAsMe = function () {

		return request({
			modelName: WishList.name,
			methodName: 'deleteItemAsMe',
			httpMethod: 'DELETE',
			path: '/v1/me/wishlists/{wishListId}/items/{productId}',
			params: ['wishListId', 'productId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return WishList;
};

},{}],26:[function(require,module,exports){
"use strict";

module.exports = function (dest, source) {

	for (var key in source) {

		dest[key] = source[key];
	}

	return dest;
};

},{}]},{},[3]);
