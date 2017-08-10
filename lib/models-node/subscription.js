module.exports = request => {

	const Subscription = {
		name: 'Subscription',
		path: ''
	};

	Subscription.query = function() {

		return request({
			modelName:      Subscription.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/subscriptions',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Subscription.list = function() {

		return request({
			modelName:      Subscription.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/subscriptions',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Subscription.count = function() {

		return request({
			modelName:      Subscription.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/subscriptions/count',
			params:         [],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Subscription.get = function() {

		return request({
			modelName:      Subscription.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/subscriptions/{subscriptionId}',
			params:         ['subscriptionId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Subscription.queryByCustomer = function() {

		return request({
			modelName:      Subscription.name,
			methodName:     'queryByCustomer',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/subscriptions',
			params:         ['customerId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Subscription.listByCustomer = function() {

		return request({
			modelName:      Subscription.name,
			methodName:     'listByCustomer',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/subscriptions',
			params:         ['customerId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Subscription.reject = function() {

		return request({
			modelName:      Subscription.name,
			methodName:     'reject',
			httpMethod:     'POST',
			path:           '/v1/subscriptions/{subscriptionId}/reject',
			params:         ['subscriptionId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Subscription.cancel = function() {

		return request({
			modelName:      Subscription.name,
			methodName:     'cancel',
			httpMethod:     'POST',
			path:           '/v1/subscriptions/{subscriptionId}/cancel',
			params:         ['subscriptionId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Subscription.start = function() {

		return request({
			modelName:      Subscription.name,
			methodName:     'start',
			httpMethod:     'POST',
			path:           '/v1/subscriptions/{subscriptionId}/start',
			params:         ['subscriptionId', ],
			withoutPayload: true,
			args:           Array.prototype.slice.call(arguments)
		});

	};

	Subscription.delete = function() {

		return request({
			modelName:      Subscription.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/subscriptions/{subscriptionId}',
			params:         ['subscriptionId', ],
			args:           Array.prototype.slice.call(arguments)
		});

	};

	return Subscription;

};