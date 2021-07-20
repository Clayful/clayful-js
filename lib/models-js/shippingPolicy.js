const assign = require('../util/assign');

module.exports = request => {

	const ShippingPolicy = {
		name: 'ShippingPolicy',
		path: 'shipping/policies',
		count: function() {
			return request(assign(ShippingPolicy._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(ShippingPolicy._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function() {
			return request(assign(ShippingPolicy._list(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	ShippingPolicy._count = function() {

		return {
			modelName:      ShippingPolicy.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/shipping/policies/count',
			params:         [],
		};

	};

	ShippingPolicy._get = function() {

		return {
			modelName:      ShippingPolicy.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/shipping/policies/{shippingPolicyId}',
			params:         ['shippingPolicyId', ],
		};

	};

	ShippingPolicy._list = function() {

		return {
			modelName:      ShippingPolicy.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/shipping/policies',
			params:         [],
		};

	};

	return ShippingPolicy;

};