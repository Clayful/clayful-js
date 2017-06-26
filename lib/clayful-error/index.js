"use strict";

function ClayfulError(modelName, methodName, status, headers, errorCode, message, validation) {

	this.stack = (new Error()).stack;

	this.model = modelName;
	this.method = methodName;
	this.status = status;
	this.headers = headers;
	this.code = errorCode;
	this.message = message;
	this.validation = validation;

}

ClayfulError.prototype = new Error;
ClayfulError.prototype.constructor = ClayfulError;
ClayfulError.prototype.name = 'ClayfulError';
ClayfulError.prototype.isClayful = true;

module.exports = ClayfulError;