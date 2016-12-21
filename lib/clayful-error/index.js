"use strict";

function ClayfulError(modelName, methodName, status, errorCode, message) {

	this.name = 'ClayfulError';
	this.stack = (new Error()).stack;

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