module.exports = request => {

	const Warehouse = {
		name: 'Warehouse',
		path: 'warehouses'
	};

	Warehouse.query = function() {

		return request({
			modelName:      Warehouse.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/warehouses',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Warehouse.list = function() {

		return request({
			modelName:      Warehouse.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/warehouses',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Warehouse.count = function() {

		return request({
			modelName:      Warehouse.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/warehouses/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Warehouse.get = function() {

		return request({
			modelName:      Warehouse.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/warehouses/{warehouseId}',
			params:         ['warehouseId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	return Warehouse;

};