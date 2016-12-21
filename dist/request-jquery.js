(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

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
		}

		$.ajax(options).done(function (data) {
			return callback(null, data);
		}).fail(function (response) {

			var error = new ClayfulError(detail.modelName, detail.methodName, response.status, response.responseJSON.errorCode, response.responseJSON.message || response.responseJSON.error);

			return callback(error);
		});
	};
};

module.exports = window.jQueryRequestMiddleware = jQueryRequestMiddleware;

},{}]},{},[1]);
