module.exports = request => {

	const ShippingMethod = { name: 'ShippingMethod' };

	ShippingMethod.query = ShippingMethod._query = function() {

		return request({
			modelName:      ShippingMethod.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/shippings/methods',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ShippingMethod.list = ShippingMethod._list = function() {

		return request({
			modelName:      ShippingMethod.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/shippings/methods',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ShippingMethod.count = ShippingMethod._count = function() {

		return request({
			modelName:      ShippingMethod.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/shippings/methods/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ShippingMethod.get = ShippingMethod._get = function() {

		return request({
			modelName:      ShippingMethod.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/shippings/methods/{shippingMethodId}',
			params:         ['shippingMethodId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ShippingMethod.create = ShippingMethod._create = function() {

		return request({
			modelName:      ShippingMethod.name,
			methodName:     'create',
			httpMethod:     'POST',
			path:           '/v1/shippings/methods',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ShippingMethod.update = ShippingMethod._update = function() {

		return request({
			modelName:      ShippingMethod.name,
			methodName:     'update',
			httpMethod:     'PUT',
			path:           '/v1/shippings/methods/{shippingMethodId}',
			params:         ['shippingMethodId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	ShippingMethod.delete = ShippingMethod._delete = function() {

		return request({
			modelName:      ShippingMethod.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/shippings/methods/{shippingMethodId}',
			params:         ['shippingMethodId'],
			args:           Array.prototype.slice.call(arguments)
		});

	};


	return ShippingMethod;

};