(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function ClayfulError(modelName, methodName, status, errorCode, message) {

	this.name = 'ClayfulError';
	this.stack = new Error().stack;

	this.isClayful = true;
	this.model = modelName;
	this.method = methodName;
	this.status = status;
	this.code = errorCode;
	this.message = message;
}

ClayfulError.prototype = Object.create(Error.prototype);
ClayfulError.prototype.constructor = ClayfulError;

module.exports = ClayfulError;

},{}],2:[function(require,module,exports){
'use strict';

var ClayfulError = require('../clayful-error');
var assign = require('../util/assign');

module.exports = function (models, credentials) {

	// Clayful API public instance
	var clayful = {
		options: {
			baseUrl: 'https://api.clayful.io', // base url for API request
			errorLanguage: 'en', // error language to use (for API errors)
			renewTokenBefore: 60 * 5, // when to renew access token (in seconds, default = 5 minutes before existing token expires)
			extraHeaders: {} },
		credentials: assign({
			customer: null, // customer token (it will set 'X-Clayful-Customer-Token')
			clientId: null,
			clientSecret: null
		}, credentials),
		plugins: {
			tokenStorage: null,
			request: null
		}
	};

	// Configure clayful instance
	clayful.config = function (o) {
		return assign(clayful.options, o);
	};

	// Uses plugins. e.g., Token storage, request middleware...
	clayful.install = function (scope, plugin) {
		return clayful.plugins[scope] = plugin;
	};

	// Sets default customer token
	clayful.customer = function (token) {
		return clayful.credentials.customer = token;
	};

	// Get API endpoint
	clayful.getEndpoint = function (path) {
		return '' + clayful.options.baseUrl + path;
	};

	clayful.wrapRequestCallback = function (requestDetail) {
		return function (err, result) {
			return requestDetail.callback(err, result, requestDetail);
		};
	};

	// Default header factory
	clayful.getDefaultHeaders = function (withAuthorization) {

		var headers = assign({
			'X-Clayful-Error-Language': clayful.options.errorLanguage
		}, clayful.options.extraHeaders);

		if (clayful.credentials.customer && !clayful.shouldRenewToken()) {

			// Set customer token automatically
			headers['X-Clayful-Customer-Authorization'] = clayful.credentials.customer;
		}

		if (withAuthorization) {
			var _clayful$plugins$toke = clayful.plugins.tokenStorage.getToken(),
			    token = _clayful$plugins$toke.token;

			headers.Authorization = 'Bearer ' + token;
		}

		return headers;
	};

	// Check whether cached token expires in milliseconds
	clayful.shouldRenewToken = function () {

		var tokenDetails = clayful.plugins.tokenStorage.getToken();

		if (!tokenDetails) {

			return true;
		}

		var tokenExpiresAt = tokenDetails.tokenExpiresAt;


		var renewTokenBefore = clayful.options.renewTokenBefore;

		return tokenExpiresAt - Date.now() <= renewTokenBefore * 1000;
	};

	clayful.extractRequestArguments = function (options) {

		var result = {
			httpMethod: options.httpMethod
		};

		var rest = options.args.slice(options.params.length);

		result.requestUrl = options.params.reduce(function (requestUrl, param, i) {
			return requestUrl.replace('{' + param + '}', options.args[i]);
		}, options.path);
		result.callback = rest.pop();

		if (typeof result.callback !== 'function') {

			rest.push(result.callback); // restore rest array
			result.callback = function () {}; // Put an empty function as default if the last argument isn't a function,
		}

		var queryHeaders = {};

		/**
   * (...params, { query, headers }, callback)
   * where query, headers are optional (if the endpoint doesn't have any params, ...params are also optional)
   */

		if (options.httpMethod === 'GET' || options.httpMethod === 'DELETE') {

			queryHeaders = rest[0] || {};
		}

		/**
   * (...params, payload, { query, headers }, callback)
   * where payload, query, headers are optional (if the endpoint doesn't have any params, ...params are also optional)
   */

		if (options.httpMethod === 'PUT' || options.httpMethod === 'POST') {

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
	clayful.authenticate = function (callback) {};

	clayful.callAPI = function (options) {

		var extracted = clayful.extractRequestArguments(options);

		assign(extracted, {
			requestUrl: clayful.getEndpoint(extracted.requestUrl),
			modelName: options.modelName,
			methodName: options.methodName
		});

		var makeApiCall = function makeApiCall() {

			// Extend & overide headers before making a request
			extracted.headers = assign(clayful.getDefaultHeaders(true), extracted.headers);

			// ClayfulError should be used to generate API errors from Clayful API
			return clayful.plugins.request(extracted, ClayfulError, clayful.wrapRequestCallback(extracted));
		};

		if (!clayful.shouldRenewToken()) {

			return makeApiCall();
		}

		return clayful.authenticate(function (err, result) {

			if (err) {
				return extracted.callback(err);
			}

			// Cache access token
			clayful.plugins.tokenStorage.setToken({
				token: result.access_token,
				tokenExpiresAt: Date.now() + result.expires_in * 1000 // Since expires_in is in seconds, convert to milliseconds to cache an expiration time.
			});

			return makeApiCall();
		});
	};

	var allModels = models(clayful.callAPI);

	// Get all models
	clayful.models = function () {

		var models = [];

		for (var modelName in allModels) {
			models.push(modelName);
		}

		return models;
	};

	// Extend clayful object with models and methods
	return assign(clayful, allModels);
};

},{"../clayful-error":1,"../util/assign":34}],3:[function(require,module,exports){
'use strict';

var ClayfulFactory = require('../clayful');
var ClayfulError = require('../clayful-error');
var models = require('../models-js');
var LocalTokenStorage = require('../plugins/token-local-storage');

var Clayful = function Clayful(options) {

	"use strict";

	var clayful = ClayfulFactory(models, options);

	clayful.config({
		extraHeaders: {
			'X-Clayful-SDK': 'clayful-js'
		}
	});

	clayful.install('tokenStorage', new LocalTokenStorage('cfl-token')); // default to localStorage

	// Authenticate with `clayful/client_implicit` strategy
	clayful.authenticate = function (callback) {

		var requestDetail = {
			httpMethod: 'POST',
			requestUrl: clayful.getEndpoint('/token'),
			payload: {
				grant_type: 'http://clayful.io/oauth/grant-type/client-implicit',
				client_id: clayful.credentials.clientId
			},
			query: {},
			headers: clayful.getDefaultHeaders(),
			callback: callback
		};

		return clayful.plugins.request(requestDetail, ClayfulError, clayful.wrapRequestCallback(requestDetail));
	};

	return clayful;
};

module.exports = window.Clayful = Clayful;

},{"../clayful":2,"../clayful-error":1,"../models-js":17,"../plugins/token-local-storage":33}],4:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var BlogCategory = { name: 'BlogCategory' };

	BlogCategory.query = BlogCategory._query = function () {

		return request({
			modelName: BlogCategory.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/blog/categories',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	BlogCategory.list = BlogCategory._list = function () {

		return request({
			modelName: BlogCategory.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/blog/categories',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	BlogCategory.count = BlogCategory._count = function () {

		return request({
			modelName: BlogCategory.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/blog/categories/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	BlogCategory.get = BlogCategory._get = function () {

		return request({
			modelName: BlogCategory.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/blog/categories/{blogCategoryId}',
			params: ['blogCategoryId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return BlogCategory;
};

},{}],5:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var BlogComment = { name: 'BlogComment' };

	BlogComment.query = BlogComment._query = function () {

		return request({
			modelName: BlogComment.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/blog/posts/comments',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	BlogComment.list = BlogComment._list = function () {

		return request({
			modelName: BlogComment.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/blog/posts/comments',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	BlogComment.count = BlogComment._count = function () {

		return request({
			modelName: BlogComment.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/blog/posts/comments/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	BlogComment.get = BlogComment._get = function () {

		return request({
			modelName: BlogComment.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/blog/posts/comments/{blogCommentId}',
			params: ['blogCommentId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	BlogComment.queryByPost = BlogComment._queryByPost = function () {

		return request({
			modelName: BlogComment.name,
			methodName: 'queryByPost',
			httpMethod: 'GET',
			path: '/v1/blog/posts/{blogPostId}/comments',
			params: ['blogPostId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	BlogComment.listByPost = BlogComment._listByPost = function () {

		return request({
			modelName: BlogComment.name,
			methodName: 'listByPost',
			httpMethod: 'GET',
			path: '/v1/blog/posts/{blogPostId}/comments',
			params: ['blogPostId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	BlogComment.queryByOwner = BlogComment._queryByOwner = function () {

		return request({
			modelName: BlogComment.name,
			methodName: 'queryByOwner',
			httpMethod: 'GET',
			path: '/v1/{ownerModel}/{ownerId}/blog/posts/comments',
			params: ['ownerModel', 'ownerId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	BlogComment.listByOwner = BlogComment._listByOwner = function () {

		return request({
			modelName: BlogComment.name,
			methodName: 'listByOwner',
			httpMethod: 'GET',
			path: '/v1/{ownerModel}/{ownerId}/blog/posts/comments',
			params: ['ownerModel', 'ownerId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	BlogComment.createAsMe = BlogComment._createAsMe = function () {

		return request({
			modelName: BlogComment.name,
			methodName: 'createAsMe',
			httpMethod: 'POST',
			path: '/v1/me/blog/posts/comments',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	BlogComment.updateAsMe = BlogComment._updateAsMe = function () {

		return request({
			modelName: BlogComment.name,
			methodName: 'updateAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/blog/posts/comments/{blogCommentId}',
			params: ['blogCommentId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	BlogComment.flagAsMe = BlogComment._flagAsMe = function () {

		return request({
			modelName: BlogComment.name,
			methodName: 'flagAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/blog/posts/comments/{blogCommentId}/flag',
			params: ['blogCommentId'],
			withoutPayload: true,
			args: Array.prototype.slice.call(arguments)
		});
	};

	BlogComment.cancelFlagAsMe = BlogComment._cancelFlagAsMe = function () {

		return request({
			modelName: BlogComment.name,
			methodName: 'cancelFlagAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/blog/posts/comments/{blogCommentId}/flag/cancel',
			params: ['blogCommentId'],
			withoutPayload: true,
			args: Array.prototype.slice.call(arguments)
		});
	};

	BlogComment.deleteAsMe = BlogComment._deleteAsMe = function () {

		return request({
			modelName: BlogComment.name,
			methodName: 'deleteAsMe',
			httpMethod: 'DELETE',
			path: '/v1/me/blog/posts/comments/{blogCommentId}',
			params: ['blogCommentId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return BlogComment;
};

},{}],6:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var BlogPost = { name: 'BlogPost' };

	BlogPost.query = BlogPost._query = function () {

		return request({
			modelName: BlogPost.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/blog/posts',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	BlogPost.list = BlogPost._list = function () {

		return request({
			modelName: BlogPost.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/blog/posts',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	BlogPost.count = BlogPost._count = function () {

		return request({
			modelName: BlogPost.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/blog/posts/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	BlogPost.get = BlogPost._get = function () {

		return request({
			modelName: BlogPost.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/blog/posts/{blogPostId}',
			params: ['blogPostId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	BlogPost.queryByCategory = BlogPost._queryByCategory = function () {

		return request({
			modelName: BlogPost.name,
			methodName: 'queryByCategory',
			httpMethod: 'GET',
			path: '/v1/blog/categories/{blogCategoryId}/posts',
			params: ['blogCategoryId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	BlogPost.listByCategory = BlogPost._listByCategory = function () {

		return request({
			modelName: BlogPost.name,
			methodName: 'listByCategory',
			httpMethod: 'GET',
			path: '/v1/blog/categories/{blogCategoryId}/posts',
			params: ['blogCategoryId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	BlogPost.queryByCollaborator = BlogPost._queryByCollaborator = function () {

		return request({
			modelName: BlogPost.name,
			methodName: 'queryByCollaborator',
			httpMethod: 'GET',
			path: '/v1/collaborators/{collaboratorId}/blog/posts',
			params: ['collaboratorId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	BlogPost.listByCollaborator = BlogPost._listByCollaborator = function () {

		return request({
			modelName: BlogPost.name,
			methodName: 'listByCollaborator',
			httpMethod: 'GET',
			path: '/v1/collaborators/{collaboratorId}/blog/posts',
			params: ['collaboratorId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return BlogPost;
};

},{}],7:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var Brand = { name: 'Brand' };

	Brand.query = Brand._query = function () {

		return request({
			modelName: Brand.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/brands',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Brand.list = Brand._list = function () {

		return request({
			modelName: Brand.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/brands',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Brand.count = Brand._count = function () {

		return request({
			modelName: Brand.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/brands/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Brand.get = Brand._get = function () {

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

},{}],8:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var Collection = { name: 'Collection' };

	Collection.query = Collection._query = function () {

		return request({
			modelName: Collection.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/collections',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Collection.list = Collection._list = function () {

		return request({
			modelName: Collection.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/collections',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Collection.count = Collection._count = function () {

		return request({
			modelName: Collection.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/collections/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Collection.get = Collection._get = function () {

		return request({
			modelName: Collection.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/collections/{collectionId}',
			params: ['collectionId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Collection.queryByParent = Collection._queryByParent = function () {

		return request({
			modelName: Collection.name,
			methodName: 'queryByParent',
			httpMethod: 'GET',
			path: '/v1/collections/{collectionId}/collections',
			params: ['collectionId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Collection.listByParent = Collection._listByParent = function () {

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

},{}],9:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var Country = { name: 'Country' };

	Country.query = Country._query = function () {

		return request({
			modelName: Country.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/countries',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Country.list = Country._list = function () {

		return request({
			modelName: Country.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/countries',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Country.count = Country._count = function () {

		return request({
			modelName: Country.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/countries/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Country.get = Country._get = function () {

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

},{}],10:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var Coupon = { name: 'Coupon' };

	Coupon.query = Coupon._query = function () {

		return request({
			modelName: Coupon.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/coupons',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Coupon.list = Coupon._list = function () {

		return request({
			modelName: Coupon.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/coupons',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Coupon.count = Coupon._count = function () {

		return request({
			modelName: Coupon.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/coupons/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Coupon.get = Coupon._get = function () {

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

},{}],11:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var Currency = { name: 'Currency' };

	Currency.query = Currency._query = function () {

		return request({
			modelName: Currency.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/currencies',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Currency.list = Currency._list = function () {

		return request({
			modelName: Currency.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/currencies',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Currency.count = Currency._count = function () {

		return request({
			modelName: Currency.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/currencies/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Currency.get = Currency._get = function () {

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

},{}],12:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var Customer = { name: 'Customer' };

	Customer.getMe = Customer._getMe = function () {

		return request({
			modelName: Customer.name,
			methodName: 'getMe',
			httpMethod: 'GET',
			path: '/v1/me',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Customer.countItemsAsMe = Customer._countItemsAsMe = function () {

		return request({
			modelName: Customer.name,
			methodName: 'countItemsAsMe',
			httpMethod: 'GET',
			path: '/v1/me/cart/items/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Customer.signup = Customer._signup = function () {

		return request({
			modelName: Customer.name,
			methodName: 'signup',
			httpMethod: 'POST',
			path: '/v1/me',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Customer.auth = Customer._auth = function () {

		return request({
			modelName: Customer.name,
			methodName: 'auth',
			httpMethod: 'POST',
			path: '/v1/customers/auth',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Customer.signout = Customer._signout = function () {

		return request({
			modelName: Customer.name,
			methodName: 'signout',
			httpMethod: 'POST',
			path: '/v1/me/signout',
			params: [],
			withoutPayload: true,
			args: Array.prototype.slice.call(arguments)
		});
	};

	Customer.requestVerificationEmail = Customer._requestVerificationEmail = function () {

		return request({
			modelName: Customer.name,
			methodName: 'requestVerificationEmail',
			httpMethod: 'POST',
			path: '/v1/customers/verifications/emails',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Customer.verify = Customer._verify = function () {

		return request({
			modelName: Customer.name,
			methodName: 'verify',
			httpMethod: 'POST',
			path: '/v1/customers/{customerId}/verify',
			params: ['customerId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Customer.addItemAsMe = Customer._addItemAsMe = function () {

		return request({
			modelName: Customer.name,
			methodName: 'addItemAsMe',
			httpMethod: 'POST',
			path: '/v1/me/cart/items',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Customer.resetPassword = Customer._resetPassword = function () {

		return request({
			modelName: Customer.name,
			methodName: 'resetPassword',
			httpMethod: 'POST',
			path: '/v1/customers/{customerId}/password/reset',
			params: ['customerId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Customer.getCartByNonRegistered = Customer._getCartByNonRegistered = function () {

		return request({
			modelName: Customer.name,
			methodName: 'getCartByNonRegistered',
			httpMethod: 'PUT',
			path: '/v1/cart',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Customer.updateMe = Customer._updateMe = function () {

		return request({
			modelName: Customer.name,
			methodName: 'updateMe',
			httpMethod: 'PUT',
			path: '/v1/me',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Customer.getCartAsMe = Customer._getCartAsMe = function () {

		return request({
			modelName: Customer.name,
			methodName: 'getCartAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/cart',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Customer.updateItemAsMe = Customer._updateItemAsMe = function () {

		return request({
			modelName: Customer.name,
			methodName: 'updateItemAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/cart/items/{itemId}',
			params: ['itemId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Customer.deleteMe = Customer._deleteMe = function () {

		return request({
			modelName: Customer.name,
			methodName: 'deleteMe',
			httpMethod: 'DELETE',
			path: '/v1/me',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Customer.deleteCouponAsMe = Customer._deleteCouponAsMe = function () {

		return request({
			modelName: Customer.name,
			methodName: 'deleteCouponAsMe',
			httpMethod: 'DELETE',
			path: '/v1/me/coupons/{couponId}',
			params: ['couponId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Customer.deleteItemAsMe = Customer._deleteItemAsMe = function () {

		return request({
			modelName: Customer.name,
			methodName: 'deleteItemAsMe',
			httpMethod: 'DELETE',
			path: '/v1/me/cart/items/{itemId}',
			params: ['itemId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return Customer;
};

},{}],13:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var Departure = { name: 'Departure' };

	Departure.query = Departure._query = function () {

		return request({
			modelName: Departure.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/departures',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Departure.list = Departure._list = function () {

		return request({
			modelName: Departure.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/departures',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Departure.count = Departure._count = function () {

		return request({
			modelName: Departure.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/departures/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Departure.get = Departure._get = function () {

		return request({
			modelName: Departure.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/departures/{departureId}',
			params: ['departureId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return Departure;
};

},{}],14:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var Group = { name: 'Group' };

	Group.query = Group._query = function () {

		return request({
			modelName: Group.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/groups',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Group.list = Group._list = function () {

		return request({
			modelName: Group.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/groups',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Group.count = Group._count = function () {

		return request({
			modelName: Group.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/groups/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Group.get = Group._get = function () {

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

},{}],15:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var Image = { name: 'Image' };

	Image.addToReviewAsMe = Image._addToReviewAsMe = function () {

		return request({
			modelName: Image.name,
			methodName: 'addToReviewAsMe',
			httpMethod: 'POST',
			path: '/v1/me/products/reviews/{reviewId}/images',
			params: ['reviewId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Image.deleteFromReviewAsMe = Image._deleteFromReviewAsMe = function () {

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

},{}],16:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var ImageBundle = { name: 'ImageBundle' };

	ImageBundle.query = ImageBundle._query = function () {

		return request({
			modelName: ImageBundle.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/images/bundles',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ImageBundle.list = ImageBundle._list = function () {

		return request({
			modelName: ImageBundle.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/images/bundles',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ImageBundle.count = ImageBundle._count = function () {

		return request({
			modelName: ImageBundle.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/images/bundles/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ImageBundle.get = ImageBundle._get = function () {

		return request({
			modelName: ImageBundle.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/images/bundles/{imageBundleId}',
			params: ['imageBundleId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return ImageBundle;
};

},{}],17:[function(require,module,exports){
'use strict';

module.exports = function (request) {
	return {

		BlogCategory: require('./blogCategory.js')(request),
		BlogComment: require('./blogComment.js')(request),
		BlogPost: require('./blogPost.js')(request),
		Brand: require('./brand.js')(request),
		Collection: require('./collection.js')(request),
		Country: require('./country.js')(request),
		Coupon: require('./coupon.js')(request),
		Currency: require('./currency.js')(request),
		Customer: require('./customer.js')(request),
		Departure: require('./departure.js')(request),
		Group: require('./group.js')(request),
		Image: require('./image.js')(request),
		ImageBundle: require('./imageBundle.js')(request),
		Metafield: require('./metafield.js')(request),
		OrderTag: require('./orderTag.js')(request),
		Product: require('./product.js')(request),
		ProductAnswer: require('./productAnswer.js')(request),
		ProductQuestion: require('./productQuestion.js')(request),
		Review: require('./review.js')(request),
		ReviewComment: require('./reviewComment.js')(request),
		Shipping: require('./shipping.js')(request),
		ShippingMethod: require('./shippingMethod.js')(request),
		SupportCategory: require('./supportCategory.js')(request),
		SupportComment: require('./supportComment.js')(request),
		SupportPost: require('./supportPost.js')(request),
		Tax: require('./tax.js')(request),
		TaxCategory: require('./taxCategory.js')(request),
		WishList: require('./wishList.js')(request)

	};
};

},{"./blogCategory.js":4,"./blogComment.js":5,"./blogPost.js":6,"./brand.js":7,"./collection.js":8,"./country.js":9,"./coupon.js":10,"./currency.js":11,"./customer.js":12,"./departure.js":13,"./group.js":14,"./image.js":15,"./imageBundle.js":16,"./metafield.js":18,"./orderTag.js":19,"./product.js":20,"./productAnswer.js":21,"./productQuestion.js":22,"./review.js":23,"./reviewComment.js":24,"./shipping.js":25,"./shippingMethod.js":26,"./supportCategory.js":27,"./supportComment.js":28,"./supportPost.js":29,"./tax.js":30,"./taxCategory.js":31,"./wishList.js":32}],18:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var Metafield = { name: 'Metafield' };

	Metafield.queryModelMeta = Metafield._queryModelMeta = function () {

		return request({
			modelName: Metafield.name,
			methodName: 'queryModelMeta',
			httpMethod: 'GET',
			path: '/v1/{model*1}/meta',
			params: ['model'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Metafield.listModelMeta = Metafield._listModelMeta = function () {

		return request({
			modelName: Metafield.name,
			methodName: 'listModelMeta',
			httpMethod: 'GET',
			path: '/v1/{model*1}/meta',
			params: ['model'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Metafield.queryModelMeta = Metafield._queryModelMeta = function () {

		return request({
			modelName: Metafield.name,
			methodName: 'queryModelMeta',
			httpMethod: 'GET',
			path: '/v1/{model*2}/meta',
			params: ['model', 'model'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Metafield.listModelMeta = Metafield._listModelMeta = function () {

		return request({
			modelName: Metafield.name,
			methodName: 'listModelMeta',
			httpMethod: 'GET',
			path: '/v1/{model*2}/meta',
			params: ['model', 'model'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Metafield.getModelMeta = Metafield._getModelMeta = function () {

		return request({
			modelName: Metafield.name,
			methodName: 'getModelMeta',
			httpMethod: 'GET',
			path: '/v1/{model*1}/meta/{field}',
			params: ['model', 'field'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Metafield.getModelMeta = Metafield._getModelMeta = function () {

		return request({
			modelName: Metafield.name,
			methodName: 'getModelMeta',
			httpMethod: 'GET',
			path: '/v1/{model*2}/meta/{field}',
			params: ['model', 'model', 'field'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Metafield.queryModelMeta = Metafield._queryModelMeta = function () {

		return request({
			modelName: Metafield.name,
			methodName: 'queryModelMeta',
			httpMethod: 'GET',
			path: '/v1/{model*3}/meta',
			params: ['model', 'model', 'model'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Metafield.listModelMeta = Metafield._listModelMeta = function () {

		return request({
			modelName: Metafield.name,
			methodName: 'listModelMeta',
			httpMethod: 'GET',
			path: '/v1/{model*3}/meta',
			params: ['model', 'model', 'model'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Metafield.getModelMeta = Metafield._getModelMeta = function () {

		return request({
			modelName: Metafield.name,
			methodName: 'getModelMeta',
			httpMethod: 'GET',
			path: '/v1/{model*3}/meta/{field}',
			params: ['model', 'model', 'model', 'field'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return Metafield;
};

},{}],19:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var OrderTag = { name: 'OrderTag' };

	OrderTag.query = OrderTag._query = function () {

		return request({
			modelName: OrderTag.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/orders/tags',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	OrderTag.list = OrderTag._list = function () {

		return request({
			modelName: OrderTag.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/orders/tags',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	OrderTag.count = OrderTag._count = function () {

		return request({
			modelName: OrderTag.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/orders/tags/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	OrderTag.get = OrderTag._get = function () {

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

},{}],20:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var Product = { name: 'Product' };

	Product.query = Product._query = function () {

		return request({
			modelName: Product.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/products',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Product.list = Product._list = function () {

		return request({
			modelName: Product.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/products',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Product.count = Product._count = function () {

		return request({
			modelName: Product.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/products/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Product.get = Product._get = function () {

		return request({
			modelName: Product.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/products/{productId}',
			params: ['productId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Product.queryByBrand = Product._queryByBrand = function () {

		return request({
			modelName: Product.name,
			methodName: 'queryByBrand',
			httpMethod: 'GET',
			path: '/v1/brands/{brandId}/products',
			params: ['brandId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Product.listByBrand = Product._listByBrand = function () {

		return request({
			modelName: Product.name,
			methodName: 'listByBrand',
			httpMethod: 'GET',
			path: '/v1/brands/{brandId}/products',
			params: ['brandId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Product.queryByCollection = Product._queryByCollection = function () {

		return request({
			modelName: Product.name,
			methodName: 'queryByCollection',
			httpMethod: 'GET',
			path: '/v1/collections/{collectionId}/products',
			params: ['collectionId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Product.listByCollection = Product._listByCollection = function () {

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

},{}],21:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var ProductAnswer = { name: 'ProductAnswer' };

	ProductAnswer.query = ProductAnswer._query = function () {

		return request({
			modelName: ProductAnswer.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/products/questions/answers',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ProductAnswer.list = ProductAnswer._list = function () {

		return request({
			modelName: ProductAnswer.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/products/questions/answers',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ProductAnswer.count = ProductAnswer._count = function () {

		return request({
			modelName: ProductAnswer.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/products/questions/answers/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ProductAnswer.get = ProductAnswer._get = function () {

		return request({
			modelName: ProductAnswer.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/products/questions/answers/{productAnswerId}',
			params: ['productAnswerId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ProductAnswer.queryByQuestion = ProductAnswer._queryByQuestion = function () {

		return request({
			modelName: ProductAnswer.name,
			methodName: 'queryByQuestion',
			httpMethod: 'GET',
			path: '/v1/products/questions/{productQuestionId}/answers',
			params: ['productQuestionId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ProductAnswer.listByQuestion = ProductAnswer._listByQuestion = function () {

		return request({
			modelName: ProductAnswer.name,
			methodName: 'listByQuestion',
			httpMethod: 'GET',
			path: '/v1/products/questions/{productQuestionId}/answers',
			params: ['productQuestionId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ProductAnswer.queryByOwner = ProductAnswer._queryByOwner = function () {

		return request({
			modelName: ProductAnswer.name,
			methodName: 'queryByOwner',
			httpMethod: 'GET',
			path: '/v1/{ownerModel}/{ownerId}/products/questions/answers',
			params: ['ownerModel', 'ownerId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ProductAnswer.listByOwner = ProductAnswer._listByOwner = function () {

		return request({
			modelName: ProductAnswer.name,
			methodName: 'listByOwner',
			httpMethod: 'GET',
			path: '/v1/{ownerModel}/{ownerId}/products/questions/answers',
			params: ['ownerModel', 'ownerId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ProductAnswer.createAsMe = ProductAnswer._createAsMe = function () {

		return request({
			modelName: ProductAnswer.name,
			methodName: 'createAsMe',
			httpMethod: 'POST',
			path: '/v1/me/products/questions/answers',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ProductAnswer.updateAsMe = ProductAnswer._updateAsMe = function () {

		return request({
			modelName: ProductAnswer.name,
			methodName: 'updateAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/products/questions/answers/{productAnswerId}',
			params: ['productAnswerId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ProductAnswer.flagAsMe = ProductAnswer._flagAsMe = function () {

		return request({
			modelName: ProductAnswer.name,
			methodName: 'flagAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/products/questions/answers/{productAnswerId}/flag',
			params: ['productAnswerId'],
			withoutPayload: true,
			args: Array.prototype.slice.call(arguments)
		});
	};

	ProductAnswer.helpedAsMe = ProductAnswer._helpedAsMe = function () {

		return request({
			modelName: ProductAnswer.name,
			methodName: 'helpedAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/products/questions/answers/{productAnswerId}/helped/{upDown}',
			params: ['productAnswerId', 'upDown'],
			withoutPayload: true,
			args: Array.prototype.slice.call(arguments)
		});
	};

	ProductAnswer.cancelFlagAsMe = ProductAnswer._cancelFlagAsMe = function () {

		return request({
			modelName: ProductAnswer.name,
			methodName: 'cancelFlagAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/products/questions/answers/{productAnswerId}/flag/cancel',
			params: ['productAnswerId'],
			withoutPayload: true,
			args: Array.prototype.slice.call(arguments)
		});
	};

	ProductAnswer.cancelHelpedAsMe = ProductAnswer._cancelHelpedAsMe = function () {

		return request({
			modelName: ProductAnswer.name,
			methodName: 'cancelHelpedAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/products/questions/answers/{productAnswerId}/helped/{upDown}/cancel',
			params: ['productAnswerId', 'upDown'],
			withoutPayload: true,
			args: Array.prototype.slice.call(arguments)
		});
	};

	ProductAnswer.deleteAsMe = ProductAnswer._deleteAsMe = function () {

		return request({
			modelName: ProductAnswer.name,
			methodName: 'deleteAsMe',
			httpMethod: 'DELETE',
			path: '/v1/me/products/questions/answers/{productAnswerId}',
			params: ['productAnswerId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return ProductAnswer;
};

},{}],22:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var ProductQuestion = { name: 'ProductQuestion' };

	ProductQuestion.query = ProductQuestion._query = function () {

		return request({
			modelName: ProductQuestion.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/products/questions',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ProductQuestion.list = ProductQuestion._list = function () {

		return request({
			modelName: ProductQuestion.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/products/questions',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ProductQuestion.count = ProductQuestion._count = function () {

		return request({
			modelName: ProductQuestion.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/products/questions/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ProductQuestion.get = ProductQuestion._get = function () {

		return request({
			modelName: ProductQuestion.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/products/questions/{productQuestionId}',
			params: ['productQuestionId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ProductQuestion.queryByProduct = ProductQuestion._queryByProduct = function () {

		return request({
			modelName: ProductQuestion.name,
			methodName: 'queryByProduct',
			httpMethod: 'GET',
			path: '/v1/products/{productId}/questions',
			params: ['productId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ProductQuestion.listByProduct = ProductQuestion._listByProduct = function () {

		return request({
			modelName: ProductQuestion.name,
			methodName: 'listByProduct',
			httpMethod: 'GET',
			path: '/v1/products/{productId}/questions',
			params: ['productId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ProductQuestion.queryByCustomer = ProductQuestion._queryByCustomer = function () {

		return request({
			modelName: ProductQuestion.name,
			methodName: 'queryByCustomer',
			httpMethod: 'GET',
			path: '/v1/customers/{customerId}/products/questions',
			params: ['customerId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ProductQuestion.listByCustomer = ProductQuestion._listByCustomer = function () {

		return request({
			modelName: ProductQuestion.name,
			methodName: 'listByCustomer',
			httpMethod: 'GET',
			path: '/v1/customers/{customerId}/products/questions',
			params: ['customerId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ProductQuestion.createAsMe = ProductQuestion._createAsMe = function () {

		return request({
			modelName: ProductQuestion.name,
			methodName: 'createAsMe',
			httpMethod: 'POST',
			path: '/v1/me/products/questions',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ProductQuestion.updateAsMe = ProductQuestion._updateAsMe = function () {

		return request({
			modelName: ProductQuestion.name,
			methodName: 'updateAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/products/questions/{productQuestionId}',
			params: ['productQuestionId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ProductQuestion.flagAsMe = ProductQuestion._flagAsMe = function () {

		return request({
			modelName: ProductQuestion.name,
			methodName: 'flagAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/products/questions/{productQuestionId}/flag',
			params: ['productQuestionId'],
			withoutPayload: true,
			args: Array.prototype.slice.call(arguments)
		});
	};

	ProductQuestion.cancelFlagAsMe = ProductQuestion._cancelFlagAsMe = function () {

		return request({
			modelName: ProductQuestion.name,
			methodName: 'cancelFlagAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/products/questions/{productQuestionId}/flag/cancel',
			params: ['productQuestionId'],
			withoutPayload: true,
			args: Array.prototype.slice.call(arguments)
		});
	};

	ProductQuestion.helpedAsMe = ProductQuestion._helpedAsMe = function () {

		return request({
			modelName: ProductQuestion.name,
			methodName: 'helpedAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/products/questions/{productQuestionId}/helped/{upDown}',
			params: ['productQuestionId', 'upDown'],
			withoutPayload: true,
			args: Array.prototype.slice.call(arguments)
		});
	};

	ProductQuestion.cancelHelpedAsMe = ProductQuestion._cancelHelpedAsMe = function () {

		return request({
			modelName: ProductQuestion.name,
			methodName: 'cancelHelpedAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/products/questions/{productQuestionId}/helped/{upDown}/cancel',
			params: ['productQuestionId', 'upDown'],
			withoutPayload: true,
			args: Array.prototype.slice.call(arguments)
		});
	};

	ProductQuestion.deleteAsMe = ProductQuestion._deleteAsMe = function () {

		return request({
			modelName: ProductQuestion.name,
			methodName: 'deleteAsMe',
			httpMethod: 'DELETE',
			path: '/v1/me/products/questions/{productQuestionId}',
			params: ['productQuestionId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return ProductQuestion;
};

},{}],23:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var Review = { name: 'Review' };

	Review.query = Review._query = function () {

		return request({
			modelName: Review.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/products/reviews',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Review.list = Review._list = function () {

		return request({
			modelName: Review.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/products/reviews',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Review.count = Review._count = function () {

		return request({
			modelName: Review.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/products/reviews/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Review.get = Review._get = function () {

		return request({
			modelName: Review.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/products/reviews/{reviewId}',
			params: ['reviewId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Review.queryByProduct = Review._queryByProduct = function () {

		return request({
			modelName: Review.name,
			methodName: 'queryByProduct',
			httpMethod: 'GET',
			path: '/v1/products/{productId}/reviews',
			params: ['productId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Review.listByProduct = Review._listByProduct = function () {

		return request({
			modelName: Review.name,
			methodName: 'listByProduct',
			httpMethod: 'GET',
			path: '/v1/products/{productId}/reviews',
			params: ['productId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Review.queryByCustomer = Review._queryByCustomer = function () {

		return request({
			modelName: Review.name,
			methodName: 'queryByCustomer',
			httpMethod: 'GET',
			path: '/v1/customers/{customerId}/products/reviews',
			params: ['customerId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Review.listByCustomer = Review._listByCustomer = function () {

		return request({
			modelName: Review.name,
			methodName: 'listByCustomer',
			httpMethod: 'GET',
			path: '/v1/customers/{customerId}/products/reviews',
			params: ['customerId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Review.createAsMe = Review._createAsMe = function () {

		return request({
			modelName: Review.name,
			methodName: 'createAsMe',
			httpMethod: 'POST',
			path: '/v1/me/products/reviews',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Review.updateAsMe = Review._updateAsMe = function () {

		return request({
			modelName: Review.name,
			methodName: 'updateAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/products/reviews/{reviewId}',
			params: ['reviewId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Review.flagAsMe = Review._flagAsMe = function () {

		return request({
			modelName: Review.name,
			methodName: 'flagAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/products/reviews/{reviewId}/flag',
			params: ['reviewId'],
			withoutPayload: true,
			args: Array.prototype.slice.call(arguments)
		});
	};

	Review.helpedAsMe = Review._helpedAsMe = function () {

		return request({
			modelName: Review.name,
			methodName: 'helpedAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/products/reviews/{reviewId}/helped/{upDown}',
			params: ['reviewId', 'upDown'],
			withoutPayload: true,
			args: Array.prototype.slice.call(arguments)
		});
	};

	Review.cancelFlagAsMe = Review._cancelFlagAsMe = function () {

		return request({
			modelName: Review.name,
			methodName: 'cancelFlagAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/products/reviews/{reviewId}/flag/cancel',
			params: ['reviewId'],
			withoutPayload: true,
			args: Array.prototype.slice.call(arguments)
		});
	};

	Review.cancelHelpedAsMe = Review._cancelHelpedAsMe = function () {

		return request({
			modelName: Review.name,
			methodName: 'cancelHelpedAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/products/reviews/{reviewId}/helped/{upDown}/cancel',
			params: ['reviewId', 'upDown'],
			withoutPayload: true,
			args: Array.prototype.slice.call(arguments)
		});
	};

	Review.deleteAsMe = Review._deleteAsMe = function () {

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

},{}],24:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var ReviewComment = { name: 'ReviewComment' };

	ReviewComment.query = ReviewComment._query = function () {

		return request({
			modelName: ReviewComment.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/products/reviews/comments',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ReviewComment.list = ReviewComment._list = function () {

		return request({
			modelName: ReviewComment.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/products/reviews/comments',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ReviewComment.count = ReviewComment._count = function () {

		return request({
			modelName: ReviewComment.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/products/reviews/comments/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ReviewComment.get = ReviewComment._get = function () {

		return request({
			modelName: ReviewComment.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/products/reviews/comments/{reviewCommentId}',
			params: ['reviewCommentId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ReviewComment.queryByReview = ReviewComment._queryByReview = function () {

		return request({
			modelName: ReviewComment.name,
			methodName: 'queryByReview',
			httpMethod: 'GET',
			path: '/v1/products/reviews/{reviewId}/comments',
			params: ['reviewId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ReviewComment.listByReview = ReviewComment._listByReview = function () {

		return request({
			modelName: ReviewComment.name,
			methodName: 'listByReview',
			httpMethod: 'GET',
			path: '/v1/products/reviews/{reviewId}/comments',
			params: ['reviewId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ReviewComment.queryByOwner = ReviewComment._queryByOwner = function () {

		return request({
			modelName: ReviewComment.name,
			methodName: 'queryByOwner',
			httpMethod: 'GET',
			path: '/v1/{ownerModel}/{ownerId}/products/reviews/comments',
			params: ['ownerModel', 'ownerId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ReviewComment.listByOwner = ReviewComment._listByOwner = function () {

		return request({
			modelName: ReviewComment.name,
			methodName: 'listByOwner',
			httpMethod: 'GET',
			path: '/v1/{ownerModel}/{ownerId}/products/reviews/comments',
			params: ['ownerModel', 'ownerId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ReviewComment.createAsMe = ReviewComment._createAsMe = function () {

		return request({
			modelName: ReviewComment.name,
			methodName: 'createAsMe',
			httpMethod: 'POST',
			path: '/v1/me/products/reviews/comments',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ReviewComment.updateAsMe = ReviewComment._updateAsMe = function () {

		return request({
			modelName: ReviewComment.name,
			methodName: 'updateAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/products/reviews/comments/{reviewCommentId}',
			params: ['reviewCommentId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ReviewComment.flagAsMe = ReviewComment._flagAsMe = function () {

		return request({
			modelName: ReviewComment.name,
			methodName: 'flagAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/products/reviews/comments/{reviewCommentId}/flag',
			params: ['reviewCommentId'],
			withoutPayload: true,
			args: Array.prototype.slice.call(arguments)
		});
	};

	ReviewComment.cancelFlagAsMe = ReviewComment._cancelFlagAsMe = function () {

		return request({
			modelName: ReviewComment.name,
			methodName: 'cancelFlagAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/products/reviews/comments/{reviewCommentId}/flag/cancel',
			params: ['reviewCommentId'],
			withoutPayload: true,
			args: Array.prototype.slice.call(arguments)
		});
	};

	ReviewComment.deleteAsMe = ReviewComment._deleteAsMe = function () {

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

},{}],25:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var Shipping = { name: 'Shipping' };

	Shipping.query = Shipping._query = function () {

		return request({
			modelName: Shipping.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/shippings',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Shipping.list = Shipping._list = function () {

		return request({
			modelName: Shipping.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/shippings',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Shipping.count = Shipping._count = function () {

		return request({
			modelName: Shipping.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/shippings/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Shipping.get = Shipping._get = function () {

		return request({
			modelName: Shipping.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/shippings/{shippingId}',
			params: ['shippingId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return Shipping;
};

},{}],26:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var ShippingMethod = { name: 'ShippingMethod' };

	ShippingMethod.query = ShippingMethod._query = function () {

		return request({
			modelName: ShippingMethod.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/shippings/methods',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ShippingMethod.list = ShippingMethod._list = function () {

		return request({
			modelName: ShippingMethod.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/shippings/methods',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ShippingMethod.count = ShippingMethod._count = function () {

		return request({
			modelName: ShippingMethod.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/shippings/methods/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	ShippingMethod.get = ShippingMethod._get = function () {

		return request({
			modelName: ShippingMethod.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/shippings/methods/{shippingMethodId}',
			params: ['shippingMethodId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return ShippingMethod;
};

},{}],27:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var SupportCategory = { name: 'SupportCategory' };

	SupportCategory.query = SupportCategory._query = function () {

		return request({
			modelName: SupportCategory.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/support/categories',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	SupportCategory.list = SupportCategory._list = function () {

		return request({
			modelName: SupportCategory.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/support/categories',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	SupportCategory.count = SupportCategory._count = function () {

		return request({
			modelName: SupportCategory.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/support/categories/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	SupportCategory.get = SupportCategory._get = function () {

		return request({
			modelName: SupportCategory.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/support/categories/{supportCategoryId}',
			params: ['supportCategoryId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return SupportCategory;
};

},{}],28:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var SupportComment = { name: 'SupportComment' };

	SupportComment.queryAsMe = SupportComment._queryAsMe = function () {

		return request({
			modelName: SupportComment.name,
			methodName: 'queryAsMe',
			httpMethod: 'GET',
			path: '/v1/me/support/posts/comments',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	SupportComment.listAsMe = SupportComment._listAsMe = function () {

		return request({
			modelName: SupportComment.name,
			methodName: 'listAsMe',
			httpMethod: 'GET',
			path: '/v1/me/support/posts/comments',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	SupportComment.countAsMe = SupportComment._countAsMe = function () {

		return request({
			modelName: SupportComment.name,
			methodName: 'countAsMe',
			httpMethod: 'GET',
			path: '/v1/me/support/posts/comments/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	SupportComment.getAsMe = SupportComment._getAsMe = function () {

		return request({
			modelName: SupportComment.name,
			methodName: 'getAsMe',
			httpMethod: 'GET',
			path: '/v1/me/support/posts/comments/{supportCommentId}',
			params: ['supportCommentId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	SupportComment.createAsMe = SupportComment._createAsMe = function () {

		return request({
			modelName: SupportComment.name,
			methodName: 'createAsMe',
			httpMethod: 'POST',
			path: '/v1/me/support/posts/comments',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	SupportComment.updateAsMe = SupportComment._updateAsMe = function () {

		return request({
			modelName: SupportComment.name,
			methodName: 'updateAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/support/posts/comments/{supportCommentId}',
			params: ['supportCommentId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	SupportComment.deleteAsMe = SupportComment._deleteAsMe = function () {

		return request({
			modelName: SupportComment.name,
			methodName: 'deleteAsMe',
			httpMethod: 'DELETE',
			path: '/v1/me/support/posts/comments/{supportCommentId}',
			params: ['supportCommentId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return SupportComment;
};

},{}],29:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var SupportPost = { name: 'SupportPost' };

	SupportPost.queryAsMe = SupportPost._queryAsMe = function () {

		return request({
			modelName: SupportPost.name,
			methodName: 'queryAsMe',
			httpMethod: 'GET',
			path: '/v1/me/support/posts',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	SupportPost.listAsMe = SupportPost._listAsMe = function () {

		return request({
			modelName: SupportPost.name,
			methodName: 'listAsMe',
			httpMethod: 'GET',
			path: '/v1/me/support/posts',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	SupportPost.countAsMe = SupportPost._countAsMe = function () {

		return request({
			modelName: SupportPost.name,
			methodName: 'countAsMe',
			httpMethod: 'GET',
			path: '/v1/me/support/posts/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	SupportPost.getAsMe = SupportPost._getAsMe = function () {

		return request({
			modelName: SupportPost.name,
			methodName: 'getAsMe',
			httpMethod: 'GET',
			path: '/v1/me/support/posts/{supportPostId}',
			params: ['supportPostId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	SupportPost.createAsMe = SupportPost._createAsMe = function () {

		return request({
			modelName: SupportPost.name,
			methodName: 'createAsMe',
			httpMethod: 'POST',
			path: '/v1/me/support/posts',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	SupportPost.updateAsMe = SupportPost._updateAsMe = function () {

		return request({
			modelName: SupportPost.name,
			methodName: 'updateAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/support/posts/{supportPostId}',
			params: ['supportPostId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	SupportPost.deleteAsMe = SupportPost._deleteAsMe = function () {

		return request({
			modelName: SupportPost.name,
			methodName: 'deleteAsMe',
			httpMethod: 'DELETE',
			path: '/v1/me/support/posts/{supportPostId}',
			params: ['supportPostId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return SupportPost;
};

},{}],30:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var Tax = { name: 'Tax' };

	Tax.query = Tax._query = function () {

		return request({
			modelName: Tax.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/taxes',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Tax.list = Tax._list = function () {

		return request({
			modelName: Tax.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/taxes',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Tax.count = Tax._count = function () {

		return request({
			modelName: Tax.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/taxes/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	Tax.get = Tax._get = function () {

		return request({
			modelName: Tax.name,
			methodName: 'get',
			httpMethod: 'GET',
			path: '/v1/taxes/{taxId}',
			params: ['taxId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	return Tax;
};

},{}],31:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var TaxCategory = { name: 'TaxCategory' };

	TaxCategory.query = TaxCategory._query = function () {

		return request({
			modelName: TaxCategory.name,
			methodName: 'query',
			httpMethod: 'GET',
			path: '/v1/taxes/categories',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	TaxCategory.list = TaxCategory._list = function () {

		return request({
			modelName: TaxCategory.name,
			methodName: 'list',
			httpMethod: 'GET',
			path: '/v1/taxes/categories',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	TaxCategory.count = TaxCategory._count = function () {

		return request({
			modelName: TaxCategory.name,
			methodName: 'count',
			httpMethod: 'GET',
			path: '/v1/taxes/categories/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	TaxCategory.get = TaxCategory._get = function () {

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

},{}],32:[function(require,module,exports){
'use strict';

module.exports = function (request) {

	var WishList = { name: 'WishList' };

	WishList.queryAsMe = WishList._queryAsMe = function () {

		return request({
			modelName: WishList.name,
			methodName: 'queryAsMe',
			httpMethod: 'GET',
			path: '/v1/me/wishlists',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	WishList.listAsMe = WishList._listAsMe = function () {

		return request({
			modelName: WishList.name,
			methodName: 'listAsMe',
			httpMethod: 'GET',
			path: '/v1/me/wishlists',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	WishList.countAsMe = WishList._countAsMe = function () {

		return request({
			modelName: WishList.name,
			methodName: 'countAsMe',
			httpMethod: 'GET',
			path: '/v1/me/wishlists/count',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	WishList.getAsMe = WishList._getAsMe = function () {

		return request({
			modelName: WishList.name,
			methodName: 'getAsMe',
			httpMethod: 'GET',
			path: '/v1/me/wishlists/{wishListId}',
			params: ['wishListId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	WishList.createAsMe = WishList._createAsMe = function () {

		return request({
			modelName: WishList.name,
			methodName: 'createAsMe',
			httpMethod: 'POST',
			path: '/v1/me/wishlists',
			params: [],
			args: Array.prototype.slice.call(arguments)
		});
	};

	WishList.addItemAsMe = WishList._addItemAsMe = function () {

		return request({
			modelName: WishList.name,
			methodName: 'addItemAsMe',
			httpMethod: 'POST',
			path: '/v1/me/wishlists/{wishListId}/items',
			params: ['wishListId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	WishList.updateAsMe = WishList._updateAsMe = function () {

		return request({
			modelName: WishList.name,
			methodName: 'updateAsMe',
			httpMethod: 'PUT',
			path: '/v1/me/wishlists/{wishListId}',
			params: ['wishListId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	WishList.deleteAsMe = WishList._deleteAsMe = function () {

		return request({
			modelName: WishList.name,
			methodName: 'deleteAsMe',
			httpMethod: 'DELETE',
			path: '/v1/me/wishlists/{wishListId}',
			params: ['wishListId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	WishList.emptyAsMe = WishList._emptyAsMe = function () {

		return request({
			modelName: WishList.name,
			methodName: 'emptyAsMe',
			httpMethod: 'DELETE',
			path: '/v1/me/wishlists/{wishListId}/items',
			params: ['wishListId'],
			args: Array.prototype.slice.call(arguments)
		});
	};

	WishList.deleteItemAsMe = WishList._deleteItemAsMe = function () {

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

},{}],33:[function(require,module,exports){
"use strict";

function TokenStorage(key) {

	this.key = key;
}

TokenStorage.prototype.setToken = function (tokenDetail) {

	localStorage.setItem(this.key, JSON.stringify(tokenDetail));
};

TokenStorage.prototype.getToken = function () {

	return JSON.parse(localStorage.getItem(this.key) || null);
};

module.exports = TokenStorage;

},{}],34:[function(require,module,exports){
"use strict";

module.exports = function (dest, source) {

	for (var key in source) {

		dest[key] = source[key];
	}

	return dest;
};

},{}]},{},[3]);
