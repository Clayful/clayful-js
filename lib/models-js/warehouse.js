const assign = require('../util/assign');

module.exports = request => {

	const Warehouse = {
		name: 'Warehouse',
		path: 'warehouses',
		query: function() {
			return request(assign(Warehouse._query(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function() {
			return request(assign(Warehouse._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function() {
			return request(assign(Warehouse._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(Warehouse._get(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	Warehouse._query = function() {

		return {
			modelName:      Warehouse.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/warehouses',
			params:         [],
		};

	};

	Warehouse._list = function() {

		return {
			modelName:      Warehouse.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/warehouses',
			params:         [],
		};

	};

	Warehouse._count = function() {

		return {
			modelName:      Warehouse.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/warehouses/count',
			params:         [],
		};

	};

	Warehouse._get = function() {

		return {
			modelName:      Warehouse.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/warehouses/{warehouseId}',
			params:         ['warehouseId', ],
		};

	};

	return Warehouse;

};