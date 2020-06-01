(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
	},
	Promise: typeof Promise === 'function' ? Promise : null
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

Clayful.getEndpoint = function (path) {
	return '' + Clayful.baseUrl + path;
};

Clayful.normalizeQueryValues = function () {
	var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


	return query;
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
		result.callback.Promise = Clayful.Promise;
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

	var wrappedCallback = Clayful.wrapRequestCallback(extracted);

	if (extracted.callback.Promise) {
		wrappedCallback.Promise = extracted.callback.Promise;
	}

	// ClayfulError should be used for generating API errors from Clayful API
	return request(extracted, ClayfulError, wrappedCallback);
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

},{"../clayful-error":1,"../util/assign":30}],3:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Clayful = require('../clayful');
var models = require('../models-js');
var LocalCart = require('../local-cart');

Clayful.defaultHeaders['Clayful-SDK'] = 'clayful-js';

Clayful.setModels(models);

Clayful.LocalCart = LocalCart;

if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
	module.exports = Clayful;
}

if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
	window.Clayful = Clayful;
}

},{"../clayful":2,"../local-cart":4,"../models-js":15}],4:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var assign = require('../util/assign');

var LocalCart = {
    storage: (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' ? window.localStorage : null,
    storageKey: '__cartItems__',
    items: null
};

// ISO Date String -> Date
LocalCart.parseISOString = function (s) {

    var b = s.split(/\D+/);

    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
};

// Config LocalCart
LocalCart.config = function (options) {
    return assign(LocalCart, options);
};

// Limit total number of items to 50
LocalCart.limitTotal = function (items) {

    if (!items) return;

    var total = LocalCart.items.reduce(function (all, item) {
        return all.concat(item, item.bundleItems || []);
    }, []).length;

    if (total > 50) {
        LocalCart.items = LocalCart.items.slice(1);
    }
};

// Read items from the storage
LocalCart.loadItems = function () {

    LocalCart.items = (LocalCart.items || JSON.parse(LocalCart.storage.getItem(LocalCart.storageKey) || '[]')).map(function (item) {

        item.addedAt = typeof item.addedAt === 'string' ? LocalCart.parseISOString(item.addedAt) : item.addedAt;

        return item;
    });

    return LocalCart.items;
};

// Save items to the storage
LocalCart.saveItems = function () {
    LocalCart.limitTotal();
    LocalCart.storage.setItem(LocalCart.storageKey, JSON.stringify(LocalCart.items));
};

// Set unique item IDs
LocalCart.setItemDefaults = function (item) {

    [].concat(item, item.bundleItems || []).forEach(function (item) {
        item._id = item._id || (Math.random() + '').slice(2, 17);
        item.shippingMethod = item.shippingMethod || null;
    });

    return item;
};

// Find an item by ID
LocalCart.findItem = function (items, itemId) {

    if (typeof items === 'string' && !itemId) {
        itemId = items;
        items = LocalCart.items;
    }

    items = items || [];

    for (var i = 0; i < items.length; i++) {

        var item = items[i];

        if (item._id === itemId + '') {
            return item;
        }
    }

    return null;
};

// Add an item
LocalCart.addItem = LocalCart.addItemForMe = function (item) {

    if (!item) return;

    LocalCart.setItemDefaults(item);

    item.bundleItems = item.bundleItems || [];
    item.addedAt = new Date();

    LocalCart.items = LocalCart.loadItems().concat(item);
    LocalCart.saveItems();

    return item;
};

// Update an item
LocalCart.updateItem = LocalCart.updateItemForMe = function (itemId, update) {

    if (!update) return;

    LocalCart.loadItems();

    var found = LocalCart.findItem(LocalCart.items, itemId);

    if (!found) return;

    var bundleItems = update.bundleItems;

    delete update.bundleItems;

    assign(found, update);

    if (bundleItems) {

        found.bundleItems = found.bundleItems || [];

        if (bundleItems.length) {

            found.bundleItems = bundleItems;
        } else {
            var _loop = function _loop(bundleId) {

                var bundleItem = LocalCart.findItem(found.bundleItems, bundleId);
                var bundleUpdate = bundleItems[bundleId];

                if (!bundleItem && bundleUpdate) {
                    found.bundleItems.push(bundleUpdate);
                }

                if (bundleItem && bundleUpdate) {
                    assign(bundleItem, bundleUpdate);
                }

                if (bundleUpdate === null) {
                    found.bundleItems = found.bundleItems.filter(function (bundleItem) {
                        return bundleItem._id !== bundleId;
                    });
                }
            };

            for (var bundleId in bundleItems) {
                _loop(bundleId);
            }
        }
    }

    LocalCart.setItemDefaults(found);
    LocalCart.saveItems();

    return found;
};

// Delete an item
LocalCart.deleteItem = LocalCart.deleteItemForMe = function (itemId) {

    LocalCart.items = LocalCart.loadItems().filter(function (item) {
        return item._id !== itemId + '';
    });
    LocalCart.saveItems();
};

// Delete all items
LocalCart.empty = LocalCart.emptyForMe = function () {

    LocalCart.items = [];
    LocalCart.saveItems();
};

// Load all items from the storage when initialized
LocalCart.loadItems();

if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object') {
    module.exports = LocalCart;
}

