const assign = require('../util/assign');

module.exports = request => {

	const Subscription = {
		name: 'Subscription',
		path: '',
		query: function() {
			return request(assign(Subscription._query(), { args: Array.prototype.slice.call(arguments) }));
		},
		list: function() {
			return request(assign(Subscription._list(), { args: Array.prototype.slice.call(arguments) }));
		},
		count: function() {
			return request(assign(Subscription._count(), { args: Array.prototype.slice.call(arguments) }));
		},
		get: function() {
			return request(assign(Subscription._get(), { args: Array.prototype.slice.call(arguments) }));
		},
		queryByCustomer: function() {
			return request(assign(Subscription._queryByCustomer(), { args: Array.prototype.slice.call(arguments) }));
		},
		listByCustomer: function() {
			return request(assign(Subscription._listByCustomer(), { args: Array.prototype.slice.call(arguments) }));
		},
		reject: function() {
			return request(assign(Subscription._reject(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancel: function() {
			return request(assign(Subscription._cancel(), { args: Array.prototype.slice.call(arguments) }));
		},
		start: function() {
			return request(assign(Subscription._start(), { args: Array.prototype.slice.call(arguments) }));
		},
		delete: function() {
			return request(assign(Subscription._delete(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	Subscription._query = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'query',
			httpMethod:     'GET',
			path:           '/v1/subscriptions',
			params:         [],
		};

	};

	Subscription._list = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'list',
			httpMethod:     'GET',
			path:           '/v1/subscriptions',
			params:         [],
		};

	};

	Subscription._count = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'count',
			httpMethod:     'GET',
			path:           '/v1/subscriptions/count',
			params:         [],
		};

	};

	Subscription._get = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'get',
			httpMethod:     'GET',
			path:           '/v1/subscriptions/{subscriptionId}',
			params:         ['subscriptionId', ],
		};

	};

	Subscription._queryByCustomer = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'queryByCustomer',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/subscriptions',
			params:         ['customerId', ],
		};

	};

	Subscription._listByCustomer = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'listByCustomer',
			httpMethod:     'GET',
			path:           '/v1/customers/{customerId}/subscriptions',
			params:         ['customerId', ],
		};

	};

	Subscription._reject = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'reject',
			httpMethod:     'POST',
			path:           '/v1/subscriptions/{subscriptionId}/reject',
			params:         ['subscriptionId', ],
		};

	};

	Subscription._cancel = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'cancel',
			httpMethod:     'POST',
			path:           '/v1/subscriptions/{subscriptionId}/cancel',
			params:         ['subscriptionId', ],
		};

	};

	Subscription._start = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'start',
			httpMethod:     'POST',
			path:           '/v1/subscriptions/{subscriptionId}/start',
			params:         ['subscriptionId', ],
			withoutPayload: true,
		};

	};

	Subscription._delete = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'delete',
			httpMethod:     'DELETE',
			path:           '/v1/subscriptions/{subscriptionId}',
			params:         ['subscriptionId', ],
		};

	};

	return Subscription;

};