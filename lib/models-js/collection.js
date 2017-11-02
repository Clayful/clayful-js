const assign = require('../util/assign');

module.exports = request => {

	const Collection = {
		name: 'Collection',
		path: 'collections',
		query: function() {
			return request(assign(Collection._query(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function() {
			return request(assign(Collection._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function() {
			return request(assign(Collection._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(Collection._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryByParent: function() {
			return request(assign(Collection._queryByParent(), { args: Array.prototype.slice.call(arguments) }));
		},
		listByParent: function() {
			return request(assign(Collection._listByParent(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	Collection._query = function() {

		return {
			modelName:      Collection.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/collections',
			params:         [],
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

	Collection._queryByParent = function() {

		return {
			modelName:      Collection.name,
			methodName:     'queryByParent',
			httpMethod:     'GET',
			path:           '/v1/collections/{collectionId}/collections',
			params:         ['collectionId', ],
		};

	};

	Collection._listByParent = function() {

		return {
			modelName:      Collection.name,
			methodName:     'listByParent',
			httpMethod:     'GET',
			path:           '/v1/collections/{collectionId}/collections',
			params:         ['collectionId', ],
		};

	};

	return Collection;

};