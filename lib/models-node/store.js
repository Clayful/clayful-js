const assign = require('../util/assign');

module.exports = request => {

	const Store = {
		name: 'Store',
		path: 'store',
		get: function() {
			return request(assign(Store._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		pushToMetafield: function() {
			return request(assign(Store._pushToMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		pullFromMetafield: function() {
			return request(assign(Store._pullFromMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		increaseMetafield: function() {
			return request(assign(Store._increaseMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteMetafield: function() {
			return request(assign(Store._deleteMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	Store._get = function() {

		return {
			modelName:      Store.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/store',
			params:         [],
		};

	};

	Store._pushToMetafield = function() {

		return {
			modelName:      Store.name,
			methodName:     'pushToMetafield',
			httpMethod:     'POST',
			path:           '/v1/store/meta/{field}/push',
			params:         ['field', ],
		};

	};

	Store._pullFromMetafield = function() {

		return {
			modelName:      Store.name,
			methodName:     'pullFromMetafield',
			httpMethod:     'POST',
			path:           '/v1/store/meta/{field}/pull',
			params:         ['field', ],
		};

	};

	Store._increaseMetafield = function() {

		return {
			modelName:      Store.name,
			methodName:     'increaseMetafield',
			httpMethod:     'POST',
			path:           '/v1/store/meta/{field}/inc',
			params:         ['field', ],
		};

	};

	Store._deleteMetafield = function() {

		return {
			modelName:      Store.name,
			methodName:     'deleteMetafield',
			httpMethod:     'DELETE',
			path:           '/v1/store/meta/{field}',
			params:         ['field', ],
		};

	};

	return Store;

};