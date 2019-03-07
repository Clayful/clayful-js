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

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var callbackAsPromise = require('../lib/callbackAsPromise');

var parseHeaders = function parseHeaders(headers) {

	return headers.split('\n').filter(function (s) {
		return s;
	}).map(function (s) {
		return s.match(/^([\w-]+):\s*(.+)/);
	}).filter(function (s) {
		return s;
	}).reduce(function (headers, _ref) {
		var _ref2 = _slicedToArray(_ref, 3),
		    key = _ref2[1],
		    value = _ref2[2];

		headers[key] = value;
		return headers;
	}, {});
};

var jQueryRequestMiddleware = function jQueryRequestMiddleware($) {

	$.support.cors = true;

	return function (detail, ClayfulError, callback) {
		var _callbackAsPromise = callbackAsPromise(callback),
		    promise = _callbackAsPromise.promise,
		    c = _callbackAsPromise.callback;

		callback = c;

		var query = $.param(detail.query);

		query = query ? '?' + query : '';

		var options = {
			crossDomain: true,
			method: detail.httpMethod,
			url: detail.requestUrl + query,
			headers: detail.headers,
			xhrFields: { withCredentials: true },
			converters: {
				// Since jQuery's ajax request considers empty response as an error,
				// simply parse empty response as `null`.
				'text json': function textJson(data) {
					return $.parseJSON(data || 'null');
				}
			}
		};

		if (detail.payload) {

			options.data = detail.payload;

			/**
    * When using `FormData` to upload files..
    * References:
    * - https://stackoverflow.com/questions/5392344/sending-multipart-formdata-with-jquery-ajax
    */

			if (detail.usesFormData) {
				options.contentType = false;
				options.processData = false;
			} else {
				options.dataType = 'json';
				options.contentType = 'application/json; charset=utf-8';
				options.data = JSON.stringify(detail.payload);
			}
		}

		$.ajax(options).done(function (data, textStatus, jqXHR) {
			return callback(null, {
				status: jqXHR.status,
				data: data,
				headers: parseHeaders(jqXHR.getAllResponseHeaders())
			});
		}).fail(function (jqXHR) {

			if (!jqXHR.responseJSON) {
				return callback(jqXHR);
			}

			var error = new ClayfulError(detail.modelName, detail.methodName, jqXHR.status, parseHeaders(jqXHR.getAllResponseHeaders()), jqXHR.responseJSON.errorCode, jqXHR.responseJSON.message || jqXHR.responseJSON.error, jqXHR.responseJSON.validation || null);

			return callback(error);
		});

		return promise;
	};
};

if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
	module.exports = jQueryRequestMiddleware;
}

if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
	window.jQueryRequestMiddleware = jQueryRequestMiddleware;
}

},{"../lib/callbackAsPromise":1}]},{},[2]);
