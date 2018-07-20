(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var axiosRequestMiddleware = function axiosRequestMiddleware(axios) {
	return function (detail, ClayfulError, callback) {

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
	};
};

module.exports = axiosRequestMiddleware;

if (typeof window !== 'undefined' && typeof window.Clayful !== 'undefined') {

	window.Clayful.install('request', axiosRequestMiddleware);
}

},{}]},{},[1]);
