const assign = require('../util/assign');

module.exports = request => {

	const Collection = {
		name: 'Collection',
		path: 'collections',
		list: function() {
			return request(assign(Collection._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function() {
			return request(assign(Collection._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(Collection._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		pushToMetafield: function() {
			return request(assign(Collection._pushToMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		increaseMetafield: function() {
			return request(assign(Collection._increaseMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		pullFromMetafield: function() {
			return request(assign(Collection._pullFromMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteMetafield: function() {
			return request(assign(Collection._deleteMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	Collection._list = function() {

		return {
			modelName:      Collection.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/collections',
			params:         [],
		};

	};

	Collection._count = function() {

		return {
			modelName:      Collection.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/collections/count',
			params:         [],
		};

	};

	Collection._get = function() {

		return {
			modelName:      Collection.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/collections/{collectionId}',
			params:         ['collectionId', ],
		};

	};

	Collection._pushToMetafield = function() {

		return {
			modelName:      Collection.name,
			methodName:     'pushToMetafield',
			httpMethod:     'POST',
			path:           '/v1/collections/{collectionId}/meta/{field}/push',
			params:         ['collectionId', 'field', ],
		};

	};

	Collection._increaseMetafield = function() {

		return {
			modelName:      Collection.name,
			methodName:     'increaseMetafield',
			httpMethod:     'POST',
			path:           '/v1/collections/{collectionId}/meta/{field}/inc',
			params:         ['collectionId', 'field', ],
		};

	};

	Collection._pullFromMetafield = function() {

		return {
			modelName:      Collection.name,
			methodName:     'pullFromMetafield',
			httpMethod:     'POST',
			path:           '/v1/collections/{collectionId}/meta/{field}/pull',
			params:         ['collectionId', 'field', ],
		};

	};

	Collection._deleteMetafield = function() {

		return {
			modelName:      Collection.name,
			methodName:     'deleteMetafield',
			httpMethod:     'DELETE',
			path:           '/v1/collections/{collectionId}/meta/{field}',
			params:         ['collectionId', 'field', ],
		};

	};

	return Collection;

};