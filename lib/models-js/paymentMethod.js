module.exports = request => {

	const PaymentMethod = {
		name: 'PaymentMethod',
		path: 'payments/methods'
	};

	PaymentMethod.query = function() {

		return request({
			modelName:      PaymentMethod.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/payments/methods',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	PaymentMethod.list = function() {

		return request({
			modelName:      PaymentMethod.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/payments/methods',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	PaymentMethod.count = function() {

		return request({
			modelName:      PaymentMethod.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/payments/methods/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	PaymentMethod.get = function() {

		return request({
			modelName:      PaymentMethod.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/payments/methods/{paymentMethodId}',
			params:         ['paymentMethodId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	return PaymentMethod;

};