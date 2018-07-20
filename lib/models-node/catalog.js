const assign = require('../util/assign');

module.exports = request => {

	const Catalog = {
		name: 'Catalog',
		path: 'catalogs',
		list: function() {
			return request(assign(Catalog._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function() {
			return request(assign(Catalog._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(Catalog._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		pullFromMetafield: function() {
			return request(assign(Catalog._pullFromMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		increaseMetafield: function() {
			return request(assign(Catalog._increaseMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		pushToMetafield: function() {
			return request(assign(Catalog._pushToMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteMetafield: function() {
			return request(assign(Catalog._deleteMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	Catalog._list = function() {

		return {
			modelName:      Catalog.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/catalogs',
			params:         [],
		};

	};

	Catalog._count = function() {

		return {
			modelName:      Catalog.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/catalogs/count',
			params:         [],
		};

	};

	Catalog._get = function() {

		return {
			modelName:      Catalog.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/catalogs/{catalogId}',
			params:         ['catalogId', ],
		};

	};

	Catalog._pullFromMetafield = function() {

		return {
			modelName:      Catalog.name,
			methodName:     'pullFromMetafield',
			httpMethod:     'POST',
			path:           '/v1/catalogs/{catalogId}/meta/{field}/pull',
			params:         ['catalogId', 'field', ],
		};

	};

	Catalog._increaseMetafield = function() {

		return {
			modelName:      Catalog.name,
			methodName:     'increaseMetafield',
			httpMethod:     'POST',
			path:           '/v1/catalogs/{catalogId}/meta/{field}/inc',
			params:         ['catalogId', 'field', ],
		};

	};

	Catalog._pushToMetafield = function() {

		return {
			modelName:      Catalog.name,
			methodName:     'pushToMetafield',
			httpMethod:     'POST',
			path:           '/v1/catalogs/{catalogId}/meta/{field}/push',
			params:         ['catalogId', 'field', ],
		};

	};

	Catalog._deleteMetafield = function() {

		return {
			modelName:      Catalog.name,
			methodName:     'deleteMetafield',
			httpMethod:     'DELETE',
			path:           '/v1/catalogs/{catalogId}/meta/{field}',
			params:         ['catalogId', 'field', ],
		};

	};

	return Catalog;

};