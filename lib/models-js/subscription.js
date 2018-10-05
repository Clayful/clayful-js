const assign = require('../util/assign');

module.exports = request => {

	const Subscription = {
		name: 'Subscription',
		path: 'subscriptions',
		listForMe: function() {
			return request(assign(Subscription._listForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		countForMe: function() {
			return request(assign(Subscription._countForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		getForMe: function() {
			return request(assign(Subscription._getForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		authenticate: function() {
			return request(assign(Subscription._authenticate(), { args: Array.prototype.slice.call(arguments) }));
		},
		scheduleForMe: function() {
			return request(assign(Subscription._scheduleForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		cancelForMe: function() {
			return request(assign(Subscription._cancelForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateForMe: function() {
			return request(assign(Subscription._updateForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
		updateCancellationForMe: function() {
			return request(assign(Subscription._updateCancellationForMe(), { args: Array.prototype.slice.call(arguments) }));
		},
	};

	Subscription._listForMe = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'listForMe',
			httpMethod:     'GET',
			path:           '/v1/me/subscriptions',
			params:         [],
		};

	};

	Subscription._countForMe = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'countForMe',
			httpMethod:     'GET',
			path:           '/v1/me/subscriptions/count',
			params:         [],
		};

	};

	Subscription._getForMe = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'getForMe',
			httpMethod:     'GET',
			path:           '/v1/me/subscriptions/{subscriptionId}',
			params:         ['subscriptionId', ],
		};

	};

	Subscription._authenticate = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'authenticate',
			httpMethod:     'POST',
			path:           '/v1/subscriptions/{subscriptionId}/auth',
			params:         ['subscriptionId', ],
		};

	};

	Subscription._scheduleForMe = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'scheduleForMe',
			httpMethod:     'POST',
			path:           '/v1/me/subscriptions/{subscriptionId}/scheduled',
			params:         ['subscriptionId', ],
		};

	};

	Subscription._cancelForMe = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'cancelForMe',
			httpMethod:     'POST',
			path:           '/v1/me/subscriptions/{subscriptionId}/cancellation',
			params:         ['subscriptionId', ],
		};

	};

	Subscription._updateForMe = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'updateForMe',
			httpMethod:     'PUT',
			path:           '/v1/me/subscriptions/{subscriptionId}',
			params:         ['subscriptionId', ],
		};

	};

	Subscription._updateCancellationForMe = function() {

		return {
			modelName:      Subscription.name,
			methodName:     'updateCancellationForMe',
			httpMethod:     'PUT',
			path:           '/v1/me/subscriptions/{subscriptionId}/cancellation',
			params:         ['subscriptionId', ],
		};

	};

	return Subscription;

};