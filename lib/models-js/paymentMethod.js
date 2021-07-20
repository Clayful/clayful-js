const assign = require('../util/assign');

module.exports = request => {

	const PaymentMethod = {
		name: 'PaymentMethod',
		path: 'payments/methods',
		count: function() {
			return request(assign(PaymentMethod._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(PaymentMethod._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function() {
			return request(assign(PaymentMethod._list(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	PaymentMethod._count = function() {

		return {
			modelName:      PaymentMethod.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/payments/methods/count',
			params:         [],
		};

	};

	PaymentMethod._get = function() {

		return {
			modelName:      PaymentMethod.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/payments/methods/{paymentMethodId}',
			params:         ['paymentMethodId', ],
		};

	};

	PaymentMethod._list = function() {

		return {
			modelName:      PaymentMethod.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/payments/methods',
			params:         [],
		};

	};

	return PaymentMethod;

};