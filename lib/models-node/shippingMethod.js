module.exports = request => {

	const ShippingMethod = {
		name: 'ShippingMethod',
		path: 'shipping/methods'
	};

	ShippingMethod.query = function() {

		return request({
			modelName:      ShippingMethod.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/shipping/methods',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ShippingMethod.list = function() {

		return request({
			modelName:      ShippingMethod.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/shipping/methods',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ShippingMethod.count = function() {

		return request({
			modelName:      ShippingMethod.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/shipping/methods/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	ShippingMethod.get = function() {

		return request({
			modelName:      ShippingMethod.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/shipping/methods/{shippingMethodId}',
			params:         ['shippingMethodId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	return ShippingMethod;

};