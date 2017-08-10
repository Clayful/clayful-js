(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var axiosRequestMiddleware = function axiosRequestMiddleware(axios) {
	return function (detail, ClayfulError, callback) {

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
			return callback(null, {
				status: response.status,
				data: response.data,
				headers: response.headers
			});
		}).catch(function (err) {

			if (!err.response) {
				return callback(err);
			}

			var error = new ClayfulError(detail.modelName, detail.methodName, err.response.status, err.response.headers, err.response.data.errorCode, err.response.data.message || err.response.data.error, err.response.data.validation || null);

			return callback(error);
		});
	};
};

module.exports = axiosRequestMiddleware;

if (typeof window !== 'undefined' && typeof window.Clayful !== 'undefined') {

	window.Clayful.install('request', axiosRequestMiddleware);
}

},{}]},{},[1]);