if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
    if (_typeof(window.Clayful) === 'object') {
        window.Clayful.LocalCart = LocalCart;
    } else {
        window.Clayful = { LocalCart: LocalCart };
    }
}

},{"../util/assign":30}],5:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var Brand = {
		name: 'Brand',
		path: 'brands',
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

},{"../util/assign":30}],6:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var Cart = {
		name: 'Cart',
		path: '',
		countItemsForMe: function countItemsForMe() {
			return request(assign(Cart._countItemsForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		getForMe: function getForMe() {
			return request(assign(Cart._getForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		addItemForMe: function addItemForMe() {
			return request(assign(Cart._addItemForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		getAsNonRegisteredForMe: function getAsNonRegisteredForMe() {
			return request(assign(Cart._getAsNonRegisteredForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		checkoutForMe: function checkoutForMe() {
			return request(assign(Cart._checkoutForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		checkoutAsNonRegisteredForMe: function checkoutAsNonRegisteredForMe() {
			return request(assign(Cart._checkoutAsNonRegisteredForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateItemForMe: function updateItemForMe() {
			return request(assign(Cart._updateItemForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		emptyForMe: function emptyForMe() {
			return request(assign(Cart._emptyForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteItemForMe: function deleteItemForMe() {
			return request(assign(Cart._deleteItemForMe(), { args: Array.prototype.slice.call(arguments) }));
		}
	};

	Cart._countItemsForMe = function () {

		return {
			modelName: Cart.name,
			methodName: 'countItemsForMe',
			httpMethod: 'GET',
			path: '/v1/me/cart/items/count',
			params: []
		};
	};

	Cart._getForMe = function () {

		return {
			modelName: Cart.name,
			methodName: 'getForMe',
			httpMethod: 'POST',
			path: '/v1/me/cart',
			params: []
		};
	};

	Cart._addItemForMe = function () {

		return {
			modelName: Cart.name,
			methodName: 'addItemForMe',
			httpMethod: 'POST',
			path: '/v1/me/cart/items',
			params: []
		};
	};

	Cart._getAsNonRegisteredForMe = function () {

		return {
			modelName: Cart.name,
			methodName: 'getAsNonRegisteredForMe',
			httpMethod: 'POST',
			path: '/v1/me/non-registered/cart',
			params: []
		};
	};

	Cart._checkoutForMe = function () {

		return {
			modelName: Cart.name,
			methodName: 'checkoutForMe',
			httpMethod: 'POST',
			path: '/v1/me/cart/checkout/{type}',
			params: ['type']
		};
	};

	Cart._checkoutAsNonRegisteredForMe = function () {

		return {
			modelName: Cart.name,
			methodName: 'checkoutAsNonRegisteredForMe',
			httpMethod: 'POST',
			path: '/v1/me/non-registered/cart/checkout/{type}',
			params: ['type']
		};
	};

	Cart._updateItemForMe = function () {

		return {
			modelName: Cart.name,
			methodName: 'updateItemForMe',
			httpMethod: 'PUT',
			path: '/v1/me/cart/items/{itemId}',
			params: ['itemId']
		};
	};

	Cart._emptyForMe = function () {

		return {
			modelName: Cart.name,
			methodName: 'emptyForMe',
			httpMethod: 'DELETE',
			path: '/v1/me/cart/items',
			params: []
		};
	};

	Cart._deleteItemForMe = function () {

		return {
			modelName: Cart.name,
			methodName: 'deleteItemForMe',
			httpMethod: 'DELETE',
			path: '/v1/me/cart/items/{itemId}',
			params: ['itemId']
		};
	};

	return Cart;
};

},{"../util/assign":30}],7:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var Catalog = {
		name: 'Catalog',
		path: 'catalogs',
		list: function list() {
			return request(assign(Catalog._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function count() {
			return request(assign(Catalog._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function get() {
			return request(assign(Catalog._get(), { args: Array.prototype.slice.call(arguments) }));
		}
	};

	Catalog._list = function () {

		return {
			modelName: Catalog.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/catalogs',
			params: []
		};
	};

	Catalog._count = function () {

		return {
			modelName: Catalog.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/catalogs/count',
			params: []
		};
	};

	Catalog._get = function () {

		return {
			modelName: Catalog.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/catalogs/{catalogId}',
			params: ['catalogId']
		};
	};

	return Catalog;
};

},{"../util/assign":30}],8:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var Collection = {
		name: 'Collection',
		path: 'collections',
		list: function list() {
			return request(assign(Collection._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function count() {
			return request(assign(Collection._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function get() {
			return request(assign(Collection._get(), { args: Array.prototype.slice.call(arguments) }));
		}
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

	return Collection;
};

},{"../util/assign":30}],9:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var Country = {
		name: 'Country',
		path: 'countries',
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

},{"../util/assign":30}],10:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var Coupon = {
		name: 'Coupon',
		path: 'coupons',
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

},{"../util/assign":30}],11:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var Currency = {
		name: 'Currency',
		path: 'currencies',
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

},{"../util/assign":30}],12:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var Customer = {
		name: 'Customer',
		path: 'customers',
		getMe: function getMe() {
			return request(assign(Customer._getMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		isAuthenticated: function isAuthenticated() {
			return request(assign(Customer._isAuthenticated(), { args: Array.prototype.slice.call(arguments) }));
		},
		listCouponsForMe: function listCouponsForMe() {
			return request(assign(Customer._listCouponsForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		countCouponsForMe: function countCouponsForMe() {
			return request(assign(Customer._countCouponsForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		createMe: function createMe() {
			return request(assign(Customer._createMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		authenticate: function authenticate() {
			return request(assign(Customer._authenticate(), { args: Array.prototype.slice.call(arguments) }));
		},
		authenticateBy3rdParty: function authenticateBy3rdParty() {
			return request(assign(Customer._authenticateBy3rdParty(), { args: Array.prototype.slice.call(arguments) }));
		},
		requestVerificationEmail: function requestVerificationEmail() {
			return request(assign(Customer._requestVerificationEmail(), { args: Array.prototype.slice.call(arguments) }));
		},
		requestVerification: function requestVerification() {
			return request(assign(Customer._requestVerification(), { args: Array.prototype.slice.call(arguments) }));
		},
		verify: function verify() {
			return request(assign(Customer._verify(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateMe: function updateMe() {
			return request(assign(Customer._updateMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateCredentialsForMe: function updateCredentialsForMe() {
			return request(assign(Customer._updateCredentialsForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		resetPassword: function resetPassword() {
			return request(assign(Customer._resetPassword(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteMe: function deleteMe() {
			return request(assign(Customer._deleteMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteCouponForMe: function deleteCouponForMe() {
			return request(assign(Customer._deleteCouponForMe(), { args: Array.prototype.slice.call(arguments) }));
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

	Customer._isAuthenticated = function () {

		return {
			modelName: Customer.name,
			methodName: 'isAuthenticated',
			httpMethod: 'GET',
			path: '/v1/customers/auth',
			params: []
		};
	};

	Customer._listCouponsForMe = function () {

		return {
			modelName: Customer.name,
			methodName: 'listCouponsForMe',
			httpMethod: 'GET',
			path: '/v1/me/coupons',
			params: []
		};
	};

	Customer._countCouponsForMe = function () {

		return {
			modelName: Customer.name,
			methodName: 'countCouponsForMe',
			httpMethod: 'GET',
			path: '/v1/me/coupons/count',
			params: []
		};
	};

	Customer._createMe = function () {

		return {
			modelName: Customer.name,
			methodName: 'createMe',
			httpMethod: 'POST',
			path: '/v1/me',
			params: []
		};
	};

	Customer._authenticate = function () {

		return {
			modelName: Customer.name,
			methodName: 'authenticate',
			httpMethod: 'POST',
			path: '/v1/customers/auth',
			params: []
		};
	};

	Customer._authenticateBy3rdParty = function () {

		return {
			modelName: Customer.name,
			methodName: 'authenticateBy3rdParty',
			httpMethod: 'POST',
			path: '/v1/customers/auth/{vendor}',
			params: ['vendor'],
			withoutPayload: true
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

	Customer._requestVerification = function () {

		return {
			modelName: Customer.name,
			methodName: 'requestVerification',
			httpMethod: 'POST',
			path: '/v1/customers/verifications/{channelSlug}',
			params: ['channelSlug']
		};
	};

	Customer._verify = function () {

		return {
			modelName: Customer.name,
			methodName: 'verify',
			httpMethod: 'POST',
			path: '/v1/customers/{customerId}/verified',
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

	Customer._updateCredentialsForMe = function () {

		return {
			modelName: Customer.name,
			methodName: 'updateCredentialsForMe',
			httpMethod: 'PUT',
			path: '/v1/me/credentials',
			params: []
		};
	};

	Customer._resetPassword = function () {

		return {
			modelName: Customer.name,
			methodName: 'resetPassword',
			httpMethod: 'PUT',
			path: '/v1/customers/{customerId}/password',
			params: ['customerId']
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

	Customer._deleteCouponForMe = function () {

		return {
			modelName: Customer.name,
			methodName: 'deleteCouponForMe',
			httpMethod: 'DELETE',
			path: '/v1/me/coupons/{couponId}',
			params: ['couponId']
		};
	};

	return Customer;
};

},{"../util/assign":30}],13:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var Group = {
		name: 'Group',
		path: 'groups',
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

},{"../util/assign":30}],14:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var Image = {
		name: 'Image',
		path: 'images',
		listForMe: function listForMe() {
			return request(assign(Image._listForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		countForMe: function countForMe() {
			return request(assign(Image._countForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		getForMe: function getForMe() {
			return request(assign(Image._getForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		createForMe: function createForMe() {
			return request(assign(Image._createForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateForMe: function updateForMe() {
			return request(assign(Image._updateForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteForMe: function deleteForMe() {
			return request(assign(Image._deleteForMe(), { args: Array.prototype.slice.call(arguments) }));
		}
	};

	Image._listForMe = function () {

		return {
			modelName: Image.name,
			methodName: 'listForMe',
			httpMethod: 'GET',
			path: '/v1/me/images',
			params: []
		};
	};

	Image._countForMe = function () {

		return {
			modelName: Image.name,
			methodName: 'countForMe',
			httpMethod: 'GET',
			path: '/v1/me/images/count',
			params: []
		};
	};

	Image._getForMe = function () {

		return {
			modelName: Image.name,
			methodName: 'getForMe',
			httpMethod: 'GET',
			path: '/v1/me/images/{imageId}',
			params: ['imageId']
		};
	};

	Image._createForMe = function () {

		return {
			modelName: Image.name,
			methodName: 'createForMe',
			httpMethod: 'POST',
			path: '/v1/me/images',
			params: [],
			usesFormData: true
		};
	};

	Image._updateForMe = function () {

		return {
			modelName: Image.name,
			methodName: 'updateForMe',
			httpMethod: 'PUT',
			path: '/v1/me/images/{imageId}',
			params: ['imageId'],
			usesFormData: true
		};
	};

	Image._deleteForMe = function () {

		return {
			modelName: Image.name,
			methodName: 'deleteForMe',
			httpMethod: 'DELETE',
			path: '/v1/me/images/{imageId}',
			params: ['imageId']
		};
	};

	return Image;
};

},{"../util/assign":30}],15:[function(require,module,exports){
'use strict';

module.exports = function (request) {
	return {

		Brand: require('./brand.js')(request),
		Cart: require('./cart.js')(request),
		Catalog: require('./catalog.js')(request),
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
		ShippingPolicy: require('./shippingPolicy.js')(request),
		Store: require('./store.js')(request),
		Subscription: require('./subscription.js')(request),
		SubscriptionPlan: require('./subscriptionPlan.js')(request),
		TaxCategory: require('./taxCategory.js')(request),
		Vendor: require('./vendor.js')(request),
		WishList: require('./wishList.js')(request)

	};
};

},{"./brand.js":5,"./cart.js":6,"./catalog.js":7,"./collection.js":8,"./country.js":9,"./coupon.js":10,"./currency.js":11,"./customer.js":12,"./group.js":13,"./image.js":14,"./order.js":16,"./orderTag.js":17,"./paymentMethod.js":18,"./product.js":19,"./review.js":20,"./reviewComment.js":21,"./shippingMethod.js":22,"./shippingPolicy.js":23,"./store.js":24,"./subscription.js":25,"./subscriptionPlan.js":26,"./taxCategory.js":27,"./vendor.js":28,"./wishList.js":29}],16:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var Order = {
		name: 'Order',
		path: 'orders',
		listForMe: function listForMe() {
			return request(assign(Order._listForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		countForMe: function countForMe() {
			return request(assign(Order._countForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		getForMe: function getForMe() {
			return request(assign(Order._getForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		listBySubscriptionForMe: function listBySubscriptionForMe() {
			return request(assign(Order._listBySubscriptionForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		authenticate: function authenticate() {
			return request(assign(Order._authenticate(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelForMe: function cancelForMe() {
			return request(assign(Order._cancelForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		markAsReceivedForMe: function markAsReceivedForMe() {
			return request(assign(Order._markAsReceivedForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		requestRefundForMe: function requestRefundForMe() {
			return request(assign(Order._requestRefundForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelRefundForMe: function cancelRefundForMe() {
			return request(assign(Order._cancelRefundForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		createDownloadUrlForMe: function createDownloadUrlForMe() {
			return request(assign(Order._createDownloadUrlForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateForMe: function updateForMe() {
			return request(assign(Order._updateForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateTransactionsForMe: function updateTransactionsForMe() {
			return request(assign(Order._updateTransactionsForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateCancellationForMe: function updateCancellationForMe() {
			return request(assign(Order._updateCancellationForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateRefundForMe: function updateRefundForMe() {
			return request(assign(Order._updateRefundForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateRefundCancellationForMe: function updateRefundCancellationForMe() {
			return request(assign(Order._updateRefundCancellationForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		markAsNotReceivedForMe: function markAsNotReceivedForMe() {
			return request(assign(Order._markAsNotReceivedForMe(), { args: Array.prototype.slice.call(arguments) }));
		}
	};

	Order._listForMe = function () {

		return {
			modelName: Order.name,
			methodName: 'listForMe',
			httpMethod: 'GET',
			path: '/v1/me/orders',
			params: []
		};
	};

	Order._countForMe = function () {

		return {
			modelName: Order.name,
			methodName: 'countForMe',
			httpMethod: 'GET',
			path: '/v1/me/orders/count',
			params: []
		};
	};

	Order._getForMe = function () {

		return {
			modelName: Order.name,
			methodName: 'getForMe',
			httpMethod: 'GET',
			path: '/v1/me/orders/{orderId}',
			params: ['orderId']
		};
	};

	Order._listBySubscriptionForMe = function () {

		return {
			modelName: Order.name,
			methodName: 'listBySubscriptionForMe',
			httpMethod: 'GET',
			path: '/v1/me/subscriptions/{subscriptionId}/orders',
			params: ['subscriptionId']
		};
	};

	Order._authenticate = function () {

		return {
			modelName: Order.name,
			methodName: 'authenticate',
			httpMethod: 'POST',
			path: '/v1/orders/{orderId}/auth',
			params: ['orderId']
		};
	};

	Order._cancelForMe = function () {

		return {
			modelName: Order.name,
			methodName: 'cancelForMe',
			httpMethod: 'POST',
			path: '/v1/me/orders/{orderId}/cancellation',
			params: ['orderId']
		};
	};

	Order._markAsReceivedForMe = function () {

		return {
			modelName: Order.name,
			methodName: 'markAsReceivedForMe',
			httpMethod: 'POST',
			path: '/v1/me/orders/{orderId}/received',
			params: ['orderId'],
			withoutPayload: true
		};
	};

	Order._requestRefundForMe = function () {

		return {
			modelName: Order.name,
			methodName: 'requestRefundForMe',
			httpMethod: 'POST',
			path: '/v1/me/orders/{orderId}/refunds',
			params: ['orderId']
		};
	};

	Order._cancelRefundForMe = function () {

		return {
			modelName: Order.name,
			methodName: 'cancelRefundForMe',
			httpMethod: 'POST',
			path: '/v1/me/orders/{orderId}/refunds/{refundId}/cancellation',
			params: ['orderId', 'refundId']
		};
	};

	Order._createDownloadUrlForMe = function () {

		return {
			modelName: Order.name,
			methodName: 'createDownloadUrlForMe',
			httpMethod: 'POST',
			path: '/v1/me/orders/{orderId}/items/{itemId}/download/url',
			params: ['orderId', 'itemId'],
			withoutPayload: true
		};
	};

	Order._updateForMe = function () {

		return {
			modelName: Order.name,
			methodName: 'updateForMe',
			httpMethod: 'PUT',
			path: '/v1/me/orders/{orderId}',
			params: ['orderId']
		};
	};

	Order._updateTransactionsForMe = function () {

		return {
			modelName: Order.name,
			methodName: 'updateTransactionsForMe',
			httpMethod: 'PUT',
			path: '/v1/me/orders/{orderId}/transactions',
			params: ['orderId'],
			withoutPayload: true
		};
	};

	Order._updateCancellationForMe = function () {

		return {
			modelName: Order.name,
			methodName: 'updateCancellationForMe',
			httpMethod: 'PUT',
			path: '/v1/me/orders/{orderId}/cancellation',
			params: ['orderId']
		};
	};

	Order._updateRefundForMe = function () {

		return {
			modelName: Order.name,
			methodName: 'updateRefundForMe',
			httpMethod: 'PUT',
			path: '/v1/me/orders/{orderId}/refunds/{refundId}',
			params: ['orderId', 'refundId']
		};
	};

	Order._updateRefundCancellationForMe = function () {

		return {
			modelName: Order.name,
			methodName: 'updateRefundCancellationForMe',
			httpMethod: 'PUT',
			path: '/v1/me/orders/{orderId}/refunds/{refundId}/cancellation',
			params: ['orderId', 'refundId']
		};
	};

	Order._markAsNotReceivedForMe = function () {

		return {
			modelName: Order.name,
			methodName: 'markAsNotReceivedForMe',
			httpMethod: 'DELETE',
			path: '/v1/me/orders/{orderId}/received',
			params: ['orderId']
		};
	};

	return Order;
};

},{"../util/assign":30}],17:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var OrderTag = {
		name: 'OrderTag',
		path: 'orders/tags',
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

},{"../util/assign":30}],18:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var PaymentMethod = {
		name: 'PaymentMethod',
		path: 'payments/methods',
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

},{"../util/assign":30}],19:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var Product = {
		name: 'Product',
		path: 'products',
		list: function list() {
			return request(assign(Product._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function count() {
			return request(assign(Product._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function get() {
			return request(assign(Product._get(), { args: Array.prototype.slice.call(arguments) }));
		}
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

	return Product;
};

},{"../util/assign":30}],20:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var Review = {
		name: 'Review',
		path: 'products/reviews',
		listPublished: function listPublished() {
			return request(assign(Review._listPublished(), { args: Array.prototype.slice.call(arguments) }));
		},
		countPublished: function countPublished() {
			return request(assign(Review._countPublished(), { args: Array.prototype.slice.call(arguments) }));
		},
		getPublished: function getPublished() {
			return request(assign(Review._getPublished(), { args: Array.prototype.slice.call(arguments) }));
		},
		createForMe: function createForMe() {
			return request(assign(Review._createForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		flagForMe: function flagForMe() {
			return request(assign(Review._flagForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		helpedForMe: function helpedForMe() {
			return request(assign(Review._helpedForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateForMe: function updateForMe() {
			return request(assign(Review._updateForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteForMe: function deleteForMe() {
			return request(assign(Review._deleteForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelFlagForMe: function cancelFlagForMe() {
			return request(assign(Review._cancelFlagForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelHelpedForMe: function cancelHelpedForMe() {
			return request(assign(Review._cancelHelpedForMe(), { args: Array.prototype.slice.call(arguments) }));
		}
	};

	Review._listPublished = function () {

		return {
			modelName: Review.name,
			methodName: 'listPublished',
			httpMethod: 'GET',
			path: '/v1/products/reviews/published',
			params: []
		};
	};

	Review._countPublished = function () {

		return {
			modelName: Review.name,
			methodName: 'countPublished',
			httpMethod: 'GET',
			path: '/v1/products/reviews/published/count',
			params: []
		};
	};

	Review._getPublished = function () {

		return {
			modelName: Review.name,
			methodName: 'getPublished',
			httpMethod: 'GET',
			path: '/v1/products/reviews/published/{reviewId}',
			params: ['reviewId']
		};
	};

	Review._createForMe = function () {

		return {
			modelName: Review.name,
			methodName: 'createForMe',
			httpMethod: 'POST',
			path: '/v1/me/products/reviews',
			params: []
		};
	};

	Review._flagForMe = function () {

		return {
			modelName: Review.name,
			methodName: 'flagForMe',
			httpMethod: 'POST',
			path: '/v1/me/products/reviews/{reviewId}/flags',
			params: ['reviewId'],
			withoutPayload: true
		};
	};

	Review._helpedForMe = function () {

		return {
			modelName: Review.name,
			methodName: 'helpedForMe',
			httpMethod: 'POST',
			path: '/v1/me/products/reviews/{reviewId}/helped/{upDown}',
			params: ['reviewId', 'upDown'],
			withoutPayload: true
		};
	};

	Review._updateForMe = function () {

		return {
			modelName: Review.name,
			methodName: 'updateForMe',
			httpMethod: 'PUT',
			path: '/v1/me/products/reviews/{reviewId}',
			params: ['reviewId']
		};
	};

	Review._deleteForMe = function () {

		return {
			modelName: Review.name,
			methodName: 'deleteForMe',
			httpMethod: 'DELETE',
			path: '/v1/me/products/reviews/{reviewId}',
			params: ['reviewId']
		};
	};

	Review._cancelFlagForMe = function () {

		return {
			modelName: Review.name,
			methodName: 'cancelFlagForMe',
			httpMethod: 'DELETE',
			path: '/v1/me/products/reviews/{reviewId}/flags',
			params: ['reviewId']
		};
	};

	Review._cancelHelpedForMe = function () {

		return {
			modelName: Review.name,
			methodName: 'cancelHelpedForMe',
			httpMethod: 'DELETE',
			path: '/v1/me/products/reviews/{reviewId}/helped/{upDown}',
			params: ['reviewId', 'upDown']
		};
	};

	return Review;
};

},{"../util/assign":30}],21:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var ReviewComment = {
		name: 'ReviewComment',
		path: 'products/reviews/comments',
		list: function list() {
			return request(assign(ReviewComment._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function count() {
			return request(assign(ReviewComment._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function get() {
			return request(assign(ReviewComment._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		createForMe: function createForMe() {
			return request(assign(ReviewComment._createForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		flagForMe: function flagForMe() {
			return request(assign(ReviewComment._flagForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateForMe: function updateForMe() {
			return request(assign(ReviewComment._updateForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteForMe: function deleteForMe() {
			return request(assign(ReviewComment._deleteForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelFlagForMe: function cancelFlagForMe() {
			return request(assign(ReviewComment._cancelFlagForMe(), { args: Array.prototype.slice.call(arguments) }));
		}
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

	ReviewComment._createForMe = function () {

		return {
			modelName: ReviewComment.name,
			methodName: 'createForMe',
			httpMethod: 'POST',
			path: '/v1/me/products/reviews/comments',
			params: []
		};
	};

	ReviewComment._flagForMe = function () {

		return {
			modelName: ReviewComment.name,
			methodName: 'flagForMe',
			httpMethod: 'POST',
			path: '/v1/me/products/reviews/comments/{reviewCommentId}/flags',
			params: ['reviewCommentId'],
			withoutPayload: true
		};
	};

	ReviewComment._updateForMe = function () {

		return {
			modelName: ReviewComment.name,
			methodName: 'updateForMe',
			httpMethod: 'PUT',
			path: '/v1/me/products/reviews/comments/{reviewCommentId}',
			params: ['reviewCommentId']
		};
	};

	ReviewComment._deleteForMe = function () {

		return {
			modelName: ReviewComment.name,
			methodName: 'deleteForMe',
			httpMethod: 'DELETE',
			path: '/v1/me/products/reviews/comments/{reviewCommentId}',
			params: ['reviewCommentId']
		};
	};

	ReviewComment._cancelFlagForMe = function () {

		return {
			modelName: ReviewComment.name,
			methodName: 'cancelFlagForMe',
			httpMethod: 'DELETE',
			path: '/v1/me/products/reviews/comments/{reviewCommentId}/flags',
			params: ['reviewCommentId']
		};
	};

	return ReviewComment;
};

},{"../util/assign":30}],22:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var ShippingMethod = {
		name: 'ShippingMethod',
		path: 'shipping/methods',
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

},{"../util/assign":30}],23:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var ShippingPolicy = {
		name: 'ShippingPolicy',
		path: 'shipping/policies',
		list: function list() {
			return request(assign(ShippingPolicy._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function count() {
			return request(assign(ShippingPolicy._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function get() {
			return request(assign(ShippingPolicy._get(), { args: Array.prototype.slice.call(arguments) }));
		}
	};

	ShippingPolicy._list = function () {

		return {
			modelName: ShippingPolicy.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/shipping/policies',
			params: []
		};
	};

	ShippingPolicy._count = function () {

		return {
			modelName: ShippingPolicy.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/shipping/policies/count',
			params: []
		};
	};

	ShippingPolicy._get = function () {

		return {
			modelName: ShippingPolicy.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/shipping/policies/{shippingPolicyId}',
			params: ['shippingPolicyId']
		};
	};

	return ShippingPolicy;
};

},{"../util/assign":30}],24:[function(require,module,exports){
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

},{"../util/assign":30}],25:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var Subscription = {
		name: 'Subscription',
		path: 'subscriptions',
		listForMe: function listForMe() {
			return request(assign(Subscription._listForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		countForMe: function countForMe() {
			return request(assign(Subscription._countForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		getForMe: function getForMe() {
			return request(assign(Subscription._getForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		authenticate: function authenticate() {
			return request(assign(Subscription._authenticate(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelForMe: function cancelForMe() {
			return request(assign(Subscription._cancelForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		scheduleForMe: function scheduleForMe() {
			return request(assign(Subscription._scheduleForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateForMe: function updateForMe() {
			return request(assign(Subscription._updateForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateCancellationForMe: function updateCancellationForMe() {
			return request(assign(Subscription._updateCancellationForMe(), { args: Array.prototype.slice.call(arguments) }));
		}
	};

	Subscription._listForMe = function () {

		return {
			modelName: Subscription.name,
			methodName: 'listForMe',
			httpMethod: 'GET',
			path: '/v1/me/subscriptions',
			params: []
		};
	};

	Subscription._countForMe = function () {

		return {
			modelName: Subscription.name,
			methodName: 'countForMe',
			httpMethod: 'GET',
			path: '/v1/me/subscriptions/count',
			params: []
		};
	};

	Subscription._getForMe = function () {

		return {
			modelName: Subscription.name,
			methodName: 'getForMe',
			httpMethod: 'GET',
			path: '/v1/me/subscriptions/{subscriptionId}',
			params: ['subscriptionId']
		};
	};

	Subscription._authenticate = function () {

		return {
			modelName: Subscription.name,
			methodName: 'authenticate',
			httpMethod: 'POST',
			path: '/v1/subscriptions/{subscriptionId}/auth',
			params: ['subscriptionId']
		};
	};

	Subscription._cancelForMe = function () {

		return {
			modelName: Subscription.name,
			methodName: 'cancelForMe',
			httpMethod: 'POST',
			path: '/v1/me/subscriptions/{subscriptionId}/cancellation',
			params: ['subscriptionId']
		};
	};

	Subscription._scheduleForMe = function () {

		return {
			modelName: Subscription.name,
			methodName: 'scheduleForMe',
			httpMethod: 'POST',
			path: '/v1/me/subscriptions/{subscriptionId}/scheduled',
			params: ['subscriptionId']
		};
	};

	Subscription._updateForMe = function () {

		return {
			modelName: Subscription.name,
			methodName: 'updateForMe',
			httpMethod: 'PUT',
			path: '/v1/me/subscriptions/{subscriptionId}',
			params: ['subscriptionId']
		};
	};

	Subscription._updateCancellationForMe = function () {

		return {
			modelName: Subscription.name,
			methodName: 'updateCancellationForMe',
			httpMethod: 'PUT',
			path: '/v1/me/subscriptions/{subscriptionId}/cancellation',
			params: ['subscriptionId']
		};
	};

	return Subscription;
};

},{"../util/assign":30}],26:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var SubscriptionPlan = {
		name: 'SubscriptionPlan',
		path: 'subscriptions/plans',
		list: function list() {
			return request(assign(SubscriptionPlan._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function count() {
			return request(assign(SubscriptionPlan._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function get() {
			return request(assign(SubscriptionPlan._get(), { args: Array.prototype.slice.call(arguments) }));
		}
	};

	SubscriptionPlan._list = function () {

		return {
			modelName: SubscriptionPlan.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/subscriptions/plans',
			params: []
		};
	};

	SubscriptionPlan._count = function () {

		return {
			modelName: SubscriptionPlan.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/subscriptions/plans/count',
			params: []
		};
	};

	SubscriptionPlan._get = function () {

		return {
			modelName: SubscriptionPlan.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/subscriptions/plans/{subscriptionPlanId}',
			params: ['subscriptionPlanId']
		};
	};

	return SubscriptionPlan;
};

},{"../util/assign":30}],27:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var TaxCategory = {
		name: 'TaxCategory',
		path: 'taxes/categories',
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

},{"../util/assign":30}],28:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var Vendor = {
		name: 'Vendor',
		path: 'vendors',
		list: function list() {
			return request(assign(Vendor._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function count() {
			return request(assign(Vendor._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function get() {
			return request(assign(Vendor._get(), { args: Array.prototype.slice.call(arguments) }));
		}
	};

	Vendor._list = function () {

		return {
			modelName: Vendor.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/vendors',
			params: []
		};
	};

	Vendor._count = function () {

		return {
			modelName: Vendor.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/vendors/count',
			params: []
		};
	};

	Vendor._get = function () {

		return {
			modelName: Vendor.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/vendors/{vendorId}',
			params: ['vendorId']
		};
	};

	return Vendor;
};

},{"../util/assign":30}],29:[function(require,module,exports){
'use strict';

var assign = require('../util/assign');

module.exports = function (request) {

	var WishList = {
		name: 'WishList',
		path: 'wishlists',
		listForMe: function listForMe() {
			return request(assign(WishList._listForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		countForMe: function countForMe() {
			return request(assign(WishList._countForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		getForMe: function getForMe() {
			return request(assign(WishList._getForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		listProductsForMe: function listProductsForMe() {
			return request(assign(WishList._listProductsForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		countProductsForMe: function countProductsForMe() {
			return request(assign(WishList._countProductsForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		createForMe: function createForMe() {
			return request(assign(WishList._createForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		addItemForMe: function addItemForMe() {
			return request(assign(WishList._addItemForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateForMe: function updateForMe() {
			return request(assign(WishList._updateForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteForMe: function deleteForMe() {
			return request(assign(WishList._deleteForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		emptyForMe: function emptyForMe() {
			return request(assign(WishList._emptyForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteItemForMe: function deleteItemForMe() {
			return request(assign(WishList._deleteItemForMe(), { args: Array.prototype.slice.call(arguments) }));
		}
	};

	WishList._listForMe = function () {

		return {
			modelName: WishList.name,
			methodName: 'listForMe',
			httpMethod: 'GET',
			path: '/v1/me/wishlists',
			params: []
		};
	};

	WishList._countForMe = function () {

		return {
			modelName: WishList.name,
			methodName: 'countForMe',
			httpMethod: 'GET',
			path: '/v1/me/wishlists/count',
			params: []
		};
	};

	WishList._getForMe = function () {

		return {
			modelName: WishList.name,
			methodName: 'getForMe',
			httpMethod: 'GET',
			path: '/v1/me/wishlists/{wishListId}',
			params: ['wishListId']
		};
	};

	WishList._listProductsForMe = function () {

		return {
			modelName: WishList.name,
			methodName: 'listProductsForMe',
			httpMethod: 'GET',
			path: '/v1/me/wishlists/{wishListId}/products',
			params: ['wishListId']
		};
	};

	WishList._countProductsForMe = function () {

		return {
			modelName: WishList.name,
			methodName: 'countProductsForMe',
			httpMethod: 'GET',
			path: '/v1/me/wishlists/{wishListId}/products/count',
			params: ['wishListId']
		};
	};

	WishList._createForMe = function () {

		return {
			modelName: WishList.name,
			methodName: 'createForMe',
			httpMethod: 'POST',
			path: '/v1/me/wishlists',
			params: []
		};
	};

	WishList._addItemForMe = function () {

		return {
			modelName: WishList.name,
			methodName: 'addItemForMe',
			httpMethod: 'POST',
			path: '/v1/me/wishlists/{wishListId}/items',
			params: ['wishListId']
		};
	};

	WishList._updateForMe = function () {

		return {
			modelName: WishList.name,
			methodName: 'updateForMe',
			httpMethod: 'PUT',
			path: '/v1/me/wishlists/{wishListId}',
			params: ['wishListId']
		};
	};

	WishList._deleteForMe = function () {

		return {
			modelName: WishList.name,
			methodName: 'deleteForMe',
			httpMethod: 'DELETE',
			path: '/v1/me/wishlists/{wishListId}',
			params: ['wishListId']
		};
	};

	WishList._emptyForMe = function () {

		return {
			modelName: WishList.name,
			methodName: 'emptyForMe',
			httpMethod: 'DELETE',
			path: '/v1/me/wishlists/{wishListId}/items',
			params: ['wishListId']
		};
	};

	WishList._deleteItemForMe = function () {

		return {
			modelName: WishList.name,
			methodName: 'deleteItemForMe',
			httpMethod: 'DELETE',
			path: '/v1/me/wishlists/{wishListId}/items/{productId}',
			params: ['wishListId', 'productId']
		};
	};

	return WishList;
};

},{"../util/assign":30}],30:[function(require,module,exports){
"use strict";

module.exports = function (dest, source) {

	for (var key in source) {

		dest[key] = source[key];
	}

	return dest;
};

},{}]},{},[3]);
