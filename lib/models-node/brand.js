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
		create: function() {
			return request(assign(Brand._create(), { args: Array.prototype.slice.call(arguments) }));
		},
		increaseMetafield: function() {
			return request(assign(Brand._increaseMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		pullFromMetafield: function() {
			return request(assign(Brand._pullFromMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		pushToMetafield: function() {
			return request(assign(Brand._pushToMetafield(), { args: Array.prototype.slice.call(arguments) }));
		},
		update: function() {
			return request(assign(Brand._update(), { args: Array.prototype.slice.call(arguments) }));
		},
		delete: function() {
			return request(assign(Brand._delete(), { args: Array.prototype.slice.call(arguments) }));
		},
		deleteMetafield: function() {
			return request(assign(Brand._deleteMetafield(), { args: Array.prototype.slice.call(arguments) }));
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

	Brand._create = function() {

		return {
			modelName:      Brand.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/brands',
			params:         [],
		};

	};

	Brand._increaseMetafield = function() {

		return {
			modelName:      Brand.name,
			methodName:     'increaseMetafield',
			httpMethod:     'POST',
			path:           '/v1/brands/{brandId}/meta/{field}/inc',
			params:         ['brandId', 'field', ],
		};

	};

	Brand._pullFromMetafield = function() {

		return {
			modelName:      Brand.name,
			methodName:     'pullFromMetafield',
			httpMethod:     'POST',
			path:           '/v1/brands/{brandId}/meta/{field}/pull',
			params:         ['brandId', 'field', ],
		};

	};

	Brand._pushToMetafield = function() {

		return {
			modelName:      Brand.name,
			methodName:     'pushToMetafield',
			httpMethod:     'POST',
			path:           '/v1/brands/{brandId}/meta/{field}/push',
			params:         ['brandId', 'field', ],
		};

	};

	Brand._update = function() {

		return {
			modelName:      Brand.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/brands/{brandId}',
			params:         ['brandId', ],
		};

	};

	Brand._delete = function() {

		return {
			modelName:      Brand.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/brands/{brandId}',
			params:         ['brandId', ],
		};

	};

	Brand._deleteMetafield = function() {

		return {
			modelName:      Brand.name,
			methodName:     'deleteMetafield',
			httpMethod:     'DELETE',
			path:           '/v1/brands/{brandId}/meta/{field}',
			params:         ['brandId', 'field', ],
		};

	};

	return Brand;

};