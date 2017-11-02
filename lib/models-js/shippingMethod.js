const assign = require('../util/assign');

module.exports = request => {

	const ShippingMethod = {
		name: 'ShippingMethod',
		path: 'shipping/methods',
		query: function() {
			return request(assign(ShippingMethod._query(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function() {
			return request(assign(ShippingMethod._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function() {
			return request(assign(ShippingMethod._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(ShippingMethod._get(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	ShippingMethod._query = function() {

		return {
			modelName:      ShippingMethod.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/shipping/methods',
			params:         [],
		};

	};

	ShippingMethod._list = function() {

		return {
			modelName:      ShippingMethod.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/shipping/methods',
			params:         [],
		};

	};

	ShippingMethod._count = function() {

		return {
			modelName:      ShippingMethod.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/shipping/methods/count',
			params:         [],
		};

	};

	ShippingMethod._get = function() {

		return {
			modelName:      ShippingMethod.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/shipping/methods/{shippingMethodId}',
			params:         ['shippingMethodId', ],
		};

	};

	return ShippingMethod;

};