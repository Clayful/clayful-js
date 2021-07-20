const assign = require('../util/assign');

module.exports = request => {

	const Collection = {
		name: 'Collection',
		path: 'collections',
		count: function() {
			return request(assign(Collection._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(Collection._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function() {
			return request(assign(Collection._list(), { args: Array.prototype.slice.call(arguments) }));
		},
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

	Collection._list = function() {

		return {
			modelName:      Collection.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/collections',
			params:         [],
		};

	};

	return Collection;

};