(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var parseHeaders = function parseHeaders(headers) {

	return headers.split('\n').filter(function (s) {
		return s;
	}).map(function (s) {
		return s.match(/^([\w-]+):\s*(.+)/);
	}).reduce(function (headers, _ref) {
		var _ref2 = _slicedToArray(_ref, 3),
		    key = _ref2[1],
		    value = _ref2[2];

		headers[key] = value;
		return headers;
	}, {});
};

var jQueryRequestMiddleware = function jQueryRequestMiddleware($) {
	return function (detail, ClayfulError, callback) {

		var query = $.param(detail.query);

		query = query ? '?' + query : '';

		var options = {
			method: detail.httpMethod,
			url: detail.requestUrl + query,
			headers: detail.headers
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
	};
};

module.exports = jQueryRequestMiddleware;

if (typeof window !== 'undefined' && typeof window.Clayful !== 'undefined') {

	window.Clayful.install('request', jQueryRequestMiddleware);
}

},{}]},{},[1]);
