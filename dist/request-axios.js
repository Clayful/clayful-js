(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

module.exports = function (callback) {

	var resolve = void 0;
	var reject = void 0;

	var promise = callback.Promise ? new callback.Promise(function (_resolve, _reject) {
		resolve = _resolve;
		reject = _reject;
	}) : null;

	callback = promise ? function (err, result) {
		return err ? reject(err) : resolve(result);
	} : callback;

	return { promise: promise, callback: callback };
};

},{}],2:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var callbackAsPromise = require('../lib/callbackAsPromise');

var axiosRequestMiddleware = function axiosRequestMiddleware(axios) {
	return function (detail, ClayfulError, callback) {
		var _callbackAsPromise = callbackAsPromise(callback),
		    promise = _callbackAsPromise.promise,
		    c = _callbackAsPromise.callback;

		callback = c;

		// Promise -> regular fn(err, result) format
		var wrappedCallback = function wrappedCallback(err, result) {
			return setTimeout(function () {
				return callback(err, result);
			}, 0);
		};

		var options = {
			method: detail.httpMethod.toLowerCase(),
			url: detail.requestUrl,
			params: detail.query,
			headers: detail.headers
		};

		if (detail.payload) {

			options.data = detail.payload;

			if (detail.usesFormData) {

				/**
     * When using `form-data` module in Node.js environment..
     * References:
     * - https://www.npmjs.com/package/form-data
     * - https://github.com/mzabriskie/axios/issues/318#issuecomment-271703437
     */

				if (typeof options.data.getHeaders === 'function') {

					var headers = options.data.getHeaders();

					for (var key in headers) {
						options.headers[key] = headers[key];
					}
				}
			}
		}

		axios(options).then(function (response) {
			return wrappedCallback(null, {
				status: response.status,
				data: response.data,
				headers: response.headers
			});
		}, function (err) {

			if (!err.response) {
				return wrappedCallback(err);
			}

			var error = new ClayfulError(detail.modelName, detail.methodName, err.response.status, err.response.headers, err.response.data.errorCode, err.response.data.message || err.response.data.error, err.response.data.validation || null);

			return wrappedCallback(error);
		});

		return promise;
	};
};

if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
	module.exports = axiosRequestMiddleware;
}

if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
	window.axiosRequestMiddleware = axiosRequestMiddleware;
}

},{"../lib/callbackAsPromise":1}]},{},[2]);
