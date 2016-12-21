"use strict";

const promisify = require('es6-promisify');
const clayfulFactory = require('./lib/client-node');

module.exports = credentials => {

	const clayful = clayfulFactory(credentials);

	clayful.models().forEach(modelName => {

		const methods = Object.keys(clayful[modelName]);

		methods.forEach(methodName => {

			// Keep a reference of original method
			if (methodName.startsWith('_')) return;

			// Promisify
			clayful[modelName][methodName] = promisify(clayful[modelName]['_' + methodName]);

		});

	});

	return clayful;

};