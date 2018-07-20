const assign = require('../util/assign');

module.exports = request => {

	const Brand = {
		name: 'Brand',
		path: 'brands',
		list: function() {
			return request(assign(Brand._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function() {
			return request(assign(Brand._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(Brand._get(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	Brand._list = function() {

		return {
			modelName:      Brand.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/brands',
			params:         [],
		};

	};

	Brand._count = function() {

		return {
			modelName:      Brand.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/brands/count',
			params:         [],
		};

	};

	Brand._get = function() {

		return {
			modelName:      Brand.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/brands/{brandId}',
			params:         ['brandId', ],
		};

	};

	return Brand;

};