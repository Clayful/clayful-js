const assign = require('../util/assign');

module.exports = request => {

	const Catalog = {
		name: 'Catalog',
		path: 'catalogs',
		count: function() {
			return request(assign(Catalog._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(Catalog._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function() {
			return request(assign(Catalog._list(), { args: Array.prototype.slice.call(arguments) }));
		},
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

	Catalog._list = function() {

		return {
			modelName:      Catalog.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/catalogs',
			params:         [],
		};

	};

	return Catalog;

};