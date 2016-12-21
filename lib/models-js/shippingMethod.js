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


	return ShippingMethod;

};